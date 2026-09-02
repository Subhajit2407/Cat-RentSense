import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/common/Shell";
import { Panel } from "@/components/common/Panel";
import { Table, StatusPill } from "@/components/common/Table";
import { LeafletMap } from "@/components/fleet/LeafletMap";
import {
  useFleet,
  selectAsset,
  openActionSheet,
  snoozeAlert,
  resolveAlert,
} from "@/data/fleet";
import { buildAlerts, ALERT_TYPE_LABEL, type Alert } from "@/lib/alerts/engine";
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  BellOff,
  Sparkles,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alert Command Center — RentSense" },
      {
        name: "description",
        content: "Overdue rentals, low-utilization assets, and telemetry anomalies with 1-click operational actions.",
      },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const { assets, contracts, resolvedAlertIds, snoozedAlertIds, optimizationPlans } = useFleet();
  const [filterSeverity, setFilterSeverity] = useState<"all" | "critical" | "warning" | "info" | "resolved">("all");
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);

  // Same lib/alerts engine used by the Notification bell and Forecast page —
  // this is the one source of truth for alert counts across Smart Rental.
  const allAlerts = buildAlerts(assets, contracts);
  const activeAlerts = allAlerts.filter(
    (a) => !resolvedAlertIds.has(a.id) && !snoozedAlertIds.has(a.id),
  );

  const filteredAlerts =
    filterSeverity === "all"
      ? activeAlerts
      : filterSeverity === "resolved"
        ? allAlerts.filter((a) => resolvedAlertIds.has(a.id))
        : activeAlerts.filter((a) => a.severity === filterSeverity);

  const flaggedAssetIds = new Set(activeAlerts.map((a) => a.assetId));
  const flaggedAssets = assets.filter((a) => flaggedAssetIds.has(a.id));

  const handleToggleSelect = (id: string) => {
    setSelectedAlerts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleBulkResolve = () => {
    selectedAlerts.forEach((id) => resolveAlert(id));
    setSelectedAlerts([]);
  };

  return (
    <Shell crumb="Alert Command Center">
      <div className="space-y-5">
        {/* ── Top Command Bar & Filter Strip ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-border/70 bg-white p-5 shadow-panel">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-danger/15 text-danger font-bold">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">Alert Command Center</h2>
              <p className="text-[12.5px] text-muted-foreground">
                Triage operational exceptions, overdue returns, and low-efficiency equipment.
              </p>
            </div>
          </div>

          {/* Severity Segmented Filter */}
          <div className="flex items-center gap-1 rounded-full bg-muted/60 p-1 border border-border/60 text-[12px]">
            {(
              [
                { id: "all", label: `All Active (${activeAlerts.length})` },
                { id: "critical", label: "Critical" },
                { id: "warning", label: "Warning" },
                { id: "info", label: "Info" },
                { id: "resolved", label: `Resolved (${resolvedAlertIds.size})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterSeverity(tab.id)}
                className={`rounded-full px-3.5 py-1.5 font-semibold transition-all ${
                  filterSeverity === tab.id
                    ? "bg-white text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bulk Actions Strip (When alerts selected) ── */}
        {selectedAlerts.length > 0 && (
          <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-foreground p-3.5 text-background shadow-float animate-fade-in">
            <span className="text-[13px] font-bold px-2">
              {selectedAlerts.length} alert{selectedAlerts.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkResolve}
                className="flex items-center gap-1.5 rounded-full bg-ok px-4 py-1.5 text-[12px] font-bold text-white shadow-xs hover:opacity-95"
              >
                <CheckCircle2 size={14} /> Resolve Selected
              </button>
              <button
                onClick={() => setSelectedAlerts([])}
                className="rounded-full bg-white/20 px-3.5 py-1.5 text-[12px] font-semibold text-white hover:bg-white/30"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* ── Main 2-Column Layout (Alert Action Cards + Flagged Spatial Map) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 7 Columns: Actionable Alert Cards List */}
          <div className="lg:col-span-7 space-y-3.5">
            {filteredAlerts.length === 0 ? (
              <div className="rounded-[26px] border border-border/60 bg-white p-12 text-center text-muted-foreground">
                <CheckCircle2 size={36} className="mx-auto text-ok mb-2" />
                <h4 className="text-base font-bold text-foreground">No active alerts in this category</h4>
                <p className="text-[13px] mt-1">All equipment within nominal operational parameters.</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => {
                const isChecked = selectedAlerts.includes(alert.id);
                const matchingPlan = optimizationPlans.find((p) => p.assetId === alert.assetId);

                return (
                  <div
                    key={alert.id}
                    className={`rounded-[24px] border bg-card p-5 shadow-panel transition-all hover:shadow-widget ${
                      alert.severity === "critical"
                        ? "border-danger/40 bg-gradient-to-r from-danger/5 via-card to-card"
                        : "border-border/70"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(alert.id)}
                          className="mt-1 h-4 w-4 rounded border-border accent-foreground cursor-pointer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${
                                alert.severity === "critical"
                                  ? "bg-danger text-white"
                                  : alert.severity === "warning"
                                    ? "bg-warn text-warn-foreground"
                                    : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {ALERT_TYPE_LABEL[alert.type]}
                            </span>
                            <h3 className="text-[14px] font-bold text-foreground">{alert.title}</h3>
                          </div>
                          <p className="mt-1 text-[12px] text-muted-foreground">
                            <strong className="text-foreground">Signal:</strong> {alert.signal}
                          </p>
                          <p className="mt-1 text-[12px] text-muted-foreground">
                            <strong className="text-foreground">Impact:</strong> {alert.impact}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Operational Action Strip */}
                    <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[12px] font-bold text-foreground">
                        <Zap size={13} className="text-brand" />
                        Recommended: <span className="text-brand">{alert.recommendedAction}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => snoozeAlert(alert.id)}
                          title="Snooze alert"
                          className="flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1.5 text-[11.5px] font-medium text-muted-foreground hover:text-foreground shadow-2xs"
                        >
                          <BellOff size={12} /> Snooze
                        </button>
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1.5 text-[11.5px] font-semibold text-ok hover:bg-ok/10 shadow-2xs"
                        >
                          <CheckCircle2 size={12} /> Resolve
                        </button>
                        <button
                          onClick={() => {
                            if (matchingPlan) openActionSheet(matchingPlan);
                            else selectAsset(alert.assetId);
                          }}
                          className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[12px] font-bold text-accent-foreground shadow-xs hover:opacity-95"
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

          {/* Right 5 Columns: Flagged Assets Spatial Map */}
          <div className="lg:col-span-5">
            <Panel
              title={`Flagged Assets Topology (${flaggedAssets.length})`}
              subtitle="Geographic distribution of assets requiring operational attention"
              className="h-[560px]"
            >
              <LeafletMap
                assets={flaggedAssets}
                selectedId={flaggedAssets[0]?.id}
                onSelect={selectAsset}
              />
            </Panel>
          </div>
        </div>
      </div>
    </Shell>
  );
}
