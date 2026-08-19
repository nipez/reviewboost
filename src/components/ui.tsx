import { useState } from "react";
import type { Ad, PlanId, Review } from "../types";
import { PLAN_LABELS } from "../lib/plans";
import { timeAgo } from "../lib/format";

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <div className="logo" style={{ width: size, height: size, fontSize: size * 0.48 }}>
      ★
    </div>
  );
}

export function Brand() {
  return (
    <div className="brand">
      <Logo />
      ReviewBoost
    </div>
  );
}

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  const full = Math.round(value);
  return (
    <span className="stars" style={{ fontSize: size }} aria-label={`${value} stars`}>
      {"★★★★★".slice(0, full)}
      <span style={{ opacity: 0.25 }}>{"★★★★★".slice(full)}</span>
    </span>
  );
}

export function PlanBadge({ plan }: { plan: PlanId }) {
  if (plan === "free") return null;
  const cls = plan === "plus" ? "badge-plus" : "badge-pro";
  return <span className={`badge ${cls}`}>{PLAN_LABELS[plan].toUpperCase()}</span>;
}

export function QRCode({ data, size = 132 }: { data: string; size?: number }) {
  const cells = 21;
  const bits: boolean[] = [];
  let hash = 0;
  for (let i = 0; i < data.length; i++) hash = (hash * 33 + data.charCodeAt(i)) >>> 0;
  for (let i = 0; i < cells * cells; i++) {
    const x = i % cells;
    const y = Math.floor(i / cells);
    const finder = (x < 7 && y < 7) || (x > cells - 8 && y < 7) || (x < 7 && y > cells - 8);
    if (finder) {
      const ox = x < 7 ? x : x > cells - 8 ? x - (cells - 7) : x;
      const oy = y < 7 ? y : y - (cells - 7);
      const ring = ox === 0 || oy === 0 || ox === 6 || oy === 6 || (ox >= 2 && ox <= 4 && oy >= 2 && oy <= 4);
      bits.push(ring);
    } else {
      bits.push(((hash + i * 17) % 7) > 2);
    }
  }
  const cell = size / cells;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="QR code">
      <rect width={size} height={size} fill="white" rx="6" />
      {bits.map((on, i) =>
        on ? (
          <rect
            key={i}
            x={(i % cells) * cell + 0.4}
            y={Math.floor(i / cells) * cell + 0.4}
            width={cell - 0.3}
            height={cell - 0.3}
            rx="0.8"
            fill="#1a1a2e"
          />
        ) : null,
      )}
    </svg>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card">
      <div className="meta">
        <strong>
          {review.avatar} {review.author}
        </strong>
        <span className="muted">{timeAgo(review.createdAt)}</span>
      </div>
      <Stars value={review.rating} />
      <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.45 }}>{review.text}</p>
    </article>
  );
}

export function AdBanner({ ads }: { ads: Ad[] }) {
  if (!ads.length) return null;
  const shown = ads.slice(0, 2);
  return (
    <div className="ads">
      {shown.map((ad) => (
        <div className="ad" key={ad.id}>
          <div style={{ fontSize: 22 }}>{ad.icon}</div>
          <div>
            <strong style={{ fontFamily: "var(--display)", fontSize: 13 }}>{ad.headline}</strong>
            <div className="muted" style={{ fontSize: 11 }}>
              {ad.body}
            </div>
          </div>
          <button className="cta" style={{ background: ad.color }}>
            {ad.cta}
          </button>
        </div>
      ))}
    </div>
  );
}

export function UpgradeModal({
  trigger,
  onClose,
  onUpgrade,
}: {
  trigger?: string;
  onClose: () => void;
  onUpgrade: (plan: PlanId) => void;
}) {
  const plans: { id: PlanId; price: string; features: string[]; badge?: string; color: string }[] = [
    { id: "plus", price: "$9", color: "#2563eb", features: ["Remove branding + ads", "Upload your logo", "Dark mode theme", "Basic analytics"] },
    { id: "pro", price: "$29", color: "#7c3aed", badge: "MOST POPULAR", features: ["Everything in Plus", "Smart review routing", "AI-drafted responses", "TV display + social QR", "Competitor tracking"] },
    { id: "hardware", price: "$49", color: "#059669", badge: "ALL-IN-ONE", features: ["Everything in Pro", "Tablet + stand included", "White-glove setup", "Hardware replacement"] },
  ];
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="btn btn-ghost btn-sm" style={{ position: "absolute", top: 16, right: 16 }} onClick={onClose}>
          ✕
        </button>
        <h2 style={{ fontFamily: "var(--display)", marginBottom: 6 }}>Unlock ReviewBoost</h2>
        <p className="muted">{trigger || "Choose a plan to grow reviews faster."}</p>
        <div className="cards" style={{ marginTop: 18 }}>
          {plans.map((p) => (
            <div className="card" key={p.id} style={{ borderColor: p.color + "44" }}>
              {p.badge && <span className="badge badge-pop">{p.badge}</span>}
              <h3>{PLAN_LABELS[p.id]}</h3>
              <div className="price">
                {p.price}
                <small>/mo</small>
              </div>
              <div className="feature-list">
                {p.features.map((f) => (
                  <div key={f}>✓ {f}</div>
                ))}
              </div>
              <button className="btn" style={{ background: p.color, width: "100%" }} onClick={() => onUpgrade(p.id)}>
                Choose {PLAN_LABELS[p.id]}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PinPad({
  onSubmit,
  error,
}: {
  onSubmit: (pin: string) => void;
  error: boolean;
}) {
  const [value, setValue] = useState("");
  function press(n: string) {
    const next = (value + n).slice(0, 4);
    setValue(next);
    if (next.length === 4) onSubmit(next);
  }
  return (
    <div>
      <div className="pin-dots">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`dot ${value.length > i ? "on" : ""} ${error ? "err" : ""}`} />
        ))}
      </div>
      {error && <p style={{ color: "#ef4444", fontWeight: 600, fontSize: 12, marginBottom: 12 }}>Incorrect PIN. Try again.</p>}
      <div className="pad">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map((n) =>
          n === "" ? (
            <div key="empty" />
          ) : (
            <button
              key={n}
              onClick={() => {
                if (n === "del") setValue((v) => v.slice(0, -1));
                else press(n);
              }}
            >
              {n === "del" ? "⌫" : n}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
