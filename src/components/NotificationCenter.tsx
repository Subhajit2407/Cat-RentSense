import { useState } from "react";
import {
  useFleet,
  selectAsset,
  openActionSheet,
  isOverdue,
  updateNotificationPreferences,
  hasNotificationBeenSent,
} from "@/data/fleet";
import { sendAlertActionNotification, DEFAULT_ALERT_EMAIL } from "@/lib/email/notify";
import {
  Bell,
  AlertTriangle,
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  X,
  SlidersHorizontal,
  Mail,
  ShieldCheck,
  Check,
} from "lucide-react";

export function NotificationCenter({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { assets, optimizationPlans, notificationPreferences, notificationsLog } = useFleet();
  const [activeTab, setActiveTab] = useState<"alerts" | "preferences" | "history">("alerts");
  const [activeCategory, setActiveCategory] = useState<"all" | "critical" | "ai" | "actions">("all");

  if (!isOpen) return null;

  const overdueAssets = assets.filter((a) => isOverdue(a));
  const unassignedAssets = assets.filter((a) => a.status === "Unassigned");

  const notifications = [
    ...overdueAssets.map((a) => {
      const alertId = `${a.id}-od`;
      const isEmailed = hasNotificationBeenSent(alertId);
      return {
        id: `notif-od-${a.id}`,
        alertId,
        category: "critical" as const,
        title: `${a.id} (${a.type}) Rental Overdue`,
        detail: `Contract ended on ${a.checkIn}. Currently parked at ${a.location}.`,
        time: "Immediate Action",
        icon: AlertTriangle,
        color: "text-danger bg-danger/10",
        actionLabel: "Take Action",
        emailed: isEmailed,
        onAction: async () => {
          await sendAlertActionNotification({
            alertId,
            alertType: "Overdue",
            severity: "critical",
            title: `${a.id} Rental Overdue`,
            signal: `Contract return date ${a.checkIn} has passed`,
            impact: "Escrow security deposit held; standby penalty accruing",
            action: "Initiate return dispatch & schedule post-rental inspection",
            assetId: a.id,
          });
          selectAsset(a.id);
          onClose();
        },
      };
    }),
    ...optimizationPlans.map((p) => ({
      id: `notif-opt-${p.id}`,
      alertId: p.id,
      category: "ai" as const,
      title: `Optimization: ${p.title}`,
      detail: p.why,
      time: "2h ago",
      icon: Sparkles,
      color: "text-accent-foreground bg-accent",
      actionLabel: "Review Plan",
      emailed: hasNotificationBeenSent(p.id),
      onAction: async () => {
        await sendAlertActionNotification({
          alertId: p.id,
          alertType: "Forecast",
          severity: "warning",
          title: p.title,
          signal: p.why,
          impact: p.expectedImpact,
          action: p.whatWillChange,
          assetId: p.assetId,
        });
        openActionSheet(p);
        onClose();
      },
    })),
    ...unassignedAssets.map((a) => {
      const alertId = `${a.id}-un`;
      const isEmailed = hasNotificationBeenSent(alertId);
      return {
        id: `notif-un-${a.id}`,
        alertId,
        category: "actions" as const,
        title: `${a.id} is Unassigned in Yard`,
        detail: `Logging 12 idle hrs/day with 0% utilization. Available for dispatch.`,
        time: "Today",
        icon: Clock,
        color: "text-warn bg-warn/15",
        actionLabel: "Take Action",
        emailed: isEmailed,
        onAction: async () => {
          await sendAlertActionNotification({
            alertId,
            alertType: "Unassigned",
            severity: "warning",
            title: `${a.id} Unassigned in Yard`,
            signal: `${a.idleHrsPerDay} idle hrs/day logged`,
            impact: "Zero asset ROI while regional sites report capacity deficit",
            action: "Reassign & pre-position to nearest high-demand site",
            assetId: a.id,
          });
          selectAsset(a.id);
          onClose();
        },
      };
    }),
  ];

  const filteredNotifs =
    activeCategory === "all"
      ? notifications
      : notifications.filter((n) => n.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-foreground/15 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-border/80 bg-white p-5 shadow-float animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground">
              <Bell size={14} />
            </div>
            <h3 className="text-[15px] font-bold tracking-tight text-foreground">Command Center</h3>
            <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
              {notifications.length}
            </span>
          </div>

          <button onClick={onClose} className="rounded-full p-1 text-muted-foreground hover:bg-muted">
            <X size={15} />
          </button>
        </div>

        {/* Top View Selector (Alerts / Preferences / Email History) */}
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-muted/60 p-1 text-[11px] font-semibold">
          <button
            onClick={() => setActiveTab("alerts")}
            className={`rounded-lg py-1 transition-all ${
              activeTab === "alerts"
                ? "bg-white text-foreground shadow-xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Live Alerts
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`flex items-center justify-center gap-1 rounded-lg py-1 transition-all ${
              activeTab === "preferences"
                ? "bg-white text-foreground shadow-xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail size={11} /> Preferences
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center justify-center gap-1 rounded-lg py-1 transition-all ${
              activeTab === "history"
                ? "bg-white text-foreground shadow-xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Log ({notificationsLog.length})
          </button>
        </div>

        {activeTab === "alerts" && (
          <div>
            {/* Category Filter Pills */}
            <div className="mt-3 flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
              {(
                [
                  { id: "all", label: "All" },
                  { id: "critical", label: "Critical" },
                  { id: "ai", label: "AI Plans" },
                  { id: "actions", label: "Actions" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`rounded-full px-3 py-1 font-medium transition-all ${
                    activeCategory === tab.id
                      ? "bg-foreground text-background shadow-xs"
                      : "bg-muted/70 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Notification Cards List */}
            <div className="mt-3 max-h-[380px] space-y-2.5 overflow-y-auto pr-1">
              {filteredNotifs.length === 0 ? (
                <p className="py-8 text-center text-[12.5px] text-muted-foreground">
                  All operational tasks cleared.
                </p>
              ) : (
                filteredNotifs.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.id}
                      className="group rounded-2xl border border-border/70 bg-card p-3.5 shadow-xs transition-all hover:border-border hover:shadow-apple-sm"
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${n.color}`}
                        >
                          <Icon size={14} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[12.5px] font-bold text-foreground leading-snug">
                              {n.title}
                            </h4>
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                              {n.time}
                            </span>
                          </div>
                          <p className="mt-1 text-[11.5px] text-muted-foreground leading-relaxed line-clamp-2">
                            {n.detail}
                          </p>

                          <div className="mt-2.5 flex items-center justify-between gap-2">
                            <button
                              onClick={n.onAction}
                              className="flex items-center gap-1 rounded-full bg-muted/80 px-3 py-1 text-[11px] font-bold text-foreground transition-colors hover:bg-foreground hover:text-background"
                            >
                              {n.actionLabel}
                              <ArrowRight size={11} />
                            </button>

                            {n.emailed && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-ok">
                                <Mail size={10} /> Email Dispatched
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ── Tab: Email Notification Preferences ──────────────────────────── */}
        {activeTab === "preferences" && (
          <div className="mt-3 max-h-[380px] space-y-3 overflow-y-auto pr-1 text-[12px]">
            <div className="rounded-2xl border border-ok/30 bg-ok/5 p-3 text-[11.5px] text-foreground space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-ok">
                <ShieldCheck size={13} />
                <span>Resend Server-Side Integration</span>
              </div>
              <p className="text-[10.5px] text-muted-foreground">
                Alert actions trigger server-side delivery to: <strong className="text-foreground">{DEFAULT_ALERT_EMAIL}</strong>
              </p>
            </div>

            {/* Master Toggle */}
            <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/20 p-3">
              <div>
                <span className="font-bold text-foreground block">Email Notifications</span>
                <span className="text-[10.5px] text-muted-foreground">Master email switch</span>
              </div>
              <input
                type="checkbox"
                checked={notificationPreferences.emailEnabled}
                onChange={(e) => updateNotificationPreferences({ emailEnabled: e.target.checked })}
                className="h-4 w-4 rounded border-border accent-foreground cursor-pointer"
              />
            </div>

            {/* Category Toggles */}
            <div className="space-y-2 pt-1 border-t border-border/50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Alert Channels
              </span>

              {[
                {
                  key: "criticalAlerts" as const,
                  label: "Critical Fleet Alerts",
                  desc: "Urgent safety & operational blocks",
                },
                {
                  key: "overdueRentals" as const,
                  label: "Overdue & Return Due",
                  desc: "Past return date or due in <5 days",
                },
                {
                  key: "inspectionIssues" as const,
                  label: "Inspection Issues & Damage",
                  desc: "Condition defects & deposit deductions",
                },
                {
                  key: "unassignedEquipment" as const,
                  label: "Unassigned Yard Equipment",
                  desc: "Idle machinery without allocation",
                },
                {
                  key: "lowUtilization" as const,
                  label: "Low Utilization Alerts",
                  desc: "Assets under 25% duty cycle",
                },
                {
                  key: "forecastRecommendations" as const,
                  label: "Forecast Recommendations",
                  desc: "Site deficit redeployments",
                },
                {
                  key: "anomalies" as const,
                  label: "Telemetry Anomalies",
                  desc: "Night operations & abnormal idle",
                },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-card p-2.5 cursor-pointer hover:border-border transition-all"
                >
                  <div>
                    <span className="font-semibold text-foreground block text-[11.5px]">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{item.desc}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationPreferences[item.key]}
                    disabled={!notificationPreferences.emailEnabled}
                    onChange={(e) =>
                      updateNotificationPreferences({ [item.key]: e.target.checked })
                    }
                    className="h-3.5 w-3.5 rounded border-border accent-foreground cursor-pointer disabled:opacity-40"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Delivery History / Log ─────────────────────────────────── */}
        {activeTab === "history" && (
          <div className="mt-3 max-h-[380px] space-y-2.5 overflow-y-auto pr-1 text-[12px]">
            {notificationsLog.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <Mail size={24} className="mx-auto mb-1.5 opacity-40" />
                <p className="text-[12px]">No email notifications logged in this session.</p>
              </div>
            ) : (
              notificationsLog.map((log) => (
                <div
                  key={log.id}
                  className="rounded-xl border border-border/70 bg-card p-3 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground text-[11.5px] truncate">
                      {log.title}
                    </span>
                    <span className="rounded-full bg-ok/15 px-2 py-0.2 text-[9.5px] font-bold text-ok">
                      {log.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] text-muted-foreground">
                    <span>To: {log.recipient}</span>
                    <span>{log.sentAt}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
