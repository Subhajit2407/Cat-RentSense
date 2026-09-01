import { useState } from "react";
import { type Asset, SITES_META, reassignAsset, openActionSheet, useFleet } from "@/data/fleet";
import { EquipmentHero } from "@/components/EquipmentHero";
import { StatusPill } from "@/components/Table";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  User,
  Calendar,
  Fuel,
  Activity,
  ChevronDown,
  ChevronUp,
  Clock,
  ShieldAlert,
  Sliders,
  History as HistoryIcon,
} from "lucide-react";

export function AssetInspector({
  asset,
  activeTab,
  onTabChange,
}: {
  asset: Asset;
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const { optimizationPlans } = useFleet();
  const [expandedSections, setExpandedSections] = useState({
    telemetry: true,
    rental: true,
    financial: false,
  });

  const toggleSection = (s: "telemetry" | "rental" | "financial") => {
    setExpandedSections((prev) => ({ ...prev, [s]: !prev[s] }));
  };

  const matchingPlan = optimizationPlans.find((p) => p.assetId === asset.id);

  // Generate contextual "Why this matters" AI insight
  const getAIInsight = () => {
    if (asset.utilizationPct === 0 && asset.status === "Unassigned") {
      return "EQX1007 has logged 0 engine hours with 12 idle hrs/day while Site S003 demand is rising. Redeployment will yield +72% utilization.";
    }
    if (asset.status === "Overdue") {
      return "Contract expired on " + asset.checkIn + " (41 days overdue). Continuing off-contract accumulates unwanted rental and standby costs.";
    }
    if (asset.utilizationPct >= 95) {
      return "Continuous high utilization with 0 idle hours. Recommend scheduling routine maintenance interval to prevent field breakdown.";
    }
    if (asset.utilizationPct < 25) {
      return "Low utilization pattern detected (" + asset.utilizationPct + "%). Idle ratio is high relative to operating cost.";
    }
    return "Operational parameters within normal nominal ranges. Telemetry reporting healthy engine-to-idle duty cycle.";
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Top Identity Header */}
      <div className="px-6 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
              {asset.type} · {asset.serialNumber}
            </span>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">{asset.id}</h2>
              <StatusPill status={asset.status} />
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-[12px] text-muted-foreground">
              <MapPin size={12} className="text-muted-foreground" />
              {asset.location}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10.5px] uppercase font-semibold text-muted-foreground">Utilization</span>
            <p className="text-2xl font-black tracking-tight text-foreground tabular-nums">
              {asset.utilizationPct}%
            </p>
          </div>
        </div>
      </div>

      {/* Hero Machine 3D Viewport */}
      <div className="px-6 py-2">
        <div className="relative rounded-[24px] border border-border/60 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40 p-4 shadow-apple-xs">
          <EquipmentHero asset={asset} showTelemetryHUD={true} />
        </div>
      </div>

      {/* Navigation Sub-Tabs: Overview, Planning, Distribution, Statistics, History */}
      <div className="px-6 pt-3">
        <div className="flex items-center gap-1 border-b border-border/60 pb-2">
          {["Overview", "Planning", "Statistics", "History"].map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`rounded-full px-3.5 py-1 text-[12px] font-medium transition-all ${
                activeTab === tab
                  ? "bg-foreground text-background shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Panels */}
      <div className="flex-1 px-6 py-4 space-y-4 text-[13px]">
        {activeTab === "Overview" && (
          <>
            {/* Contextual AI "Why this matters" Card */}
            <div className="rounded-2xl border border-accent/70 bg-accent/20 p-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-accent-foreground">
                  <Sparkles size={13} />
                  Operational AI Insight
                </div>
                {matchingPlan && (
                  <button
                    onClick={() => openActionSheet(matchingPlan)}
                    className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[10.5px] font-bold text-accent-foreground shadow-2xs hover:opacity-90"
                  >
                    Action Plan <ArrowRight size={10} />
                  </button>
                )}
              </div>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-accent-foreground/90 font-medium">
                {getAIInsight()}
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="rounded-xl border border-border/60 bg-card p-2.5">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">Engine/day</span>
                <p className="text-base font-bold text-foreground tabular-nums">{asset.engineHrsPerDay}h</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-2.5">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">Idle/day</span>
                <p className="text-base font-bold text-foreground tabular-nums">{asset.idleHrsPerDay}h</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-2.5">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">Operating</span>
                <p className="text-base font-bold text-foreground tabular-nums">{asset.operatingDays}d</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-2.5">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">Fuel Tank</span>
                <p className="text-base font-bold text-foreground tabular-nums">{asset.fuelPct}%</p>
              </div>
            </div>

            {/* Telemetry Sparkline & Trend */}
            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <div className="flex items-center justify-between pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  7-Day Utilization Trend
                </span>
                <span className="text-[11px] font-semibold text-ok flex items-center gap-1">
                  <TrendingUp size={12} /> Live Sync
                </span>
              </div>
              <div className="flex items-end gap-2 h-14 pt-2">
                {asset.telemetryTrend.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md bg-accent transition-all hover:opacity-80"
                      style={{ height: `${Math.max((val / 100) * 44, 4)}px` }}
                      title={`Day ${i + 1}: ${val}%`}
                    />
                    <span className="text-[9px] text-muted-foreground">D{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignment & Rental Window Group */}
            <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-border/50">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Assignment &amp; Rental Period
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[10.5px] text-muted-foreground">Current Operator</span>
                  <p className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                    <User size={13} className="text-muted-foreground" />
                    {asset.operator ?? "Unassigned"}
                  </p>
                </div>
                <div>
                  <span className="text-[10.5px] text-muted-foreground">Active Site</span>
                  <p className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                    <MapPin size={13} className="text-muted-foreground" />
                    {asset.site ? `Site ${asset.site}` : "Staging Yard"}
                  </p>
                </div>
                <div>
                  <span className="text-[10.5px] text-muted-foreground">Check-Out Date</span>
                  <p className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                    <Calendar size={13} className="text-muted-foreground" />
                    {asset.checkOut}
                  </p>
                </div>
                <div>
                  <span className="text-[10.5px] text-muted-foreground">Check-In Due</span>
                  <p className="font-semibold text-foreground flex items-center gap-1 mt-0.5">
                    <Clock size={13} className="text-muted-foreground" />
                    {asset.checkIn}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "Planning" && (
          <div className="space-y-3">
            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <h4 className="text-[12px] font-bold text-foreground">Operational Planning Forecast</h4>
              <p className="mt-1 text-[12px] text-muted-foreground leading-relaxed">
                Projected redeployment profile for {asset.id} based on regional civil construction demand.
              </p>

              <div className="mt-4 rounded-xl border border-border/60 bg-muted/30 p-3 text-[12px] space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recommended Destination</span>
                  <strong className="text-foreground">Site S003 (Bhopal Metro)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transit Distance</span>
                  <strong className="text-foreground">142 km (~2.5 hrs flatbed)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target Project Phase</span>
                  <strong className="text-foreground">Deep Trench Excavation</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Utilization Delta</span>
                  <strong className="text-ok">+18% fleet average (+72% on machine)</strong>
                </div>
              </div>

              {matchingPlan && (
                <button
                  onClick={() => openActionSheet(matchingPlan)}
                  className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[12.5px] font-bold text-accent-foreground shadow-xs hover:opacity-95"
                >
                  <Sparkles size={14} /> Open AI Action Proposal
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "Statistics" && (
          <div className="space-y-3">
            <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-3">
              <h4 className="text-[12px] font-bold text-foreground">Detailed Telemetric Breakdown</h4>
              <div className="space-y-2 text-[12px]">
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Total Accumulated Engine Time</span>
                  <strong className="text-foreground tabular-nums">
                    {(asset.engineHrsPerDay * asset.operatingDays).toFixed(1)} hrs
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Total Accumulated Idle Time</span>
                  <strong className="text-foreground tabular-nums">
                    {(asset.idleHrsPerDay * asset.operatingDays).toFixed(1)} hrs
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Idle-to-Engine Ratio</span>
                  <strong className="text-foreground tabular-nums">
                    {asset.engineHrsPerDay > 0
                      ? (asset.idleHrsPerDay / asset.engineHrsPerDay).toFixed(2)
                      : "Infinite (100% idle)"}
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Estimated Fuel Consumed</span>
                  <strong className="text-foreground tabular-nums">
                    {(asset.engineHrsPerDay * asset.operatingDays * 14.5).toFixed(0)} Liters
                  </strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Mechanical Condition Index</span>
                  <strong className="text-ok">98.4% (Nominal)</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "History" && (
          <div className="space-y-3">
            <h4 className="text-[12px] font-bold text-foreground px-1">Auditable Rental &amp; Event Log</h4>
            <div className="relative pl-6 space-y-4 border-l-2 border-border/60 ml-2">
              {asset.history.map((h) => (
                <div key={h.id} className="relative group">
                  {/* Timeline bullet dot */}
                  <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-foreground shadow-xs" />
                  <div className="rounded-2xl border border-border/60 bg-card p-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <h5 className="text-[12px] font-bold text-foreground">{h.title}</h5>
                      <span className="text-[10px] text-muted-foreground">{h.time}</span>
                    </div>
                    <p className="mt-1 text-[11.5px] text-muted-foreground leading-relaxed">{h.detail}</p>
                    {h.site && (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-foreground">
                        Site {h.site} {h.operator ? `· Op: ${h.operator}` : ""}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
