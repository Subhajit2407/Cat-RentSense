import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Panel } from "@/components/Panel";
import { Table, StatusPill } from "@/components/Table";
import { useFleet, type Asset } from "@/data/fleet";

export const Route = createFileRoute("/anomalies")({
  head: () => ({
    meta: [
      { title: "Anomaly Detection — Smart Rental Tracking System" },
      {
        name: "description",
        content:
          "Flagged rental assets with the exact rule, threshold and detected value that triggered each anomaly.",
      },
      { property: "og:title", content: "Anomaly Detection — Smart Rental Tracking" },
      {
        property: "og:description",
        content: "Transparent detection: every flag shows the rule and the measurement behind it.",
      },
    ],
  }),
  component: AnomaliesPage,
});

const RULES: Record<string, { rule: string; value: (a: Asset) => string }> = {
  "No site assigned": {
    rule: "site == null",
    value: (a) => String(a.site ?? "null"),
  },
  "No operator": {
    rule: "operator == null",
    value: (a) => String(a.operator ?? "null"),
  },
  "Zero engine runtime": {
    rule: "engineHrsPerDay == 0 over full rental window",
    value: (a) => `${a.engineHrsPerDay} hrs/day × ${a.operatingDays} days`,
  },
  "12 idle hrs/day": {
    rule: "idleHrsPerDay >= 10",
    value: (a) => `${a.idleHrsPerDay} idle hrs/day`,
  },
  "Continuous high utilization — no idle time logged, verify maintenance schedule": {
    rule: "utilizationPct >= 95 AND idleHrsPerDay == 0",
    value: (a) => `${a.utilizationPct}% util · ${a.idleHrsPerDay} idle hrs/day`,
  },
};

function AnomaliesPage() {
  const { assets } = useFleet();
  const [openId, setOpenId] = useState<string | null>(null);

  const rows = assets.flatMap((a) =>
    (a.anomalies ?? []).map((an, i) => ({ key: `${a.id}-${i}`, asset: a, anomaly: an })),
  );
  const open = rows.find((r) => r.key === openId);

  return (
    <Shell crumb="Anomalies">
      <Panel title={`Detected Anomalies (${rows.length})`}>
        <Table
          columns={[
            { key: "asset", label: "Asset" },
            { key: "type", label: "Anomaly" },
            { key: "rule", label: "Rule triggered" },
            { key: "value", label: "Detected value", align: "right" },
          ]}
          rows={rows.map((r) => ({
            id: r.key,
            highlight: r.key === openId,
            cells: {
              asset: r.asset.id,
              type: <StatusPill status="Anomaly" />,
              rule: RULES[r.anomaly]?.rule ?? r.anomaly,
              value: RULES[r.anomaly]?.value(r.asset) ?? "—",
            },
          }))}
          onRowClick={setOpenId}
        />
      </Panel>

      {open && (
        <>
          <div
            className="fixed inset-0 z-30 bg-foreground/20"
            onClick={() => setOpenId(null)}
          />
          <aside className="fixed right-0 top-0 z-40 h-full w-[380px] overflow-auto border-l border-border bg-card p-5 shadow-panel">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {open.asset.type} · {open.asset.site ?? "Unassigned"}
                </p>
                <h3 className="text-xl font-semibold tracking-tight">{open.asset.id}</h3>
              </div>
              <button onClick={() => setOpenId(null)} className="rounded-lg p-1 hover:bg-muted">
                <X size={16} />
              </button>
            </div>

            <div className="mt-5 space-y-3 text-[13px]">
              <Field label="Anomaly">{open.anomaly}</Field>
              <Field label="Rule / threshold">
                <code className="rounded bg-muted px-1.5 py-0.5 text-[12px]">
                  {RULES[open.anomaly]?.rule ?? "custom rule"}
                </code>
              </Field>
              <Field label="Detected value">
                {RULES[open.anomaly]?.value(open.asset) ?? "—"}
              </Field>
              <Field label="Rental window">
                {open.asset.checkOut} → {open.asset.checkIn}
              </Field>
              <Field label="Utilization">{open.asset.utilizationPct}%</Field>
              <Field label="Operator">{open.asset.operator ?? "None"}</Field>
            </div>

            <div className="mt-5 rounded-xl bg-accent p-3 text-[12px] text-accent-foreground">
              Recommended: {open.asset.utilizationPct === 0
                ? "off-hire or reassign this machine — it is billing with no productive runtime."
                : "schedule a maintenance check before the next rental window."}
            </div>
          </aside>
        </>
      )}
    </Shell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-foreground">{children}</p>
    </div>
  );
}
