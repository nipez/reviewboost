import { describe, expect, it } from "vitest";
import { draftReviewReply } from "./ai.ts";

describe("draftReviewReply", () => {
  it("thanks 5-star reviewers by first name", () => {
    const draft = draftReviewReply({
      author: "Sarah Mitchell",
      rating: 5,
      text: "Amazing staff",
      businessName: "Element Longevity",
    });
    expect(draft).toContain("Sarah");
    expect(draft).toContain("Element Longevity");
  });

  it("apologizes for low ratings and mentions billing when relevant", () => {
    const draft = draftReviewReply({
      author: "Emily Davis",
      rating: 2,
      text: "Had some issues with billing.",
      businessName: "Bright Smile Family Dental",
    });
    expect(draft.toLowerCase()).toContain("apolog");
    expect(draft.toLowerCase()).toContain("billing");
  });
});
