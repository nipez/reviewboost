import { describe, expect, it } from "vitest";
import { googleReviewUrl, money } from "./format";
import { isPlus, isPro, planMrr } from "./plans";

describe("format helpers", () => {
  it("builds a Google review URL", () => {
    expect(googleReviewUrl("ChIJ_demo1")).toContain("placeid=ChIJ_demo1");
  });

  it("formats money", () => {
    expect(money(1470)).toBe("$1,470");
  });
});

describe("plans", () => {
  it("treats hardware as pro-tier", () => {
    expect(isPlus("plus")).toBe(true);
    expect(isPro("free")).toBe(false);
    expect(isPro("hardware")).toBe(true);
    expect(planMrr("hardware", 2)).toBe(98);
  });
});
