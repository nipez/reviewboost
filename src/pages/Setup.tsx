import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { Brand } from "../components/ui";
import type { DisplayMode, Place, SocialPlatform, ThemeId } from "../types";

const STEPS = ["Find Business", "Display", "Customize", "Launch"];

export function Setup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<Place | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("ipad");
  const [theme, setTheme] = useState<ThemeId>("light");
  const [minStars, setMinStars] = useState(0);
  const [social, setSocial] = useState<Partial<Record<SocialPlatform, { connected: boolean; handle?: string }>>>({});
  const [launching, setLaunching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    const t = setTimeout(async () => {
      try {
        setResults(await api.searchPlaces(query));
      } finally {
        setSearching(false);
      }
    }, 280);
    return () => clearTimeout(t);
  }, [query]);

  async function launch() {
    if (!selected) return;
    setLaunching(true);
    setError("");
    try {
      const business = await api.createBusiness({
        name: selected.name,
        placeId: selected.placeId,
        address: selected.address,
        rating: selected.rating,
        reviewCount: selected.reviewCount,
        industry: selected.industry,
        displayMode,
        minStars,
        theme,
        social,
      });
      navigate(`/display/${business.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not launch display");
      setLaunching(false);
    }
  }

  return (
    <div className="page">
      <div className="wrap">
        <nav className="nav">
          <Brand />
        </nav>
      </div>
      <div className="wizard">
        <div className="steps">
          {STEPS.map((label, i) => (
            <div key={label} className={`step ${step === i + 1 ? "on" : ""}`}>
              {i + 1}. {label}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="card">
            <h2 style={{ fontFamily: "var(--display)", marginBottom: 8 }}>Find your business</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              Search the local directory — this is your Google listing stand-in until you connect GBP.
            </p>
            <input className="search" placeholder="Search your business name..." value={query} onChange={(e) => setQuery(e.target.value)} />
            {searching && <p className="muted" style={{ marginTop: 10 }}>Searching…</p>}
            <div className="results">
              {results.map((place) => (
                <button
                  key={place.placeId}
                  className={`result ${selected?.placeId === place.placeId ? "selected" : ""}`}
                  onClick={() => setSelected(place)}
                >
                  <strong>{place.name}</strong>
                  <div className="muted" style={{ fontSize: 13 }}>
                    {place.address} · {place.rating}★ · {place.reviewCount} reviews
                  </div>
                </button>
              ))}
            </div>
            {selected && (
              <div className="row">
                <button className="btn" onClick={() => setStep(2)}>
                  Continue →
                </button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <h2 style={{ fontFamily: "var(--display)", marginBottom: 16 }}>Choose your display</h2>
            <div className="choice-grid">
              <button className={`choice ${displayMode === "ipad" ? "on" : ""}`} onClick={() => setDisplayMode("ipad")}>
                <h3>Tablet</h3>
                <p className="muted">At the counter. Included on Free.</p>
              </button>
              <button className={`choice ${displayMode === "tv" ? "on" : ""}`} onClick={() => setDisplayMode("tv")}>
                <h3>TV / Monitor</h3>
                <p className="muted">On the wall. Unlocks on Pro.</p>
              </button>
            </div>
            <div className="row">
              <button className="btn btn-ghost" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="btn" onClick={() => setStep(3)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card">
            <h2 style={{ fontFamily: "var(--display)", marginBottom: 16 }}>Customize</h2>
            <p className="muted">Theme and review filter can be upgraded later.</p>
            <div className="choice-grid" style={{ marginTop: 16 }}>
              <button className={`choice ${theme === "light" ? "on" : ""}`} onClick={() => setTheme("light")}>
                Light
              </button>
              <button className={`choice ${theme === "dark" ? "on" : ""}`} onClick={() => setTheme("dark")}>
                Dark
              </button>
              <button className={`choice ${minStars === 0 ? "on" : ""}`} onClick={() => setMinStars(0)}>
                Show all reviews
              </button>
              <button className={`choice ${minStars === 4 ? "on" : ""}`} onClick={() => setMinStars(4)}>
                4★ and up
              </button>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {(["instagram", "facebook", "tiktok"] as SocialPlatform[]).map((p) => (
                <button
                  key={p}
                  className={`btn ${social[p]?.connected ? "" : "btn-ghost"} btn-sm`}
                  onClick={() => setSocial((s) => ({ ...s, [p]: { connected: !s[p]?.connected } }))}
                >
                  {social[p]?.connected ? "Connected" : "Connect"} {p}
                </button>
              ))}
            </div>
            <div className="row">
              <button className="btn btn-ghost" onClick={() => setStep(2)}>
                Back
              </button>
              <button className="btn" onClick={() => setStep(4)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 4 && selected && (
          <div className="card">
            <h2 style={{ fontFamily: "var(--display)", marginBottom: 8 }}>Ready to launch 🚀</h2>
            <p>
              <strong>{selected.name}</strong>
            </p>
            <p className="muted">
              {displayMode === "tv" ? "TV" : "Tablet"} · {theme} theme · {minStars ? `${minStars}+ stars` : "All reviews"} · Free
            </p>
            {error && <p style={{ color: "#ef4444", marginTop: 12 }}>{error}</p>}
            <div className="row">
              <button className="btn btn-ghost" onClick={() => setStep(3)}>
                Back
              </button>
              <button className="btn btn-green" disabled={launching} onClick={launch}>
                {launching ? "Launching…" : "Launch Free Display 🚀"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
