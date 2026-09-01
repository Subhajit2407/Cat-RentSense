import { Zap } from "lucide-react";

export function InsightCard({
  headline,
  reason,
  signal,
  action,
  className = "",
  onAction,
}: {
  headline: string;
  reason: string;
  signal: string;
  action: string;
  className?: string;
  onAction?: () => void;
}) {
  return (
    <div
      className={`w-[290px] rounded-2xl bg-accent p-4 shadow-panel ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[12px] font-medium text-accent-foreground">
        <Zap size={13} />
        Recommended action
      </div>
      <p className="mt-3 text-[19px] font-semibold leading-tight text-accent-foreground">
        {headline}
      </p>
      <p className="mt-1.5 text-[12px] leading-snug text-accent-foreground/70">{reason}</p>
      <p className="mt-2 rounded-lg bg-card/70 px-2 py-1.5 text-[11px] text-accent-foreground/80">
        Signal: {signal}
      </p>
      <button
        onClick={onAction}
        className="mt-3 w-full rounded-lg bg-foreground px-3 py-2 text-[12px] font-medium text-background transition-opacity hover:opacity-90"
      >
        {action}
      </button>
    </div>
  );
}
