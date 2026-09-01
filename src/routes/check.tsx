import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ScanLine } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Panel } from "@/components/Panel";
import { Table } from "@/components/Table";
import {
  useFleet,
  checkInAsset,
  checkOutAsset,
  SITES,
  OPERATORS,
} from "@/data/fleet";

export const Route = createFileRoute("/check")({
  head: () => ({
    meta: [
      { title: "Check-In / Check-Out — Smart Rental Tracking System" },
      {
        name: "description",
        content:
          "Scan an asset ID to check equipment in or out and log who, what, where and when.",
      },
      { property: "og:title", content: "Check-In / Check-Out — Smart Rental Tracking" },
      {
        property: "og:description",
        content: "Simulated QR/RFID check-in and check-out with full activity logging.",
      },
    ],
  }),
  component: CheckPage,
});

function CheckPage() {
  const { activity, assets } = useFleet();
  const [assetId, setAssetId] = useState("EQX1007");
  const [site, setSite] = useState("S003");
  const [operator, setOperator] = useState("OP101");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <Shell crumb="Check-In / Out">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Scan Asset">
          <div className="space-y-4 px-5 pb-5">
            <Field label="Asset ID (QR / RFID)">
              <div className="flex items-center gap-2 rounded-xl border border-border px-3">
                <ScanLine size={16} className="text-muted-foreground" />
                <input
                  value={assetId}
                  onChange={(e) => setAssetId(e.target.value.toUpperCase())}
                  placeholder="Scan or type EQX…"
                  className="w-full bg-transparent py-2.5 text-[13px] outline-none"
                />
              </div>
            </Field>
            <Field label="Note">
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Location note, condition…"
                className="w-full rounded-xl border border-border px-3 py-2.5 text-[13px] outline-none"
              />
            </Field>
            <div className="flex gap-2">
              <button
                onClick={() => setMsg(checkOutAsset(assetId, site, operator, note))}
                className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-medium text-accent-foreground"
              >
                Check out
              </button>
              <button
                onClick={() => setMsg(checkInAsset(assetId, note))}
                className="flex-1 rounded-xl bg-foreground px-4 py-2.5 text-[13px] font-medium text-background"
              >
                Check in
              </button>
            </div>
            {msg && <p className="text-[12px] text-muted-foreground">{msg}</p>}
          </div>
        </Panel>

        <Panel title="Assign">
          <div className="space-y-4 px-5 pb-5">
            <Field label="Site">
              <select
                value={site}
                onChange={(e) => setSite(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-[13px] outline-none"
              >
                {SITES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Operator">
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-[13px] outline-none"
              >
                {OPERATORS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
            <div className="rounded-xl bg-muted p-3 text-[12px] text-muted-foreground">
              {assets.find((a) => a.id === assetId)
                ? `${assetId} is currently ${assets.find((a) => a.id === assetId)!.status} at ${
                    assets.find((a) => a.id === assetId)!.site ?? "no site"
                  }.`
                : `${assetId} not found in fleet.`}
            </div>
          </div>
        </Panel>

        <div className="lg:col-span-2">
          <Panel title="Recent Activity">
            <Table
              selectable={false}
              columns={[
                { key: "who", label: "Who" },
                { key: "what", label: "What" },
                { key: "where", label: "Where" },
                { key: "when", label: "When", align: "right" },
              ]}
              rows={activity.map((a, i) => ({ id: String(i), cells: { ...a } }))}
            />
          </Panel>
        </div>
      </div>
    </Shell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
