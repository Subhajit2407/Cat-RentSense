import { type OptimizationPlan, applyOptimizationPlan, openActionSheet, useFleet, selectAsset } from "@/data/fleet";
import { sendAlertActionNotification } from "@/lib/email/notify";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, X, TrendingUp, Clock, DollarSign, Loader2 } from "lucide-react";
import { useState } from "react";

export function ActionSheet() {
  const { activeActionPlan, assets } = useFleet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!activeActionPlan) return null;

  const plan = activeActionPlan;
  const targetAsset = assets.find((a) => a.id === plan.assetId);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await sendAlertActionNotification({
      alertId: plan.id,
      alertType: "Forecast",
      severity: "warning",
      title: plan.title,
      signal: plan.why,
      impact: plan.expectedImpact,
      action: plan.whatWillChange,
      assetId: plan.assetId,
    });
    applyOptimizationPlan(plan.id);
    setIsSubmitting(false);
  };

  const handleReviewInWorkspace = () => {
    selectAsset(plan.assetId);
    openActionSheet(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/25 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[26px] border border-border/80 bg-white p-6 shadow-float transition-all animate-scale-in"
        role="dialog"
      >
        {/* Top Header Badge & Close */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[12px] font-semibold text-accent-foreground shadow-xs">
            <Sparkles size={13} className="text-accent-foreground" />
            AI Operational Recommendation
          </div>
          <button
            onClick={() => openActionSheet(null)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        {/* Title & Target */}
        <div className="mt-4">
          <h3 className="text-xl font-bold tracking-tight text-foreground">{plan.title}</h3>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Asset <strong className="text-foreground">{plan.assetId}</strong> · Action type:{" "}
            <span className="font-semibold text-brand">{plan.type}</span>
          </p>
        </div>

        {/* Spatial Route visualization strip */}
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-border/70 bg-muted/40 p-3.5 text-[12.5px]">
          <div>
            <span className="text-[10.5px] uppercase tracking-wide text-muted-foreground">Current Origin</span>
            <p className="font-semibold text-foreground">{plan.fromSite}</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <ArrowRight size={15} />
          </div>
          <div className="text-right">
            <span className="text-[10.5px] uppercase tracking-wide text-muted-foreground">Recommended Destination</span>
            <p className="font-semibold text-foreground">{plan.toSite}</p>
          </div>
        </div>

        {/* Structured Context: WHY, WHAT WILL CHANGE, EXPECTED IMPACT */}
        <div className="mt-5 space-y-3.5 text-[13px]">
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Why this action</h4>
            <p className="mt-1 leading-relaxed text-foreground/90">{plan.why}</p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-muted/20 p-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">What will change</h4>
            <p className="mt-1 leading-relaxed text-foreground/90">{plan.whatWillChange}</p>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border border-border/60 bg-accent/20 p-3">
              <div className="flex items-center gap-1 text-[10.5px] font-semibold text-accent-foreground">
                <TrendingUp size={12} />
                Util Delta
              </div>
              <p className="mt-1 text-[14px] font-bold text-accent-foreground">{plan.utilizationDelta}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-ok/10 p-3">
              <div className="flex items-center gap-1 text-[10.5px] font-semibold text-ok">
                <Clock size={12} />
                Idle Saved
              </div>
              <p className="mt-1 text-[14px] font-bold text-ok">{plan.idleReduction}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-white p-3 shadow-xs">
              <div className="flex items-center gap-1 text-[10.5px] font-semibold text-foreground">
                <DollarSign size={12} />
                Cost Benefit
              </div>
              <p className="mt-1 text-[14px] font-bold text-foreground">{plan.savings}</p>
            </div>
          </div>
        </div>

        {/* Confidence Indicator */}
        <div className="mt-4 flex items-center gap-2 text-[12px] text-muted-foreground">
          <ShieldCheck size={14} className="text-ok" />
          <span>
            Confidence Level: <strong className="text-foreground">{plan.confidence}</strong> (Based on real-time site telemetry &amp; 7-day demand forecast)
          </span>
        </div>

        {/* Action Button Strip */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => openActionSheet(null)}
            className="flex-1 rounded-full border border-border bg-muted/50 px-4 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
          >
            Dismiss
          </button>
          <button
            onClick={handleReviewInWorkspace}
            className="flex-1 rounded-full border border-border bg-white px-4 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted shadow-xs"
          >
            Review Plan
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-[1.5] flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold text-accent-foreground shadow-sm transition-transform hover:opacity-95 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending email...
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                Confirm Action
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
