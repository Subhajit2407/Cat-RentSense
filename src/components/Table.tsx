import type { ReactNode } from "react";
import { MoreVertical } from "lucide-react";

export type Column = { key: string; label: string; align?: "left" | "right" };

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
  empty = "No records",
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
    <div className="w-full">
      <div className="flex items-center gap-3 border-b border-border px-5 py-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {selectable && <span className="w-4 shrink-0" />}
        {columns.map((c) => (
          <span
            key={c.key}
            className={`min-w-0 flex-1 ${c.align === "right" ? "text-right" : ""}`}
          >
            {c.label}
          </span>
        ))}
        <span className="w-6 shrink-0" />
      </div>

      {rows.length === 0 && (
        <p className="px-5 py-8 text-center text-sm text-muted-foreground">{empty}</p>
      )}

      {rows.map((r) => (
        <div
          key={r.id}
          onClick={() => onRowClick?.(r.id)}
          className={`flex items-center gap-3 border-b border-border/70 px-5 py-2.5 text-[13px] transition-colors last:border-0 ${
            onRowClick ? "cursor-pointer" : ""
          } ${r.highlight ? "bg-accent/50" : "hover:bg-muted/60"}`}
        >
          {selectable && (
            <input
              type="checkbox"
              checked={selected.includes(r.id)}
              onChange={() => onToggle?.(r.id)}
              onClick={(e) => e.stopPropagation()}
              className="h-4 w-4 shrink-0 accent-foreground"
            />
          )}
          {columns.map((c, i) => (
            <span
              key={c.key}
              className={`flex min-w-0 flex-1 items-center gap-2 truncate ${
                c.align === "right" ? "justify-end tabular-nums" : ""
              } ${i === 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}
            >
              {i === 0 && r.icon}
              {r.cells[c.key]}
            </span>
          ))}
          <span className="w-6 shrink-0 text-muted-foreground">
            <MoreVertical size={14} />
          </span>
        </div>
      ))}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone: Record<string, string> = {
    Active: "bg-ok/15 text-ok",
    Good: "bg-ok/15 text-ok",
    Idle: "bg-warn/20 text-warn-foreground",
    "Low Utilization": "bg-warn/20 text-warn-foreground",
    Warning: "bg-warn/20 text-warn-foreground",
    Overdue: "bg-danger/12 text-danger",
    Anomaly: "bg-danger/12 text-danger",
    Unknown: "bg-muted text-muted-foreground",
    Unassigned: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
        tone[status] ?? "bg-muted text-muted-foreground"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
