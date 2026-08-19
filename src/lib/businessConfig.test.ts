import { describe, expect, it } from "vitest";
import { businessToConfig } from "./businessConfig";
import type { Business } from "../types";

describe("businessToConfig", () => {
  it("maps an API business onto the original display config", () => {
    const config = businessToConfig({
      id: 1,
      slug: "element-longevity",
      name: "Element Longevity",
      email: "hello@element.com",
      phone: "",
      industry: "Wellness",
      plan: "pro",
      pin: "1234",
      theme: "dark",
      displayMode: "tv",
      minStars: 4,
      logoUrl: null,
      status: "active",
      createdAt: "2026-01-01T00:00:00.000Z",
      locations: [
        {
          id: 1,
          businessId: 1,
          name: "Element Longevity",
          address: "123 Main St",
          placeId: "ChIJ_demo1",
          rating: 4.8,
          reviewCount: 187,
          isPrimary: true,
        },
      ],
      reviews: [],
      social: [{ platform: "instagram", handle: "@element", connected: true, followerCount: 10 }],
      events: [],
      qrScans: 3,
      feedbackCount: 0,
    } as Business);
    expect(config.businessName).toBe("Element Longevity");
    expect(config.displayMode).toBe("tv");
    expect(config.socialConnected.instagram).toBe(true);
  });
});
