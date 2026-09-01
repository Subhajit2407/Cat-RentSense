import type { Asset } from "@/data/fleet";

const POS: Record<string, { x: number; y: number }> = {
  EQX1001: { x: 26, y: 34 },
  EQX1002: { x: 68, y: 22 },
  EQX1003: { x: 45, y: 58 },
  EQX1004: { x: 78, y: 62 },
  EQX1005: { x: 18, y: 72 },
  EQX1006: { x: 58, y: 40 },
  EQX1007: { x: 36, y: 80 },
};

const dot = (s: string) =>
  s === "Active" ? "bg-ok" : s === "Idle" ? "bg-warn" : "bg-muted-foreground";

export function SiteMap({
  assets,
  selectedId,
  onSelect,
}: {
  assets: Asset[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden bg-muted/60">
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 34}
            x2="100%"
            y2={i * 34}
            stroke="currentColor"
            className="text-border"
          />
        ))}
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 52}
            y1="0"
            x2={i * 52}
            y2="100%"
            stroke="currentColor"
            className="text-border"
          />
        ))}
        <polyline
          points="60,240 200,240 200,140 340,140 340,300 520,300"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 5"
          className="text-foreground/40"
        />
      </svg>

      {assets.map((a) => {
        const p = POS[a.id] ?? { x: 50, y: 50 };
        return (
          <button
            key={a.id}
            onClick={() => onSelect?.(a.id)}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <span
              className={`block h-3.5 w-3.5 rounded-full ring-4 ring-card ${dot(a.status)} ${
                selectedId === a.id ? "scale-150" : ""
              } transition-transform`}
            />
            <span className="mt-1 block whitespace-nowrap rounded bg-card px-1.5 py-0.5 text-[10px] font-medium shadow-panel">
              {a.id}
            </span>
          </button>
        );
      })}
    </div>
  );
}
