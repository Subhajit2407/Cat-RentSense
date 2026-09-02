import { useSyncExternalStore } from "react";

export type Status = "Active" | "Idle" | "Overdue" | "Unknown" | "Due Soon" | "Unassigned";

export type AssetCondition = "Good" | "Needs Attention" | "Damaged";

export type UserRole = "customer" | "rental_staff" | "supervisor_admin";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName: string;
  phone: string;
  verified: boolean;
};

export type NotificationPreferences = {
  emailEnabled: boolean;
  criticalAlerts: boolean;
  overdueRentals: boolean;
  inspectionIssues: boolean;
  unassignedEquipment: boolean;
  lowUtilization: boolean;
  forecastRecommendations: boolean;
  anomalies: boolean;
};

export type NotificationRecord = {
  id: string;
  alertId: string;
  type: string;
  title: string;
  recipient: string;
  status: "sent" | "failed" | "skipped" | "pending";
  sentAt: string;
  error?: string;
};

export type AssetHistoryItem = {
  id: string;
  time: string;
  type: "checkout" | "checkin" | "telemetry" | "operator" | "anomaly" | "optimization" | "payment" | "inspection" | "deposit";
  title: string;
  detail: string;
  site?: string | undefined;
  operator?: string | undefined;
};

export type Asset = {
  id: string;
  type: "Excavator" | "Crane" | "Bulldozer" | "Grader";
  site: string | null;
  checkOut: string;
  checkIn: string;
  monthlyRentalRate: number; // e.g. ₹50,000
  securityDepositRatio: number; // e.g. 0.80 (80%)
  engineHrsPerDay: number;
  idleHrsPerDay: number;
  operatingDays: number;
  operator: string | null;
  utilizationPct: number;
  status: Status;
  condition: AssetCondition;
  fuelPct: number;
  lat: number;
  lng: number;
  location: string;
  serialNumber: string;
  qrCodePayload: string;
  telemetryTrend: number[]; // 7-day utilization sparkline
  anomalies?: string[];
  history: AssetHistoryItem[];
};

export type RentalStatus =
  | "Available"
  | "Reserved"
  | "Pending Checkout"
  | "Checked Out"
  | "Active Rental"
  | "Return Requested"
  | "Pending Inspection"
  | "Checked In"
  | "Refund Pending"
  | "Completed"
  | "Overdue"
  | "Disputed"
  | "Cancelled";

export type PaymentState =
  | "Pending"
  | "Processing"
  | "Paid"
  | "Failed"
  | "Refund Pending"
  | "Refunded"
  | "Partially Deducted"
  | "Disputed";

export type DepositState =
  | "Held"
  | "Refund Pending"
  | "Refund Processing"
  | "Refunded"
  | "Partially Deducted"
  | "Disputed";

export type InspectionRecord = {
  id: string;
  contractId: string;
  equipmentId: string;
  type: "pre_checkout" | "post_checkin";
  inspectorName: string;
  timestamp: string;
  engine: AssetCondition;
  hydraulics: AssetCondition;
  body: AssetCondition;
  tracksTires: AssetCondition;
  cabin: AssetCondition;
  lights: AssetCondition;
  safety: AssetCondition;
  fuelPct: number;
  hourMeter: number;
  notes: string;
};

export type RentalContract = {
  id: string;
  contractNumber: string; // e.g. SR-2026-1007
  customerId: string;
  customerName: string;
  customerCompany: string;
  equipmentId: string;
  equipmentType: Asset["type"];
  siteId: string;
  operatorId: string | null;
  startDate: string;
  endDate: string;
  monthlyRentalRate: number;
  securityDepositAmount: number; // REFUNDABLE deposit
  totalInitialPayable: number;
  paymentStatus: PaymentState;
  rentalStatus: RentalStatus;
  agreementAccepted: boolean;
  agreementAcceptedAt?: string | undefined;
  returnRequestedAt?: string | undefined;
  preInspection?: InspectionRecord | undefined;
  postInspection?: InspectionRecord | undefined;
  depositStatus: DepositState;
  damageDeduction: number;
  deductionReason?: string | undefined;
  refundAmount: number;
  refundApprovedBy?: string | undefined;
  refundDate?: string | undefined;
  createdAt: string;
};

export type AuditLogEntry = {
  id: string;
  userName: string;
  userRole: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  timestamp: string;
  location?: string;
};

export type SiteMeta = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  demandForecast: {
    need: number;
    have: number;
    gap: number;
    confidence: "High" | "Medium" | "Low";
    primaryNeed: "Excavator" | "Crane" | "Bulldozer" | "Grader";
  };
  manager: string;
  activeRentalsCount: number;
};

export type OptimizationPlan = {
  id: string;
  assetId: string;
  type: "Redeploy" | "Return" | "Extend" | "Reassign" | "Maintenance";
  title: string;
  fromSite: string;
  toSite: string;
  why: string;
  whatWillChange: string;
  expectedImpact: string;
  utilizationDelta: string;
  idleReduction: string;
  savings: string;
  confidence: "High" | "Medium" | "Low";
  status: "pending" | "applied" | "dismissed";
};

export const EQUIPMENT_PHOTOS: Record<Asset["type"], string> = {
  Excavator: "/equipment/excavator.jpg",
  Crane: "/equipment/crane.jpg",
  Bulldozer: "/equipment/bulldozer.jpg",
  Grader: "/equipment/grader.jpg",
};

export const SITES_META: Record<string, SiteMeta> = {
  S003: {
    id: "S003",
    name: "Bhopal Metro Line 2 Extension",
    lat: 23.2599,
    lng: 77.4126,
    demandForecast: {
      need: 3,
      have: 1,
      gap: 2,
      confidence: "High",
      primaryNeed: "Excavator",
    },
    manager: "Dev Sharma",
    activeRentalsCount: 1,
  },
  S002: {
    id: "S002",
    name: "Nagpur Express Corridor",
    lat: 21.1458,
    lng: 79.0882,
    demandForecast: {
      need: 2,
      have: 1,
      gap: 1,
      confidence: "High",
      primaryNeed: "Bulldozer",
    },
    manager: "Aman Verma",
    activeRentalsCount: 1,
  },
  S004: {
    id: "S004",
    name: "Bhubaneswar Smart Port Access",
    lat: 20.2961,
    lng: 85.8245,
    demandForecast: {
      need: 1,
      have: 1,
      gap: 0,
      confidence: "Medium",
      primaryNeed: "Excavator",
    },
    manager: "Rajesh Mohanty",
    activeRentalsCount: 1,
  },
  S001: {
    id: "S001",
    name: "Kolkata Eastern Bypass Expansion",
    lat: 22.5726,
    lng: 88.3639,
    demandForecast: {
      need: 1,
      have: 1,
      gap: 0,
      confidence: "Medium",
      primaryNeed: "Grader",
    },
    manager: "Pooja Banerjee",
    activeRentalsCount: 1,
  },
  S006: {
    id: "S006",
    name: "Pune Industrial Logistics Hub",
    lat: 18.5204,
    lng: 73.8567,
    demandForecast: {
      need: 0,
      have: 1,
      gap: 0,
      confidence: "Low",
      primaryNeed: "Bulldozer",
    },
    manager: "Kunal Joshi",
    activeRentalsCount: 1,
  },
};

const INITIAL_ASSETS: Asset[] = [
  {
    id: "EQX1001",
    type: "Excavator",
    site: "S003",
    checkOut: "2025-04-01",
    checkIn: "2025-04-16",
    monthlyRentalRate: 50000,
    securityDepositRatio: 0.8,
    engineHrsPerDay: 1.5,
    idleHrsPerDay: 10,
    operatingDays: 15,
    operator: "OP101",
    utilizationPct: 13,
    status: "Idle",
    condition: "Good",
    fuelPct: 78,
    lat: 23.2599,
    lng: 77.4126,
    location: "Bhopal Metro Site S003",
    serialNumber: "CAT-320D-8941",
    qrCodePayload: "SMART-RENTAL-EQX1001",
    telemetryTrend: [18, 14, 12, 16, 13, 11, 13],
    history: [
      {
        id: "h1",
        time: "2025-04-01 08:30",
        type: "checkout",
        title: "Checked out to Site S003",
        detail: "Initial dispatch for metro excavation work.",
        site: "S003",
        operator: "OP101",
      },
      {
        id: "h2",
        time: "2025-04-04 14:15",
        type: "operator",
        title: "Operator OP101 Assigned",
        detail: "Shift supervisor confirmed primary operator license.",
      },
      {
        id: "h3",
        time: "2025-04-10 18:20",
        type: "telemetry",
        title: "High Idle Ratio Detected",
        detail: "10 hrs idle vs 1.5 hrs engine recorded.",
      },
    ],
  },
  {
    id: "EQX1002",
    type: "Crane",
    site: null,
    checkOut: "2025-03-10",
    checkIn: "2025-03-30",
    monthlyRentalRate: 85000,
    securityDepositRatio: 0.8,
    engineHrsPerDay: 0,
    idleHrsPerDay: 11,
    operatingDays: 20,
    operator: null,
    utilizationPct: 0,
    status: "Overdue",
    condition: "Needs Attention",
    fuelPct: 42,
    anomalies: ["Return overdue (41 days)", "No site assigned", "Zero engine runtime"],
    lat: 23.0934,
    lng: 78.7469,
    location: "Central Holding Depot",
    serialNumber: "CAT-LTM-1120",
    qrCodePayload: "SMART-RENTAL-EQX1002",
    telemetryTrend: [0, 0, 0, 0, 0, 0, 0],
    history: [
      {
        id: "h4",
        time: "2025-03-10 09:00",
        type: "checkout",
        title: "Initial dispatch without site tagging",
        detail: "Contract period expired 2025-03-30.",
      },
      {
        id: "h5",
        time: "2025-03-31 00:01",
        type: "anomaly",
        title: "Rental Overdue Triggered",
        detail: "Equipment has exceeded rental end date by 41+ days.",
      },
    ],
  },
  {
    id: "EQX1003",
    type: "Bulldozer",
    site: "S002",
    checkOut: "2025-02-15",
    checkIn: "2025-03-11",
    monthlyRentalRate: 60000,
    securityDepositRatio: 0.8,
    engineHrsPerDay: 7.5,
    idleHrsPerDay: 0.5,
    operatingDays: 25,
    operator: "OP203",
    utilizationPct: 94,
    status: "Active",
    condition: "Good",
    fuelPct: 91,
    lat: 21.1458,
    lng: 79.0882,
    location: "Nagpur Express Corridor S002",
    serialNumber: "CAT-D6T-4432",
    qrCodePayload: "SMART-RENTAL-EQX1003",
    telemetryTrend: [92, 94, 96, 91, 95, 93, 94],
    history: [
      {
        id: "h6",
        time: "2025-02-15 08:12",
        type: "checkout",
        title: "Checked out to Site S002",
        detail: "Heavy earthmoving and ground grading operations.",
        site: "S002",
        operator: "OP203",
      },
    ],
  },
  {
    id: "EQX1004",
    type: "Excavator",
    site: "S004",
    checkOut: "2025-05-05",
    checkIn: "2025-05-15",
    monthlyRentalRate: 50000,
    securityDepositRatio: 0.8,
    engineHrsPerDay: 2,
    idleHrsPerDay: 9,
    operatingDays: 10,
    operator: "OP106",
    utilizationPct: 18,
    status: "Due Soon",
    condition: "Good",
    fuelPct: 65,
    lat: 20.2961,
    lng: 85.8245,
    location: "Bhubaneswar Port Site S004",
    serialNumber: "CAT-336GC-1092",
    qrCodePayload: "SMART-RENTAL-EQX1004",
    telemetryTrend: [15, 20, 18, 16, 22, 19, 18],
    history: [
      {
        id: "h8",
        time: "2025-05-05 07:45",
        type: "checkout",
        title: "Checked out to Site S004",
        detail: "Scheduled for return on 2025-05-15 (5 days remaining).",
        site: "S004",
        operator: "OP106",
      },
    ],
  },
  {
    id: "EQX1005",
    type: "Bulldozer",
    site: "S006",
    checkOut: "2025-01-01",
    checkIn: "2025-01-31",
    monthlyRentalRate: 65000,
    securityDepositRatio: 0.8,
    engineHrsPerDay: 8,
    idleHrsPerDay: 0,
    operatingDays: 30,
    operator: "OP301",
    utilizationPct: 100,
    status: "Active",
    condition: "Good",
    fuelPct: 84,
    anomalies: [
      "Continuous high utilization — 0 hrs idle logged, verify maintenance schedule",
    ],
    lat: 18.5204,
    lng: 73.8567,
    location: "Pune Industrial Hub S006",
    serialNumber: "CAT-D8T-9921",
    qrCodePayload: "SMART-RENTAL-EQX1005",
    telemetryTrend: [100, 100, 100, 100, 100, 100, 100],
    history: [
      {
        id: "h9",
        time: "2025-01-01 08:00",
        type: "checkout",
        title: "Checked out to Site S006",
        detail: "Continuous shift quarry grading.",
        site: "S006",
        operator: "OP301",
      },
    ],
  },
  {
    id: "EQX1006",
    type: "Grader",
    site: "S001",
    checkOut: "2025-04-05",
    checkIn: "2025-04-23",
    monthlyRentalRate: 55000,
    securityDepositRatio: 0.8,
    engineHrsPerDay: 3,
    idleHrsPerDay: 6,
    operatingDays: 18,
    operator: "OP114",
    utilizationPct: 33,
    status: "Active",
    condition: "Good",
    fuelPct: 70,
    lat: 22.5726,
    lng: 88.3639,
    location: "Kolkata Bypass S001",
    serialNumber: "CAT-140M-3382",
    qrCodePayload: "SMART-RENTAL-EQX1006",
    telemetryTrend: [30, 35, 32, 38, 28, 34, 33],
    history: [
      {
        id: "h11",
        time: "2025-04-05 09:15",
        type: "checkout",
        title: "Checked out to Site S001",
        detail: "Road leveling and precision surface grading.",
        site: "S001",
        operator: "OP114",
      },
    ],
  },
  {
    id: "EQX1007",
    type: "Excavator",
    site: null,
    checkOut: "2025-03-20",
    checkIn: "2025-04-01",
    monthlyRentalRate: 50000,
    securityDepositRatio: 0.8, // ₹40,000 refundable deposit
    engineHrsPerDay: 0,
    idleHrsPerDay: 12,
    operatingDays: 12,
    operator: null,
    utilizationPct: 0,
    status: "Unassigned",
    condition: "Good",
    fuelPct: 95,
    anomalies: [
      "No site assigned",
      "No operator assigned",
      "Zero engine runtime",
      "12 idle hrs/day",
    ],
    lat: 23.8134,
    lng: 79.1969,
    location: "Holding Yard (Near Jabalpur)",
    serialNumber: "CAT-330D2-5520",
    qrCodePayload: "SMART-RENTAL-EQX1007",
    telemetryTrend: [0, 0, 0, 0, 0, 0, 0],
    history: [
      {
        id: "h12",
        time: "2025-03-20 10:00",
        type: "checkout",
        title: "Off-contract returned to staging yard",
        detail: "Parked with full tank (95%), telemetry active.",
      },
    ],
  },
];

export const INITIAL_PROFILES: Record<UserRole, UserProfile> = {
  customer: {
    id: "cust-001",
    name: "Rajesh Patel",
    email: "rajesh.patel@apexinfra.com",
    role: "customer",
    companyName: "Apex Infra Projects Ltd.",
    phone: "+91 98230 44120",
    verified: true,
  },
  rental_staff: {
    id: "staff-001",
    name: "Vikram Singh",
    email: "vikram.singh@rentsense.com",
    role: "rental_staff",
    companyName: "RentSense Fleet HQ",
    phone: "+91 99100 88210",
    verified: true,
  },
  supervisor_admin: {
    id: "admin-001",
    name: "Vikram Singh",
    email: "admin@rentsense.com",
    role: "rental_staff",
    companyName: "RentSense Operations Leadership",
    phone: "+91 99100 88210",
    verified: true,
  },
};

export const INITIAL_CONTRACTS: RentalContract[] = [
  {
    id: "cnt-1001",
    contractNumber: "SR-2025-1001",
    customerId: "cust-001",
    customerName: "Rajesh Patel",
    customerCompany: "Apex Infra Projects Ltd.",
    equipmentId: "EQX1001",
    equipmentType: "Excavator",
    siteId: "S003",
    operatorId: "OP101",
    startDate: "2025-04-01",
    endDate: "2025-04-16",
    monthlyRentalRate: 50000,
    securityDepositAmount: 40000,
    totalInitialPayable: 90000,
    paymentStatus: "Paid",
    rentalStatus: "Active Rental",
    agreementAccepted: true,
    agreementAcceptedAt: "2025-04-01 08:15",
    depositStatus: "Held",
    damageDeduction: 0,
    refundAmount: 40000,
    createdAt: "2025-04-01 08:00",
  },
  {
    id: "cnt-1003",
    contractNumber: "SR-2025-1003",
    customerId: "cust-002",
    customerName: "Amitabh Roy",
    customerCompany: "Metro Express Roads",
    equipmentId: "EQX1003",
    equipmentType: "Bulldozer",
    siteId: "S002",
    operatorId: "OP203",
    startDate: "2025-02-15",
    endDate: "2025-03-11",
    monthlyRentalRate: 60000,
    securityDepositAmount: 48000,
    totalInitialPayable: 108000,
    paymentStatus: "Paid",
    rentalStatus: "Active Rental",
    agreementAccepted: true,
    agreementAcceptedAt: "2025-02-15 07:45",
    depositStatus: "Held",
    damageDeduction: 0,
    refundAmount: 48000,
    createdAt: "2025-02-15 07:30",
  },
  {
    id: "cnt-1005",
    contractNumber: "SR-2025-1005",
    customerId: "cust-003",
    customerName: "Sanjay Singhania",
    customerCompany: "Deccan Mining Logistics",
    equipmentId: "EQX1005",
    equipmentType: "Bulldozer",
    siteId: "S006",
    operatorId: "OP301",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    monthlyRentalRate: 65000,
    securityDepositAmount: 52000,
    totalInitialPayable: 117000,
    paymentStatus: "Paid",
    rentalStatus: "Active Rental",
    agreementAccepted: true,
    agreementAcceptedAt: "2025-01-01 07:30",
    depositStatus: "Refund Pending",
    damageDeduction: 0,
    refundAmount: 52000,
    createdAt: "2025-01-01 07:00",
  },
  {
    id: "cnt-1007",
    contractNumber: "SR-2025-1007",
    customerId: "cust-001",
    customerName: "Rajesh Patel",
    customerCompany: "Apex Infra Projects Ltd.",
    equipmentId: "EQX1007",
    equipmentType: "Excavator",
    siteId: "S003",
    operatorId: "OP101",
    startDate: "2025-05-01",
    endDate: "2025-05-30",
    monthlyRentalRate: 50000,
    securityDepositAmount: 40000,
    totalInitialPayable: 90000,
    paymentStatus: "Paid",
    rentalStatus: "Pending Checkout",
    agreementAccepted: true,
    agreementAcceptedAt: "2025-05-01 09:10",
    depositStatus: "Held",
    damageDeduction: 0,
    refundAmount: 40000,
    createdAt: "2025-05-01 09:00",
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-1",
    userName: "Rajesh Patel",
    userRole: "customer",
    action: "Rental Request Created",
    entityType: "Contract",
    entityId: "SR-2025-1007",
    details: "Requested EQX1007 for Site S003 (₹50,000 monthly + ₹40,000 refundable security deposit).",
    timestamp: "2025-05-01 09:00",
    location: "Online Portal",
  },
  {
    id: "log-2",
    userName: "System Payment Gateway",
    userRole: "system",
    action: "Payment & Deposit Received",
    entityType: "Payment",
    entityId: "PAY-99412",
    details: "Received ₹90,000 (₹50,000 rental fee + ₹40,000 refundable deposit held in escrow).",
    timestamp: "2025-05-01 09:05",
    location: "HDFC Escrow Gateway",
  },
  {
    id: "log-3",
    userName: "Rajesh Patel",
    userRole: "customer",
    action: "Agreement Accepted",
    entityType: "Contract",
    entityId: "SR-2025-1007",
    details: "Accepted Master Equipment Rental Agreement & Deposit Refund Policy.",
    timestamp: "2025-05-01 09:10",
    location: "103.21.58.92",
  },
];

export const SITES = ["S001", "S002", "S003", "S004", "S006"];
export const OPERATORS = ["OP101", "OP106", "OP114", "OP203", "OP301"];

/* ---------- Store State ---------- */

export type AppMode = "tower" | "optimizer" | "planning" | "customer_portal" | "rental_ops";

type State = {
  assets: Asset[];
  contracts: RentalContract[];
  auditLogs: AuditLogEntry[];
  currentUser: UserProfile;
  selectedId: string;
  selectedSiteId: string | null;
  optimizationPlans: OptimizationPlan[];
  activeActionPlan: OptimizationPlan | null;
  appMode: AppMode;
  resolvedAlertIds: Set<string>;
  snoozedAlertIds: Set<string>;
  /** Tracks which alert IDs have already triggered an email notification.
   * Prevents duplicate emails on page refresh or re-render. */
  sentNotificationIds: Set<string>;
  notificationPreferences: NotificationPreferences;
  notificationsLog: NotificationRecord[];
};

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  emailEnabled: true,
  criticalAlerts: true,
  overdueRentals: true,
  inspectionIssues: true,
  unassignedEquipment: true,
  lowUtilization: false,
  forecastRecommendations: true,
  anomalies: true,
};

let state: State = {
  assets: INITIAL_ASSETS,
  contracts: INITIAL_CONTRACTS,
  auditLogs: INITIAL_AUDIT_LOGS,
  currentUser: INITIAL_PROFILES.rental_staff,
  selectedId: "EQX1007",
  selectedSiteId: null,
  sentNotificationIds: new Set<string>(),
  notificationPreferences: DEFAULT_NOTIFICATION_PREFERENCES,
  notificationsLog: [],
  optimizationPlans: [
    {
      id: "opt-1",
      assetId: "EQX1007",
      type: "Redeploy",
      title: "Reassign EQX1007 → Site S003 (Bhopal)",
      fromSite: "Holding Yard (Unassigned)",
      toSite: "S003 (Bhopal Metro)",
      why: "Site S003 forecast requires 3 excavators next week, but only 1 is currently active. EQX1007 is parked with 12 idle hrs/day and 0% utilization.",
      whatWillChange: "EQX1007 moves from Unassigned to S003, operator OP101 assigned, ready for mobilization.",
      expectedImpact: "+18% fleet utilization uplift · $1,100 rental optimization · 12 idle hrs/day recovered.",
      utilizationDelta: "0% → 72%",
      idleReduction: "12 hrs/day saved",
      savings: "+$1,100 / wk",
      confidence: "High",
      status: "pending",
    },
    {
      id: "opt-2",
      assetId: "EQX1002",
      type: "Return",
      title: "Off-Hire EQX1002 (Tower Crane) — Return to Depot",
      fromSite: "S002 (Nagpur Express Corridor)",
      toSite: "Central Equipment Depot (Off-Hire)",
      why: "Zero crane demand forecasted across all active sites for the next 30 days. EQX1002 incurs ₹55,000/month standby lease cost with 0 productive operations scheduled.",
      whatWillChange: "EQX1002 returned to off-hire depot. Standby lease contract terminated. Estimated processing time: 3 working days.",
      expectedImpact: "₹55,000/month standby cost eliminated · Zero stranded asset exposure · Depot slot freed for inbound Bulldozer restock.",
      utilizationDelta: "12% → 0% (off-hired)",
      idleReduction: "Standby cost eliminated",
      savings: "₹55,000 / mo",
      confidence: "High",
      status: "pending",
    },
  ],
  activeActionPlan: null,
  appMode: "tower",
  resolvedAlertIds: new Set<string>(),
  snoozedAlertIds: new Set<string>(),
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

export function selectSite(siteId: string | null) {
  state = { ...state, selectedSiteId: siteId };
  emit();
}

export function setAppMode(mode: AppMode) {
  state = { ...state, appMode: mode };
  emit();
}

export function switchUserRole(role: UserRole) {
  state = {
    ...state,
    currentUser: INITIAL_PROFILES[role] || INITIAL_PROFILES.rental_staff,
    appMode: role === "customer" ? "customer_portal" : "tower",
  };
  emit();
}

export function registerUser(data: {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  companyName?: string | undefined;
}): UserProfile {
  const newProfile: UserProfile = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    role: data.role,
    companyName: data.companyName || (data.role === "rental_staff" ? "RentSense Operations Admin HQ" : "Independent Contractor / Builder"),
    verified: true,
  };
  state = {
    ...state,
    currentUser: newProfile,
    appMode: data.role === "customer" ? "customer_portal" : "tower",
  };
  addAuditLog(
    "User Registered & Logged In",
    "Account",
    newProfile.id,
    `New ${data.role === "rental_staff" ? "Rental Staff (Admin)" : "Customer"} account created for ${data.name} (${data.email}, ${data.phone}).`,
  );
  emit();
  return newProfile;
}

export function openActionSheet(plan: OptimizationPlan | null) {
  state = { ...state, activeActionPlan: plan };
  emit();
}

export function addAuditLog(
  action: string,
  entityType: string,
  entityId: string,
  details: string,
  location: string = "Control Tower",
) {
  const newEntry: AuditLogEntry = {
    id: `log-${Date.now()}`,
    userName: state.currentUser.name,
    userRole: state.currentUser.role,
    action,
    entityType,
    entityId,
    details,
    timestamp: now(),
    location,
  };
  state = {
    ...state,
    auditLogs: [newEntry, ...state.auditLogs],
  };
  emit();
}

/**
 * Creates a new rental contract.
 *
 * The rental team MUST be able to enter custom rates — equipment types,
 * durations, and customers all command different pricing.
 * monthlyRentalRate and securityDepositAmount are explicit parameters;
 * the asset's stored values are used only as defaults when not overridden.
 */
export function createRentalContract(data: {
  equipmentId: string;
  siteId: string;
  operatorId: string | null;
  startDate: string;
  endDate: string;
  /** Explicitly entered by rental staff — do NOT fall back to a hard-coded value */
  monthlyRentalRate: number;
  /** Explicitly entered or calculated — kept separate from revenue */
  securityDepositAmount: number;
}): RentalContract {
  const asset = state.assets.find((a) => a.id === data.equipmentId);
  const total = data.monthlyRentalRate + data.securityDepositAmount;

  // Contract number: SR-<year>-<sequential from timestamp>
  const contractNum = `SR-${new Date().getFullYear()}-${data.equipmentId.slice(3)}-${Date.now().toString().slice(-4)}`;
  const contractId = `cnt-${Date.now()}`;

  const newContract: RentalContract = {
    id: contractId,
    contractNumber: contractNum,
    customerId: state.currentUser.id,
    customerName: state.currentUser.name,
    customerCompany: state.currentUser.companyName,
    equipmentId: data.equipmentId,
    equipmentType: asset?.type ?? "Excavator",
    siteId: data.siteId,
    operatorId: data.operatorId,
    startDate: data.startDate,
    endDate: data.endDate,
    // Use the explicitly entered rates — not hard-coded fallbacks
    monthlyRentalRate: data.monthlyRentalRate,
    securityDepositAmount: data.securityDepositAmount,
    totalInitialPayable: total,
    paymentStatus: "Paid",
    rentalStatus: "Pending Checkout",
    agreementAccepted: true,
    agreementAcceptedAt: now(),
    depositStatus: "Held",
    damageDeduction: 0,
    refundAmount: data.securityDepositAmount,
    createdAt: now(),
  };

  state = {
    ...state,
    contracts: [newContract, ...state.contracts],
  };

  addAuditLog(
    "Rental Agreement Executed",
    "Contract",
    contractNum,
    `Rental contract created for ${data.equipmentId} — ₹${data.monthlyRentalRate.toLocaleString("en-IN")}/mo rent + ₹${data.securityDepositAmount.toLocaleString("en-IN")} refundable security deposit. Total paid: ₹${total.toLocaleString("en-IN")}.`,
  );

  emit();
  return newContract;
}

/** Staff approves check-out with pre-inspection */
export function approveCheckOut(
  contractId: string,
  preInspection: InspectionRecord,
) {
  const contract = state.contracts.find((c) => c.id === contractId);
  if (!contract) return;

  const asset = state.assets.find((a) => a.id === contract.equipmentId);
  const siteMeta = SITES_META[contract.siteId];

  const newHistory: AssetHistoryItem = {
    id: `h-${Date.now()}`,
    time: now(),
    type: "checkout",
    title: `Checked out to ${contract.customerCompany}`,
    detail: `Rental #${contract.contractNumber} active at ${siteMeta?.name ?? contract.siteId}. Pre-inspection passed (${preInspection.body} condition).`,
    site: contract.siteId,
    operator: contract.operatorId ?? undefined,
  };

  state = {
    ...state,
    contracts: state.contracts.map((c) =>
      c.id === contractId
        ? {
            ...c,
            rentalStatus: "Active Rental",
            preInspection,
          }
        : c,
    ),
    assets: state.assets.map((a) =>
      a.id === contract.equipmentId
        ? {
            ...a,
            status: "Active",
            site: contract.siteId,
            operator: contract.operatorId,
            location: siteMeta ? `${siteMeta.name} (${contract.siteId})` : `Site ${contract.siteId}`,
            lat: siteMeta?.lat ?? a.lat,
            lng: siteMeta?.lng ?? a.lng,
            anomalies: [],
            history: [newHistory, ...a.history],
          }
        : a,
    ),
  };

  addAuditLog(
    "Check-Out Approved & Dispatched",
    "Equipment",
    contract.equipmentId,
    `Pre-rental inspection verified by ${preInspection.inspectorName}. Dispatched to Site ${contract.siteId}.`,
  );

  emit();
}

/** Customer requests equipment return */
export function requestReturn(contractId: string) {
  const contract = state.contracts.find((c) => c.id === contractId);
  if (!contract) return;

  state = {
    ...state,
    contracts: state.contracts.map((c) =>
      c.id === contractId
        ? {
            ...c,
            rentalStatus: "Return Requested",
            returnRequestedAt: now(),
          }
        : c,
    ),
  };

  addAuditLog(
    "Return Requested",
    "Contract",
    contract.contractNumber,
    `Customer initiated return request for ${contract.equipmentId} from Site ${contract.siteId}.`,
  );

  emit();
}

/** Staff processes check-in with post-inspection */
export function approveCheckIn(
  contractId: string,
  postInspection: InspectionRecord,
) {
  const contract = state.contracts.find((c) => c.id === contractId);
  if (!contract) return;

  const newHistory: AssetHistoryItem = {
    id: `h-${Date.now()}`,
    time: now(),
    type: "checkin",
    title: `Checked in from ${contract.customerCompany}`,
    detail: `Returned to central yard. Post-inspection logged (${postInspection.body} condition). Deposit review pending.`,
  };

  state = {
    ...state,
    contracts: state.contracts.map((c) =>
      c.id === contractId
        ? {
            ...c,
            rentalStatus: "Checked In",
            depositStatus: "Refund Pending",
            postInspection,
          }
        : c,
    ),
    assets: state.assets.map((a) =>
      a.id === contract.equipmentId
        ? {
            ...a,
            status: "Idle",
            site: null,
            operator: null,
            location: "Central Holding Depot",
            history: [newHistory, ...a.history],
          }
        : a,
    ),
  };

  addAuditLog(
    "Equipment Check-In Completed",
    "Equipment",
    contract.equipmentId,
    `Post-rental inspection logged by ${postInspection.inspectorName}. Hour meter: ${postInspection.hourMeter} hrs. Deposit moved to Refund Pending.`,
  );

  emit();
}

/** Supervisor authorizes deposit refund (with optional damage deduction) */
export function approveDepositRefund(
  contractId: string,
  damageDeduction: number = 0,
  deductionReason: string = "",
  supervisorName: string = "Dev Sharma",
) {
  const contract = state.contracts.find((c) => c.id === contractId);
  if (!contract) return;

  const refundAmt = Math.max(0, contract.securityDepositAmount - damageDeduction);
  const status: DepositState = damageDeduction > 0 ? "Partially Deducted" : "Refunded";

  state = {
    ...state,
    contracts: state.contracts.map((c) =>
      c.id === contractId
        ? {
            ...c,
            depositStatus: status,
            damageDeduction,
            deductionReason: deductionReason || (damageDeduction > 0 ? "Approved maintenance wear deduction" : undefined),
            refundAmount: refundAmt,
            refundApprovedBy: supervisorName,
            refundDate: now(),
            rentalStatus: "Completed",
          }
        : c,
    ),
  };

  addAuditLog(
    damageDeduction > 0 ? "Deposit Partially Refunded (Deduction Approved)" : "Full Security Deposit Refunded",
    "Financial",
    contract.contractNumber,
    `Authorized refund ₹${refundAmt.toLocaleString("en-IN")}${
      damageDeduction > 0 ? ` (Deducted ₹${damageDeduction.toLocaleString("en-IN")}: ${deductionReason})` : ""
    } by ${supervisorName}.`,
  );

  emit();
}

export function snoozeAlert(alertId: string) {
  const snoozed = new Set(state.snoozedAlertIds);
  snoozed.add(alertId);
  state = { ...state, snoozedAlertIds: snoozed };
  emit();
}

export function resolveAlert(alertId: string) {
  const resolved = new Set(state.resolvedAlertIds);
  resolved.add(alertId);
  state = { ...state, resolvedAlertIds: resolved };
  emit();
}

/**
 * Updates user email notification preferences.
 */
export function updateNotificationPreferences(prefs: Partial<NotificationPreferences>) {
  state = {
    ...state,
    notificationPreferences: {
      ...state.notificationPreferences,
      ...prefs,
    },
  };
  addAuditLog(
    "Notification Preferences Updated",
    "Profile",
    state.currentUser.id,
    "Updated alert email notification delivery thresholds.",
  );
  emit();
}

/**
 * Marks an alert as having triggered an email notification.
 * Prevents duplicate emails on page refresh or repeated renders.
 */
export function markNotificationSent(alertId: string, record?: Omit<NotificationRecord, "id" | "alertId">) {
  const sent = new Set(state.sentNotificationIds);
  sent.add(alertId);

  const newLog: NotificationRecord[] = record
    ? [
        {
          id: `ntf-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          alertId,
          ...record,
        },
        ...state.notificationsLog,
      ]
    : state.notificationsLog;

  state = { ...state, sentNotificationIds: sent, notificationsLog: newLog };
  emit();
}

/**
 * Records an email delivery failure in the notification logs without marking
 * the alert ID as successfully sent, allowing retries.
 */
export function recordNotificationFailure(alertId: string, record: Omit<NotificationRecord, "id" | "alertId">) {
  const newLog: NotificationRecord[] = [
    {
      id: `ntf-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      alertId,
      ...record,
    },
    ...state.notificationsLog,
  ];
  state = { ...state, notificationsLog: newLog };
  emit();
}

export function hasNotificationBeenSent(alertId: string): boolean {
  return state.sentNotificationIds.has(alertId);
}

export function reassignAsset(id: string, targetSite: string, targetOperator: string = "OP101", note: string = "") {
  const asset = state.assets.find((a) => a.id === id);
  if (!asset) return;

  const siteMeta = SITES_META[targetSite];
  const newHistory: AssetHistoryItem = {
    id: `h-${Date.now()}`,
    time: now(),
    type: "optimization",
    title: `AI Redeployment Executed → Site ${targetSite}`,
    detail: note || `Mobilized from ${asset.location} to ${siteMeta?.name ?? targetSite}. Expected utilization +18%.`,
    site: targetSite,
    operator: targetOperator,
  };

  state = {
    ...state,
    assets: state.assets.map((a) =>
      a.id === id
        ? {
            ...a,
            status: "Active",
            site: targetSite,
            operator: targetOperator,
            location: siteMeta ? `${siteMeta.name} (${targetSite})` : `Site ${targetSite}`,
            lat: siteMeta?.lat ?? a.lat,
            lng: siteMeta?.lng ?? a.lng,
            utilizationPct: Math.max(a.utilizationPct, 72),
            engineHrsPerDay: a.engineHrsPerDay === 0 ? 6.5 : a.engineHrsPerDay,
            idleHrsPerDay: 2.0,
            anomalies: [],
            history: [newHistory, ...a.history],
          }
        : a,
    ),
    optimizationPlans: state.optimizationPlans.map((p) =>
      p.assetId === id ? { ...p, status: "applied" } : p,
    ),
  };

  addAuditLog(
    "AI Fleet Redeployment",
    "Asset",
    id,
    `Mobilized ${id} to ${targetSite} under operator ${targetOperator}.`,
  );

  emit();
}

export function applyOptimizationPlan(planId: string) {
  const plan = state.optimizationPlans.find((p) => p.id === planId);
  if (!plan) return;
  if (plan.type === "Redeploy" || plan.type === "Reassign") {
    const targetSite = plan.toSite.includes("S003") ? "S003" : "S002";
    reassignAsset(plan.assetId, targetSite, "OP101", `Executed plan: ${plan.title}`);
  }
  state = {
    ...state,
    optimizationPlans: state.optimizationPlans.map((p) =>
      p.id === planId ? { ...p, status: "applied" } : p,
    ),
    activeActionPlan: null,
  };
  emit();
}

// Use real current date for operational calculations
export const TODAY = new Date();

/**
 * An asset is operationally overdue when:
 * - Its checkIn (scheduled return) date has passed
 * - AND it is not already Idle (i.e. still out on rental)
 * - AND it is not Unassigned (unassigned assets are flagged separately)
 */
export function isOverdue(a: Asset) {
  const checkInDate = new Date(a.checkIn);
  return checkInDate < TODAY && a.status !== "Idle" && a.status !== "Unassigned";
}

/** ─────────────────────────────────────────────────────────
 * UNIFIED ALERT ENGINE
 * Single source of truth for all alert generation.
 * Used by: Dashboard (status bar), Alerts page, NotificationCenter.
 * Anomalies uses asset.anomalies[] separately (telemetry-level, not rental-level).
 * ───────────────────────────────────────────────────────── */
export type AlertSeverity = "critical" | "warning" | "info";
export type AlertType =
  | "Overdue"
  | "Low Utilization"
  | "Unassigned"
  | "Maintenance"
  | "Due Soon"
  | "Inspection Issue"
  | "Anomaly"
  | "Forecast";

export type OperationalAlert = {
  id: string;
  asset: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  signal: string;
  impact: string;
  action: string;
};

export function buildAlerts(assets: Asset[]): OperationalAlert[] {
  const out: OperationalAlert[] = [];
  const now = new Date();

  for (const a of assets) {
    const checkInDate = new Date(a.checkIn);
    const daysOverdue = Math.round((now.getTime() - checkInDate.getTime()) / 86_400_000);
    const daysUntilDue = Math.round((checkInDate.getTime() - now.getTime()) / 86_400_000);

    // 1. OVERDUE: past return date and still active/rented
    if (daysOverdue > 0 && a.status !== "Idle" && a.status !== "Unassigned") {
      out.push({
        id: `${a.id}-od`,
        asset: a.id,
        type: "Overdue",
        severity: "critical",
        title: `${a.id} Rental Overdue (${daysOverdue} day${daysOverdue !== 1 ? "s" : ""} past return)`,
        signal: `Return scheduled ${a.checkIn} · No check-in recorded`,
        impact: "Accumulating unexpected idle lease cost & compliance risk",
        action: "Contact site and schedule depot pickup & off-hire",
      });
    }

    // 2. DUE SOON: return date within 5 days
    if (daysUntilDue >= 0 && daysUntilDue <= 5 && a.status !== "Idle") {
      out.push({
        id: `${a.id}-ds`,
        asset: a.id,
        type: "Due Soon",
        severity: "warning",
        title: `${a.id} Due for Return in ${daysUntilDue} day${daysUntilDue !== 1 ? "s" : ""}`,
        signal: `Scheduled return date: ${a.checkIn}`,
        impact: "Coordinate return logistics to avoid overdue status",
        action: "Notify site manager and prepare post-return inspection checklist",
      });
    }

    // 3. UNASSIGNED: no site AND no operator
    if (!a.site && !a.operator && a.status !== "Idle") {
      out.push({
        id: `${a.id}-un`,
        asset: a.id,
        type: "Unassigned",
        severity: "warning",
        title: `${a.id} Parked Unassigned in Staging Yard`,
        signal: `${!a.site ? "No site assigned" : ""}${
          !a.site && !a.operator ? " · " : ""
        }${!a.operator ? "No operator allocated" : ""} · ${a.idleHrsPerDay} idle hrs/day`,
        impact: "Zero asset ROI while regional sites report capacity deficit",
        action: "Reassign & pre-position to nearest high-demand site",
      });
    }

    // 4. LOW UTILIZATION: below 25% and not unassigned/idle
    if (a.utilizationPct < 25 && a.status !== "Unassigned" && a.status !== "Idle") {
      out.push({
        id: `${a.id}-lu`,
        asset: a.id,
        type: "Low Utilization",
        severity: "warning",
        title: `${a.id} Low Duty Cycle (${a.utilizationPct}% utilization)`,
        signal: `${a.engineHrsPerDay}h engine vs ${a.idleHrsPerDay}h idle per day`,
        impact: "Sub-optimal operating efficiency; idle lease cost accumulating",
        action: "Reallocate to higher-demand site or shift schedule",
      });
    }

    // 5. MAINTENANCE: continuous high utilization with zero idle
    if (a.anomalies?.some((an) => an.includes("Continuous high utilization"))) {
      out.push({
        id: `${a.id}-maint`,
        asset: a.id,
        type: "Maintenance",
        severity: "info",
        title: `${a.id} Continuous High Duty Cycle — Service Inspection Due`,
        signal: `${a.utilizationPct}% utilization over ${a.operatingDays} days with 0 idle hours logged`,
        impact: "Risk of unexpected mechanical wear without routine inspection",
        action: "Schedule 30-day preventative hydraulic & track wear inspection",
      });
    }

    // 6. TELEMETRY ANOMALIES: non-maintenance anomalies (e.g. night operations, fuel spike)
    if (a.anomalies && a.anomalies.length > 0) {
      for (let i = 0; i < a.anomalies.length; i++) {
        const anom = a.anomalies[i];
        if (!anom.includes("Continuous high")) {
          const isCritical = anom.toLowerCase().includes("unauthorized") || anom.toLowerCase().includes("night");
          out.push({
            id: `${a.id}-anom-${i}`,
            asset: a.id,
            type: "Anomaly",
            severity: isCritical ? "critical" : "warning",
            title: `${a.id} Telemetry Alert: ${anom}`,
            signal: `Real-time sensor reading anomaly detected at ${a.location}`,
            impact: "Potential safety breach or unauthorized machine operation",
            action: "Inspect machine telemetry log & contact site supervisor",
          });
        }
      }
    }
  }

  // 7. INSPECTION ISSUES: from contracts with damaged condition or pending deductions
  if (state.contracts) {
    for (const c of state.contracts) {
      if (c.postInspection && (c.postInspection.engine === "Damaged" || c.postInspection.hydraulics === "Damaged" || c.postInspection.body === "Damaged")) {
        out.push({
          id: `insp-dmg-${c.id}`,
          asset: c.equipmentId,
          type: "Inspection Issue",
          severity: "critical",
          title: `${c.equipmentId} Check-In Damage Detected (Contract #${c.contractNumber})`,
          signal: `Post-return inspection revealed physical damage: ${c.postInspection.notes || "Condition issues recorded."}`,
          impact: "Escrow security deposit held; requires supervisor damage assessment review",
          action: "Review 9-point inspection comparison and approve deposit deduction",
        });
      }
    }
  }

  return out;
}

/**
 * Computes fleet summary statistics.
 * Uses buildAlerts() as the single source of truth for overdue/flagged counts
 * so the dashboard status bar always matches the Alerts page.
 */
export function summary(assets: Asset[]) {
  const active = assets.filter((a) => a.status === "Active").length;
  const idle = assets.filter((a) => a.status === "Idle").length;
  const unassigned = assets.filter((a) => a.status === "Unassigned" || a.status === "Unknown").length;
  const dueSoon = assets.filter((a) => a.status === "Due Soon").length;

  // Use buildAlerts() as the authoritative source — same logic as the Alerts page
  const allAlerts = buildAlerts(assets);
  const overdue = allAlerts.filter((al) => al.type === "Overdue").length;
  const avg = Math.round(
    assets.reduce((s, a) => s + a.utilizationPct, 0) / (assets.length || 1),
  );
  // flagged = any asset with at least one active operational alert
  const flaggedAssetIds = new Set(allAlerts.map((al) => al.asset));
  const flagged = flaggedAssetIds.size;

  return { total: assets.length, active, idle, unassigned, dueSoon, overdue, avg, flagged };
}
