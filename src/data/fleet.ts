import { useSyncExternalStore } from "react";

export type Status = "Active" | "Idle" | "Overdue" | "Unknown";

export type Asset = {
  id: string;
  type: "Excavator" | "Crane" | "Bulldozer" | "Grader";
  site: string | null;
  checkOut: string;
  checkIn: string;
  engineHrsPerDay: number;
  idleHrsPerDay: number;
  operatingDays: number;
  operator: string | null;
  utilizationPct: number;
  status: Status;
  anomalies?: string[];
};

export type ActivityEntry = {
  who: string;
  what: string;
  where: string;
  when: string;
};

const INITIAL_ASSETS: Asset[] = [
  {
    id: "EQX1001",
    type: "Excavator",
    site: "S003",
    checkOut: "2025-04-01",
    checkIn: "2025-04-16",
    engineHrsPerDay: 1.5,
    idleHrsPerDay: 10,
    operatingDays: 15,
    operator: "OP101",
    utilizationPct: 13,
    status: "Idle",
  },
  {
    id: "EQX1002",
    type: "Crane",
    site: null,
    checkOut: "2025-03-10",
    checkIn: "2025-03-30",
    engineHrsPerDay: 0,
    idleHrsPerDay: 11,
    operatingDays: 20,
    operator: null,
    utilizationPct: 0,
    status: "Unknown",
    anomalies: ["No site assigned", "No operator", "Zero engine runtime"],
  },
  {
    id: "EQX1003",
    type: "Bulldozer",
    site: "S002",
    checkOut: "2025-02-15",
    checkIn: "2025-03-11",
    engineHrsPerDay: 7.5,
    idleHrsPerDay: 0.5,
    operatingDays: 25,
    operator: "OP203",
    utilizationPct: 94,
    status: "Active",
  },
  {
    id: "EQX1004",
    type: "Excavator",
    site: "S004",
    checkOut: "2025-05-05",
    checkIn: "2025-05-15",
    engineHrsPerDay: 2,
    idleHrsPerDay: 9,
    operatingDays: 10,
    operator: "OP106",
    utilizationPct: 18,
    status: "Idle",
  },
  {
    id: "EQX1005",
    type: "Bulldozer",
    site: "S006",
    checkOut: "2025-01-01",
    checkIn: "2025-01-31",
    engineHrsPerDay: 8,
    idleHrsPerDay: 0,
    operatingDays: 30,
    operator: "OP301",
    utilizationPct: 100,
    status: "Active",
    anomalies: [
      "Continuous high utilization — no idle time logged, verify maintenance schedule",
    ],
  },
  {
    id: "EQX1006",
    type: "Grader",
    site: "S001",
    checkOut: "2025-04-05",
    checkIn: "2025-04-23",
    engineHrsPerDay: 3,
    idleHrsPerDay: 6,
    operatingDays: 18,
    operator: "OP114",
    utilizationPct: 33,
    status: "Idle",
  },
  {
    id: "EQX1007",
    type: "Excavator",
    site: null,
    checkOut: "2025-03-20",
    checkIn: "2025-04-01",
    engineHrsPerDay: 0,
    idleHrsPerDay: 12,
    operatingDays: 12,
    operator: null,
    utilizationPct: 0,
    status: "Unknown",
    anomalies: [
      "No site assigned",
      "No operator",
      "Zero engine runtime",
      "12 idle hrs/day",
    ],
  },
];

export const FORECAST = {
  site: "S003",
  predictedNeed: "Excavator",
  window: "Next week",
  confidence: "High",
};

export const SITES = ["S001", "S002", "S003", "S004", "S006"];
export const OPERATORS = ["OP101", "OP106", "OP114", "OP203", "OP301"];

/* ---------- tiny in-memory store ---------- */

type State = { assets: Asset[]; activity: ActivityEntry[]; selectedId: string };

let state: State = {
  assets: INITIAL_ASSETS,
  activity: [
    {
      who: "OP203",
      what: "Checked out EQX1003 (Bulldozer)",
      where: "Site S002",
      when: "2025-02-15 08:12",
    },
    {
      who: "Dispatch",
      what: "Flagged EQX1002 — zero engine runtime",
      where: "Unassigned",
      when: "2025-03-12 14:40",
    },
  ],
  selectedId: "EQX1001",
};

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useFleet(): State {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  );
}

function now() {
  return new Date().toISOString().slice(0, 16).replace("T", " ");
}

export function selectAsset(id: string) {
  state = { ...state, selectedId: id };
  emit();
}

export function checkOutAsset(id: string, site: string, operator: string, note: string) {
  const asset = state.assets.find((a) => a.id === id);
  if (!asset) return `Asset ${id} not found.`;
  state = {
    ...state,
    assets: state.assets.map((a) =>
      a.id === id ? { ...a, status: "Active", site, operator } : a,
    ),
    activity: [
      {
        who: operator || "Unassigned",
        what: `Checked out ${id} (${asset.type})${note ? ` — ${note}` : ""}`,
        where: `Site ${site}`,
        when: now(),
      },
      ...state.activity,
    ],
  };
  emit();
  return `${id} checked out to ${site}.`;
}

export function checkInAsset(id: string, note: string) {
  const asset = state.assets.find((a) => a.id === id);
  if (!asset) return `Asset ${id} not found.`;
  state = {
    ...state,
    assets: state.assets.map((a) =>
      a.id === id ? { ...a, status: "Idle", operator: null } : a,
    ),
    activity: [
      {
        who: asset.operator ?? "Yard crew",
        what: `Checked in ${id} (${asset.type})${note ? ` — ${note}` : ""}`,
        where: asset.site ? `Site ${asset.site}` : "Depot",
        when: now(),
      },
      ...state.activity,
    ],
  };
  emit();
  return `${id} checked in.`;
}

/* ---------- derived helpers ---------- */

export const TODAY = new Date("2025-05-10");

export function isOverdue(a: Asset) {
  return new Date(a.checkIn) < TODAY && a.status !== "Idle" ? false : new Date(a.checkIn) < TODAY;
}

export function summary(assets: Asset[]) {
  const active = assets.filter((a) => a.status === "Active").length;
  const idle = assets.filter((a) => a.status === "Idle").length;
  const unknown = assets.filter((a) => a.status === "Unknown").length;
  const avg = Math.round(
    assets.reduce((s, a) => s + a.utilizationPct, 0) / (assets.length || 1),
  );
  const flagged = assets.filter((a) => a.anomalies?.length);
  return { total: assets.length, active, idle, unknown, avg, flagged };
}
