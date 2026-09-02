import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Gauge,
  Bell,
  TrendingUp,
  AlertTriangle,
  Search,
  Sparkles,
  User,
  Building2,
} from "lucide-react";
import { useFleet, summary, setAppMode, type AppMode } from "@/data/fleet";
import { CommandPalette } from "@/components/CommandPalette";
import { NotificationCenter } from "@/components/NotificationCenter";
import { AIAssistantModal } from "@/components/AIAssistantModal";
import { ActionSheet } from "@/components/ActionSheet";
import { AuthModal } from "@/components/AuthModal";
import { CustomerPortal } from "@/components/CustomerPortal";
import { RentalOperationsCenter } from "@/components/RentalOperationsCenter";
import { OptimizationCenter } from "@/components/OptimizationCenter";
import { PlanningWorkspace } from "@/components/PlanningWorkspace";
import { Toaster } from "sonner";

const TABS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/check", label: "Check-In/Out", icon: ArrowLeftRight },
  { to: "/usage", label: "Usage", icon: Gauge },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/forecast", label: "Forecast", icon: TrendingUp },
  { to: "/anomalies", label: "Anomalies", icon: AlertTriangle },
] as const;

export function Shell({
  crumb,
  children,
}: {
  crumb: string;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { assets, appMode, currentUser, activeActionPlan } = useFleet();
  const s = summary(assets);

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      {/* ── Primary Top Bar ── */}
      <header className="sticky top-0 z-30 border-b border-black/[0.06] bg-white/90 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center gap-3 px-5 sm:px-8">

          {/* ── Brand Identity ── */}
          <div className="flex shrink-0 items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-foreground shadow-apple-sm">
              <span className="h-3 w-3 rounded-full bg-accent" />
            </div>
            <div className="hidden sm:flex flex-col leading-none min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-bold tracking-tight text-foreground">RentSense</span>
                <span className="text-border/80 text-[11px]">/</span>
                <span className="text-[12px] font-medium text-foreground/60 truncate">{crumb}</span>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground/70 tracking-wide">
                {currentUser.role === "customer" ? "Customer Portal" : "Equipment OS"}
              </span>
            </div>
          </div>

          {/* ── Nav Tabs — staff only, centered ── */}
          {currentUser.role !== "customer" && (
            <nav className="hidden lg:flex flex-1 items-center justify-center min-w-0">
              <div className="flex items-center gap-px rounded-[14px] bg-black/[0.04] p-1 border border-black/[0.06]">
                {TABS.map((t) => {
                  const active = pathname === t.to && appMode === "tower";
                  const Icon = t.icon;
                  return (
                    <Link
                      key={t.to}
                      to={t.to}
                      onClick={() => setAppMode("tower")}
                      className={`flex items-center gap-1.5 rounded-[10px] px-3 py-1.5 text-[12px] transition-all duration-150 whitespace-nowrap select-none ${
                        active
                          ? "bg-accent text-accent-foreground font-bold shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                          : "font-medium text-foreground/55 hover:text-foreground hover:bg-white/80"
                      }`}
                    >
                      <Icon size={12.5} strokeWidth={active ? 2.3 : 1.9} />
                      {t.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          )}

          {/* Spacer for customer */}
          {currentUser.role === "customer" && <div className="flex-1" />}

          {/* ── Right Actions ── */}
          <div className="flex shrink-0 items-center gap-1.5 ml-auto">

            {/* Spotlight search */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden md:flex items-center gap-1.5 rounded-[10px] border border-black/[0.08] bg-black/[0.03] px-2.5 py-1.5 text-[11.5px] font-medium text-foreground/50 hover:text-foreground hover:bg-white hover:border-black/[0.12] transition-all"
            >
              <Search size={12} strokeWidth={2} />
              <span>Search</span>
              <kbd className="rounded-md bg-white border border-black/[0.08] px-1.5 py-px text-[9.5px] font-mono text-foreground/40 shadow-apple-xs">⌘K</kbd>
            </button>

            {/* AI Copilot — uses foreground (dark) so lime active tab stays singular accent */}
            <button
              onClick={() => setAiOpen(true)}
              className="flex items-center gap-1.5 rounded-[10px] bg-foreground px-3 py-1.5 text-[12px] font-semibold text-background hover:opacity-80 active:scale-[0.97] transition-all shadow-apple-xs"
            >
              <Sparkles size={12} className="text-accent" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>

            {/* Notifications */}
            <button
              onClick={() => setNotifOpen(true)}
              className="relative flex h-8 w-8 items-center justify-center rounded-[10px] border border-black/[0.08] bg-white text-foreground/50 hover:text-foreground hover:bg-muted/40 transition-all shadow-apple-xs"
            >
              <Bell size={13} strokeWidth={1.9} />
              {s.flagged > 0 && (
                <span className="absolute top-1.5 right-1.5 h-[5px] w-[5px] rounded-full bg-danger" />
              )}
            </button>

            {/* User profile */}
            <button
              onClick={() => setAuthOpen(true)}
              className="flex items-center gap-2 rounded-[10px] border border-black/[0.08] bg-white pl-1.5 pr-2.5 py-1.5 hover:border-black/[0.14] hover:bg-muted/20 transition-all shadow-apple-xs"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-foreground text-background font-bold text-[10px]">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden md:block text-left leading-none">
                <span className="text-[11.5px] font-semibold text-foreground block">
                  {currentUser.name.split(" ")[0]}
                </span>
                <span className="text-[9.5px] text-foreground/40 uppercase tracking-widest font-medium block mt-px">
                  {currentUser.role === "rental_staff"
                    ? "Staff"
                    : currentUser.role === "supervisor_admin"
                    ? "Supervisor"
                    : "Customer"}
                </span>
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* ── Secondary Live Status Bar ── */}
      <div className="sticky top-14 z-20 border-b border-black/[0.05] bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-8 h-9">

          {/* Fleet telemetry */}
          <div className="flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ok/10 border border-ok/20 px-2 py-0.5 font-semibold text-ok">
              <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse" />
              Live
            </span>
            <div className="hidden sm:flex items-center gap-3 text-foreground/50 tabular-nums">
              <span>
                <strong className="text-foreground font-semibold">{s.active}</strong> Active
              </span>
              <span className="text-border">·</span>
              <span>
                <strong className="text-foreground font-semibold">{s.idle}</strong> Idle
              </span>
              {s.overdue > 0 && (
                <>
                  <span className="text-border">·</span>
                  <span className="text-danger font-semibold">{s.overdue} Overdue</span>
                </>
              )}
              <span className="text-border">·</span>
              <span>
                Avg <strong className="text-foreground font-semibold">{s.avg}%</strong> util
              </span>
            </div>
          </div>

          {/* Mode switcher */}
          <div className="flex items-center gap-px rounded-[10px] bg-black/[0.04] p-0.5 border border-black/[0.06] text-[11px]">
            {currentUser.role === "rental_staff" || currentUser.role === "supervisor_admin" ? (
              <>
                <button
                  onClick={() => setAppMode("tower")}
                  className={`rounded-[8px] px-3 py-1 font-semibold transition-all ${
                    appMode === "tower"
                      ? "bg-white text-foreground shadow-apple-xs"
                      : "text-foreground/45 hover:text-foreground"
                  }`}
                >
                  Control Tower
                </button>
                <button
                  onClick={() => setAppMode("rental_ops")}
                  className={`flex items-center gap-1 rounded-[8px] px-3 py-1 font-semibold transition-all ${
                    appMode === "rental_ops"
                      ? "bg-foreground text-background shadow-apple-xs"
                      : "text-foreground/45 hover:text-foreground"
                  }`}
                >
                  <Building2 size={10.5} />
                  Rental Ops
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAppMode("customer_portal")}
                  className={`flex items-center gap-1 rounded-[8px] px-3 py-1 font-semibold transition-all ${
                    appMode === "customer_portal"
                      ? "bg-accent text-accent-foreground shadow-apple-xs"
                      : "text-foreground/45 hover:text-foreground"
                  }`}
                >
                  <User size={10.5} />
                  My Portal
                </button>
                <button
                  onClick={() => setAppMode("optimizer")}
                  className={`flex items-center gap-1 rounded-[8px] px-3 py-1 font-semibold transition-all ${
                    appMode === "optimizer"
                      ? "bg-white text-foreground shadow-apple-xs"
                      : "text-foreground/45 hover:text-foreground"
                  }`}
                >
                  <Sparkles size={10.5} />
                  Optimizer
                </button>
                <button
                  onClick={() => setAppMode("planning")}
                  className={`rounded-[8px] px-3 py-1 font-semibold transition-all ${
                    appMode === "planning"
                      ? "bg-white text-foreground shadow-apple-xs"
                      : "text-foreground/45 hover:text-foreground"
                  }`}
                >
                  Planning
                </button>
              </>
            )}
          </div>

        </div>
      </div>

      {/* ── Main Operational Canvas ── */}
      <main className="flex-1 px-5 sm:px-8 py-6 max-w-[1600px] w-full mx-auto animate-fade-in">
        {appMode === "customer_portal" ? (
          <CustomerPortal />
        ) : appMode === "rental_ops" ? (
          <RentalOperationsCenter />
        ) : appMode === "optimizer" ? (
          <OptimizationCenter />
        ) : appMode === "planning" ? (
          <PlanningWorkspace />
        ) : (
          children
        )}
      </main>

      {/* ── Global Modals & Toast Provider ── */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <NotificationCenter isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
      <AIAssistantModal isOpen={aiOpen} onClose={() => setAiOpen(false)} />
      <ActionSheet />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
