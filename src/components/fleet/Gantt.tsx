import { TODAY, type Asset, selectAsset, isOverdue } from "@/data/fleet";
import { Clock, Calendar, AlertCircle } from "lucide-react";

const START = new Date("2025-01-01").getTime();
const END = new Date("2025-05-31").getTime();
const SPAN = END - START;

const pct = (d: string | Date) =>
  Math.max(0, Math.min(100, ((new Date(d).getTime() - START) / SPAN) * 100));

const MONTHS = ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025"];

export function Gantt({
  assets,
  selectedId,
  onSelect,
}: {
  assets: Asset[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="px-6 pb-6 pt-2 select-none">
      {/* Timeline Month Grid Header */}
      <div className="mb-3 flex items-center text-[11px] font-semibold text-muted-foreground border-b border-border/60 pb-2">
        <span className="w-28 shrink-0">Asset &amp; Type</span>
        <div className="flex-1 flex justify-between pr-24">
          {MONTHS.map((m) => (
            <span key={m} className="flex-1 text-left">
              {m}
            </span>
          ))}
        </div>
        <span className="w-24 shrink-0 text-right">Contract Status</span>
      </div>

      {/* Gantt Timeline Canvas */}
      <div className="relative space-y-2.5">
        {/* Today Marker Line */}
        <div
          className="absolute top-0 bottom-0 z-20 w-[1.5px] bg-danger shadow-xs"
          style={{ left: `calc(7rem + ${pct(TODAY)}% * 0.77)` }}
        >
          <span className="absolute -top-3 -translate-x-1/2 rounded-full bg-danger px-2 py-0.5 text-[9px] font-bold text-white shadow-xs flex items-center gap-1">
            <Clock size={9} /> Today (May 10)
          </span>
        </div>

        {assets.map((a) => {
          const overdue = isOverdue(a);
          const left = pct(a.checkOut);
          const width = Math.max(pct(a.checkIn) - left, 3.5);
          const isSelected = a.id === selectedId;

          const barColor = overdue
            ? "bg-danger"
            : a.status === "Active"
              ? "bg-ok"
              : a.status === "Idle"
                ? "bg-warn"
                : "bg-slate-400";

          return (
            <div
              key={a.id}
              onClick={() => {
                onSelect?.(a.id);
                selectAsset(a.id);
              }}
              className={`flex items-center rounded-xl p-1.5 transition-all cursor-pointer ${
                isSelected
                  ? "bg-accent/30 border border-accent"
                  : "hover:bg-muted/50 border border-transparent"
              }`}
            >
              {/* Asset Name Label */}
              <div className="w-28 shrink-0 flex flex-col">
                <span className="text-[12.5px] font-bold text-foreground">{a.id}</span>
                <span className="text-[10.5px] text-muted-foreground">{a.type}</span>
              </div>

              {/* Progress Bar Container */}
              <div className="relative h-6 flex-1 rounded-lg bg-muted/60 overflow-hidden">
                <div
                  className={`absolute top-1 bottom-1 rounded-md shadow-xs transition-all flex items-center justify-between px-2 text-[10px] font-semibold text-white ${barColor} ${
                    overdue ? "animate-pulse" : ""
                  }`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`${a.id}: ${a.checkOut} → ${a.checkIn} (${a.status})`}
                >
                  <span className="truncate">{a.site ? `Site ${a.site}` : "Unassigned"}</span>
                  {overdue && <AlertCircle size={10} className="shrink-0" />}
                </div>
              </div>

              {/* Status Pill on Right */}
              <div className="w-24 shrink-0 text-right pl-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${
                    overdue
                      ? "bg-danger/15 text-danger"
                      : a.status === "Active"
                        ? "bg-ok/15 text-ok"
                        : a.status === "Idle"
                          ? "bg-warn/20 text-warn-foreground"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  {overdue ? "Overdue" : a.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
