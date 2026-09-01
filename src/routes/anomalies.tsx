import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Panel } from "@/components/Panel";
import { Table, StatusPill } from "@/components/Table";
import { useFleet, type Asset, selectAsset, openActionSheet, resolveAlert } from "@/data/fleet";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  Wrench,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/anomalies")({
  head: () => ({
    meta: [
      { title: "Anomaly Detection & Telemetric Intelligence — RentSense" },
      {
        name: "description",
        content: "Human-readable anomaly intelligence translating raw telemetry rules into actionable operational decisions.",
      },
    ],
  }),
  component: AnomaliesPage,
});

type HumanAnomaly = {
  key: string;
  asset: Asset;
  title: string;
  severity: "critical" | "warning" | "info";
  ruleExpression: string;
  detectedValue: string;
  possibleCause: string;
  recommendation: string;
};

function formatAnomaly(asset: Asset, rawAnomaly: string, idx: number): HumanAnomaly {
  if (rawAnomaly.includes("Zero engine runtime") || rawAnomaly.includes("0 engine")) {
    return {
      key: `${asset.id}-an-${idx}`,
      asset,
      title: "ZERO ENGINE RUNTIME RECORDED",
      severity: "critical",
      ruleExpression: "engineHrsPerDay == 0 over full operating window",
      detectedValue: `0.0 hrs engine × ${asset.operatingDays} operating days (${asset.idleHrsPerDay} idle hrs/day)`,
      possibleCause: "Asset is parked in holding yard or telemetric ignition sensor requires calibration.",
      recommendation: "Reassign machine to high-demand site or schedule off-hire return to eliminate idle standby costs.",
    };
  }
  if (rawAnomaly.includes("Continuous high utilization") || rawAnomaly.includes("no idle time")) {
    return {
      key: `${asset.id}-an-${idx}`,
      asset,
      title: "CONTINUOUS PEAK DUTY CYCLE (SERVICE DUE)",
      severity: "warning",
      ruleExpression: "utilizationPct >= 95% AND idleHrsPerDay == 0 across 30 days",
      detectedValue: `${asset.utilizationPct}% utilization · 8.0 hrs/day continuous heavy load`,
      possibleCause: "24/7 quarry earthmoving shift without recorded maintenance cooldown.",
      recommendation: "Schedule a preventative 50-hour hydraulic & track wear inspection before next deployment window.",
    };
  }
  if (rawAnomaly.includes("No site") || rawAnomaly.includes("No operator")) {
    return {
      key: `${asset.id}-an-${idx}`,
      asset,
      title: "UNASSIGNED ASSET IN STAGING FIELD",
      severity: "warning",
      ruleExpression: "site == null || operator == null while asset status != 'Idle'",
      detectedValue: `Site: ${asset.site ?? "None"} · Operator: ${asset.operator ?? "None"}`,
      possibleCause: "Off-contract returned to staging yard without formal dispatch booking.",
      recommendation: "Assign certified operator and dispatch to Site S003 to fill active regional demand deficit.",
    };
  }
  return {
    key: `${asset.id}-an-${idx}`,
    asset,
    title: rawAnomaly.toUpperCase(),
    severity: "info",
    ruleExpression: "custom telemetry threshold trigger",
    detectedValue: `${asset.utilizationPct}% utilization · ${asset.idleHrsPerDay}h idle`,
    possibleCause: "Operational anomaly detected by autonomous fleet monitoring rule.",
    recommendation: "Review asset telemetry logs and inspect machine condition.",
  };
}

function AnomaliesPage() {
  const { assets, optimizationPlans, resolvedAlertIds } = useFleet();
  const [selectedAnomalyKey, setSelectedAnomalyKey] = useState<string | null>(null);
  const [expandedRuleKey, setExpandedRuleKey] = useState<string | null>(null);

  const rawRows = assets.flatMap((a) =>
    (a.anomalies ?? []).map((an, i) => formatAnomaly(a, an, i)),
  );

  const activeRows = rawRows.filter((r) => !resolvedAlertIds.has(r.key));
  const selectedAnomaly = activeRows.find((r) => r.key === selectedAnomalyKey);

  const toggleRuleExpand = (key: string) => {
    setExpandedRuleKey((prev) => (prev === key ? null : key));
  };

  return (
    <Shell crumb="Telemetry Anomalies">
      <div className="space-y-5">
        {/* ── Top Header Banner ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-border/70 bg-white p-5 shadow-panel">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-warn/20 text-warn-foreground font-bold shadow-xs">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Autonomous Telemetry Anomaly Detection
              </h2>
              <p className="text-[12.5px] text-muted-foreground">
                Synthesizing real-time IoT sensors, duty cycles, and rule-based exceptions into human-readable decisions.
              </p>
            </div>
          </div>

          <span className="rounded-full bg-accent px-4 py-1.5 text-[12px] font-bold text-accent-foreground shadow-xs">
            {activeRows.length} Active Telemetry Exceptions
          </span>
        </div>

        {/* ── Main List of Anomalies ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 7 Columns: Human Anomaly Cards */}
          <div className="lg:col-span-7 space-y-4">
            {activeRows.length === 0 ? (
              <div className="rounded-[26px] border border-border/60 bg-white p-12 text-center text-muted-foreground">
                <CheckCircle2 size={36} className="mx-auto text-ok mb-2" />
                <h4 className="text-base font-bold text-foreground">All Telemetry Nominal</h4>
                <p className="text-[13px] mt-1">Zero rule violations detected across the active fleet.</p>
              </div>
            ) : (
              activeRows.map((item) => {
                const isExpanded = expandedRuleKey === item.key;
                const matchingPlan = optimizationPlans.find((p) => p.assetId === item.asset.id);

                return (
                  <div
                    key={item.key}
                    onClick={() => setSelectedAnomalyKey(item.key)}
                    className={`rounded-[24px] border bg-card p-5 shadow-panel transition-all cursor-pointer hover:shadow-widget ${
                      item.key === selectedAnomalyKey
                        ? "border-accent ring-2 ring-accent/50"
                        : "border-border/70"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${
                            item.severity === "critical"
                              ? "bg-danger text-white"
                              : "bg-warn text-warn-foreground"
                          }`}
                        >
                          {item.severity.toUpperCase()}
                        </span>
                        <h3 className="text-[14.5px] font-bold text-foreground tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-[12px] font-bold text-foreground">
                        {item.asset.id} · {item.asset.type}
                      </span>
                    </div>

                    {/* Detected Metrics */}
                    <div className="mt-3 rounded-2xl border border-border/60 bg-muted/20 p-3 text-[12px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Detected Telemetric Signal:</span>
                        <strong className="text-foreground">{item.detectedValue}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Likely Cause:</span>
                        <span className="text-foreground/90">{item.possibleCause}</span>
                      </div>
                    </div>

                    {/* Expandable "Why was this flagged?" */}
                    <div className="mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRuleExpand(item.key);
                        }}
                        className="flex items-center gap-1 text-[11.5px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        Why was this flagged? (Technical Rule Logic)
                      </button>

                      {isExpanded && (
                        <div className="mt-2 rounded-xl border border-border/70 bg-slate-900 text-slate-100 p-3 font-mono text-[11px] space-y-1 animate-fade-in">
                          <p className="text-accent font-semibold">// Autonomous telemetry trigger definition</p>
                          <p>
                            <span className="text-slate-400">RULE: </span>
                            {item.ruleExpression}
                          </p>
                          <p>
                            <span className="text-slate-400">EVAL: </span>
                            {item.detectedValue}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Strip */}
                    <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-brand flex items-center gap-1">
                        <Zap size={13} /> {item.recommendation}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            resolveAlert(item.key);
                          }}
                          className="rounded-full border border-border bg-white px-3 py-1.5 text-[11.5px] font-semibold text-ok hover:bg-ok/10"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (matchingPlan) openActionSheet(matchingPlan);
                            else selectAsset(item.asset.id);
                          }}
                          className="flex items-center gap-1 rounded-full bg-accent px-3.5 py-1.5 text-[11.5px] font-bold text-accent-foreground shadow-xs hover:opacity-95"
                        >
                          Take Action <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right 5 Columns: Selected Anomaly Deep-Dive Inspector */}
          <div className="lg:col-span-5">
            <Panel
              title="Telemetry Inspector &amp; Diagnostic Drawer"
              subtitle="Detailed sensor values and automated remediation actions"
            >
              {selectedAnomaly ? (
                <div className="p-6 space-y-4 text-[13px]">
                  <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
                      Target Equipment
                    </span>
                    <h3 className="text-lg font-bold text-foreground mt-0.5">
                      {selectedAnomaly.asset.id} — {selectedAnomaly.asset.type}
                    </h3>
                    <p className="text-[12px] text-muted-foreground mt-0.5">
                      Serial: {selectedAnomaly.asset.serialNumber} · Location: {selectedAnomaly.asset.location}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-2.5">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Live Telemetric Telemetry
                    </h4>
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">Engine Runtime:</span>
                      <strong className="text-foreground">{selectedAnomaly.asset.engineHrsPerDay} hrs/day</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">Idle Runtime:</span>
                      <strong className="text-foreground">{selectedAnomaly.asset.idleHrsPerDay} hrs/day</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">Fuel Tank Level:</span>
                      <strong className="text-foreground">{selectedAnomaly.asset.fuelPct}%</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Mechanical Condition:</span>
                      <strong className="text-foreground">{selectedAnomaly.asset.condition}</strong>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-accent/60 bg-accent/20 p-4">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
                      AI Action Recommendation
                    </h4>
                    <p className="mt-1 text-[12.5px] text-accent-foreground/90 font-medium leading-relaxed">
                      {selectedAnomaly.recommendation}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const plan = optimizationPlans.find((p) => p.assetId === selectedAnomaly.asset.id);
                      if (plan) openActionSheet(plan);
                      else selectAsset(selectedAnomaly.asset.id);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-[13px] font-bold text-background shadow-xs hover:opacity-95"
                  >
                    <Zap size={14} /> Mobilize Remediation Plan
                  </button>
                </div>
              ) : (
                <div className="p-12 text-center text-muted-foreground">
                  <p className="text-[13px]">Select any anomaly card on the left to inspect detailed telemetry diagnostics.</p>
                </div>
              )}
            </Panel>
          </div>
        </div>
      </div>
    </Shell>
  );
}
