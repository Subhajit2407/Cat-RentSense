import { TODAY, type Asset } from "@/data/fleet";

const START = new Date("2025-01-01").getTime();
const END = new Date("2025-05-31").getTime();
const SPAN = END - START;

const pct = (d: string | Date) =>
  ((new Date(d).getTime() - START) / SPAN) * 100;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May"];

export function Gantt({ assets }: { assets: Asset[] }) {
  return (
    <div className="px-5 pb-4">
      <div className="mb-2 flex text-[11px] text-muted-foreground">
        <span className="w-20 shrink-0" />
        {MONTHS.map((m) => (
          <span key={m} className="flex-1">
            {m} 2025
          </span>
        ))}
      </div>

      <div className="relative">
        <div
          className="absolute top-0 bottom-0 z-10 w-px bg-danger"
          style={{ left: `calc(5rem + ${pct(TODAY)}% * 0.845)` }}
        >
          <span className="absolute -top-1 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[9px] font-medium text-background">
            Today
          </span>
        </div>

        {assets.map((a) => {
          const overdue = new Date(a.checkIn) < TODAY && a.status !== "Idle";
          const left = pct(a.checkOut);
          const width = Math.max(pct(a.checkIn) - left, 1.5);
          return (
            <div key={a.id} className="flex items-center py-2">
              <span className="w-20 shrink-0 text-[12px] font-medium">{a.id}</span>
              <div className="relative h-2 flex-1 rounded-full bg-muted">
                <div
                  className={`absolute h-2 rounded-full ${
                    overdue ? "bg-danger" : a.status === "Active" ? "bg-ok" : "bg-brand"
                  }`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`${a.checkOut} → ${a.checkIn}`}
                />
              </div>
              <span
                className={`w-16 shrink-0 text-right text-[11px] ${
                  overdue ? "text-danger" : "text-muted-foreground"
                }`}
              >
                {overdue ? "Overdue" : a.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
