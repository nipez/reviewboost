import type { Business, Review, TimelineEvent } from "../types";
import type { DisplayEvent, DisplayReview, WizardConfig } from "../legacy/OriginalUI";
import { timeAgo } from "./format";

export function reviewToDisplay(review: Review): DisplayReview {
  return {
    id: review.id,
    name: review.author,
    rating: review.rating,
    time: timeAgo(review.createdAt),
    text: review.text,
    avatar: review.avatar || review.author.charAt(0).toUpperCase(),
  };
}

export function eventToDisplay(event: TimelineEvent): DisplayEvent {
  return {
    id: event.id,
    type: event.type,
    label: event.label,
    time: timeAgo(event.createdAt),
  };
}

export function businessToConfig(business: Business): WizardConfig {
  const loc = business.locations[0];
  const socialConnected: Record<string, boolean> = {};
  const socialHandles: Record<string, string> = {};
  for (const account of business.social) {
    socialConnected[account.platform] = account.connected;
    socialHandles[account.platform] = account.handle;
  }
  return {
    slug: business.slug,
    plan: business.plan,
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
    reviews: business.reviews.map(reviewToDisplay),
    locations: business.locations.map((location) => ({
      name: location.name,
      address: location.address,
      placeId: location.placeId,
      rating: location.rating,
      reviewCount: location.reviewCount,
    })),
    events: business.events.map(eventToDisplay),
    qrScans: business.qrScans,
  };
}
