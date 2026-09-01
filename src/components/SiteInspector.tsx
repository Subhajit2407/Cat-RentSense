import { SITES_META, useFleet, selectAsset, reassignAsset } from "@/data/fleet";
import { Building2, X, TrendingUp, Users, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export function SiteInspector({
  siteId,
  onClose,
}: {
  siteId: string;
  onClose: () => void;
}) {
  const { assets } = useFleet();
  const site = SITES_META[siteId];

  if (!site) return null;

  const onSiteAssets = assets.filter((a) => a.site === siteId);
  const unassignedExcavator = assets.find((a) => a.status === "Unassigned" && a.type === site.demandForecast.primaryNeed);

  return (
    <div className="absolute right-4 top-4 z-[1002] w-80 sm:w-96 overflow-hidden rounded-[24px] border border-border/80 bg-white/95 p-5 shadow-float backdrop-blur-xl animate-scale-in">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-foreground">
            <Building2 size={20} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{site.id}</span>
              <span className="rounded-full bg-accent/80 px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                Demand: {site.demandForecast.need} req.
              </span>
            </div>
            <h3 className="text-[16px] font-bold tracking-tight text-foreground leading-snug">{site.name}</h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X size={15} />
        </button>
      </div>

      {/* Demand vs Current Fleet Status Grid */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl border border-border/60 bg-muted/30 p-2.5">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground">Required</span>
          <p className="text-lg font-bold text-foreground tabular-nums">{site.demandForecast.need}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-muted/30 p-2.5">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground">On Site</span>
          <p className="text-lg font-bold text-foreground tabular-nums">{onSiteAssets.length}</p>
        </div>
        <div className={`rounded-2xl border p-2.5 ${site.demandForecast.gap > 0 ? "border-warn/40 bg-warn/15 text-warn-foreground" : "border-border/60 bg-ok/10 text-ok"}`}>
          <span className="text-[10px] uppercase font-semibold">Demand Gap</span>
          <p className="text-lg font-bold tabular-nums">
            {site.demandForecast.gap > 0 ? `-${site.demandForecast.gap}` : "Optimal"}
          </p>
        </div>
      </div>

      {/* Current Fleet on Site */}
      <div className="mt-4">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Active Units On Site</h4>
        <div className="mt-2 space-y-1.5">
          {onSiteAssets.length === 0 ? (
            <p className="text-[12px] text-muted-foreground italic">No equipment currently assigned.</p>
          ) : (
            onSiteAssets.map((a) => (
              <div
                key={a.id}
                onClick={() => selectAsset(a.id)}
                className="flex items-center justify-between rounded-xl border border-border/50 bg-card p-2 text-[12px] cursor-pointer hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${a.status === "Active" ? "bg-ok" : "bg-warn"}`} />
                  <span className="font-semibold text-foreground">{a.id}</span>
                  <span className="text-muted-foreground">· {a.type}</span>
                </div>
                <div className="text-right tabular-nums">
                  <span className="font-bold text-foreground">{a.utilizationPct}%</span>
                  <span className="text-[10px] text-muted-foreground ml-1">util</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Gap Remediation Recommendation */}
      {site.demandForecast.gap > 0 && unassignedExcavator && (
        <div className="mt-4 rounded-2xl border border-accent/60 bg-accent/20 p-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-accent-foreground">
            <Zap size={13} />
            Instant AI Pre-position
          </div>
          <p className="mt-1 text-[12px] text-accent-foreground/90">
            Unassigned <strong>{unassignedExcavator.id}</strong> ({unassignedExcavator.type}) is available to fill this site gap.
          </p>
          <button
            onClick={() => reassignAsset(unassignedExcavator.id, site.id, "OP101", `Filled demand gap at ${site.name}`)}
            className="mt-2.5 w-full flex items-center justify-center gap-1.5 rounded-full bg-accent px-3 py-2 text-[12px] font-bold text-accent-foreground shadow-xs hover:opacity-95"
          >
            Pre-position {unassignedExcavator.id} → {site.id}
            <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* Site Manager details */}
      <div className="mt-3.5 flex items-center justify-between pt-3 border-t border-border/50 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Users size={12} />
          Manager: <strong className="text-foreground">{site.manager}</strong>
        </span>
        <span className="flex items-center gap-1 text-ok">
          <CheckCircle2 size={12} /> Telemetry Live
        </span>
      </div>
    </div>
  );
}
