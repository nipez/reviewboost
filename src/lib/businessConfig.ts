import type { Business } from "../types";
import type { WizardConfig } from "../legacy/OriginalUI";

export function businessToConfig(business: Business): WizardConfig {
  const loc = business.locations[0];
  const socialConnected: Record<string, boolean> = {};
  const socialHandles: Record<string, string> = {};
  for (const account of business.social) {
    socialConnected[account.platform] = account.connected;
    socialHandles[account.platform] = account.handle;
  }
  return {
    businessName: business.name,
    placeId: loc?.placeId || "",
    address: loc?.address || "",
    rating: loc?.rating || 0,
    reviewCount: loc?.reviewCount || business.reviews.length,
    displayMode: business.displayMode,
    minStars: business.minStars,
    theme: business.theme,
    socialConnected,
    socialHandles,
    logoUrl: business.logoUrl,
  };
}
