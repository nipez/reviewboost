import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { Brand, PlanBadge, Stars, UpgradeModal } from "../components/ui";
import { isPlus, isPro, PLAN_LABELS } from "../lib/plans";
import { timeAgo } from "../lib/format";
import type { Business, Competitor, PlanId, Review } from "../types";

type Tab = "analytics" | "reviews" | "competitors" | "settings";

export function OwnerAdmin() {
  const { slug = "" } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [tab, setTab] = useState<Tab>("analytics");
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [upgradeReason, setUpgradeReason] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [reviewFilter, setReviewFilter] = useState<"pending" | "replied">("pending");
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState("");

  const refresh = useCallback(async () => {
    const biz = await api.getBusiness(slug);
    setBusiness(biz);
    setDrafts(Object.fromEntries(biz.reviews.map((r) => [r.id, r.aiDraft || r.replyText])));
    if (isPro(biz.plan)) setCompetitors(await api.competitors(slug));
  }, [slug]);

  useEffect(() => {
    refresh().catch((err: Error) => setStatus(err.message));
  }, [refresh]);

  const pending = useMemo(() => business?.reviews.filter((r) => !r.replied) ?? [], [business]);
  const replied = useMemo(() => business?.reviews.filter((r) => r.replied) ?? [], [business]);
  const shown = reviewFilter === "pending" ? pending : replied;

  async function upgrade(plan: PlanId) {
    setBusiness(await api.upgrade(slug, plan));
    setUpgradeReason(null);
    await refresh();
  }

  async function sendReply(review: Review) {
    const text = drafts[review.id] || review.aiDraft;
    await api.replyToReview(review.id, text);
    await refresh();
    setStatus("Reply saved");
  }

  async function regen(review: Review) {
    const next = await api.generateReply(review.id);
    setDrafts((d) => ({ ...d, [review.id]: next.aiDraft }));
  }

  async function saveSettings() {
    if (!business) return;
    await api.patchBusiness(slug, {
      theme: business.theme,
      displayMode: business.displayMode,
      minStars: business.minStars,
      pin: pin || undefined,
    });
    setStatus("Settings saved");
    setPin("");
  }

  if (!business) return <div className="gate">{status || "Loading admin…"}</div>;
  const plus = isPlus(business.plan);
  const pro = isPro(business.plan);
  const loc = business.locations[0];
  const conversion = business.qrScans ? Math.round((business.reviews.length / Math.max(business.qrScans, 1)) * 100) : 0;

  return (
    <div className="admin">
      <header className="admin-bar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Brand />
          <strong>{business.name}</strong>
          <PlanBadge plan={business.plan} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link className="btn btn-ghost btn-sm" to={`/display/${slug}`}>
            Customer display
          </Link>
          <button className="btn btn-sm" onClick={() => setUpgradeReason("Grow faster with Plus or Pro")}>
            {PLAN_LABELS[business.plan]}
          </button>
        </div>
      </header>
      <div className="tabs">
        {(["analytics", "reviews", "competitors", "settings"] as Tab[]).map((id) => (
          <button
            key={id}
            className={`tab ${tab === id ? "on" : ""}`}
            onClick={() => {
              if ((id === "reviews" || id === "competitors") && !pro) {
                setUpgradeReason(id === "reviews" ? "AI review inbox is a Pro feature" : "Competitor tracking is a Pro feature");
                return;
              }
              setTab(id);
            }}
          >
            {id[0].toUpperCase() + id.slice(1)}
            {(id === "reviews" || id === "competitors") && !pro ? " 🔒" : ""}
          </button>
        ))}
      </div>
      <main className="admin-main">
        {status && <p className="muted" style={{ marginBottom: 12 }}>{status}</p>}
        {tab === "analytics" && (
          <>
            <div className="kpi-grid">
              <div className="kpi">
                <label>Rating</label>
                <b>{loc?.rating.toFixed(1)}</b>
              </div>
              <div className="kpi">
                <label>Reviews</label>
                <b>{loc?.reviewCount}</b>
              </div>
              <div className="kpi">
                <label>QR scans</label>
                <b>{business.qrScans}</b>
              </div>
              <div className="kpi">
                <label>Scan → review</label>
                <b>{conversion}%</b>
              </div>
            </div>
            <div className="card">
              <h3>Recent activity</h3>
              {business.events.length === 0 && <p className="muted">No events yet.</p>}
              {business.events.slice(0, 10).map((ev) => (
                <div key={ev.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
                  <span>
                    <strong>{ev.type === "review" ? "+1 review" : ev.type === "scan" ? "QR scan" : ev.label}</strong>
                    <span className="muted"> · {ev.label}</span>
                  </span>
                  <span className="muted">{timeAgo(ev.createdAt)}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "reviews" && pro && (
          <>
            <div className="kpi-grid">
              <div className="kpi">
                <label>Pending</label>
                <b style={{ color: "#ef4444" }}>{pending.length}</b>
              </div>
              <div className="kpi">
                <label>Replied</label>
                <b style={{ color: "#22c55e" }}>{replied.length}</b>
              </div>
              <div className="kpi">
                <label>Response rate</label>
                <b>{business.reviews.length ? Math.round((replied.length / business.reviews.length) * 100) : 0}%</b>
              </div>
              <div className="kpi">
                <label>Private feedback</label>
                <b>{business.feedbackCount}</b>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button className={`btn btn-sm ${reviewFilter === "pending" ? "" : "btn-ghost"}`} onClick={() => setReviewFilter("pending")}>
                Pending
              </button>
              <button className={`btn btn-sm ${reviewFilter === "replied" ? "" : "btn-ghost"}`} onClick={() => setReviewFilter("replied")}>
                Replied
              </button>
            </div>
            {shown.map((review) => (
              <div className="review-admin" key={review.id}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{review.author}</strong>
                  <span className="muted">{timeAgo(review.createdAt)}</span>
                </div>
                <Stars value={review.rating} />
                <p style={{ margin: "8px 0" }}>{review.text}</p>
                {!review.replied ? (
                  <>
                    <textarea className="reply-box" value={drafts[review.id] ?? ""} onChange={(e) => setDrafts((d) => ({ ...d, [review.id]: e.target.value }))} />
                    <div className="row">
                      <button className="btn btn-ghost btn-sm" onClick={() => regen(review)}>
                        Regenerate AI draft
                      </button>
                      <button className="btn btn-sm" onClick={() => sendReply(review)}>
                        Send reply
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="muted">Replied: {review.replyText}</p>
                )}
              </div>
            ))}
          </>
        )}

        {tab === "competitors" && pro && (
          <table className="table">
            <thead>
              <tr>
                <th>Competitor</th>
                <th>Rating</th>
                <th>Reviews</th>
                <th>/ month</th>
                <th>Trend</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr key={c.name}>
                  <td>{c.name}</td>
                  <td>{c.rating.toFixed(1)}</td>
                  <td>{c.reviews}</td>
                  <td>{c.reviewsPerMonth}</td>
                  <td>{c.trend > 0 ? `+${c.trend}` : c.trend}</td>
                  <td>{c.distance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "settings" && (
          <div className="cards">
            <div className="card">
              <h3>Display</h3>
              <p className="muted">Theme {plus ? "" : "(Plus)"} · TV mode {pro ? "" : "(Pro)"}</p>
              <div className="row" style={{ justifyContent: "flex-start" }}>
                <button className={`btn btn-sm ${business.theme === "light" ? "" : "btn-ghost"}`} onClick={() => plus ? setBusiness({ ...business, theme: "light" }) : setUpgradeReason("Unlock dark mode")}>
                  Light
                </button>
                <button className={`btn btn-sm ${business.theme === "dark" ? "" : "btn-ghost"}`} onClick={() => plus ? setBusiness({ ...business, theme: "dark" }) : setUpgradeReason("Unlock dark mode")}>
                  Dark
                </button>
                <button className={`btn btn-sm ${business.displayMode === "ipad" ? "" : "btn-ghost"}`} onClick={() => setBusiness({ ...business, displayMode: "ipad" })}>
                  Tablet
                </button>
                <button className={`btn btn-sm ${business.displayMode === "tv" ? "" : "btn-ghost"}`} onClick={() => pro ? setBusiness({ ...business, displayMode: "tv" }) : setUpgradeReason("TV display is Pro")}>
                  TV
                </button>
              </div>
              <div className="row">
                <button className="btn" onClick={saveSettings}>
                  Save display
                </button>
              </div>
            </div>
            <div className="card">
              <h3>Admin PIN</h3>
              <p className="muted">Default is 1234. Enter a new 4-digit PIN to rotate it.</p>
              <input className="search" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} placeholder="New PIN" />
              <div className="row">
                <button className="btn" onClick={saveSettings} disabled={Boolean(pin) && pin.length !== 4}>
                  Update PIN
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      {upgradeReason && <UpgradeModal trigger={upgradeReason} onClose={() => setUpgradeReason(null)} onUpgrade={upgrade} />}
    </div>
  );
}
