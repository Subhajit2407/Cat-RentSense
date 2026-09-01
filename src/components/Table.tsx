import type { ReactNode } from "react";
import { MoreVertical, Check } from "lucide-react";

export type Column = { key: string; label: string; align?: "left" | "right" | "center" };

export type Row = {
  id: string;
  icon?: ReactNode;
  label?: ReactNode;
  cells: Record<string, ReactNode>;
  highlight?: boolean;
};

export function Table({
  columns,
  rows,
  selectable = true,
  selected = [],
  onToggle,
  onRowClick,
  empty = "No records found",
}: {
  columns: Column[];
  rows: Row[];
  selectable?: boolean;
  selected?: string[];
  onToggle?: (id: string) => void;
  onRowClick?: (id: string) => void;
  empty?: string;
}) {
  return (
    <div className="w-full select-none">
      <div className="flex items-center gap-3 border-b border-border/60 bg-muted/20 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {selectable && <span className="w-4 shrink-0" />}
        {columns.map((c) => (
          <span
            key={c.key}
            className={`min-w-0 flex-1 ${
              c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : "text-left"
            }`}
          >
            {c.label}
          </span>
        ))}
        <span className="w-6 shrink-0" />
      </div>

      {rows.length === 0 && (
        <p className="px-6 py-12 text-center text-[13px] text-muted-foreground font-medium">{empty}</p>
      )}

      {rows.map((r) => {
        const isChecked = selected.includes(r.id);
        return (
          <div
            key={r.id}
            onClick={() => onRowClick?.(r.id)}
            className={`flex items-center gap-3 border-b border-border/40 px-6 py-3 text-[13px] transition-all last:border-0 ${
              onRowClick ? "cursor-pointer" : ""
            } ${
              r.highlight
                ? "bg-accent/25 border-accent/40 font-medium"
                : isChecked
                  ? "bg-muted/40"
                  : "hover:bg-muted/40"
            }`}
          >
            {selectable && (
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle?.(r.id)}
                onClick={(e) => e.stopPropagation()}
                className="h-4 w-4 shrink-0 rounded border-border text-foreground accent-foreground cursor-pointer"
              />
            )}
            {columns.map((c, i) => (
              <span
                key={c.key}
                className={`flex min-w-0 flex-1 items-center gap-2 truncate ${
                  c.align === "right"
                    ? "justify-end tabular-nums"
                    : c.align === "center"
                      ? "justify-center"
                      : "justify-start"
                } ${i === 0 ? "font-bold text-foreground" : "text-muted-foreground"}`}
              >
                {i === 0 && r.icon}
                {r.cells[c.key]}
              </span>
            ))}
            <span className="w-6 shrink-0 text-muted-foreground hover:text-foreground">
              <MoreVertical size={14} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone: Record<string, string> = {
    Active: "bg-ok/15 text-ok border-ok/30",
    Good: "bg-ok/15 text-ok border-ok/30",
    Idle: "bg-warn/20 text-warn-foreground border-warn/30",
    "Low Utilization": "bg-warn/20 text-warn-foreground border-warn/30",
    Warning: "bg-warn/20 text-warn-foreground border-warn/30",
    "Due Soon": "bg-amber-500/15 text-amber-600 border-amber-500/30",
    Overdue: "bg-danger/15 text-danger border-danger/30",
    Anomaly: "bg-danger/15 text-danger border-danger/30",
    "Needs Attention": "bg-amber-500/15 text-amber-600 border-amber-500/30",
    Damaged: "bg-danger/15 text-danger border-danger/30",
    Unknown: "bg-muted text-muted-foreground border-border",
    Unassigned: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
        tone[status] ?? "bg-muted text-muted-foreground border-border"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
