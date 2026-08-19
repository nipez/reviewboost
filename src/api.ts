import type {
  Ad,
  Business,
  Competitor,
  CreateBusinessInput,
  Place,
  PlanId,
  Review,
  SaasCustomer,
  SaasOverview,
  TimelineEvent,
} from "./types";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  health: () => request<{ ok: boolean }>("/api/health"),
  searchPlaces: (q: string) => request<Place[]>(`/api/places?q=${encodeURIComponent(q)}`),
  ads: () => request<Ad[]>("/api/ads"),
  createBusiness: (input: CreateBusinessInput) =>
    request<Business>("/api/businesses", { method: "POST", body: JSON.stringify(input) }),
  getBusiness: (slug: string) => request<Business>(`/api/businesses/${slug}`),
  patchBusiness: (slug: string, patch: Record<string, unknown>) =>
    request<Business>(`/api/businesses/${slug}`, { method: "PATCH", body: JSON.stringify(patch) }),
  upgrade: (slug: string, plan: PlanId) =>
    request<Business>(`/api/businesses/${slug}/upgrade`, { method: "POST", body: JSON.stringify({ plan }) }),
  verifyPin: (slug: string, pin: string) =>
    request<{ ok: boolean }>(`/api/businesses/${slug}/pin/verify`, { method: "POST", body: JSON.stringify({ pin }) }),
  addReview: (slug: string, review: { author: string; rating: number; text: string }) =>
    request<Review>(`/api/businesses/${slug}/reviews`, { method: "POST", body: JSON.stringify(review) }),
  replyToReview: (id: number, replyText: string) =>
    request<Review>(`/api/reviews/${id}/reply`, { method: "POST", body: JSON.stringify({ replyText }) }),
  generateReply: (id: number) =>
    request<Review>(`/api/reviews/${id}/generate-reply`, { method: "POST" }),
  addLocation: (slug: string, loc: { name: string; address: string; placeId?: string; rating?: number; reviewCount?: number }) =>
    request(`/api/businesses/${slug}/locations`, { method: "POST", body: JSON.stringify(loc) }),
  recordScan: (slug: string) =>
    request<{ ok: boolean; placeId: string; name: string; plan: PlanId }>(`/api/r/${slug}/scan`, { method: "POST" }),
  sendFeedback: (slug: string, rating: number, text: string) =>
    request(`/api/r/${slug}/feedback`, { method: "POST", body: JSON.stringify({ rating, text }) }),
  competitors: (slug: string) => request<Competitor[]>(`/api/businesses/${slug}/competitors`),
  saasOverview: () => request<SaasOverview>("/api/saas/overview"),
  saasCustomers: () => request<SaasCustomer[]>("/api/saas/customers"),
  saasActivity: () => request<TimelineEvent[]>("/api/saas/activity"),
};
