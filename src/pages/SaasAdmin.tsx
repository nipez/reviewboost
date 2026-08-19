import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { Brand, PlanBadge } from "../components/ui";
import { money, timeAgo } from "../lib/format";
import { PLAN_LABELS } from "../lib/plans";
import type { Ad, SaasCustomer, SaasOverview, TimelineEvent } from "../types";

type Tab = "overview" | "customers" | "revenue" | "ads" | "activity";

export function SaasAdmin() {
  const [tab, setTab] = useState<Tab>("overview");
  const [overview, setOverview] = useState<SaasOverview | null>(null);
  const [customers, setCustomers] = useState<SaasCustomer[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [activity, setActivity] = useState<TimelineEvent[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    Promise.all([api.saasOverview(), api.saasCustomers(), api.ads(), api.saasActivity()]).then(
      ([o, c, a, ev]) => {
        setOverview(o);
        setCustomers(c);
        setAds(a);
        setActivity(ev);
      },
    );
  }, []);

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.industry.toLowerCase().includes(q.toLowerCase()));
  const byPlan = customers.reduce<Record<string, { n: number; mrr: number }>>((acc, c) => {
    acc[c.plan] ??= { n: 0, mrr: 0 };
    acc[c.plan].n += 1;
    acc[c.plan].mrr += c.mrr;
    return acc;
  }, {});

  return (
    <div className="saas">
      <aside className="side">
        <Brand />
        <p className="muted" style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: "14px 12px" }}>
          Platform console
        </p>
        {(["overview", "customers", "revenue", "ads", "activity"] as Tab[]).map((id) => (
          <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>
            {id[0].toUpperCase() + id.slice(1)}
          </button>
        ))}
        <Link to="/" style={{ marginTop: 24 }}>
          ← Marketing site
        </Link>
      </aside>
      <main className="saas-main">
        <h1 style={{ fontFamily: "var(--display)", marginBottom: 18 }}>
          {tab === "overview" && "Dashboard"}
          {tab === "customers" && "Customers"}
          {tab === "revenue" && "Revenue"}
          {tab === "ads" && "Ad Network"}
          {tab === "activity" && "Activity Feed"}
        </h1>

        {tab === "overview" && overview && (
          <>
            <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
              <div className="kpi"><label>MRR</label><b>{money(overview.mrr)}</b></div>
              <div className="kpi"><label>Customers</label><b>{overview.totalCustomers}</b></div>
              <div className="kpi"><label>Displays</label><b>{overview.activeDisplays}</b></div>
              <div className="kpi"><label>Rev / account</label><b>{money(overview.avgRevenuePerAccount)}</b></div>
              <div className="kpi"><label>Churn</label><b>{overview.churnRate}%</b></div>
            </div>
            <div className="card">
              <h3>Network</h3>
              <p className="muted">
                {overview.totalReviews} reviews collected · {overview.totalScans} QR scans · {overview.newCustomersThisMonth} new this month
              </p>
            </div>
          </>
        )}

        {tab === "customers" && (
          <>
            <input className="search" style={{ marginBottom: 14, maxWidth: 360 }} placeholder="Search customers..." value={q} onChange={(e) => setQ(e.target.value)} />
            <table className="table">
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Plan</th>
                  <th>MRR</th>
                  <th>Reviews</th>
                  <th>Scans</th>
                  <th>Industry</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.name}</strong>
                      <div className="muted">{c.email}</div>
                    </td>
                    <td><PlanBadge plan={c.plan} /> {PLAN_LABELS[c.plan]}</td>
                    <td>{money(c.mrr)}</td>
                    <td>{c.reviews}</td>
                    <td>{c.qrScans}</td>
                    <td>{c.industry}</td>
                    <td><Link to={`/display/${c.slug}`}>Open</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === "revenue" && (
          <div className="cards">
            {Object.entries(byPlan).map(([plan, v]) => (
              <div className="card" key={plan}>
                <h3>{PLAN_LABELS[plan as keyof typeof PLAN_LABELS] ?? plan}</h3>
                <div className="price">{money(v.mrr)}</div>
                <p className="muted">{v.n} accounts</p>
              </div>
            ))}
          </div>
        )}

        {tab === "ads" && (
          <div className="cards">
            {ads.map((ad) => (
              <div className="card" key={ad.id}>
                <h3>
                  {ad.icon} {ad.headline}
                </h3>
                <p>{ad.body}</p>
                <span className="badge badge-plus">{ad.cta}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "activity" && (
          <div className="card">
            {activity.map((ev) => (
              <div key={ev.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                <span>
                  {ev.type} · {ev.label}
                </span>
                <span className="muted">{timeAgo(ev.createdAt)}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
