import { useState } from "react";
import { useFleet, selectAsset, openActionSheet, isOverdue } from "@/data/fleet";
import { Bell, AlertTriangle, Sparkles, Clock, CheckCircle2, ArrowRight, X } from "lucide-react";

export function NotificationCenter({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { assets, optimizationPlans } = useFleet();
  const [activeCategory, setActiveCategory] = useState<"all" | "critical" | "actions" | "ai">("all");

  if (!isOpen) return null;

  const overdueAssets = assets.filter((a) => isOverdue(a));
  const unassignedAssets = assets.filter((a) => a.status === "Unassigned");
  const lowUtilAssets = assets.filter((a) => a.utilizationPct < 25 && a.status !== "Unassigned");

  const notifications = [
    ...overdueAssets.map((a) => ({
      id: `notif-od-${a.id}`,
      category: "critical" as const,
      title: `${a.id} (${a.type}) Rental Overdue`,
      detail: `Contract ended on ${a.checkIn}. Currently parked at ${a.location}.`,
      time: "Immediate Action",
      icon: AlertTriangle,
      color: "text-danger bg-danger/10",
      actionLabel: "Schedule Return",
      onAction: () => {
        selectAsset(a.id);
        onClose();
      },
    })),
    ...optimizationPlans.map((p) => ({
      id: `notif-opt-${p.id}`,
      category: "ai" as const,
      title: `AI Optimization: ${p.title}`,
      detail: p.why,
      time: "2h ago",
      icon: Sparkles,
      color: "text-accent-foreground bg-accent",
      actionLabel: "Review Plan",
      onAction: () => {
        openActionSheet(p);
        onClose();
      },
    })),
    ...unassignedAssets.map((a) => ({
      id: `notif-un-${a.id}`,
      category: "actions" as const,
      title: `${a.id} is Unassigned in Yard`,
      detail: `Logging 12 idle hrs/day with 0% utilization. Available for dispatch.`,
      time: "Today",
      icon: Clock,
      color: "text-warn bg-warn/15",
      actionLabel: "Assign Site",
      onAction: () => {
        selectAsset(a.id);
        onClose();
      },
    })),
  ];

  const filteredNotifs =
    activeCategory === "all"
      ? notifications
      : notifications.filter((n) => n.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-foreground/15 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-sm overflow-hidden rounded-[26px] border border-border/80 bg-white p-5 shadow-float animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground">
              <Bell size={14} />
            </div>
            <h3 className="text-[15px] font-bold tracking-tight text-foreground">Notifications</h3>
            <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
              {notifications.length}
            </span>
          </div>

          <button onClick={onClose} className="rounded-full p-1 text-muted-foreground hover:bg-muted">
            <X size={15} />
          </button>
        </div>

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
        <div className="mt-3 max-h-[420px] space-y-2.5 overflow-y-auto pr-1">
          {filteredNotifs.length === 0 ? (
            <p className="py-8 text-center text-[12.5px] text-muted-foreground">All operational tasks cleared.</p>
          ) : (
            filteredNotifs.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className="group rounded-2xl border border-border/70 bg-card p-3.5 shadow-xs transition-all hover:border-border hover:shadow-apple-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${n.color}`}>
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[12.5px] font-bold text-foreground leading-snug">{n.title}</h4>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{n.time}</span>
                      </div>
                      <p className="mt-1 text-[11.5px] text-muted-foreground leading-relaxed line-clamp-2">{n.detail}</p>
                      <button
                        onClick={n.onAction}
                        className="mt-2.5 flex items-center gap-1 rounded-full bg-muted/80 px-3 py-1 text-[11px] font-bold text-foreground transition-colors hover:bg-foreground hover:text-background"
                      >
                        {n.actionLabel}
                        <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
