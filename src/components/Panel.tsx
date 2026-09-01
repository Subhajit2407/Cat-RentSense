import type { ReactNode } from "react";
import { Maximize2, List, RefreshCw, Settings2 } from "lucide-react";

export function Panel({
  title,
  tabs,
  activeTab,
  onTabChange,
  right,
  className = "",
  bodyClassName = "",
  children,
}: {
  title: string;
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
      className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-panel ${className}`}
    >
      <header className="flex items-center gap-4 px-5 pt-4 pb-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-foreground">{title}</h2>
        {tabs && (
          <nav className="flex items-center gap-4">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => onTabChange?.(t)}
                className={`-mb-[13px] border-b-2 pb-2 text-[13px] transition-colors ${
                  t === activeTab
                    ? "border-foreground font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
        )}
        <div className="ml-auto flex items-center gap-1 text-muted-foreground">
          {right}
          <ToolbarIcon icon={<RefreshCw size={14} />} />
          <ToolbarIcon icon={<List size={14} />} />
          <ToolbarIcon icon={<Settings2 size={14} />} />
          <ToolbarIcon icon={<Maximize2 size={14} />} />
        </div>
      </header>
      <div className={`min-h-0 flex-1 overflow-auto ${bodyClassName}`}>{children}</div>
    </section>
  );
}

export function ToolbarIcon({ icon }: { icon: ReactNode }) {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-muted">
      {icon}
    </span>
  );
}
