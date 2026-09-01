import { useState } from "react";
import { useFleet, selectAsset, reassignAsset, SITES_META, type Asset } from "@/data/fleet";
import { LeafletMap } from "@/components/LeafletMap";
import { Gantt } from "@/components/Gantt";
import { EquipmentHero } from "@/components/EquipmentHero";
import { Panel } from "@/components/Panel";
import { StatusPill } from "@/components/Table";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Fuel,
  Zap,
} from "lucide-react";

export function PlanningWorkspace() {
  const { assets, selectedId } = useFleet();
  const [targetSite, setTargetSite] = useState("S003");
  const [planned, setPlanned] = useState(false);

  const sel = assets.find((a) => a.id === selectedId) ?? assets[0];
  const site = SITES_META[targetSite];

  if (!sel) return null;

  const handleBuildPlan = () => {
    reassignAsset(sel.id, targetSite, "OP101", "Executed via Planning Workspace Canvas");
    setPlanned(true);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-border/80 bg-white p-5 shadow-panel">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-accent-foreground font-bold shadow-xs">
            <Truck size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">Operational Planning Workspace</h2>
            <p className="text-[12.5px] text-muted-foreground">
              Simulate asset movements, transit routes, and regional site utilization uplifts before execution.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[12px] text-muted-foreground">Target Destination:</span>
          <select
            value={targetSite}
            onChange={(e) => setTargetSite(e.target.value)}
            className="rounded-full border border-border/80 bg-muted/40 px-3.5 py-1.5 text-[12.5px] font-bold text-foreground outline-none"
          >
            {Object.keys(SITES_META).map((s) => (
              <option key={s} value={s}>
                Site {s} — {SITES_META[s]?.name ?? s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main 2-Column Spatial Planning Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 7 Cols: Live Route & Spatial Map */}
        <div className="lg:col-span-7">
          <Panel
            title="Spatial Transit Route & Regional Topology"
            subtitle={`${sel.id} (${sel.type}) → ${site?.name ?? targetSite}`}
            className="h-[520px]"
          >
            <LeafletMap assets={assets} selectedId={selectedId} onSelect={selectAsset} />
          </Panel>
        </div>

        {/* Right 5 Cols: Planning Inspector & Simulation Output */}
        <div className="lg:col-span-5">
          <Panel title="Plan Parameter Inspector" subtitle="Real-time transit and utilization projection">
            <div className="p-6 space-y-4 text-[13px]">
              {/* Asset Hero Graphic */}
              <div className="rounded-2xl border border-border/60 bg-gradient-to-b from-slate-50/70 to-white p-4">
                <EquipmentHero asset={sel} compact={true} showTelemetryHUD={false} />
                <div className="mt-2 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Selected Mobilization Asset
                  </span>
                  <h4 className="text-base font-bold text-foreground">{sel.id} · {sel.type}</h4>
                </div>
              </div>

              {/* Transit & Impact Metrics Table */}
              <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Origin Location</span>
                  <strong className="text-foreground">{sel.location}</strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Destination Site</span>
                  <strong className="text-foreground">{site?.name ?? targetSite}</strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Transit Distance</span>
                  <strong className="text-foreground tabular-nums">142.6 km</strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Estimated Flatbed Transit Time</span>
                  <strong className="text-foreground tabular-nums">2 hrs 25 mins</strong>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Expected Utilization Uplift</span>
                  <strong className="text-ok font-bold tabular-nums">+72% on unit (+18% fleet)</strong>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Operational Risk Score</span>
                  <strong className="text-ok flex items-center gap-1">
                    <ShieldCheck size={14} /> Low (98% confidence)
                  </strong>
                </div>
              </div>

              {/* Primary Build / Execute CTA */}
              <button
                onClick={handleBuildPlan}
                disabled={planned}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-sm transition-all hover:opacity-95 active:scale-[0.99] disabled:opacity-50"
              >
                {planned ? (
                  <>
                    <CheckCircle2 size={16} /> Plan Mobilized &amp; Dispatched!
                  </>
                ) : (
                  <>
                    <Zap size={16} /> Build &amp; Execute Mobilization Plan
                  </>
                )}
              </button>
            </div>
          </Panel>
        </div>
      </div>

      {/* Bottom Full-width Gantt Timeline */}
      <Panel title="Regional Operational Schedule & Rental Timeline" tabs={["Gantt"]} activeTab="Gantt">
        <Gantt assets={assets} selectedId={selectedId} onSelect={selectAsset} />
      </Panel>
    </div>
  );
}
