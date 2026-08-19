import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brand } from "../components/ui";

const STATS = [
  { stat: "+28%", text: "higher conversions for 4.5+ star businesses", color: "#22c55e" },
  { stat: "3 mo", text: "Google ignores reviews older than 3 months", color: "#EA4335" },
  { stat: "4.8★", text: "the new minimum to rank in Google’s Local 3-Pack", color: "#FBBC04" },
  { stat: "89%", text: "of consumers expect you to respond to reviews", color: "#3b82f6" },
];

export function Landing() {
  const navigate = useNavigate();
  const [count, setCount] = useState(847);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => c + 1), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="page">
      <div className="wrap">
        <nav className="nav">
          <Brand />
          <div style={{ display: "flex", gap: 10 }}>
            <Link to="/saas" className="btn btn-ghost btn-sm">
              Platform
            </Link>
            <button className="btn" onClick={() => navigate("/setup")}>
              Get Started Free
            </button>
          </div>
        </nav>

        <section className="hero">
          <div>
            <h1>
              Turn every visit into a <span className="grad">5-star review.</span>
            </h1>
            <div className="alert-chip">The rules have changed — is your business ready?</div>
            <p className="lede">
              91% of consumers read Google reviews before visiting. Google’s AI now summarizes your reviews to decide who
              gets recommended. If they aren’t fresh, detailed, and 4.8+ — you’re invisible.
            </p>
            <div className="stat-grid">
              {STATS.map((s) => (
                <div key={s.stat} className="stat" style={{ background: s.color + "14", borderColor: s.color + "40" }}>
                  <strong style={{ color: s.color }}>{s.stat}</strong>
                  <span>{s.text}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-gold" onClick={() => navigate("/setup")}>
              Get Started — It’s Free →
            </button>
          </div>
          <div className="preview-card">
            <div className="muted" style={{ fontSize: 12, fontWeight: 700 }}>
              LIVE DISPLAY PREVIEW
            </div>
            <h3>Element Longevity</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "8px 0 16px" }}>
              <span className="rating-xl" style={{ fontSize: 56 }}>
                4.8
              </span>
              <span className="muted">{count.toLocaleString()} Google reviews</span>
            </div>
            <div className="review-mini">
              <strong>Sarah Mitchell</strong> ★★★★★
              <p>Absolutely wonderful experience! The staff was incredibly friendly and professional.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>How it works</h2>
          <p className="muted">A front-desk display, a QR code, and AI that answers every review.</p>
          <div className="cards">
            <div className="card">
              <h3>1. Launch a display</h3>
              <p>Search your business, pick tablet or TV, and put a live review board on the counter in under a minute.</p>
            </div>
            <div className="card">
              <h3>2. Route the scan</h3>
              <p>Happy customers go to Google. Unhappy ones leave private feedback so 1-star rants never go public.</p>
            </div>
            <div className="card">
              <h3>3. Reply with AI</h3>
              <p>Every new review gets a drafted response you can send in one tap. Fresh replies keep you in the 3-pack.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Plans</h2>
          <div className="cards">
            <div className="card">
              <h3>Free</h3>
              <div className="price">
                $0<small>/mo</small>
              </div>
              <div className="feature-list">
                <div>✓ Tablet review display</div>
                <div>✓ QR to Google</div>
                <div>✓ Sample analytics</div>
              </div>
              <button className="btn" onClick={() => navigate("/setup")}>
                Start free
              </button>
            </div>
            <div className="card">
              <span className="badge badge-plus">PLUS</span>
              <h3>Plus</h3>
              <div className="price">
                $9<small>/mo</small>
              </div>
              <div className="feature-list">
                <div>✓ Remove ads + branding</div>
                <div>✓ Logo + dark mode</div>
                <div>✓ Basic analytics</div>
              </div>
              <button className="btn" onClick={() => navigate("/setup")}>
                Choose Plus
              </button>
            </div>
            <div className="card">
              <span className="badge badge-pop">MOST POPULAR</span>
              <h3>Pro</h3>
              <div className="price">
                $29<small>/mo</small>
              </div>
              <div className="feature-list">
                <div>✓ Smart review routing</div>
                <div>✓ AI review replies</div>
                <div>✓ TV display + competitors</div>
              </div>
              <button className="btn" onClick={() => navigate("/setup")}>
                Choose Pro
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
