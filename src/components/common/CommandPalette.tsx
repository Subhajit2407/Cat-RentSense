import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useFleet, selectAsset, selectSite, openActionSheet, setAppMode, type Asset } from "@/data/fleet";
import { Search, LayoutDashboard, ArrowLeftRight, Gauge, Bell, TrendingUp, AlertTriangle, Sparkles, MapPin, Wrench, X, Command } from "lucide-react";

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const { assets, optimizationPlans } = useFleet();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery("");
          // Open trigger can be controlled by parent or shortcut
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredAssets = assets.filter(
    (a) =>
      a.id.toLowerCase().includes(query.toLowerCase()) ||
      a.type.toLowerCase().includes(query.toLowerCase()) ||
      (a.site && a.site.toLowerCase().includes(query.toLowerCase())) ||
      (a.operator && a.operator.toLowerCase().includes(query.toLowerCase())),
  );

  const actions = [
    {
      id: "act-opt",
      label: "Optimize Current Fleet (AI Recommendations)",
      icon: Sparkles,
      color: "text-brand",
      run: () => {
        if (optimizationPlans[0]) openActionSheet(optimizationPlans[0]);
        navigate({ to: "/" });
        onClose();
      },
    },
    {
      id: "act-planning",
      label: "Open Operational Planning Workspace",
      icon: LayoutDashboard,
      color: "text-foreground",
      run: () => {
        setAppMode("planning");
        navigate({ to: "/" });
        onClose();
      },
    },
    {
      id: "act-overdue",
      label: "View Overdue Assets (Alerts Command Center)",
      icon: Bell,
      color: "text-danger",
      run: () => {
        navigate({ to: "/alerts" });
        onClose();
      },
    },
    {
      id: "act-forecast",
      label: "View Demand Forecast & Gap Analysis",
      icon: TrendingUp,
      color: "text-ok",
      run: () => {
        navigate({ to: "/forecast" });
        onClose();
      },
    },
    {
      id: "act-anomalies",
      label: "Inspect Telemetry Anomalies",
      icon: AlertTriangle,
      color: "text-warn-foreground",
      run: () => {
        navigate({ to: "/anomalies" });
        onClose();
      },
    },
    {
      id: "act-checkout",
      label: "New Equipment Check-In / Check-Out",
      icon: ArrowLeftRight,
      color: "text-foreground",
      run: () => {
        navigate({ to: "/check" });
        onClose();
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-foreground/25 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[26px] border border-border/80 bg-white shadow-float animate-scale-in">
        {/* Search input header */}
        <div className="flex items-center gap-3 border-b border-border/70 px-5 py-4">
          <Search size={18} className="text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets, sites, operators, or AI actions (e.g. EQX1007, S003, Optimize)..."
            className="w-full bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-1 rounded-md border border-border/80 bg-muted/50 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            <Command size={10} /> K
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-muted-foreground hover:bg-muted">
            <X size={16} />
          </button>
        </div>

        {/* Content list */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-4 text-[13px]">
          {/* Quick Actions */}
          <div>
            <span className="px-3 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Operational Actions
            </span>
            <div className="mt-1 space-y-1">
              {actions
                .filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))
                .map((a) => {
                  const Icon = a.icon;
                  return (
                    <div
                      key={a.id}
                      onClick={a.run}
                      className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 cursor-pointer hover:bg-muted/60 transition-colors"
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-muted/80 ${a.color}`}>
                        <Icon size={16} />
                      </div>
                      <span className="font-medium text-foreground">{a.label}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Fleet Assets */}
          <div>
            <span className="px-3 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Equipment Fleet ({filteredAssets.length})
            </span>
            <div className="mt-1 space-y-1">
              {filteredAssets.map((a) => (
                <div
                  key={a.id}
                  onClick={() => {
                    selectAsset(a.id);
                    navigate({ to: "/" });
                    onClose();
                  }}
                  className="flex items-center justify-between rounded-2xl px-3.5 py-2.5 cursor-pointer hover:bg-muted/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground font-bold text-[11px]">
                      {a.type.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{a.id}</span>
                        <span className="text-muted-foreground">· {a.type}</span>
                      </div>
                      <p className="text-[11.5px] text-muted-foreground">
                        {a.site ? `Site ${a.site}` : "Unassigned"} · {a.operator ?? "No operator"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 tabular-nums text-right">
                    <div>
                      <span className="font-bold text-foreground">{a.utilizationPct}%</span>
                      <p className="text-[10px] uppercase text-muted-foreground">utilization</p>
                    </div>
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        a.status === "Active" ? "bg-ok" : a.status === "Idle" ? "bg-warn" : "bg-danger"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
