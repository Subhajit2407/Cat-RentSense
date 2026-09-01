import type { ReactNode } from "react";
import { Maximize2, List, RefreshCw, Settings2 } from "lucide-react";

export function Panel({
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  right,
  className = "",
  bodyClassName = "",
  children,
}: {
  title: string;
  subtitle?: string;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (t: string) => void;
  right?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`flex min-h-0 flex-col overflow-hidden rounded-[26px] border border-border/70 bg-card shadow-panel transition-all ${className}`}
    >
      <header className="flex items-center justify-between gap-4 border-b border-border/50 px-6 py-4">
        <div>
          <h2 className="text-[15px] font-bold tracking-tight text-foreground">{title}</h2>
          {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
        </div>

        {tabs && (
          <nav className="flex items-center gap-1 rounded-full bg-muted/60 p-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => onTabChange?.(t)}
                className={`rounded-full px-3.5 py-1 text-[12px] font-medium transition-all ${
                  t === activeTab
                    ? "bg-white text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-1 text-muted-foreground">
          {right}
          <ToolbarIcon icon={<RefreshCw size={13} />} title="Refresh data" />
          <ToolbarIcon icon={<List size={13} />} title="Toggle view" />
          <ToolbarIcon icon={<Settings2 size={13} />} title="Preferences" />
          <ToolbarIcon icon={<Maximize2 size={13} />} title="Expand panel" />
        </div>
      </header>
      <div className={`min-h-0 flex-1 overflow-auto ${bodyClassName}`}>{children}</div>
    </section>
  );
}

export function ToolbarIcon({ icon, title }: { icon: ReactNode; title?: string }) {
  return (
    <span
      title={title}
      className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
    >
      {icon}
    </span>
  );
}
