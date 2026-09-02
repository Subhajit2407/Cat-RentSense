import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/common/Shell";
import { Panel } from "@/components/common/Panel";
import { Table, StatusPill } from "@/components/common/Table";
import { LeafletMap } from "@/components/fleet/LeafletMap";
import { Gantt } from "@/components/fleet/Gantt";
import { AssetInspector } from "@/components/fleet/AssetInspector";
import { SiteInspector } from "@/components/fleet/SiteInspector";
import { PlanningWorkspace } from "@/components/forecast/PlanningWorkspace";
import { OptimizationCenter } from "@/components/forecast/OptimizationCenter";
import { useFleet, selectAsset, selectSite, summary, EQUIPMENT_PHOTOS, type Asset } from "@/data/fleet";
import { Sparkles, MapPin, Gauge, Fuel, User } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fleet Control Tower — RentSense" },
      {
        name: "description",
        content:
          "Next-generation operational control tower for heavy equipment rental tracking, live telematics, and AI optimization.",
      },
      { property: "og:title", content: "Fleet Control Tower — RentSense" },
      {
        property: "og:description",
        content: "Live equipment status, spatial site map, overdue alerts, and AI-assisted fleet planning.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { assets, selectedId, selectedSiteId, appMode } = useFleet();
  const [inspectorTab, setInspectorTab] = useState("Overview");

  const s = summary(assets);
  const sel = assets.find((a) => a.id === selectedId) ?? assets[0];

  // If user selected Optimizer or Planning mode from top status bar:
  if (appMode === "optimizer") {
    return (
      <Shell crumb="Optimizer Center">
        <OptimizationCenter />
      </Shell>
    );
  }

  if (appMode === "planning") {
    return (
      <Shell crumb="Operational Planning">
        <PlanningWorkspace />
      </Shell>
    );
  }

  return (
    <Shell crumb="Control Tower">
      <div className="space-y-5">
        {/* ── Top Main Spatial Canvas (Live Site Map + Spatial Asset Inspector) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 7 Columns: Live Site Map with spatial overlays */}
          <div className="lg:col-span-7">
            <Panel
              title="Live Site Map &amp; Regional Operations"
              subtitle="Interactive equipment GPS telemetry and site demand coverage"
              className="h-[560px]"
              bodyClassName="relative h-full"
            >
              <LeafletMap
                assets={assets}
                selectedId={selectedId}
                onSelect={selectAsset}
                onSelectSite={selectSite}
              />

              {/* Selected Site Detail Inspector Overlay */}
              {selectedSiteId && (
                <SiteInspector siteId={selectedSiteId} onClose={() => selectSite(null)} />
              )}
            </Panel>
          </div>

          {/* Right 5 Columns: Spatial Asset Inspector */}
          <div className="lg:col-span-5">
            <Panel
              title="Spatial Asset Inspector"
              subtitle="Live mechanical condition, telemetry trend &amp; rental history"
              className="h-[560px]"
              bodyClassName="h-full"
            >
              {sel && (
                <AssetInspector
                  asset={sel}
                  activeTab={inspectorTab}
                  onTabChange={setInspectorTab}
                />
              )}
            </Panel>
          </div>
        </div>

        {/* ── Bottom Operational Workspace (Equipment Fleet Table + Gantt Timeline) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 6 Columns: Fleet Equipment Matrix */}
          <div className="lg:col-span-6">
            <Panel
              title={`Equipment Fleet (${assets.length})`}
              subtitle="Live telemetry and deployment overview across all active contracts"
            >
              <Table
                columns={[
                  { key: "photo", label: "" },
                  { key: "id", label: "Asset" },
                  { key: "type", label: "Type" },
                  { key: "site", label: "Site" },
                  { key: "status", label: "Status" },
                  { key: "util", label: "Util %", align: "right" },
                ]}
                rows={assets.map((a) => ({
                  id: a.id,
                  highlight: a.id === selectedId,
                  cells: {
                    photo: (
                      <div className="flex h-8 w-11 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-white p-0.5 shadow-2xs">
                        <img
                          src={EQUIPMENT_PHOTOS[a.type]}
                          alt={a.type}
                          className="h-full w-full object-contain mix-blend-multiply"
                        />
                      </div>
                    ),
                    id: a.id,
                    type: a.type,
                    site: a.site ? `Site ${a.site}` : "Unassigned",
                    status: <StatusPill status={a.status} />,
                    util: `${a.utilizationPct}%`,
                  },
                }))}
                onRowClick={selectAsset}
              />
            </Panel>
          </div>

          {/* Right 6 Columns: Operational Gantt Timeline */}
          <div className="lg:col-span-6">
            <Panel
              title="Rental Timeline &amp; Contract Schedules"
              subtitle="Gantt-style horizon showing current active dates vs return deadlines"
              tabs={["Gantt"]}
              activeTab="Gantt"
            >
              <Gantt assets={assets} selectedId={selectedId} onSelect={selectAsset} />
            </Panel>
          </div>
        </div>
      </div>
    </Shell>
  );
}
