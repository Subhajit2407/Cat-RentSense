import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Panel } from "@/components/Panel";
import { Table, StatusPill } from "@/components/Table";
import { SiteMap } from "@/components/SiteMap";
import { useFleet, TODAY, type Asset } from "@/data/fleet";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — Smart Rental Tracking System" },
      {
        name: "description",
        content:
          "Overdue rentals, low-utilization assets and unassigned equipment ranked by severity.",
      },
      { property: "og:title", content: "Alerts — Smart Rental Tracking" },
      {
        property: "og:description",
        content: "Every alert shows the data signal behind it and the recommended next action.",
      },
    ],
  }),
  component: AlertsPage,
});

type Alert = {
  id: string;
  asset: string;
  type: "Overdue" | "Low Utilization" | "Unassigned";
  severity: number;
  signal: string;
  action: string;
};

function buildAlerts(assets: Asset[]): Alert[] {
  const out: Alert[] = [];
  for (const a of assets) {
    const days = Math.round(
      (TODAY.getTime() - new Date(a.checkIn).getTime()) / 86_400_000,
    );
    if (days > 0 && a.status !== "Idle") {
      out.push({
        id: `${a.id}-od`,
        asset: a.id,
        type: "Overdue",
        severity: 3,
        signal: `Return due ${a.checkIn} · ${days} days past due`,
        action: "Contact site & schedule pickup",
      });
    }
    if (!a.site || !a.operator) {
      out.push({
        id: `${a.id}-un`,
        asset: a.id,
        type: "Unassigned",
        severity: 2,
        signal: `${!a.site ? "No site" : ""}${!a.site && !a.operator ? " · " : ""}${
          !a.operator ? "No operator" : ""
        }`,
        action: "Assign site + operator",
      });
    }
    if (a.utilizationPct < 25) {
      out.push({
        id: `${a.id}-lu`,
        asset: a.id,
        type: "Low Utilization",
        severity: 1,
        signal: `${a.utilizationPct}% util · ${a.engineHrsPerDay} engine vs ${a.idleHrsPerDay} idle hrs/day`,
        action: "Reassign to a higher-demand site",
      });
    }
  }
  return out.sort((x, y) => y.severity - x.severity);
}

function AlertsPage() {
  const { assets } = useFleet();
  const alerts = buildAlerts(assets);
  const flaggedIds = new Set(alerts.map((a) => a.asset));
  const flagged = assets.filter((a) => flaggedIds.has(a.id));

  return (
    <Shell crumb="Alerts">
      <div className="grid grid-cols-1 gap-4">
        <Panel title={`Alerts (${alerts.length})`} tabs={["By severity"]} activeTab="By severity">
          <Table
            columns={[
              { key: "asset", label: "Asset" },
              { key: "type", label: "Alert" },
              { key: "signal", label: "Data signal" },
              { key: "action", label: "Recommended action", align: "right" },
            ]}
            rows={alerts.map((a) => ({
              id: a.id,
              cells: {
                asset: a.asset,
                type: <StatusPill status={a.type} />,
                signal: a.signal,
                action: a.action,
              },
            }))}
            empty="No active alerts"
          />
        </Panel>

        <Panel title="Flagged Assets Map">
          <SiteMap assets={flagged} />
        </Panel>
      </div>
    </Shell>
  );
}
