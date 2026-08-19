import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openDb, seedIfEmpty } from "./db.ts";
import type { CreateBusinessInput, PlanId } from "../src/types.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultDbPath = process.env.REVIEWBOOST_DB ?? path.join(__dirname, "..", "data", "reviewboost.db");

export function createApp(dbPath = defaultDbPath) {
  const db = openDb(dbPath);
  seedIfEmpty(db);

  const app = express();
  app.use(cors());
  app.use(express.json({ limit: "2mb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "reviewboost", time: new Date().toISOString() });
  });

  app.get("/api/places", (req, res) => {
    res.json(db.searchPlaces(String(req.query.q ?? "")));
  });

  app.get("/api/ads", (_req, res) => {
    res.json(db.listAds());
  });

  app.post("/api/businesses", (req, res) => {
    const body = req.body as CreateBusinessInput;
    if (!body?.name || !body.placeId) {
      res.status(400).json({ error: "name and placeId are required" });
      return;
    }
    const business = db.createBusiness({
      name: body.name,
      placeId: body.placeId,
      address: body.address ?? "",
      rating: Number(body.rating ?? 5),
      reviewCount: Number(body.reviewCount ?? 0),
      industry: body.industry,
      displayMode: body.displayMode === "tv" ? "tv" : "ipad",
      minStars: Number(body.minStars ?? 0),
      theme: body.theme === "dark" ? "dark" : "light",
      logoUrl: body.logoUrl ?? null,
      social: body.social,
    });
    res.status(201).json(publicBusiness(business));
  });

  app.get("/api/businesses/:slug", (req, res) => {
    const business = db.getBusiness(req.params.slug);
    if (!business) {
      res.status(404).json({ error: "Business not found" });
      return;
    }
    res.json(publicBusiness(business));
  });

  app.patch("/api/businesses/:slug", (req, res) => {
    const business = db.patchBusiness(req.params.slug, req.body ?? {});
    if (!business) {
      res.status(404).json({ error: "Business not found" });
      return;
    }
    res.json(publicBusiness(business));
  });

  app.post("/api/businesses/:slug/locations", (req, res) => {
    const loc = db.addLocation(req.params.slug, {
      name: req.body.name,
      address: req.body.address ?? "",
      placeId: req.body.placeId ?? `manual-${Date.now()}`,
      rating: Number(req.body.rating ?? 5),
      reviewCount: Number(req.body.reviewCount ?? 0),
    });
    if (!loc) {
      res.status(404).json({ error: "Business not found" });
      return;
    }
    res.status(201).json(loc);
  });

  app.post("/api/businesses/:slug/upgrade", (req, res) => {
    const plan = String(req.body.plan ?? "pro") as PlanId;
    const allowed: PlanId[] = ["free", "plus", "pro", "hardware", "enterprise"];
    if (!allowed.includes(plan)) {
      res.status(400).json({ error: "Invalid plan" });
      return;
    }
    const business = db.patchBusiness(req.params.slug, { plan });
    if (!business) {
      res.status(404).json({ error: "Business not found" });
      return;
    }
    res.json(publicBusiness(business));
  });

  app.post("/api/businesses/:slug/pin/verify", (req, res) => {
    const ok = db.verifyPin(req.params.slug, String(req.body.pin ?? ""));
    res.json({ ok });
  });

  app.get("/api/businesses/:slug/reviews", (req, res) => {
    res.json(db.listReviews(req.params.slug));
  });

  app.post("/api/businesses/:slug/reviews", (req, res) => {
    const review = db.addReview(req.params.slug, {
      author: String(req.body.author ?? "Guest"),
      rating: Number(req.body.rating ?? 5),
      text: String(req.body.text ?? ""),
    });
    if (!review) {
      res.status(404).json({ error: "Business not found" });
      return;
    }
    res.status(201).json(review);
  });

  app.post("/api/reviews/:id/reply", (req, res) => {
    const review = db.replyToReview(Number(req.params.id), String(req.body.replyText ?? ""));
    if (!review) {
      res.status(404).json({ error: "Review not found" });
      return;
    }
    res.json(review);
  });

  app.post("/api/reviews/:id/generate-reply", (req, res) => {
    const review = db.generateReply(Number(req.params.id));
    if (!review) {
      res.status(404).json({ error: "Review not found" });
      return;
    }
    res.json(review);
  });

  app.get("/api/businesses/:slug/events", (req, res) => {
    res.json(db.listEvents(req.params.slug));
  });

  app.post("/api/businesses/:slug/events", (req, res) => {
    const event = db.addEvent(req.params.slug, {
      type: req.body.type ?? "review",
      label: req.body.label ?? "Event",
      platform: req.body.platform,
    });
    if (!event) {
      res.status(404).json({ error: "Business not found" });
      return;
    }
    res.status(201).json(event);
  });

  app.post("/api/r/:slug/scan", (req, res) => {
    db.recordScan(req.params.slug);
    const business = db.getBusiness(req.params.slug);
    if (!business) {
      res.status(404).json({ error: "Business not found" });
      return;
    }
    res.json({ ok: true, placeId: business.locations[0]?.placeId, name: business.name, plan: business.plan });
  });

  app.post("/api/r/:slug/feedback", (req, res) => {
    db.recordScan(req.params.slug);
    db.addFeedback(req.params.slug, Number(req.body.rating ?? 3), String(req.body.text ?? ""));
    res.status(201).json({ ok: true });
  });

  app.get("/api/businesses/:slug/competitors", (req, res) => {
    const business = db.getBusiness(req.params.slug);
    if (!business) {
      res.status(404).json({ error: "Business not found" });
      return;
    }
    res.json(db.competitorsFor(business.industry));
  });

  app.get("/api/saas/overview", (_req, res) => {
    res.json(db.saasOverview());
  });

  app.get("/api/saas/customers", (_req, res) => {
    res.json(db.saasCustomers());
  });

  app.get("/api/saas/ads", (_req, res) => {
    res.json(db.listAds());
  });

  app.get("/api/saas/activity", (_req, res) => {
    res.json(db.saasActivity());
  });

  return { app, db };
}

function publicBusiness(business: ReturnType<ReturnType<typeof openDb>["getBusiness"]>) {
  if (!business) return business;
  return { ...business, pin: undefined, hasPin: Boolean(business.pin) };
}

if (!process.env.VITEST) {
  const port = Number(process.env.PORT ?? 3001);
  const { app } = createApp();
  app.listen(port, "0.0.0.0", () => {
    console.log(`ReviewBoost API listening on http://localhost:${port}`);
  });
}
