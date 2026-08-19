import type { PlanId } from "../types";

export const PLAN_ORDER: PlanId[] = ["free", "plus", "pro", "hardware", "enterprise"];

export const PLAN_PRICES: Record<PlanId, number> = {
  free: 0,
  plus: 9,
  pro: 29,
  hardware: 49,
  enterprise: 250,
};

export const PLAN_LABELS: Record<PlanId, string> = {
  free: "Free",
  plus: "Plus",
  pro: "Pro",
  hardware: "Pro + Hardware",
  enterprise: "Enterprise",
};

export function isPlus(plan: PlanId): boolean {
  return PLAN_ORDER.indexOf(plan) >= PLAN_ORDER.indexOf("plus");
}

export function isPro(plan: PlanId): boolean {
  return PLAN_ORDER.indexOf(plan) >= PLAN_ORDER.indexOf("pro");
}

export function planMrr(plan: PlanId, locations = 1): number {
  if (plan === "enterprise") return PLAN_PRICES.enterprise * Math.max(locations, 1);
  if (plan === "hardware") return PLAN_PRICES.hardware * Math.max(locations, 1);
  return PLAN_PRICES[plan];
}
