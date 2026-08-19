import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { businessToConfig } from "../lib/businessConfig";
import { Dashboard } from "../legacy/OriginalUI.jsx";
import type { DisplayLocation, WizardConfig } from "../legacy/OriginalUI";
import type { PlanId, ThemeId } from "../types";

export function Display() {
  const { slug = "" } = useParams();
  const [config, setConfig] = useState<WizardConfig | null>(null);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    const business = await api.getBusiness(slug);
    setConfig(businessToConfig(business));
  }, [slug]);

  useEffect(() => {
    refresh().catch((err: Error) => setError(err.message));
    const timer = setInterval(() => {
      refresh().catch(() => undefined);
    }, 4000);
    return () => clearInterval(timer);
  }, [refresh]);

  async function persistPlan(plan: string) {
    const business = await api.upgrade(slug, plan as PlanId);
    setConfig(businessToConfig(business));
  }

  async function persistTheme(theme: "light" | "dark") {
    const business = await api.patchBusiness(slug, { theme: theme as ThemeId });
    setConfig(businessToConfig(business));
  }

  async function persistPin(pin: string) {
    const business = await api.patchBusiness(slug, { pin });
    setConfig(businessToConfig(business));
  }

  async function persistLocation(loc: DisplayLocation) {
    await api.addLocation(slug, {
      name: loc.name,
      address: loc.address,
      placeId: loc.placeId,
      rating: loc.rating,
      reviewCount: loc.reviewCount,
    });
    await refresh();
  }

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
  return (
    <Dashboard
      config={config}
      onPersistPlan={(plan) => void persistPlan(plan)}
      onPersistTheme={(theme) => void persistTheme(theme)}
      onPersistPin={(pin) => void persistPin(pin)}
      onPersistLocation={(loc) => void persistLocation(loc)}
      onVerifyPin={(pin) => api.verifyPin(slug, pin).then((res) => res.ok)}
    />
  );
}
