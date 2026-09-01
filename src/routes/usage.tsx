import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Panel } from "@/components/Panel";
import { Table, StatusPill } from "@/components/Table";
import { useFleet, openActionSheet, type Asset } from "@/data/fleet";
import { Gauge, Clock, Zap, TrendingUp, ArrowUpRight, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/usage")({
  head: () => ({
    meta: [
      { title: "Usage Analytics — RentSense" },
      {
        name: "description",
        content: "Engine vs idle hours analytics, underutilized asset optimization, and fleet leaderboard.",
      },
    ],
  }),
  component: UsagePage,
});

function UsagePage() {
  const { assets, optimizationPlans } = useFleet();
  const [filter, setFilter] = useState("All");

  const totalEngineHrs = assets.reduce((s, a) => s + a.engineHrsPerDay * a.operatingDays, 0);
  const totalIdleHrs = assets.reduce((s, a) => s + a.idleHrsPerDay * a.operatingDays, 0);
  const avgUtil = Math.round(assets.reduce((s, a) => s + a.utilizationPct, 0) / (assets.length || 1));
  const highestUtilAsset = [...assets].sort((a, b) => b.utilizationPct - a.utilizationPct)[0];

  const underutilized = assets.filter((a) => a.utilizationPct < 25);
  const topPerformers = [...assets].sort((a, b) => b.utilizationPct - a.utilizationPct).slice(0, 3);

  const sites = Array.from(new Set(assets.map((a) => a.site ?? "Unassigned")));
  const perSite = sites.map((s) => {
    const rows = assets.filter((a) => (a.site ?? "Unassigned") === s);
    return {
      site: s,
      engine: rows.reduce((n, a) => n + a.engineHrsPerDay * a.operatingDays, 0),
      idle: rows.reduce((n, a) => n + a.idleHrsPerDay * a.operatingDays, 0),
      util: Math.round(rows.reduce((n, a) => n + a.utilizationPct, 0) / rows.length),
      count: rows.length,
    };
  });

  const filtered = filter === "All" ? assets : assets.filter((a) => a.type === filter);
  const types = ["All", "Excavator", "Crane", "Bulldozer", "Grader"];

  return (
    <Shell crumb="Usage Analytics">
      <div className="space-y-5">
        {/* ── Executive Analytics KPI Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-[24px] border border-border/70 bg-white p-5 shadow-panel">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Engine Hours</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ok/10 text-ok">
                <Gauge size={14} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-black tracking-tight text-foreground tabular-nums">
              {totalEngineHrs.toFixed(1)} <span className="text-sm font-semibold text-muted-foreground">hrs</span>
            </p>
            <span className="mt-1 text-[11px] font-medium text-ok flex items-center gap-1">
              <TrendingUp size={11} /> Productive billable telemetry
            </span>
          </div>

          <div className="rounded-[24px] border border-border/70 bg-white p-5 shadow-panel">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Idle Hours</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-warn/15 text-warn">
                <Clock size={14} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-black tracking-tight text-foreground tabular-nums">
              {totalIdleHrs.toFixed(1)} <span className="text-sm font-semibold text-muted-foreground">hrs</span>
            </p>
            <span className="mt-1 text-[11px] font-medium text-warn flex items-center gap-1">
              <AlertTriangle size={11} /> Standby / yard dwell time
            </span>
          </div>

          <div className="rounded-[24px] border border-border/70 bg-white p-5 shadow-panel">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-bold uppercase tracking-wider">Avg Fleet Utilization</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Sparkles size={14} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-black tracking-tight text-foreground tabular-nums">
              {avgUtil}%
            </p>
            <span className="mt-1 text-[11px] font-medium text-muted-foreground">
              Target nominal: 70%+
            </span>
          </div>

          <div className="rounded-[24px] border border-border/70 bg-white p-5 shadow-panel">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-bold uppercase tracking-wider">Highest Utilized Asset</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
                <Zap size={14} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-black tracking-tight text-foreground tabular-nums">
              {highestUtilAsset?.id ?? "—"}{" "}
              <span className="text-sm font-semibold text-ok">{highestUtilAsset?.utilizationPct}%</span>
            </p>
            <span className="mt-1 text-[11px] font-medium text-muted-foreground">
              {highestUtilAsset?.type} · {highestUtilAsset?.site ? `Site ${highestUtilAsset.site}` : "Depot"}
            </span>
          </div>
        </div>

        {/* ── Underutilized Assets Action Callouts & Top Performers ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 7 Columns: Underutilized Assets Optimization Strip */}
          <div className="lg:col-span-7">
            <Panel
              title="Underutilized Assets &amp; Redeployment Opportunities"
              subtitle="Equipment units below 25% utilization available for immediate optimization"
            >
              <div className="p-5 space-y-3">
                {underutilized.map((u) => {
                  const plan = optimizationPlans.find((p) => p.assetId === u.id);
                  return (
                    <div
                      key={u.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-2xs hover:border-border transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-warn/15 text-warn font-black text-[12px]">
                          {u.utilizationPct}%
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-[13.5px] font-bold text-foreground">{u.id}</h4>
                            <span className="text-[12px] text-muted-foreground">· {u.type}</span>
                            <StatusPill status={u.status} />
                          </div>
                          <p className="text-[11.5px] text-muted-foreground mt-0.5">
                            {u.idleHrsPerDay} idle hrs/day · {u.engineHrsPerDay} engine hrs/day · {u.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        {plan && (
                          <button
                            onClick={() => openActionSheet(plan)}
                            className="flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-[11.5px] font-bold text-accent-foreground shadow-xs hover:opacity-95"
                          >
                            <Sparkles size={12} /> Optimize Plan
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </div>

          {/* Right 5 Columns: Top Performers Leaderboard */}
          <div className="lg:col-span-5">
            <Panel
              title="Top Performing Fleet"
              subtitle="Units delivering maximum contract uptime and operating efficiency"
            >
              <div className="p-5 space-y-3">
                {topPerformers.map((t, idx) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/20 p-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-background font-bold text-[12px]">
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-foreground">{t.id}</h4>
                        <span className="text-[11.5px] text-muted-foreground">
                          {t.type} · Site {t.site ?? "—"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-ok tabular-nums">{t.utilizationPct}%</span>
                      <p className="text-[10px] text-muted-foreground uppercase font-semibold">Utilization</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>

        {/* ── Engine vs Idle Daily Breakdown & Per-Site Matrix ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6">
            <Panel title="Engine vs Idle Duty Cycle (hrs / day)" tabs={["Per Asset"]} activeTab="Per Asset">
              <div className="space-y-3.5 p-6">
                {assets.map((a) => (
                  <div key={a.id}>
                    <div className="mb-1.5 flex justify-between text-[12.5px]">
                      <span className="font-bold text-foreground">{a.id} ({a.type})</span>
                      <span className="tabular-nums text-muted-foreground font-medium">
                        <strong className="text-ok">{a.engineHrsPerDay}h</strong> engine ·{" "}
                        <strong className="text-warn">{a.idleHrsPerDay}h</strong> idle
                      </span>
                    </div>
                    <div className="flex h-3.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="bg-ok rounded-l-full transition-all"
                        style={{ width: `${(a.engineHrsPerDay / 12) * 100}%` }}
                        title={`${a.engineHrsPerDay} engine hrs/day`}
                      />
                      <div
                        className="bg-warn rounded-r-full transition-all"
                        style={{ width: `${(a.idleHrsPerDay / 12) * 100}%` }}
                        title={`${a.idleHrsPerDay} idle hrs/day`}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-2 flex items-center gap-4 text-[11px] text-muted-foreground border-t border-border/50">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-ok" /> Green = Engine Runtime (0–12h)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-warn" /> Yellow = Standby Idle (0–12h)
                  </span>
                </div>
              </div>
            </Panel>
          </div>

          <div className="lg:col-span-6">
            <Panel title="Regional Site Operating Efficiency" subtitle="Aggregated engine hours and utilization across active sites">
              <Table
                selectable={false}
                columns={[
                  { key: "site", label: "Site Location" },
                  { key: "count", label: "Fleet Count", align: "center" },
                  { key: "engine", label: "Engine Hrs", align: "right" },
                  { key: "idle", label: "Idle Hrs", align: "right" },
                  { key: "util", label: "Avg Util %", align: "right" },
                ]}
                rows={perSite.map((p) => ({
                  id: p.site,
                  cells: {
                    site: <strong className="text-foreground">{p.site}</strong>,
                    count: p.count,
                    engine: `${p.engine.toFixed(1)}h`,
                    idle: `${p.idle.toFixed(1)}h`,
                    util: <strong className={p.util >= 60 ? "text-ok" : "text-warn"}>{p.util}%</strong>,
                  },
                }))}
              />
            </Panel>
          </div>
        </div>

        {/* ── Filterable Raw Usage Matrix ── */}
        <Panel
          title="Raw Telemetry Usage Matrix"
          subtitle="Detailed telemetry log with operating days, engine vs idle runtimes"
          tabs={types}
          activeTab={filter}
          onTabChange={setFilter}
        >
          <Table
            columns={[
              { key: "id", label: "Asset" },
              { key: "site", label: "Site" },
              { key: "status", label: "Status" },
              { key: "days", label: "Operating Days", align: "right" },
              { key: "engine", label: "Total Engine Hrs", align: "right" },
              { key: "idle", label: "Total Idle Hrs", align: "right" },
              { key: "util", label: "Utilization", align: "right" },
            ]}
            rows={filtered.map((a) => ({
              id: a.id,
              cells: {
                id: <strong className="text-foreground">{a.id} ({a.type})</strong>,
                site: a.site ? `Site ${a.site}` : "Unassigned Depot",
                status: <StatusPill status={a.status} />,
                days: `${a.operatingDays} days`,
                engine: `${(a.engineHrsPerDay * a.operatingDays).toFixed(1)} hrs`,
                idle: `${(a.idleHrsPerDay * a.operatingDays).toFixed(1)} hrs`,
                util: <strong className="text-foreground">{a.utilizationPct}%</strong>,
              },
            }))}
          />
        </Panel>
      </div>
    </Shell>
  );
}
