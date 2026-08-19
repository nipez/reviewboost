import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { planMrr } from "../lib/plans";
import { SaasAdmin as OriginalSaasAdmin } from "../legacy/OriginalUI.jsx";

export function SaasAdmin() {
  const navigate = useNavigate();
  const [extra, setExtra] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    api.saasCustomers().then((rows) => {
      setExtra(
        rows.map((c) => ({
          id: 10000 + c.id,
          name: c.name,
          email: c.email,
          plan: c.plan,
          mrr: c.mrr || planMrr(c.plan, c.locations),
          locations: c.locations,
          displays: c.displays,
          reviews: c.reviews,
          rating: c.rating,
          ratingBefore: c.rating,
          joined: c.joined.slice(0, 10),
          status: c.status,
          lastActive: "just now",
          gbpUrl: `/display/${c.slug}`,
          phone: c.phone,
          qrScans: c.qrScans,
          reviewsPerMonth: 0,
          industry: c.industry,
        })),
      );
    }).catch(() => undefined);
  }, []);

  return <OriginalSaasAdmin onBack={() => navigate("/")} extraCustomers={extra} />;
}
