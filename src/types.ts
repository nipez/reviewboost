export type PlanId = "free" | "plus" | "pro" | "hardware" | "enterprise";
export type DisplayMode = "ipad" | "tv";
export type ThemeId = "light" | "dark";
export type SocialPlatform = "instagram" | "facebook" | "tiktok";

export interface Place {
  placeId: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  industry: string;
}

export interface Location {
  id: number;
  businessId: number;
  name: string;
  address: string;
  placeId: string;
  rating: number;
  reviewCount: number;
  isPrimary: boolean;
}

export interface Review {
  id: number;
  locationId: number;
  author: string;
  rating: number;
  text: string;
  avatar: string;
  createdAt: string;
  replied: boolean;
  replyText: string;
  aiDraft: string;
}

export interface SocialAccount {
  platform: SocialPlatform;
  handle: string;
  connected: boolean;
  followerCount: number;
}

export interface TimelineEvent {
  id: number;
  businessId: number;
  locationId: number | null;
  type: "review" | "social" | "scan" | "feedback";
  label: string;
  platform: string | null;
  createdAt: string;
}

export interface Ad {
  id: number;
  headline: string;
  body: string;
  cta: string;
  color: string;
  icon: string;
  active: boolean;
}

export interface Business {
  id: number;
  slug: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  plan: PlanId;
  pin: string;
  theme: ThemeId;
  displayMode: DisplayMode;
  minStars: number;
  logoUrl: string | null;
  status: "active" | "paused" | "churned";
  createdAt: string;
  locations: Location[];
  reviews: Review[];
  social: SocialAccount[];
  events: TimelineEvent[];
  qrScans: number;
  feedbackCount: number;
}

export interface Competitor {
  name: string;
  rating: number;
  reviews: number;
  reviewsPerMonth: number;
  trend: number;
  distance: string;
}

export interface SaasCustomer {
  id: number;
  slug: string;
  name: string;
  email: string;
  plan: PlanId;
  mrr: number;
  locations: number;
  displays: number;
  reviews: number;
  rating: number;
  joined: string;
  status: string;
  phone: string;
  qrScans: number;
  industry: string;
}

export interface SaasOverview {
  mrr: number;
  totalCustomers: number;
  activeDisplays: number;
  avgRevenuePerAccount: number;
  churnRate: number;
  newCustomersThisMonth: number;
  totalReviews: number;
  totalScans: number;
}

export interface CreateBusinessInput {
  name: string;
  placeId: string;
  address: string;
  rating: number;
  reviewCount: number;
  industry?: string;
  displayMode: DisplayMode;
  minStars: number;
  theme: ThemeId;
  logoUrl?: string | null;
  social?: Partial<Record<SocialPlatform, { connected: boolean; handle?: string }>>;
}
