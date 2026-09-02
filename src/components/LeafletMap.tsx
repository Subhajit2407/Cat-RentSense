import { useEffect, useRef, useState } from "react";
import { type Asset, SITES_META, openActionSheet, useFleet } from "@/data/fleet";
import { Layers, MapPin, Sparkles, Navigation, Plus, Minus, ArrowUpRight, TrendingUp, Compass } from "lucide-react";

let cssInjected = false;
function ensureLeafletCSS() {
  if (typeof document === "undefined") return;
  if (cssInjected) return;
  cssInjected = true;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(link);
}

const STATUS_COLOR: Record<string, string> = {
  Active: "#22c55e",
  Idle: "#f59e0b",
  "Due Soon": "#f59e0b",
  Unassigned: "#64748b",
  Unknown: "#64748b",
  Overdue: "#ef4444",
};

export function LeafletMap({
  assets,
  selectedId,
  onSelect,
  onSelectSite,
  showRecommendationOverlay = true,
}: {
  assets: Asset[];
  selectedId?: string | undefined;
  onSelect?: (id: string) => void;
  onSelectSite?: (siteId: string) => void;
  showRecommendationOverlay?: boolean;
}) {
  const { optimizationPlans } = useFleet();
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, any>>(new Map());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const siteMarkersRef = useRef<Map<string, any>>(new Map());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routePolylineRef = useRef<any>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [mapLayer, setMapLayer] = useState<"standard" | "satellite">("standard");
  const [showDemandRings, setShowDemandRings] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);

  useEffect(() => {
    ensureLeafletCSS();
    import("leaflet").then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [22.3, 80.8],
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
      });

      // CartoDB Positron Light Minimalist map tiles for Apple aesthetic
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        subdomains: "abcd",
      }).addTo(map);

      mapRef.current = map;
      setLeafletLoaded(true);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map layer tiles
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;
    import("leaflet").then((L) => {
      const map = mapRef.current;
      map.eachLayer((layer: any) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer);
        }
      });

      if (mapLayer === "satellite") {
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
          maxZoom: 18,
        }).addTo(map);
      } else {
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          maxZoom: 19,
          subdomains: "abcd",
        }).addTo(map);
      }
    });
  }, [mapLayer, leafletLoaded]);

  // Update markers, site demand rings, and routes
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;

    import("leaflet").then((L) => {
      const map = mapRef.current;

      // Clean old asset markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();

      // Clean old site markers
      siteMarkersRef.current.forEach((m) => m.remove());
      siteMarkersRef.current.clear();

      // Clean old route polyline
      if (routePolylineRef.current) {
        routePolylineRef.current.remove();
        routePolylineRef.current = null;
      }

      // Render Site Markers & Demand Rings
      Object.values(SITES_META).forEach((site) => {
        const hasGap = site.demandForecast.gap > 0;
        const siteIcon = L.divIcon({
          className: "custom-site-marker",
          html: `
            <div style="position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;">
              ${
                showDemandRings && hasGap
                  ? `<span style="position:absolute;width:44px;height:44px;border-radius:50%;background:rgba(214,255,56,0.35);border:1.5px dashed #a3e635;animation:pulse 2s infinite;"></span>`
                  : ""
              }
              <div style="position:relative;background:#0f172a;color:#ffffff;padding:4px 9px;border-radius:999px;font-size:11px;font-weight:700;display:flex;align-items:center;gap:4px;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1.5px solid #ffffff;">
                <span>${site.id}</span>
                <span style="font-size:9px;background:#334155;padding:1px 4px;border-radius:4px;color:#94a3b8;">${site.demandForecast.need} req</span>
              </div>
            </div>
          `,
          iconSize: [60, 30],
          iconAnchor: [30, 15],
        });

        const marker = L.marker([site.lat, site.lng], { icon: siteIcon }).addTo(map);
        marker.on("click", () => {
          onSelectSite?.(site.id);
        });
        siteMarkersRef.current.set(site.id, marker);
      });

      // Render Asset Markers
      assets.forEach((asset) => {
        const color = STATUS_COLOR[asset.status] ?? "#64748b";
        const isSelected = asset.id === selectedId;

        const assetIcon = L.divIcon({
          className: "custom-asset-marker",
          html: `
            <div style="position:relative;display:flex;flex-direction:column;align-items:center;cursor:pointer;transform:${
              isSelected ? "scale(1.2)" : "scale(1)"
            };transition:transform 0.2s ease;">
              <div style="background:${isSelected ? "#000" : "#ffffff"};color:${
            isSelected ? "#d6ff38" : "#0f172a"
          };padding:3px 8px;border-radius:999px;font-size:11px;font-weight:700;box-shadow:0 6px 16px rgba(0,0,0,0.12);border:2px solid ${color};display:flex;align-items:center;gap:4px;">
                <span style="width:7px;height:7px;border-radius:50%;background:${color};display:inline-block;"></span>
                <span>${asset.id}</span>
              </div>
              <span style="font-size:9.5px;font-weight:600;color:#334155;background:rgba(255,255,255,0.85);padding:1px 5px;border-radius:4px;margin-top:2px;box-shadow:0 1px 3px rgba(0,0,0,0.08);backdrop-filter:blur(4px);white-space:nowrap;">${
                asset.type
              }</span>
            </div>
          `,
          iconSize: [80, 44],
          iconAnchor: [40, 22],
        });

        const marker = L.marker([asset.lat, asset.lng], { icon: assetIcon }).addTo(map);
        marker.on("click", () => {
          onSelect?.(asset.id);
        });
        markersRef.current.set(asset.id, marker);
      });

      // Draw Recommended Route line from EQX1007 to S003
      if (showRoutes) {
        const eqx1007 = assets.find((a) => a.id === "EQX1007");
        const s003 = SITES_META["S003"];

        if (eqx1007 && s003) {
          const latlngs = [
            [eqx1007.lat, eqx1007.lng],
            [23.5, 78.4],
            [s003.lat, s003.lng],
          ];

          routePolylineRef.current = L.polyline(latlngs as any, {
            color: "#0f172a",
            weight: 3,
            dashArray: "6, 8",
            opacity: 0.85,
          }).addTo(map);
        }
      }
    });
  }, [assets, selectedId, showDemandRings, showRoutes, leafletLoaded, onSelect, onSelectSite]);

  // Pan to selected asset
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || !selectedId) return;
    const asset = assets.find((a) => a.id === selectedId);
    if (asset) {
      mapRef.current.panTo([asset.lat, asset.lng], { animate: true, duration: 0.8 });
    }
  }, [selectedId, assets, leafletLoaded]);

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();
  const resetView = () => mapRef.current?.setView([22.3, 80.8], 5, { animate: true });

  const primaryPlan = optimizationPlans[0];

  return (
    <div className="relative h-full min-h-[460px] w-full overflow-hidden rounded-[24px]">
      {/* Map container */}
      <div ref={containerRef} className="absolute inset-0 z-0 h-full w-full" />

      {/* Floating Spatial AI Recommendation Card (Reference inspired) */}
      {showRecommendationOverlay && primaryPlan && primaryPlan.status === "pending" && (
        <div className="absolute right-5 top-5 z-[1001] w-72 sm:w-80 overflow-hidden rounded-[24px] border border-border/80 bg-accent p-4 shadow-float backdrop-blur-md transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
              <Sparkles size={13} />
              Optimization Plan
            </div>
            <span className="text-[10px] font-semibold text-accent-foreground/75">Confidence: {primaryPlan.confidence}</span>
          </div>

          <p className="mt-2 text-[15px] font-bold text-accent-foreground leading-snug">
            {primaryPlan.title}
          </p>

          <p className="mt-1 text-[11.5px] text-accent-foreground/80 leading-relaxed">
            {primaryPlan.why}
          </p>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-white/70 p-2.5 backdrop-blur-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground">Expected Benefit</span>
              <p className="text-[15px] font-extrabold text-foreground tabular-nums">{primaryPlan.savings}</p>
            </div>
            <div className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
              {primaryPlan.utilizationDelta}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => openActionSheet(primaryPlan)}
              className="flex-1 flex items-center justify-center gap-1 rounded-full bg-foreground px-3.5 py-2 text-[12px] font-bold text-background shadow-xs hover:opacity-95 active:scale-95"
            >
              Pre-position EQX1007
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Map Toolbar Controls (Top Left & Bottom Right) */}
      <div className="absolute left-4 top-4 z-[1001] flex flex-col gap-1.5 rounded-2xl bg-white/90 p-1.5 shadow-float backdrop-blur-md border border-border/70">
        <button
          onClick={zoomIn}
          title="Zoom In"
          className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={zoomOut}
          title="Zoom Out"
          className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={resetView}
          title="Recenter Map"
          className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Compass size={16} />
        </button>
      </div>

      {/* Layer & Overlay Toggles (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-[1001] flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 shadow-float backdrop-blur-md border border-border/70 text-[11.5px]">
        <button
          onClick={() => setMapLayer(mapLayer === "standard" ? "satellite" : "standard")}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium transition-colors ${
            mapLayer === "satellite" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers size={13} />
          {mapLayer === "satellite" ? "Satellite" : "Map"}
        </button>

        <button
          onClick={() => setShowDemandRings(!showDemandRings)}
          className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
            showDemandRings ? "bg-accent text-accent-foreground font-semibold" : "bg-muted text-muted-foreground"
          }`}
        >
          Demand Rings
        </button>

        <button
          onClick={() => setShowRoutes(!showRoutes)}
          className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
            showRoutes ? "bg-foreground text-background font-semibold" : "bg-muted text-muted-foreground"
          }`}
        >
          Routes
        </button>
      </div>

      {/* Map Legend (Bottom Center) */}
      <div className="absolute bottom-4 right-4 z-[1001] hidden sm:flex items-center gap-3 rounded-2xl bg-white/95 px-3 py-2 shadow-float backdrop-blur-md border border-border/70 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ok" /> Active
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-warn" /> Idle
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger" /> Overdue
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-500" /> Unassigned
        </span>
      </div>
    </div>
  );
}
