import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Panel } from "@/components/Panel";
import { Table, StatusPill } from "@/components/Table";
import { useFleet } from "@/data/fleet";

export const Route = createFileRoute("/usage")({
  head: () => ({
    meta: [
      { title: "Usage Logging — Smart Rental Tracking System" },
      {
        name: "description",
        content:
          "Engine hours versus idle hours per asset, per-site utilization summaries and the raw usage log.",
      },
      { property: "og:title", content: "Usage Logging — Smart Rental Tracking" },
      {
        property: "og:description",
        content: "Compare engine and idle hours across the rented fleet by asset and site.",
      },
    ],
  }),
  component: UsagePage,
});

function UsagePage() {
  const { assets } = useFleet();
  const [filter, setFilter] = useState("All");

  const sites = Array.from(new Set(assets.map((a) => a.site ?? "Unassigned")));
  const perSite = sites.map((s) => {
    const rows = assets.filter((a) => (a.site ?? "Unassigned") === s);
    return {
      site: s,
      engine: rows.reduce((n, a) => n + a.engineHrsPerDay * a.operatingDays, 0),
      idle: rows.reduce((n, a) => n + a.idleHrsPerDay * a.operatingDays, 0),
      util: Math.round(rows.reduce((n, a) => n + a.utilizationPct, 0) / rows.length),
      count: rows.length,
    };
  });

  const filtered = filter === "All" ? assets : assets.filter((a) => a.type === filter);
  const types = ["All", ...Array.from(new Set(assets.map((a) => a.type)))];

  return (
    <Shell crumb="Usage">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Engine vs Idle hrs / day" tabs={["Per asset"]} activeTab="Per asset">
          <div className="space-y-3 px-5 pb-5">
            {assets.map((a) => (
              <div key={a.id}>
                <div className="mb-1 flex justify-between text-[12px]">
                  <span className="font-medium">{a.id}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {a.engineHrsPerDay} engine · {a.idleHrsPerDay} idle
                  </span>
                </div>
                <div className="flex h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="bg-ok"
                    style={{ width: `${(a.engineHrsPerDay / 12) * 100}%` }}
                  />
                  <div
                    className="bg-warn"
                    style={{ width: `${(a.idleHrsPerDay / 12) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="pt-1 text-[11px] text-muted-foreground">
              Green = engine hours · Yellow = idle hours (scale 0–12 hrs/day)
            </p>
          </div>
        </Panel>

        <Panel title="Per-site Summary">
          <Table
            selectable={false}
            columns={[
              { key: "site", label: "Site" },
              { key: "count", label: "Assets", align: "right" },
              { key: "engine", label: "Engine hrs", align: "right" },
              { key: "idle", label: "Idle hrs", align: "right" },
              { key: "util", label: "Util %", align: "right" },
            ]}
            rows={perSite.map((p) => ({
              id: p.site,
              cells: {
                site: p.site,
                count: p.count,
                engine: p.engine.toFixed(1),
                idle: p.idle.toFixed(1),
                util: `${p.util}%`,
              },
            }))}
          />
        </Panel>

        <div className="lg:col-span-2">
          <Panel
            title="Raw Usage Log"
            tabs={types}
            activeTab={filter}
            onTabChange={setFilter}
          >
            <Table
              columns={[
                { key: "id", label: "Asset" },
                { key: "site", label: "Site" },
                { key: "status", label: "Status" },
                { key: "days", label: "Op. days", align: "right" },
                { key: "engine", label: "Engine hrs", align: "right" },
                { key: "idle", label: "Idle hrs", align: "right" },
                { key: "util", label: "Util %", align: "right" },
              ]}
              rows={filtered.map((a) => ({
                id: a.id,
                cells: {
                  id: a.id,
                  site: a.site ?? "—",
                  status: <StatusPill status={a.status} />,
                  days: a.operatingDays,
                  engine: (a.engineHrsPerDay * a.operatingDays).toFixed(1),
                  idle: (a.idleHrsPerDay * a.operatingDays).toFixed(1),
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
