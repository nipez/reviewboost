import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import type {
  Ad,
  Business,
  Competitor,
  CreateBusinessInput,
  Location,
  PlanId,
  Review,
  SaasCustomer,
  SaasOverview,
  SocialAccount,
  SocialPlatform,
  TimelineEvent,
} from "../src/types.ts";
import { draftReviewReply } from "./ai.ts";
import { planMrr } from "../src/lib/plans.ts";

export interface Db {
  raw: DatabaseSync;
  searchPlaces: (q: string) => PlaceRow[];
  createBusiness: (input: CreateBusinessInput) => Business;
  getBusiness: (slug: string) => Business | null;
  listBusinesses: () => Business[];
  patchBusiness: (slug: string, patch: Partial<BusinessPatch>) => Business | null;
  addLocation: (slug: string, loc: Omit<Location, "id" | "businessId" | "isPrimary">) => Location | null;
  listReviews: (slug: string, locationId?: number) => Review[];
  replyToReview: (reviewId: number, replyText: string) => Review | null;
  generateReply: (reviewId: number) => Review | null;
  addReview: (slug: string, review: { author: string; rating: number; text: string }) => Review | null;
  addFeedback: (slug: string, rating: number, text: string) => void;
  recordScan: (slug: string) => void;
  listEvents: (slug: string) => TimelineEvent[];
  addEvent: (slug: string, event: { type: TimelineEvent["type"]; label: string; platform?: string | null }) => TimelineEvent | null;
  verifyPin: (slug: string, pin: string) => boolean;
  listAds: () => Ad[];
  saasOverview: () => SaasOverview;
  saasCustomers: () => SaasCustomer[];
  saasActivity: () => TimelineEvent[];
  competitorsFor: (industry: string) => Competitor[];
}

export interface BusinessPatch {
  plan: PlanId;
  pin: string;
  theme: Business["theme"];
  displayMode: Business["displayMode"];
  minStars: number;
  logoUrl: string | null;
  social: Partial<Record<SocialPlatform, { connected: boolean; handle?: string }>>;
}

export interface PlaceRow {
  placeId: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  industry: string;
}

function slugify(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "business";
  return base;
}

function mapReview(row: Record<string, unknown>): Review {
  return {
    id: Number(row.id),
    locationId: Number(row.location_id),
    author: String(row.author),
    rating: Number(row.rating),
    text: String(row.text),
    avatar: String(row.avatar),
    createdAt: String(row.created_at),
    replied: Boolean(row.replied),
    replyText: String(row.reply_text ?? ""),
    aiDraft: String(row.ai_draft ?? ""),
  };
}

function mapLocation(row: Record<string, unknown>): Location {
  return {
    id: Number(row.id),
    businessId: Number(row.business_id),
    name: String(row.name),
    address: String(row.address),
    placeId: String(row.place_id),
    rating: Number(row.rating),
    reviewCount: Number(row.review_count),
    isPrimary: Boolean(row.is_primary),
  };
}

function mapEvent(row: Record<string, unknown>): TimelineEvent {
  return {
    id: Number(row.id),
    businessId: Number(row.business_id),
    locationId: row.location_id == null ? null : Number(row.location_id),
    type: row.type as TimelineEvent["type"],
    label: String(row.label),
    platform: row.platform == null ? null : String(row.platform),
    createdAt: String(row.created_at),
  };
}

function uniqueSlug(db: DatabaseSync, name: string): string {
  const base = slugify(name);
  let slug = base;
  let i = 2;
  while (db.prepare("SELECT id FROM businesses WHERE slug = ?").get(slug)) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

export function openDb(filePath: string): Db {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const raw = new DatabaseSync(filePath);
  raw.exec("PRAGMA journal_mode = WAL;");
  raw.exec("PRAGMA foreign_keys = ON;");
  migrate(raw);

  function loadBusiness(slug: string): Business | null {
    const biz = raw.prepare("SELECT * FROM businesses WHERE slug = ?").get(slug) as Record<string, unknown> | undefined;
    if (!biz) return null;
    const id = Number(biz.id);
    const locations = raw.prepare("SELECT * FROM locations WHERE business_id = ? ORDER BY is_primary DESC, id").all(id).map((r) => mapLocation(r as Record<string, unknown>));
    const reviews = raw.prepare(
      "SELECT r.* FROM reviews r JOIN locations l ON l.id = r.location_id WHERE l.business_id = ? ORDER BY r.created_at DESC, r.id DESC",
    ).all(id).map((r) => mapReview(r as Record<string, unknown>));
    const social = raw.prepare("SELECT * FROM social_accounts WHERE business_id = ?").all(id).map((r) => {
      const row = r as Record<string, unknown>;
      return {
        platform: String(row.platform) as SocialPlatform,
        handle: String(row.handle ?? ""),
        connected: Boolean(row.connected),
        followerCount: Number(row.follower_count),
      } satisfies SocialAccount;
    });
    const events = raw.prepare("SELECT * FROM events WHERE business_id = ? ORDER BY id DESC LIMIT 40").all(id).map((r) => mapEvent(r as Record<string, unknown>));
    const scanRow = raw.prepare("SELECT COUNT(*) AS n FROM events WHERE business_id = ? AND type = 'scan'").get(id) as { n: number };
    const fbRow = raw.prepare("SELECT COUNT(*) AS n FROM feedback WHERE location_id IN (SELECT id FROM locations WHERE business_id = ?)").get(id) as { n: number };
    return {
      id,
      slug: String(biz.slug),
      name: String(biz.name),
      email: String(biz.email),
      phone: String(biz.phone),
      industry: String(biz.industry),
      plan: biz.plan as PlanId,
      pin: String(biz.pin),
      theme: biz.theme as Business["theme"],
      displayMode: biz.display_mode as Business["displayMode"],
      minStars: Number(biz.min_stars),
      logoUrl: biz.logo_url == null ? null : String(biz.logo_url),
      status: biz.status as Business["status"],
      createdAt: String(biz.created_at),
      locations,
      reviews,
      social,
      events,
      qrScans: Number(scanRow.n),
      feedbackCount: Number(fbRow.n),
    };
  }

  const api: Db = {
    raw,
    searchPlaces(q) {
      const query = q.trim().toLowerCase();
      if (query.length < 2) return [];
      return raw
        .prepare("SELECT * FROM places WHERE lower(name) LIKE ? OR lower(address) LIKE ? LIMIT 12")
        .all(`%${query}%`, `%${query}%`)
        .map((r) => {
          const row = r as Record<string, unknown>;
          return {
            placeId: String(row.place_id),
            name: String(row.name),
            address: String(row.address),
            rating: Number(row.rating),
            reviewCount: Number(row.review_count),
            industry: String(row.industry),
          };
        });
    },
    createBusiness(input) {
      const slug = uniqueSlug(raw, input.name);
      const now = new Date().toISOString();
      const email = `hello@${slug.replace(/-/g, "")}.com`;
      const insert = raw.prepare(`
        INSERT INTO businesses (slug, name, email, phone, industry, plan, pin, theme, display_mode, min_stars, logo_url, status, created_at)
        VALUES (?, ?, ?, '', ?, 'free', '1234', ?, ?, ?, ?, 'active', ?)
      `);
      insert.run(
        slug,
        input.name,
        email,
        input.industry || "Local",
        input.theme,
        input.displayMode,
        input.minStars,
        input.logoUrl ?? null,
        now,
      );
      const bizId = Number((raw.prepare("SELECT last_insert_rowid() AS id").get() as { id: number }).id);
      raw.prepare(`
        INSERT INTO locations (business_id, name, address, place_id, rating, review_count, is_primary)
        VALUES (?, ?, ?, ?, ?, ?, 1)
      `).run(bizId, input.name, input.address, input.placeId, input.rating, input.reviewCount);

      const locId = Number((raw.prepare("SELECT last_insert_rowid() AS id").get() as { id: number }).id);
      seedDefaultReviews(raw, locId, input.name);

      for (const platform of ["instagram", "facebook", "tiktok"] as SocialPlatform[]) {
        const s = input.social?.[platform];
        raw.prepare(`
          INSERT INTO social_accounts (business_id, platform, handle, connected, follower_count)
          VALUES (?, ?, ?, ?, ?)
        `).run(bizId, platform, s?.handle ?? "", s?.connected ? 1 : 0, s?.connected ? 800 + Math.floor(Math.random() * 4000) : 0);
      }

      raw.prepare("INSERT INTO events (business_id, location_id, type, label, platform, created_at) VALUES (?, ?, 'scan', 'Display launched', NULL, ?)").run(bizId, locId, now);
      return loadBusiness(slug)!;
    },
    getBusiness: loadBusiness,
    listBusinesses() {
      const slugs = raw.prepare("SELECT slug FROM businesses ORDER BY id").all() as { slug: string }[];
      return slugs.map((s) => loadBusiness(s.slug)!);
    },
    patchBusiness(slug, patch) {
      const current = loadBusiness(slug);
      if (!current) return null;
      if (patch.plan) raw.prepare("UPDATE businesses SET plan = ? WHERE slug = ?").run(patch.plan, slug);
      if (patch.pin) raw.prepare("UPDATE businesses SET pin = ? WHERE slug = ?").run(patch.pin, slug);
      if (patch.theme) raw.prepare("UPDATE businesses SET theme = ? WHERE slug = ?").run(patch.theme, slug);
      if (patch.displayMode) raw.prepare("UPDATE businesses SET display_mode = ? WHERE slug = ?").run(patch.displayMode, slug);
      if (patch.minStars !== undefined) raw.prepare("UPDATE businesses SET min_stars = ? WHERE slug = ?").run(patch.minStars, slug);
      if (patch.logoUrl !== undefined) raw.prepare("UPDATE businesses SET logo_url = ? WHERE slug = ?").run(patch.logoUrl, slug);
      if (patch.social) {
        for (const [platform, value] of Object.entries(patch.social)) {
          if (!value) continue;
          raw.prepare("UPDATE social_accounts SET connected = ?, handle = COALESCE(NULLIF(?, ''), handle) WHERE business_id = ? AND platform = ?")
            .run(value.connected ? 1 : 0, value.handle ?? "", current.id, platform);
        }
      }
      return loadBusiness(slug);
    },
    addLocation(slug, loc) {
      const biz = loadBusiness(slug);
      if (!biz) return null;
      raw.prepare(`
        INSERT INTO locations (business_id, name, address, place_id, rating, review_count, is_primary)
        VALUES (?, ?, ?, ?, ?, ?, 0)
      `).run(biz.id, loc.name, loc.address, loc.placeId, loc.rating, loc.reviewCount);
      const row = raw.prepare("SELECT * FROM locations WHERE id = last_insert_rowid()").get() as Record<string, unknown>;
      return mapLocation(row);
    },
    listReviews(slug, locationId) {
      const biz = loadBusiness(slug);
      if (!biz) return [];
      if (locationId) return biz.reviews.filter((r) => r.locationId === locationId);
      return biz.reviews;
    },
    replyToReview(reviewId, replyText) {
      raw.prepare("UPDATE reviews SET replied = 1, reply_text = ? WHERE id = ?").run(replyText, reviewId);
      const row = raw.prepare("SELECT * FROM reviews WHERE id = ?").get(reviewId) as Record<string, unknown> | undefined;
      return row ? mapReview(row) : null;
    },
    generateReply(reviewId) {
      const row = raw.prepare(`
        SELECT r.*, b.name AS business_name
        FROM reviews r
        JOIN locations l ON l.id = r.location_id
        JOIN businesses b ON b.id = l.business_id
        WHERE r.id = ?
      `).get(reviewId) as Record<string, unknown> | undefined;
      if (!row) return null;
      const draft = draftReviewReply({
        author: String(row.author),
        rating: Number(row.rating),
        text: String(row.text),
        businessName: String(row.business_name),
      });
      raw.prepare("UPDATE reviews SET ai_draft = ? WHERE id = ?").run(draft, reviewId);
      return mapReview(raw.prepare("SELECT * FROM reviews WHERE id = ?").get(reviewId) as Record<string, unknown>);
    },
    addReview(slug, review) {
      const biz = loadBusiness(slug);
      if (!biz || !biz.locations[0]) return null;
      const loc = biz.locations[0];
      const avatar = review.author.trim().charAt(0).toUpperCase() || "G";
      const now = new Date().toISOString();
      const draft = draftReviewReply({ ...review, businessName: biz.name });
      raw.prepare(`
        INSERT INTO reviews (location_id, author, rating, text, avatar, created_at, replied, reply_text, ai_draft)
        VALUES (?, ?, ?, ?, ?, ?, 0, '', ?)
      `).run(loc.id, review.author, review.rating, review.text, avatar, now, draft);
      const reviewId = Number((raw.prepare("SELECT last_insert_rowid() AS id").get() as { id: number }).id);
      raw.prepare("UPDATE locations SET review_count = review_count + 1 WHERE id = ?").run(loc.id);
      raw.prepare("INSERT INTO events (business_id, location_id, type, label, platform, created_at) VALUES (?, ?, 'review', 'Google Reviews', NULL, ?)").run(biz.id, loc.id, now);
      return mapReview(raw.prepare("SELECT * FROM reviews WHERE id = ?").get(reviewId) as Record<string, unknown>);
    },
    addFeedback(slug, rating, text) {
      const biz = loadBusiness(slug);
      if (!biz || !biz.locations[0]) return;
      const now = new Date().toISOString();
      raw.prepare("INSERT INTO feedback (location_id, rating, text, created_at) VALUES (?, ?, ?, ?)").run(biz.locations[0].id, rating, text, now);
      raw.prepare("INSERT INTO events (business_id, location_id, type, label, platform, created_at) VALUES (?, ?, 'feedback', 'Private feedback', NULL, ?)").run(biz.id, biz.locations[0].id, now);
    },
    recordScan(slug) {
      const biz = loadBusiness(slug);
      if (!biz) return;
      raw.prepare("INSERT INTO events (business_id, location_id, type, label, platform, created_at) VALUES (?, ?, 'scan', 'QR scan', NULL, ?)")
        .run(biz.id, biz.locations[0]?.id ?? null, new Date().toISOString());
    },
    listEvents(slug) {
      return loadBusiness(slug)?.events ?? [];
    },
    addEvent(slug, event) {
      const biz = loadBusiness(slug);
      if (!biz) return null;
      raw.prepare("INSERT INTO events (business_id, location_id, type, label, platform, created_at) VALUES (?, ?, ?, ?, ?, ?)")
        .run(biz.id, biz.locations[0]?.id ?? null, event.type, event.label, event.platform ?? null, new Date().toISOString());
      return mapEvent(raw.prepare("SELECT * FROM events WHERE id = last_insert_rowid()").get() as Record<string, unknown>);
    },
    verifyPin(slug, pin) {
      const row = raw.prepare("SELECT pin FROM businesses WHERE slug = ?").get(slug) as { pin: string } | undefined;
      return Boolean(row && row.pin === pin);
    },
    listAds() {
      return raw.prepare("SELECT * FROM ads WHERE active = 1").all().map((r) => {
        const row = r as Record<string, unknown>;
        return {
          id: Number(row.id),
          headline: String(row.headline),
          body: String(row.body),
          cta: String(row.cta),
          color: String(row.color),
          icon: String(row.icon),
          active: true,
        };
      });
    },
    saasOverview() {
      const customers = api.saasCustomers();
      const active = customers.filter((c) => c.status === "active");
      const mrr = active.reduce((s, c) => s + c.mrr, 0);
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const newThisMonth = customers.filter((c) => c.joined >= monthStart).length;
      const churned = customers.filter((c) => c.status === "churned").length;
      return {
        mrr,
        totalCustomers: customers.length,
        activeDisplays: active.reduce((s, c) => s + c.displays, 0),
        avgRevenuePerAccount: active.length ? Math.round(mrr / active.length) : 0,
        churnRate: customers.length ? Math.round((churned / customers.length) * 1000) / 10 : 0,
        newCustomersThisMonth: newThisMonth,
        totalReviews: active.reduce((s, c) => s + c.reviews, 0),
        totalScans: active.reduce((s, c) => s + c.qrScans, 0),
      };
    },
    saasCustomers() {
      const slugs = raw.prepare("SELECT slug FROM businesses ORDER BY created_at DESC").all() as { slug: string }[];
      return slugs.map((s) => {
        const b = loadBusiness(s.slug)!;
        const primary = b.locations[0];
        return {
          id: b.id,
          slug: b.slug,
          name: b.name,
          email: b.email,
          plan: b.plan,
          mrr: planMrr(b.plan, b.locations.length),
          locations: b.locations.length,
          displays: b.locations.length,
          reviews: primary?.reviewCount ?? b.reviews.length,
          rating: primary?.rating ?? 0,
          joined: b.createdAt,
          status: b.status,
          phone: b.phone,
          qrScans: b.qrScans,
          industry: b.industry,
        };
      });
    },
    saasActivity() {
      return raw.prepare("SELECT * FROM events ORDER BY id DESC LIMIT 50").all().map((r) => mapEvent(r as Record<string, unknown>));
    },
    competitorsFor(industry) {
      return raw.prepare("SELECT * FROM competitors WHERE industry = ? OR industry = 'Local' LIMIT 6").all(industry).map((r) => {
        const row = r as Record<string, unknown>;
        return {
          name: String(row.name),
          rating: Number(row.rating),
          reviews: Number(row.reviews),
          reviewsPerMonth: Number(row.reviews_per_month),
          trend: Number(row.trend),
          distance: String(row.distance),
        };
      });
    },
  };

  return api;
}

function migrate(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS businesses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      industry TEXT NOT NULL DEFAULT 'Local',
      plan TEXT NOT NULL DEFAULT 'free',
      pin TEXT NOT NULL DEFAULT '1234',
      theme TEXT NOT NULL DEFAULT 'light',
      display_mode TEXT NOT NULL DEFAULT 'ipad',
      min_stars INTEGER NOT NULL DEFAULT 0,
      logo_url TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      place_id TEXT NOT NULL,
      rating REAL NOT NULL,
      review_count INTEGER NOT NULL,
      is_primary INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
      author TEXT NOT NULL,
      rating INTEGER NOT NULL,
      text TEXT NOT NULL,
      avatar TEXT NOT NULL,
      created_at TEXT NOT NULL,
      replied INTEGER NOT NULL DEFAULT 0,
      reply_text TEXT NOT NULL DEFAULT '',
      ai_draft TEXT NOT NULL DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS social_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
      platform TEXT NOT NULL,
      handle TEXT NOT NULL DEFAULT '',
      connected INTEGER NOT NULL DEFAULT 0,
      follower_count INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
      location_id INTEGER,
      type TEXT NOT NULL,
      label TEXT NOT NULL,
      platform TEXT,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
      rating INTEGER NOT NULL,
      text TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS ads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      headline TEXT NOT NULL,
      body TEXT NOT NULL,
      cta TEXT NOT NULL,
      color TEXT NOT NULL,
      icon TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS places (
      place_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      rating REAL NOT NULL,
      review_count INTEGER NOT NULL,
      industry TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS competitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      industry TEXT NOT NULL,
      name TEXT NOT NULL,
      rating REAL NOT NULL,
      reviews INTEGER NOT NULL,
      reviews_per_month INTEGER NOT NULL,
      trend REAL NOT NULL,
      distance TEXT NOT NULL
    );
  `);
}

function seedDefaultReviews(db: DatabaseSync, locationId: number, businessName: string) {
  const samples = [
    ["Sarah Mitchell", 5, "Absolutely wonderful experience! The staff was incredibly friendly and professional. Highly recommend to anyone looking for quality care."],
    ["James Kim", 5, "Best experience I've had. Clean facility, short wait time, and the doctor was very thorough explaining everything."],
    ["Maria Lopez", 5, "So glad I found this place! The team went above and beyond. Will definitely be coming back and telling all my friends."],
    ["David Roberts", 5, "Five stars isn't enough. From the moment I walked in, I felt welcomed. The care I received was truly exceptional."],
    ["Lisa Torres", 4, "Great service and very knowledgeable staff. The office is modern and well-maintained. Would definitely recommend!"],
    ["Robert Park", 5, "Outstanding! I was seen quickly and the entire process was smooth from start to finish."],
    ["Michael Torres", 3, "Decent experience overall but the wait was longer than expected. Staff was friendly though."],
    ["Emily Davis", 2, "Had some issues with billing. The actual service was fine but the admin side needs work."],
  ] as const;

  const now = Date.now();
  for (const [i, [author, rating, text]] of samples.entries()) {
    const created = new Date(now - (i + 1) * 86400000 * (i < 4 ? 1 : 2)).toISOString();
    const draft = draftReviewReply({ author, rating, text, businessName });
    const replied = i >= 5 ? 1 : 0;
    const reply = replied ? `Thank you ${author.split(" ")[0]}! We appreciate you choosing ${businessName}.` : "";
    db.prepare(`
      INSERT INTO reviews (location_id, author, rating, text, avatar, created_at, replied, reply_text, ai_draft)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(locationId, author, rating, text, author[0], created, replied, reply, draft);
  }
}

export function seedIfEmpty(db: Db) {
  const count = db.raw.prepare("SELECT COUNT(*) AS n FROM places").get() as { n: number };
  if (count.n > 0) return;

  const places: PlaceRow[] = [
    { placeId: "ChIJ_demo1", name: "Element Longevity", address: "123 Main St, Traverse City, MI 49684", rating: 4.8, reviewCount: 187, industry: "Wellness" },
    { placeId: "ChIJ_demo2", name: "Elev8 Climbing and Fitness", address: "777 Boyd Ave, Traverse City, MI 49686", rating: 4.9, reviewCount: 50, industry: "Fitness" },
    { placeId: "ChIJ_demo3", name: "The Filling Station Microbrewery", address: "642 Railroad Pl, Traverse City, MI 49686", rating: 4.5, reviewCount: 438, industry: "Restaurant" },
    { placeId: "ChIJ_demo4", name: "Bright Smile Family Dental", address: "2211 N US-31, Traverse City, MI 49686", rating: 4.7, reviewCount: 156, industry: "Dental" },
    { placeId: "ChIJ_demo5", name: "Rare Bird Brewpub", address: "229 Lake Ave, Traverse City, MI 49684", rating: 4.6, reviewCount: 312, industry: "Restaurant" },
    { placeId: "ChIJ_demo6", name: "Zen Nail Spa", address: "3575 Market Pl Dr, Traverse City, MI 49684", rating: 4.4, reviewCount: 89, industry: "Salon" },
    { placeId: "ChIJ_demo7", name: "Grand Traverse Pie Company", address: "525 W Front St, Traverse City, MI 49684", rating: 4.5, reviewCount: 527, industry: "Restaurant" },
    { placeId: "ChIJ_demo8", name: "Traverse City CrossFit", address: "1125 Hastings St, Traverse City, MI 49686", rating: 4.8, reviewCount: 34, industry: "Fitness" },
  ];
  const insPlace = db.raw.prepare("INSERT INTO places (place_id, name, address, rating, review_count, industry) VALUES (?, ?, ?, ?, ?, ?)");
  for (const p of places) insPlace.run(p.placeId, p.name, p.address, p.rating, p.reviewCount, p.industry);

  const ads = [
    ["SmileBright Invisalign", "Straighter teeth in 6 months. Free consultation for new patients.", "Book Now", "#0891b2", "🦷"],
    ["QuickBooks for Small Biz", "Manage invoices, payroll & taxes in one place. 50% off 3 months.", "Try Free", "#2563eb", "📊"],
    ["State Farm — Jake Torres", "Your local agent. Auto + business insurance bundled & saved.", "Get Quote", "#e11d48", "🎯"],
    ["DoorDash for Business", "Free lunch delivery for your team. $0 delivery on first 3 orders.", "Order Now", "#FF3008", "🍜"],
    ["Square Appointments", "Free booking & scheduling. Reduce no-shows by 30%.", "Start Free", "#006AFF", "📅"],
    ["Yelp Ads for Local Biz", "Get found by 178M monthly visitors. Targeted local advertising.", "Learn More", "#d32323", "⭐"],
  ];
  const insAd = db.raw.prepare("INSERT INTO ads (headline, body, cta, color, icon, active) VALUES (?, ?, ?, ?, ?, 1)");
  for (const a of ads) insAd.run(...a);

  const competitors = [
    ["Wellness", "Lakeshore Wellness", 4.5, 142, 8, -0.1, "0.8 mi"],
    ["Wellness", "Bay Area Family Care", 4.3, 98, 5, 0, "1.2 mi"],
    ["Wellness", "Grand Traverse Wellness", 4.6, 215, 12, 0.1, "2.1 mi"],
    ["Dental", "Lakeshore Dental", 4.5, 142, 8, -0.1, "0.8 mi"],
    ["Dental", "Bay Area Family Care", 4.3, 98, 5, 0, "1.2 mi"],
    ["Fitness", "Peak Performance Gym", 4.4, 88, 6, 0.1, "1.1 mi"],
    ["Restaurant", "The Cooks' House", 4.7, 310, 14, 0.2, "0.4 mi"],
    ["Local", "Downtown Neighbors Co.", 4.2, 76, 4, 0, "0.6 mi"],
  ] as const;
  const insComp = db.raw.prepare("INSERT INTO competitors (industry, name, rating, reviews, reviews_per_month, trend, distance) VALUES (?, ?, ?, ?, ?, ?, ?)");
  for (const c of competitors) insComp.run(...c);

  const seeded = [
    { name: "Aspen Dental Group", plan: "enterprise" as PlanId, industry: "Dental", rating: 4.7, reviews: 180, phone: "(231) 555-0100", createdAt: "2025-06-10T12:00:00.000Z" },
    { name: "VitalCare Medical Network", plan: "enterprise" as PlanId, industry: "Healthcare", rating: 4.8, reviews: 210, phone: "(312) 555-0200", createdAt: "2025-07-01T12:00:00.000Z" },
    { name: "Element Longevity", plan: "hardware" as PlanId, industry: "Wellness", rating: 4.8, reviews: 187, phone: "(231) 555-0600", createdAt: "2025-10-15T12:00:00.000Z" },
    { name: "Elev8 Climbing and Fitness", plan: "pro" as PlanId, industry: "Fitness", rating: 4.9, reviews: 50, phone: "(231) 600-7260", createdAt: "2026-01-20T12:00:00.000Z" },
    { name: "Rare Bird Brewpub", plan: "plus" as PlanId, industry: "Restaurant", rating: 4.6, reviews: 120, phone: "(231) 252-2292", createdAt: "2026-02-05T12:00:00.000Z" },
    { name: "Bright Smile Family Dental", plan: "pro" as PlanId, industry: "Dental", rating: 4.7, reviews: 156, phone: "(617) 555-1100", createdAt: "2025-11-20T12:00:00.000Z" },
  ];

  for (const s of seeded) {
    const place = places.find((p) => p.name === s.name) ?? places[0];
    const created = db.createBusiness({
      name: s.name,
      placeId: place.placeId,
      address: place.address,
      rating: s.rating,
      reviewCount: s.reviews,
      industry: s.industry,
      displayMode: s.plan === "pro" || s.plan === "hardware" || s.plan === "enterprise" ? "tv" : "ipad",
      minStars: 0,
      theme: "light",
      social: s.plan === "pro" || s.plan === "hardware" || s.plan === "enterprise"
        ? { instagram: { connected: true, handle: `@${s.name.split(" ")[0].toLowerCase()}` } }
        : undefined,
    });
    db.raw.prepare("UPDATE businesses SET plan = ?, phone = ?, created_at = ? WHERE slug = ?").run(s.plan, s.phone, s.createdAt, created.slug);
    for (let i = 0; i < 8; i++) {
      db.raw.prepare("INSERT INTO events (business_id, location_id, type, label, platform, created_at) VALUES (?, ?, 'scan', 'QR scan', NULL, ?)")
        .run(created.id, created.locations[0].id, new Date(Date.now() - i * 3600000).toISOString());
    }
  }
}
