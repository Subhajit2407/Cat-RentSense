import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Gauge,
  Bell,
  TrendingUp,
  AlertTriangle,
  Search,
  RefreshCw,
  Undo2,
  Redo2,
  List,
  Save,
  Settings,
  User,
} from "lucide-react";

const TABS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/check", label: "Check-In/Out", icon: ArrowLeftRight },
  { to: "/usage", label: "Usage", icon: Gauge },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/forecast", label: "Forecast", icon: TrendingUp },
  { to: "/anomalies", label: "Anomalies", icon: AlertTriangle },
] as const;

export function Shell({ crumb, children }: { crumb: string; children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-card px-4">
        <span className="h-3.5 w-3.5 rounded-full bg-brand" />
        <span className="text-[13px] font-semibold tracking-tight">Smart Rental</span>
        <span className="text-muted-foreground">/</span>
        <span className="rounded-lg bg-muted px-3 py-1.5 text-[12px] text-muted-foreground">
          Rental Tracking / {crumb}
        </span>

        <nav className="mx-auto flex items-center gap-1">
          {TABS.map((t) => {
            const active = pathname === t.to;
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] transition-colors ${
                  active
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon size={14} />
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-0.5 text-muted-foreground">
          {[Search, RefreshCw, Undo2, Redo2, List].map((Icon, i) => (
            <span
              key={i}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
            >
              <Icon size={15} />
            </span>
          ))}
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            <Save size={15} />
          </span>
          <span className="relative ml-2 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted">
            <Bell size={15} />
            <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
              3
            </span>
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted">
            <Settings size={15} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border">
            <User size={15} />
          </span>
        </div>
      </header>

      <main className="p-4">{children}</main>
    </div>
  );
}
