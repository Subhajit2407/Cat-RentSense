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
  RefreshCw,
  Undo2,
  Redo2,
  Settings,
  User,
  Sliders,
  CheckCircle2,
  Clock,
  HelpCircle,
  Command,
  Building2,
  ShieldCheck,
  Truck,
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

const TABS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/check", label: "Check-In / Out", icon: ArrowLeftRight },
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
      {/* ── Global Cupertino Top Bar ── */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/70 bg-white/85 px-5 sm:px-8 backdrop-blur-xl transition-all">
        {/* Left: Brand Identity & Crumb */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-foreground text-background shadow-apple-sm">
            <span className="h-3.5 w-3.5 rounded-full bg-accent shadow-xs" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] font-bold tracking-tight text-foreground">RentSense</span>
              <span className="text-muted-foreground/60">/</span>
              <span className="text-[13px] font-semibold text-foreground/80">{crumb}</span>
            </div>
            <span className="text-[10.5px] font-medium text-muted-foreground">
              {currentUser.role === "customer" ? "Customer Rental Operating System" : "Equipment Control Tower & Admin OS"}
            </span>
          </div>
        </div>

        {/* Center: Main App Tabs (Only for Rental Staff / Admin) */}
        {currentUser.role !== "customer" && (
          <nav className="hidden lg:flex items-center gap-1 rounded-full bg-muted/60 p-1 border border-border/60 shadow-apple-xs">
            {TABS.map((t) => {
              const active = pathname === t.to && appMode === "tower";
              const Icon = t.icon;
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  onClick={() => setAppMode("tower")}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12.5px] transition-all duration-200 ${
                    active
                      ? "bg-accent font-bold text-accent-foreground shadow-xs scale-100"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/60"
                  }`}
                >
                  <Icon size={14} />
                  {t.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right: Operational Actions, Role Profile & Copilot */}
        <div className="flex items-center gap-2">
          {/* Spotlight Search button */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-3 py-1.5 text-[12px] text-muted-foreground hover:border-foreground hover:bg-white transition-all shadow-apple-xs"
          >
            <Search size={13} />
            <span className="hidden sm:inline">Spotlight</span>
            <kbd className="rounded bg-muted px-1.5 py-0.2 text-[10px] font-mono text-muted-foreground">⌘K</kbd>
          </button>

          {/* AI Copilot Button */}
          <button
            onClick={() => setAiOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-[12px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all"
          >
            <Sparkles size={13} />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          {/* Notifications Drawer Toggle */}
          <button
            onClick={() => setNotifOpen(true)}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-white text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors shadow-apple-xs"
          >
            <Bell size={14} />
            {s.flagged > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-danger animate-pulse" />
            )}
          </button>

          {/* Authenticated Role Profile Pill */}
          <button
            onClick={() => setAuthOpen(true)}
            className="flex items-center gap-2 rounded-full border border-border/80 bg-white pl-2 pr-3 py-1 text-[12px] text-foreground hover:border-foreground shadow-apple-xs transition-all"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background font-bold text-[10px]">
              {currentUser.name.charAt(0)}
            </div>
            <div className="text-left hidden md:block">
              <span className="font-bold text-[11.5px] block leading-tight">{currentUser.name.split(" ")[0]}</span>
              <span className="text-[9.5px] text-muted-foreground uppercase font-semibold block">
                {currentUser.role.replace("_", " ")}
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* ── Secondary Live Operational Status & Mode Switcher ── */}
      <div className="border-b border-border/60 bg-muted/30 px-5 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-3 text-[12px]">
        {/* Left: Real-Time Fleet Telemetry Chips */}
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ok/15 px-2.5 py-0.5 text-[11px] font-bold text-ok">
            <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse" />
            Live Supabase Sync
          </span>

          <span className="hidden sm:inline text-border">|</span>

          <div className="flex items-center gap-3 tabular-nums font-semibold text-foreground/80">
            <span>
              <strong>{s.active}</strong> Active
            </span>
            <span>
              <strong>{s.idle}</strong> Idle
            </span>
            <span>
              <strong>{s.overdue}</strong> Overdue
            </span>
            <span>
              Avg Util: <strong>{s.avg}%</strong>
            </span>
          </div>
        </div>

        {/* Right: Mode Switcher strictly filtered by Role */}
        <div className="flex items-center gap-1 rounded-full bg-muted p-0.5 border border-border/60 text-[11.5px]">
          {currentUser.role === "rental_staff" || currentUser.role === "supervisor_admin" ? (
            /* RENTAL STAFF (ADMIN) MODES: Control Tower & Rental Ops ONLY */
            <>
              <button
                onClick={() => setAppMode("tower")}
                className={`rounded-full px-3.5 py-1 font-bold transition-all ${
                  appMode === "tower"
                    ? "bg-white text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Control Tower
              </button>
              <button
                onClick={() => setAppMode("rental_ops")}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 font-bold transition-all ${
                  appMode === "rental_ops"
                    ? "bg-foreground text-background shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Building2 size={12} />
                Rental Ops
              </button>
            </>
          ) : (
            /* CUSTOMER MODES: Customer Portal, Optimizer & Planning ONLY */
            <>
              <button
                onClick={() => setAppMode("customer_portal")}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 font-bold transition-all ${
                  appMode === "customer_portal"
                    ? "bg-accent text-accent-foreground shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User size={12} />
                Customer Portal
              </button>
              <button
                onClick={() => setAppMode("optimizer")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-bold transition-all ${
                  appMode === "optimizer"
                    ? "bg-white text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles size={11} className="text-ok" />
                Optimizer
              </button>
              <button
                onClick={() => setAppMode("planning")}
                className={`rounded-full px-3 py-1 font-bold transition-all ${
                  appMode === "planning"
                    ? "bg-white text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Planning
              </button>
            </>
          )}
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

      {/* ── Global Modals & Power Tools ── */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <NotificationCenter isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
      <AIAssistantModal isOpen={aiOpen} onClose={() => setAiOpen(false)} />
      <ActionSheet />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
