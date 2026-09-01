import { useState } from "react";
import { type Asset, EQUIPMENT_PHOTOS } from "@/data/fleet";
import { Gauge, Fuel, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

export function EquipmentHero({
  asset,
  className = "",
  compact = false,
  showTelemetryHUD = true,
}: {
  asset: Asset;
  className?: string;
  compact?: boolean;
  showTelemetryHUD?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const photo = EQUIPMENT_PHOTOS[asset.type];

  // Status color mappings
  const statusGlow =
    asset.status === "Active"
      ? "from-ok/20 via-ok/5 to-transparent"
      : asset.status === "Idle"
        ? "from-warn/25 via-warn/5 to-transparent"
        : asset.status === "Overdue"
          ? "from-danger/25 via-danger/5 to-transparent"
          : "from-accent/30 via-accent/5 to-transparent";

  return (
    <div
      className={`group relative flex flex-col items-center justify-center overflow-visible select-none ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 3D Atmosphere Spotlight & Ground Shadow stage */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        {/* Soft radial backdrop gradient */}
        <div
          className={`h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-gradient-radial ${statusGlow} blur-2xl transition-all duration-700 ${
            hovered ? "scale-115 opacity-100" : "scale-100 opacity-75"
          }`}
        />
        {/* Realistic elliptical ground contact shadow */}
        <div
          className={`absolute bottom-3 sm:bottom-4 h-5 sm:h-6 w-4/5 max-w-[340px] rounded-full bg-slate-900/15 blur-md transition-all duration-500 ${
            hovered ? "scale-x-95 opacity-60 translate-y-1" : "scale-x-100 opacity-80"
          }`}
        />
      </div>

      {/* Floating HUD Tags (Top Left & Top Right) */}
      {showTelemetryHUD && (
        <div className="absolute top-2 inset-x-2 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-foreground shadow-apple-sm backdrop-blur-md border border-border/60 pointer-events-auto">
            <span
              className={`h-2 w-2 rounded-full ${
                asset.status === "Active"
                  ? "bg-ok animate-pulse"
                  : asset.status === "Idle"
                    ? "bg-warn"
                    : asset.status === "Overdue"
                      ? "bg-danger"
                      : "bg-muted-foreground"
              }`}
            />
            {asset.type} · {asset.id}
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-medium text-muted-foreground shadow-apple-sm backdrop-blur-md border border-border/60">
              <Fuel size={12} className="text-amber-500" />
              <span className="font-semibold text-foreground tabular-nums">{asset.fuelPct}%</span>
            </span>
            <span className="flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-[10.5px] font-semibold text-accent-foreground shadow-apple-sm backdrop-blur-md border border-border/40">
              <Gauge size={12} />
              <span className="tabular-nums">{asset.utilizationPct}%</span>
            </span>
          </div>
        </div>
      )}

      {/* Hero Machine Cutout Graphic with transparent rendering */}
      <div
        className={`relative z-0 flex items-center justify-center transition-transform duration-500 ease-out ${
          compact ? "h-32 sm:h-40" : "h-48 sm:h-60"
        } ${hovered ? "scale-105 -translate-y-1" : "scale-100"}`}
      >
        <img
          src={photo}
          alt={`${asset.type} — ${asset.id}`}
          key={asset.id}
          className="h-full max-h-full w-auto object-contain mix-blend-multiply filter contrast-[1.05] drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
        />
      </div>

      {/* Bottom Sub-HUD Metrics */}
      {showTelemetryHUD && (
        <div className="mt-2 flex w-full items-center justify-between px-2 pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            {asset.condition === "Good" ? (
              <CheckCircle2 size={13} className="text-ok" />
            ) : (
              <AlertTriangle size={13} className="text-warn" />
            )}
            <span className="font-medium text-foreground">{asset.condition} condition</span>
          </div>

          <div className="flex items-center gap-3 tabular-nums">
            <span>
              <strong className="text-foreground">{asset.engineHrsPerDay}h</strong> eng/day
            </span>
            <span>
              <strong className="text-foreground">{asset.idleHrsPerDay}h</strong> idle/day
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
