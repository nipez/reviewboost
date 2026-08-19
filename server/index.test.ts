import { afterEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import request from "supertest";
import { createApp } from "./index.ts";

function tempDb() {
  return path.join(os.tmpdir(), `reviewboost-test-${Date.now()}-${Math.random().toString(16).slice(2)}.db`);
}

describe("ReviewBoost API", () => {
  const files: string[] = [];

  afterEach(() => {
    for (const file of files) {
      try {
        fs.rmSync(file);
        fs.rmSync(`${file}-wal`);
        fs.rmSync(`${file}-shm`);
      } catch {
        /* ignore */
      }
    }
    files.length = 0;
  });

  function app() {
    const dbPath = tempDb();
    files.push(dbPath);
    return createApp(dbPath).app;
  }

  it("reports health", async () => {
    const res = await request(app()).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("searches seeded places", async () => {
    const res = await request(app()).get("/api/places").query({ q: "element" });
    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe("Element Longevity");
  });

  it("creates a business, persists a public review, and drafts an AI reply", async () => {
    const server = app();
    const created = await request(server).post("/api/businesses").send({
      name: "Harbor Wellness",
      placeId: "ChIJ_demo1",
      address: "10 Front St",
      rating: 4.8,
      reviewCount: 12,
      industry: "Wellness",
      displayMode: "ipad",
      minStars: 0,
      theme: "light",
    });
    expect(created.status).toBe(201);
    expect(created.body.slug).toContain("harbor-wellness");
    expect(created.body.pin).toBeUndefined();
    expect(created.body.reviews.length).toBeGreaterThan(0);

    const review = await request(server).post(`/api/businesses/${created.body.slug}/reviews`).send({
      author: "Alex Rivera",
      rating: 5,
      text: "Fantastic visit, will be back.",
    });
    expect(review.status).toBe(201);
    expect(review.body.aiDraft).toContain("Alex");

    const replied = await request(server).post(`/api/reviews/${review.body.id}/reply`).send({
      replyText: review.body.aiDraft,
    });
    expect(replied.body.replied).toBe(true);

    const pin = await request(server).post(`/api/businesses/${created.body.slug}/pin/verify`).send({ pin: "1234" });
    expect(pin.body.ok).toBe(true);

    const upgraded = await request(server).post(`/api/businesses/${created.body.slug}/upgrade`).send({ plan: "pro" });
    expect(upgraded.body.plan).toBe("pro");

    const customers = await request(server).get("/api/saas/customers");
    expect(customers.body.some((c: { name: string }) => c.name === "Harbor Wellness")).toBe(true);
  });

  it("records QR scans and private feedback", async () => {
    const server = app();
    const created = await request(server).post("/api/businesses").send({
      name: "Northside Dental",
      placeId: "ChIJ_demo4",
      address: "1 Oak St",
      rating: 4.6,
      reviewCount: 40,
      displayMode: "ipad",
      minStars: 0,
      theme: "light",
    });
    const slug = created.body.slug;
    await request(server).post(`/api/r/${slug}/scan`).expect(200);
    await request(server).post(`/api/r/${slug}/feedback`).send({ rating: 2, text: "Long wait" }).expect(201);
    const biz = await request(server).get(`/api/businesses/${slug}`);
    expect(biz.body.qrScans).toBeGreaterThanOrEqual(2);
    expect(biz.body.feedbackCount).toBe(1);
  });
});
