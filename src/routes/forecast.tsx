import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Panel } from "@/components/Panel";
import { Table, StatusPill } from "@/components/Table";

import {
  useFleet,
  SITES_META,
  reassignAsset,
  selectAsset,
  openActionSheet,
} from "@/data/fleet";
import { sendAlertActionNotification } from "@/lib/email/notify";
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/forecast")({
  head: () => ({
    meta: [
      { title: "Demand Optimization Engine — RentSense" },
      {
        name: "description",
        content: "Rule-based equipment demand analysis by site with direct asset pre-positioning and redeployment recommendations.",
      },
    ],
  }),
  component: ForecastPage,
});

function ForecastPage() {
  const { assets, optimizationPlans } = useFleet();
  const [horizon, setHorizon] = useState<"7d" | "14d" | "30d">("7d");

  const horizonMultiplier = horizon === "7d" ? 1 : horizon === "14d" ? 1.4 : 2.0;

  const demandData = Object.values(SITES_META).map((site) => {
    const onSite = assets.filter((a) => a.site === site.id);
    const predictedNeed = Math.round(site.demandForecast.need * horizonMultiplier);
    const gap = Math.max(0, predictedNeed - onSite.length);

    return {
      siteId: site.id,
      name: site.name,
      primaryNeed: site.demandForecast.primaryNeed,
      need: predictedNeed,
      have: onSite.length,
      gap,
      confidence: site.demandForecast.confidence,
    };
  });

  const idleUnassigned = assets.filter((a) => a.utilizationPct < 25);
  // Dynamically find the best redeployment candidate (lowest utilization, unassigned)
  const bestCandidate = [...assets]
    .filter((a) => a.utilizationPct < 30 && !a.site)
    .sort((a, b) => a.utilizationPct - b.utilizationPct)[0] ?? idleUnassigned[0];

  return (
    <Shell crumb="Demand Forecast">
      <div className="space-y-5">
        {/* ── Top Forecast Horizon Control Strip ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-border/70 bg-white p-5 shadow-panel">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground font-bold shadow-xs">
              <TrendingUp size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Demand Optimization Engine
              </h2>
              <p className="text-[12.5px] text-muted-foreground">
                Rule-based demand analysis using site capacity data and current fleet utilization.
                Estimates are indicative — not ML-generated predictions.
              </p>
            </div>
          </div>

          {/* Horizon Selector */}
          <div className="flex items-center gap-1 rounded-full bg-muted/60 p-1 border border-border/60 text-[12px]">
            {[
              { id: "7d" as const, label: "Next 7 Days" },
              { id: "14d" as const, label: "Next 14 Days" },
              { id: "30d" as const, label: "Next 30 Days" },
            ].map((h) => (
              <button
                key={h.id}
                onClick={() => setHorizon(h.id)}
                className={`rounded-full px-4 py-1.5 font-bold transition-all ${
                  horizon === h.id
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Visual Demand vs Fleet Gaps Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 7 Columns: Site Demand Visualizer Bars */}
          <div className="lg:col-span-7">
            <Panel
              title="Predicted Demand vs On-Site Fleet by Location"
              subtitle="Comparing required heavy machinery against currently mobilized inventory"
            >
              <div className="space-y-4 p-6">
                {demandData.map((d) => (
                  <div key={d.siteId} className="rounded-2xl border border-border/60 bg-card p-4">
                    <div className="flex items-center justify-between text-[13px] mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{d.siteId}</span>
                        <span className="text-[12px] text-muted-foreground">· {d.name}</span>
                        <span className="rounded-md bg-muted px-2 py-0.5 text-[10.5px] font-semibold text-foreground">
                          {d.primaryNeed}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 tabular-nums text-[12px]">
                        <span>
                          Need: <strong className="text-foreground">{d.need}</strong>
                        </span>
                        <span className="text-muted-foreground">|</span>
                        <span>
                          Have: <strong className="text-ok">{d.have}</strong>
                        </span>
                        {d.gap > 0 ? (
                          <span className="rounded-full bg-warn/20 px-2 py-0.5 text-[11px] font-bold text-warn-foreground">
                            Gap: -{d.gap}
                          </span>
                        ) : (
                          <span className="rounded-full bg-ok/15 px-2 py-0.5 text-[11px] font-bold text-ok">
                            Satisfied
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dual Progress Track (Lime = Predicted Need, Green = On-Site) */}
                    <div className="flex h-3.5 gap-1.5">
                      <div className="flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-accent transition-all duration-500"
                          style={{ width: `${Math.min((d.need / 4) * 100, 100)}%` }}
                          title={`Predicted need: ${d.need}`}
                        />
                      </div>
                      <div className="flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-ok transition-all duration-500"
                          style={{ width: `${Math.min((d.have / 4) * 100, 100)}%` }}
                          title={`On site: ${d.have}`}
                        />
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10.5px] text-muted-foreground">
                      <span>Lime track: Projected Demand · Green track: Active Fleet</span>
                      <span className="flex items-center gap-1 font-semibold text-muted-foreground">
                        <ShieldCheck size={12} className="text-ok" /> {d.confidence} Confidence
                        <span className="text-[9.5px] opacity-60 italic">(estimated)</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* Right 5 Columns: Direct Forecast-to-Asset Remediation Cards */}
          <div className="lg:col-span-5 space-y-4">
            <Panel title="Redeployment Recommendations" subtitle="Priority redeployment actions based on current site demand vs fleet availability">
              <div className="p-5 space-y-4">
                {/* Recommendation 1: Dynamic — based on best available candidate */}
                {bestCandidate && (
                  <div className="rounded-2xl border border-border/70 bg-accent p-5 shadow-float">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={13} /> Deployment Gap Solution
                      </span>
                      <span>High Priority</span>
                    </div>

                    <h3 className="mt-2 text-base font-bold text-accent-foreground leading-snug">
                      Pre-position {bestCandidate.id} → Site S003 (Bhopal)
                    </h3>

                    <p className="mt-1.5 text-[12px] text-accent-foreground/85 leading-relaxed font-medium">
                      S003 has forecasted demand shortfall. {bestCandidate.id} ({bestCandidate.type})
                      at {bestCandidate.utilizationPct}% utilization is the best available redeployment candidate.
                    </p>

                    <div className="mt-3 rounded-xl bg-white/75 p-3 text-[11.5px] text-foreground space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Utilization:</span>
                        <strong className="text-warn">{bestCandidate.utilizationPct}% (below threshold)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Location:</span>
                        <strong className="text-foreground">
                          {bestCandidate.site ? `Site ${bestCandidate.site}` : "Unassigned Staging Yard"}
                        </strong>
                      </div>
                    </div>

                    <button
                      onClick={async () => {
                        await sendAlertActionNotification({
                          alertId: `fc-prepos-${bestCandidate.id}`,
                          alertType: "Forecast",
                          severity: "warning",
                          title: `Pre-position ${bestCandidate.id} → Site S003 (Bhopal)`,
                          signal: `S003 demand shortfall (need: 3, have: 1). ${bestCandidate.id} at ${bestCandidate.utilizationPct}% utilization.`,
                          impact: "+18% fleet utilization uplift · ₹1,100/wk savings",
                          action: `Execute Pre-position ${bestCandidate.id} to Site S003`,
                          assetId: bestCandidate.id,
                        });
                        if (optimizationPlans[0]) openActionSheet(optimizationPlans[0]);
                        else reassignAsset(bestCandidate.id, "S003", "OP101", "Pre-positioned from demand analysis");
                      }}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-[12.5px] font-bold text-background shadow-xs hover:opacity-95 cursor-pointer"
                    >
                      Execute Pre-position {bestCandidate.id}
                      <ArrowRight size={13} />
                    </button>
                  </div>
                )}

                {/* Recommendation 2: Standby elimination for crane with no demand */}
                <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-panel">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Standby Elimination</span>
                    <span className="text-danger">Low Demand Window</span>
                  </div>

                  <h3 className="mt-2 text-base font-bold text-foreground">
                    Return Crane Equipment to Off-Hire Depot
                  </h3>

                  <p className="mt-1.5 text-[12px] text-muted-foreground leading-relaxed">
                    Zero demand forecasted across all sites for heavy crane equipment over the next 30 days.
                    Off-hiring idle cranes reduces unnecessary standby lease costs.
                  </p>

                  <button
                    onClick={async () => {
                      await sendAlertActionNotification({
                        alertId: "fc-decomm-EQX1002",
                        alertType: "Forecast",
                        severity: "warning",
                        title: "Off-Hire EQX1002 (Tower Crane) — Return to Depot",
                        signal: "Zero crane demand forecasted across all active sites for the next 30 days.",
                        impact: "₹55,000/month standby cost eliminated",
                        action: "Review Decommission Plan for EQX1002",
                        assetId: "EQX1002",
                      });
                      const decommPlan = optimizationPlans.find(
                        (p) => p.type === "Return" || p.id === "opt-2",
                      );
                      if (decommPlan) openActionSheet(decommPlan);
                      else {
                        // Fallback: select the crane asset for manual review
                        const craneAsset = assets.find((a) => a.type === "Crane");
                        if (craneAsset) selectAsset(craneAsset.id);
                      }
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[12px] font-bold text-foreground hover:bg-muted shadow-xs cursor-pointer"
                  >
                    Review Decommission Plan
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        {/* ── Forecast Telemetry Signals Table ── */}
        <Panel
          title="Predictive Signal Ranking &amp; Redeployment Matrix"
          subtitle="Ranked list of idle equipment ready for deployment to forecast deficit sites"
        >
          <Table
            columns={[
              { key: "asset", label: "Asset" },
              { key: "type", label: "Type" },
              { key: "site", label: "Current Site" },
              { key: "status", label: "Status" },
              { key: "signal", label: "Predictive Signal" },
              { key: "util", label: "Util %", align: "right" },
            ]}
            rows={idleUnassigned.map((a) => ({
              id: a.id,
              cells: {
                asset: <strong className="text-foreground">{a.id}</strong>,
                type: a.type,
                site: a.site ? `Site ${a.site}` : "Unassigned Yard",
                status: <StatusPill status={a.status} />,
                signal: `${a.engineHrsPerDay}h engine vs ${a.idleHrsPerDay}h idle/day → prime redeployment candidate`,
                util: <strong className="text-foreground">{a.utilizationPct}%</strong>,
              },
            }))}
          />
        </Panel>
      </div>
    </Shell>
  );
}
