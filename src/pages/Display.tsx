import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { businessToConfig } from "../lib/businessConfig";
import { Dashboard } from "../legacy/OriginalUI.jsx";
import type { WizardConfig } from "../legacy/OriginalUI";

export function Display() {
  const { slug = "" } = useParams();
  const [config, setConfig] = useState<WizardConfig | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getBusiness(slug)
      .then((business) => setConfig(businessToConfig(business)))
      .catch((err: Error) => setError(err.message));
  }, [slug]);

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "DM Sans, sans-serif" }}>
        <div>
          <h2>{error}</h2>
          <Link to="/setup">Start a new display</Link>
        </div>
      </div>
    );
  }
  if (!config) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "DM Sans, sans-serif" }}>
        Loading display…
      </div>
    );
  }
  return <Dashboard config={config} />;
}
