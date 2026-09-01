import { Sparkles, ArrowRight, Zap } from "lucide-react";

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
      className={`group relative overflow-hidden rounded-[24px] border border-border/70 bg-accent p-5 shadow-float transition-all hover:scale-[1.01] ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
          <Zap size={13} />
          Recommended Action
        </div>
        <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
          AI Verified
        </span>
      </div>

      <p className="mt-2.5 text-[17px] font-extrabold leading-tight text-accent-foreground">
        {headline}
      </p>

      <p className="mt-1 text-[12px] leading-relaxed text-accent-foreground/85 font-medium">
        {reason}
      </p>

      <div className="mt-3 rounded-2xl bg-white/75 p-3 text-[11.5px] leading-relaxed text-foreground shadow-2xs backdrop-blur-xs">
        <strong className="text-muted-foreground uppercase text-[10px] block mb-0.5">Telemetry Signal</strong>
        {signal}
      </div>

      <button
        onClick={onAction}
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-[12.5px] font-bold text-background shadow-xs transition-all hover:opacity-90 active:scale-[0.98]"
      >
        {action}
        <ArrowRight size={13} />
      </button>
    </div>
  );
}
