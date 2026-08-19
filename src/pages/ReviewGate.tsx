import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { Brand } from "../components/ui";
import { googleReviewUrl } from "../lib/format";
import { isPro } from "../lib/plans";
import type { PlanId } from "../types";

export function ReviewGate() {
  const { slug = "" } = useParams();
  const [name, setName] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [plan, setPlan] = useState<PlanId>("free");
  const [stars, setStars] = useState(0);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [done, setDone] = useState<"google" | "feedback" | "review" | "">("");
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .recordScan(slug)
      .then((res) => {
        setName(res.name);
        setPlaceId(res.placeId);
        setPlan(res.plan);
      })
      .catch((err) => setError(err.message));
  }, [slug]);

  const routing = isPro(plan);
  const happy = stars >= 4;

  async function submit() {
    setError("");
    try {
      if (routing && !happy) {
        await api.sendFeedback(slug, stars, text);
        setDone("feedback");
        return;
      }
      await api.addReview(slug, { author: author || "Guest", rating: stars, text });
      setDone(happy ? "google" : "review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit");
    }
  }

  return (
    <div className="gate">
      <div className="gate-card">
        <Brand />
        <h2 style={{ fontFamily: "var(--display)", margin: "18px 0 8px" }}>{name || "ReviewBoost"}</h2>
        <p className="muted">How was your visit?</p>
        {error && <p style={{ color: "#ef4444" }}>{error}</p>}

        {!done && (
          <>
            <div className="star-pick">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} className={stars >= n ? "on" : ""} onClick={() => setStars(n)}>
                  ★
                </button>
              ))}
            </div>
            {stars > 0 && (
              <div style={{ textAlign: "left" }}>
                <input className="search" placeholder="Your name" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <textarea className="reply-box" placeholder={routing && !happy ? "Tell us privately what we can improve…" : "Share a few details for your review…"} value={text} onChange={(e) => setText(e.target.value)} />
                <button className="btn" style={{ width: "100%", marginTop: 12 }} disabled={!text.trim()} onClick={submit}>
                  {routing && !happy ? "Send private feedback" : "Submit review"}
                </button>
              </div>
            )}
          </>
        )}

        {done === "google" && (
          <div>
            <h3 style={{ margin: "16px 0 8px" }}>Thank you!</h3>
            <p className="muted">Your review is on the display. Want it on Google too?</p>
            <a className="btn" style={{ display: "inline-block", marginTop: 16 }} href={googleReviewUrl(placeId)} target="_blank" rel="noreferrer">
              Leave it on Google
            </a>
          </div>
        )}
        {done === "feedback" && (
          <div>
            <h3 style={{ margin: "16px 0 8px" }}>We received your feedback</h3>
            <p className="muted">This stays private so the team can make it right.</p>
          </div>
        )}
        {done === "review" && (
          <div>
            <h3 style={{ margin: "16px 0 8px" }}>Review saved</h3>
            <p className="muted">The owner can reply from their ReviewBoost inbox.</p>
          </div>
        )}

        <div style={{ marginTop: 22 }}>
          <Link to={`/display/${slug}`}>Back to display</Link>
        </div>
      </div>
    </div>
  );
}
