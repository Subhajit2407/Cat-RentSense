import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Panel } from "@/components/Panel";
import { Table, StatusPill } from "@/components/Table";
import { InsightCard } from "@/components/InsightCard";
import { SiteMap } from "@/components/SiteMap";
import { Gantt } from "@/components/Gantt";
import { useFleet, selectAsset, summary } from "@/data/fleet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fleet Dashboard — Smart Rental Tracking System" },
      {
        name: "description",
        content:
          "Live status, utilization and rental timeline for rented excavators, cranes, bulldozers and graders.",
      },
      { property: "og:title", content: "Fleet Dashboard — Smart Rental Tracking" },
      {
        property: "og:description",
        content: "Live equipment status, overdue alerts and recommended actions in one view.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { assets, selectedId } = useFleet();
  const s = summary(assets);
  const sel = assets.find((a) => a.id === selectedId) ?? assets[0];

  return (
    <Shell crumb="Dashboard">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Panel title="Live Site Map" tabs={["Map", "Sites"]} activeTab="Map" bodyClassName="relative">
          <SiteMap assets={assets} selectedId={selectedId} onSelect={selectAsset} />
          <InsightCard
            className="absolute right-5 top-5"
            headline="Reassign EQX1007 → S003"
            reason="Unassigned excavator idle 12 hrs/day while S003 demand is rising."
            signal="0 engine hrs · 12 idle hrs/day · S003 predicted need: Excavator (High)"
            action="Pre-position EQX1007 → S003"
            onAction={() => selectAsset("EQX1007")}
          />
          <div className="absolute bottom-4 left-5 flex gap-4 rounded-xl bg-card px-4 py-2 text-[11px] shadow-panel">
            <Stat label="Assets" value={s.total} />
            <Stat label="Active" value={s.active} />
            <Stat label="Idle" value={s.idle} />
            <Stat label="Unknown" value={s.unknown} />
            <Stat label="Avg util" value={`${s.avg}%`} />
          </div>
        </Panel>

        <Panel title="Asset Detail" tabs={["Planning", "Distribution", "Statistics"]} activeTab="Planning">
          <div className="px-5 pb-4">
            <div className="flex h-36 items-center justify-center rounded-xl bg-muted">
              <Truck size={72} className="text-muted-foreground" strokeWidth={1} />
            </div>
            <div className="mt-4 flex items-end gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {sel.type} · {sel.site ?? "Unassigned"}
                </p>
                <p className="text-2xl font-semibold tracking-tight">{sel.id}</p>
              </div>
              <div className="ml-auto flex gap-6 text-right">
                <Stat label="Engine hrs/day" value={sel.engineHrsPerDay} />
                <Stat label="Idle hrs/day" value={sel.idleHrsPerDay} />
                <Stat label="Utilization" value={`${sel.utilizationPct}%`} />
              </div>
            </div>
          </div>
          <Table
            selectable={false}
            columns={[
              { key: "metric", label: "Usage" },
              { key: "value", label: "Value", align: "right" },
            ]}
            rows={[
              {
                id: "days",
                cells: { metric: "Operating days", value: sel.operatingDays },
              },
              {
                id: "engine",
                cells: {
                  metric: "Total engine hrs",
                  value: (sel.engineHrsPerDay * sel.operatingDays).toFixed(1),
                },
              },
              {
                id: "idle",
                cells: {
                  metric: "Total idle hrs",
                  value: (sel.idleHrsPerDay * sel.operatingDays).toFixed(1),
                },
              },
              {
                id: "op",
                cells: { metric: "Operator", value: sel.operator ?? "—" },
              },
              {
                id: "status",
                cells: { metric: "Status", value: <StatusPill status={sel.status} /> },
              },
            ]}
          />
        </Panel>

        <Panel title="Equipment List">
          <Table
            columns={[
              { key: "id", label: "Asset" },
              { key: "type", label: "Type" },
              { key: "site", label: "Site" },
              { key: "status", label: "Status" },
              { key: "operator", label: "Operator" },
              { key: "util", label: "Util %", align: "right" },
            ]}
            rows={assets.map((a) => ({
              id: a.id,
              highlight: a.id === selectedId,
              icon: <Truck size={14} className="text-muted-foreground" />,
              cells: {
                id: a.id,
                type: a.type,
                site: a.site ?? "—",
                status: <StatusPill status={a.status} />,
                operator: a.operator ?? "—",
                util: `${a.utilizationPct}%`,
              },
            }))}
            onRowClick={selectAsset}
          />
        </Panel>

        <Panel title="Rental Timeline" tabs={["Gantt"]} activeTab="Gantt">
          <Gantt assets={assets} />
        </Panel>
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-[15px] font-semibold tabular-nums">{value}</p>
    </div>
  );
}
