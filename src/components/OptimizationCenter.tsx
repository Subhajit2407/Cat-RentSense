import { useFleet, openActionSheet, applyOptimizationPlan, type OptimizationPlan } from "@/data/fleet";
import { Sparkles, ArrowRight, TrendingUp, Clock, DollarSign, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export function OptimizationCenter() {
  const { optimizationPlans, assets } = useFleet();

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Top Hero Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-border/80 bg-accent p-6 shadow-float">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background font-bold shadow-xs">
            <Sparkles size={22} className="text-accent" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent-foreground/75">
              AI Fleet Optimization Center
            </span>
            <h2 className="text-xl font-extrabold tracking-tight text-accent-foreground">
              Fleet-Wide Efficiency &amp; Utilization Copilot
            </h2>
            <p className="text-[13px] text-accent-foreground/85">
              Automated telemetry synthesis identifies unassigned machines, overdue standby units, and regional demand deficits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-accent-foreground">
          <div className="rounded-2xl bg-white/70 p-3 text-center backdrop-blur-xs">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Potential ROI</span>
            <p className="text-xl font-black text-foreground tabular-nums">+$4,350 / mo</p>
          </div>
          <div className="rounded-2xl bg-white/70 p-3 text-center backdrop-blur-xs">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground block">Idle Reduced</span>
            <p className="text-xl font-black text-foreground tabular-nums">29.5 hrs / day</p>
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {optimizationPlans.map((plan) => {
          const isApplied = plan.status === "applied";
          const asset = assets.find((a) => a.id === plan.assetId);

          return (
            <div
              key={plan.id}
              className={`flex flex-col justify-between overflow-hidden rounded-[26px] border bg-card p-6 shadow-panel transition-all hover:shadow-widget ${
                isApplied ? "border-ok/50 bg-ok/5" : "border-border/80"
              }`}
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                      plan.type === "Redeploy"
                        ? "bg-accent text-accent-foreground"
                        : plan.type === "Return"
                          ? "bg-danger/15 text-danger"
                          : "bg-brand/15 text-brand"
                    }`}
                  >
                    {plan.type} Proposal
                  </span>
                  <span className="text-[11.5px] font-semibold text-muted-foreground flex items-center gap-1">
                    <ShieldCheck size={13} className="text-ok" /> {plan.confidence} Confidence
                  </span>
                </div>

                <h3 className="mt-4 text-base font-bold text-foreground leading-snug">{plan.title}</h3>
                <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed">{plan.why}</p>

                {/* Metrics Breakdown */}
                <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-border/60 bg-muted/30 p-3 text-center text-[11.5px]">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Util Delta</span>
                    <strong className="text-foreground font-bold">{plan.utilizationDelta}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Idle Saved</span>
                    <strong className="text-ok font-bold">{plan.idleReduction}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Savings</span>
                    <strong className="text-foreground font-bold">{plan.savings}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-border/50 flex items-center gap-2">
                <button
                  onClick={() => openActionSheet(plan)}
                  className="flex-1 rounded-full border border-border bg-white px-3 py-2 text-[12px] font-semibold text-foreground hover:bg-muted shadow-xs transition-colors"
                >
                  Inspect Reasoning
                </button>
                <button
                  onClick={() => applyOptimizationPlan(plan.id)}
                  disabled={isApplied}
                  className={`flex-[1.2] flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-bold shadow-xs transition-transform ${
                    isApplied
                      ? "bg-ok text-white cursor-default"
                      : "bg-accent text-accent-foreground hover:opacity-95 active:scale-95"
                  }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 size={14} /> Plan Applied
                    </>
                  ) : (
                    <>
                      <Zap size={14} /> Apply Plan
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
