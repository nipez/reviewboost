import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { AdBanner, PinPad, QRCode, ReviewCard, Stars, UpgradeModal } from "../components/ui";
import { isPlus, isPro } from "../lib/plans";
import type { Ad, Business, PlanId } from "../types";

export function Display() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [error, setError] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [toast, setToast] = useState("");

  const refresh = useCallback(async () => {
    const [biz, adList] = await Promise.all([api.getBusiness(slug), api.ads()]);
    setBusiness(biz);
    setAds(adList);
  }, [slug]);

  useEffect(() => {
    refresh().catch((err: Error) => setError(err.message));
    const t = setInterval(() => refresh().catch(() => undefined), 4000);
    return () => clearInterval(t);
  }, [refresh]);

  const loc = business?.locations[0];
  const plus = business ? isPlus(business.plan) : false;
  const pro = business ? isPro(business.plan) : false;
  const theme = plus ? business!.theme : "light";
  const minStars = pro ? business!.minStars : 0;
  const reviews = useMemo(
    () => (business?.reviews ?? []).filter((r) => r.rating >= minStars).slice(0, 4),
    [business, minStars],
  );

  async function checkPin(pin: string) {
    const res = await api.verifyPin(slug, pin);
    if (res.ok) navigate(`/admin/${slug}`);
    else setPinError(true);
  }

  async function upgrade(plan: PlanId) {
    const next = await api.upgrade(slug, plan);
    setBusiness(next);
    setShowUpgrade(false);
    setToast(`Upgraded to ${plan}`);
    setTimeout(() => setToast(""), 2000);
  }

  if (error) {
    return (
      <div className="gate">
        <div className="gate-card">
          <h2>{error}</h2>
          <Link to="/setup">Start a new display</Link>
        </div>
      </div>
    );
  }
  if (!business || !loc) return <div className="gate">Loading display…</div>;

  const qrUrl = `${window.location.origin}/r/${business.slug}`;

  return (
    <div className={`display ${theme === "dark" ? "dark" : ""}`}>
      {toast && <div className="toast">{toast}</div>}
      <header className="display-head">
        <div>
          <h1>{business.name}</h1>
          <div className="muted">{loc.address}</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => { setShowPin(true); setPinError(false); }}>
          ⚙️
        </button>
      </header>
      <main>
        <div className="display-hero">
          <div className="kicker">★★★ OUR CUSTOMERS LOVE US! ★★★</div>
          <div className="rating-xl">{loc.rating.toFixed(1)}</div>
          <Stars value={loc.rating} size={22} />
          <div className="muted" style={{ marginTop: 6 }}>
            {loc.reviewCount} Google Reviews
          </div>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        <div className="qr-box">
          <QRCode data={qrUrl} />
          <div>
            <h3 style={{ fontFamily: "var(--display)" }}>Loved your visit?</h3>
            <p className="muted">Scan to leave a Google review — unhappy feedback stays private.</p>
            <Link to={`/r/${business.slug}`}>Open review gate →</Link>
          </div>
        </div>
      </main>
      <footer>
        {!plus && <AdBanner ads={ads} />}
        <div className="muted" style={{ textAlign: "center", marginTop: 10, fontSize: 12 }}>
          Powered by ReviewBoost —{" "}
          <button className="btn-ghost btn-sm" onClick={() => setShowUpgrade(true)}>
            Upgrade
          </button>
        </div>
      </footer>

      {showPin && (
        <div className="modal-bg" onClick={() => setShowPin(false)}>
          <div className="modal" style={{ width: 340, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "var(--display)" }}>Admin Access</h2>
            <p className="muted">Enter your 4-digit PIN to continue</p>
            <PinPad error={pinError} onSubmit={checkPin} />
            <p className="muted" style={{ marginTop: 16, fontSize: 12 }}>
              Demo PIN: 1234
            </p>
          </div>
        </div>
      )}
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} onUpgrade={upgrade} />}
    </div>
  );
}
