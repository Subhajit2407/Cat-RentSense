import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Panel } from "@/components/Panel";
import { Table, StatusPill } from "@/components/Table";
import { InsightCard } from "@/components/InsightCard";
import { useFleet, FORECAST } from "@/data/fleet";

export const Route = createFileRoute("/forecast")({
  head: () => ({
    meta: [
      { title: "Demand Forecast — Smart Rental Tracking System" },
      {
        name: "description",
        content:
          "Predicted equipment demand by site with the utilization signals behind each recommendation.",
      },
      { property: "og:title", content: "Demand Forecast — Smart Rental Tracking" },
      {
        property: "og:description",
        content: "Pre-position idle machines before demand peaks, with transparent reasoning.",
      },
    ],
  }),
  component: ForecastPage,
});

const DEMAND = [
  { site: "S003", need: 3, have: 1 },
  { site: "S002", need: 2, have: 1 },
  { site: "S004", need: 1, have: 1 },
  { site: "S001", need: 1, have: 1 },
  { site: "S006", need: 0, have: 1 },
];

function ForecastPage() {
  const { assets } = useFleet();
  const idleUnassigned = assets.filter((a) => a.utilizationPct < 25);

  return (
    <Shell crumb="Forecast">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Predicted Demand by Site" tabs={["Next week"]} activeTab="Next week">
          <div className="space-y-4 px-5 pb-5">
            {DEMAND.map((d) => (
              <div key={d.site}>
                <div className="mb-1 flex justify-between text-[12px]">
                  <span className="font-medium">{d.site}</span>
                  <span className="tabular-nums text-muted-foreground">
                    need {d.need} · on site {d.have}
                  </span>
                </div>
                <div className="flex h-3 gap-1">
                  <div className="flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${(d.need / 3) * 100}%` }}
                    />
                  </div>
                  <div className="flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-ok"
                      style={{ width: `${(d.have / 3) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <p className="text-[11px] text-muted-foreground">
              Lime = predicted need · Green = machines currently on site
            </p>
          </div>
        </Panel>

        <Panel title="Recommendations">
          <div className="flex flex-wrap gap-4 px-5 pb-5">
            <InsightCard
              headline={`${FORECAST.predictedNeed} → ${FORECAST.site}`}
              reason={`${FORECAST.window} · confidence ${FORECAST.confidence}`}
              signal="S003 needs 3 excavators, 1 on site · EQX1007 idle 12 hrs/day, unassigned"
              action={`Pre-position ${FORECAST.predictedNeed} → ${FORECAST.site}`}
            />
            <InsightCard
              headline="Return EQX1002 to depot"
              reason="Crane has logged zero engine runtime for the whole rental window."
              signal="0 engine hrs · 11 idle hrs/day · no site, no operator"
              action="Schedule off-hire"
            />
          </div>
        </Panel>

        <div className="lg:col-span-2">
          <Panel title="Forecast Signals (ranked)">
            <Table
              columns={[
                { key: "asset", label: "Asset" },
                { key: "type", label: "Type" },
                { key: "site", label: "Current site" },
                { key: "status", label: "Status" },
                { key: "signal", label: "Signal" },
                { key: "util", label: "Util %", align: "right" },
              ]}
              rows={idleUnassigned
                .sort((a, b) => a.utilizationPct - b.utilizationPct)
                .map((a) => ({
                  id: a.id,
                  cells: {
                    asset: a.id,
                    type: a.type,
                    site: a.site ?? "Unassigned",
                    status: <StatusPill status={a.status} />,
                    signal: `${a.engineHrsPerDay} engine vs ${a.idleHrsPerDay} idle hrs/day → redeploy candidate`,
                    util: `${a.utilizationPct}%`,
                  },
                }))}
            />
          </Panel>
        </div>
      </div>
    </Shell>
  );
}
