// Shared domain types for the Smart Rental fleet, rental, and inspection
// model. Extracted from src/data/fleet.ts so the type layer is reusable
// from services/ and lib/ without importing the (stateful) store module.

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
  monthlyRentalRate: number; // default/list rate for this unit — a specific rental's rate lives on RentalContract.monthlyRentalRate
  securityDepositRatio: number; // e.g. 0.80 (80%) — used to derive a suggested deposit, not a stored final amount
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
  /** @deprecated static seed strings — do not read for alerting; use lib/alerts (computed live from telemetry fields) instead. Kept only for the asset history narrative. */
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
  monthlyRentalRate: number; // manually entered/confirmed at booking time — the rental revenue for THIS contract
  securityDepositAmount: number; // REFUNDABLE deposit — kept as a separate financial concept from rental revenue
  currency: string; // ISO 4217, e.g. "INR"
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
  createdBy?: string | undefined;
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

export type NotificationPreferences = {
  criticalAlerts: boolean;
  overdueRentals: boolean;
  inspectionIssues: boolean;
  lowUtilization: boolean;
  forecastSuggestions: boolean;
};

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  criticalAlerts: true,
  overdueRentals: true,
  inspectionIssues: true,
  lowUtilization: false,
  forecastSuggestions: false,
};
