// Single source of truth for every operational alert in Smart Rental.
//
// Previously three screens computed overlapping-but-different alert sets:
//   - routes/alerts.tsx        — its own buildAlerts() (overdue/unassigned/low-util/maintenance)
//   - components/NotificationCenter.tsx — a second, narrower ad-hoc list
//   - routes/anomalies.tsx     — read the *static seed strings* in Asset.anomalies,
//                                 which do not recompute when telemetry changes
// so the Dashboard, Alerts page, Notification bell and Forecast page could
// (and did) disagree on counts — e.g. "5 Overdue" vs "3 Overdue".
//
// Every consumer must import `buildAlerts` from here. Nothing else may
// invent its own rule for what counts as an alert.
import type { Asset, RentalContract } from "@/types/fleet";
import { DEMO_TODAY } from "@/lib/demoClock";

export type AlertSeverity = "critical" | "warning" | "info";

export type AlertType =
  | "overdue_rental"
  | "equipment_due_soon"
  | "unassigned_equipment"
  | "low_utilization"
  | "high_idle_hours"
  | "anomaly"
  | "inspection_issue"
  | "return_condition_issue"
  | "payment_deposit_issue";

export type Alert = {
  /** Deterministic — same underlying condition always yields the same id. */
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  assetId: string;
  siteId: string | null;
  entityType: "Equipment" | "Contract";
  entityId: string;
  title: string;
  signal: string;
  impact: string;
  recommendedAction: string;
  /**
   * Changes only when the underlying condition meaningfully changes
   * (e.g. days-overdue crosses a new week, utilization crosses a new
   * bucket). Used as the email resend key — see lib/email/notify.ts.
   */
  fingerprint: string;
};

export const LOW_UTILIZATION_THRESHOLD_PCT = 25;
export const HIGH_IDLE_THRESHOLD_HRS = 8;
export const CONTINUOUS_DUTY_THRESHOLD_PCT = 95;

function daysOverdue(asset: Asset, today: Date): number {
  return Math.max(0, Math.round((today.getTime() - new Date(asset.checkIn).getTime()) / 86_400_000));
}

function buildAssetAlerts(asset: Asset, today: Date): Alert[] {
  const out: Alert[] = [];

  // Overdue is driven by the asset's own operational `status`, not a
  // separate recomputed date check — three different re-implementations
  // of `checkIn < today && status !== 'Idle'` used to exist (this engine,
  // the Gantt chart, fleet.ts's old isOverdue()) and each incorrectly
  // flagged healthy, still-active rentals (e.g. EQX1003/1005/1006, whose
  // original expected-return date had simply passed while the rental was
  // extended) as "overdue" alongside the one asset actually in that
  // state. `status === "Overdue"` is the single field every other screen
  // (RentalOperationsCenter's KPI card, StatusPill) already treats as
  // authoritative — this makes the alert engine agree with it too.
  if (asset.status === "Overdue") {
    const overdueDays = daysOverdue(asset, today);
    out.push({
      id: `${asset.id}-overdue_rental`,
      type: "overdue_rental",
      severity: "critical",
      assetId: asset.id,
      siteId: asset.site,
      entityType: "Equipment",
      entityId: asset.id,
      title: `${asset.id} Rental Overdue (${overdueDays} days past return)`,
      signal: `Return due date was ${asset.checkIn} · zero active check-in logged`,
      impact: "Accumulating unexpected idle lease cost and compliance risk.",
      recommendedAction: "Contact site and schedule pickup / off-hire.",
      // resend weekly as the overdue count grows, not on every page load
      fingerprint: `overdue:${Math.floor(overdueDays / 7)}`,
    });
  }

  if (asset.status === "Due Soon") {
    out.push({
      id: `${asset.id}-equipment_due_soon`,
      type: "equipment_due_soon",
      severity: "info",
      assetId: asset.id,
      siteId: asset.site,
      entityType: "Equipment",
      entityId: asset.id,
      title: `${asset.id} Return Due Soon (${asset.checkIn})`,
      signal: `Scheduled return date ${asset.checkIn} is approaching.`,
      impact: "Plan depot capacity and inspection staffing ahead of return.",
      recommendedAction: "Confirm return logistics with the customer.",
      fingerprint: `due_soon:${asset.checkIn}`,
    });
  }

  if (!asset.site || !asset.operator) {
    out.push({
      id: `${asset.id}-unassigned_equipment`,
      type: "unassigned_equipment",
      severity: "warning",
      assetId: asset.id,
      siteId: asset.site,
      entityType: "Equipment",
      entityId: asset.id,
      title: `${asset.id} Parked Unassigned in Staging Yard`,
      signal: `${!asset.site ? "No site assigned" : ""}${!asset.site && !asset.operator ? " · " : ""}${
        !asset.operator ? "No operator allocated" : ""
      } · ${asset.idleHrsPerDay}h idle/day`,
      impact: "Zero asset ROI while other sites may be reporting a deficit.",
      recommendedAction: "Reassign and pre-position to a deficit site.",
      fingerprint: `unassigned:${asset.idleHrsPerDay > 0 ? "idle" : "static"}`,
    });
  }

  if (asset.utilizationPct < LOW_UTILIZATION_THRESHOLD_PCT && asset.status !== "Unassigned") {
    out.push({
      id: `${asset.id}-low_utilization`,
      type: "low_utilization",
      severity: "warning",
      assetId: asset.id,
      siteId: asset.site,
      entityType: "Equipment",
      entityId: asset.id,
      title: `${asset.id} Low Duty Cycle Utilization (${asset.utilizationPct}%)`,
      signal: `${asset.engineHrsPerDay}h engine vs ${asset.idleHrsPerDay}h idle per day`,
      impact: "Sub-optimal operating efficiency; idle lease cost accrues regardless.",
      recommendedAction: "Reallocate to a higher-demand site or shift.",
      fingerprint: `low_util:${Math.floor(asset.utilizationPct / 5)}`,
    });
  }

  if (asset.idleHrsPerDay >= HIGH_IDLE_THRESHOLD_HRS && asset.status !== "Unassigned") {
    out.push({
      id: `${asset.id}-high_idle_hours`,
      type: "high_idle_hours",
      severity: "warning",
      assetId: asset.id,
      siteId: asset.site,
      entityType: "Equipment",
      entityId: asset.id,
      title: `${asset.id} High Idle Hours (${asset.idleHrsPerDay}h/day)`,
      signal: `${asset.idleHrsPerDay}h idle vs ${asset.engineHrsPerDay}h engine per day`,
      impact: "Standby fuel/lease cost with no offsetting productive runtime.",
      recommendedAction: "Investigate dispatch schedule or reassign the unit.",
      fingerprint: `high_idle:${Math.floor(asset.idleHrsPerDay)}`,
    });
  }

  // Anomaly detection is computed live from telemetry — NOT from the static
  // Asset.anomalies seed strings, which go stale the moment telemetry changes.
  if (
    asset.utilizationPct >= CONTINUOUS_DUTY_THRESHOLD_PCT &&
    asset.idleHrsPerDay === 0 &&
    asset.operatingDays >= 14
  ) {
    out.push({
      id: `${asset.id}-anomaly-continuous_duty`,
      type: "anomaly",
      severity: "warning",
      assetId: asset.id,
      siteId: asset.site,
      entityType: "Equipment",
      entityId: asset.id,
      title: `${asset.id} Continuous Peak Duty Cycle (Service Inspection Due)`,
      signal: `${asset.utilizationPct}% utilization · 0h idle logged over ${asset.operatingDays} operating days`,
      impact: "Risk of unexpected mechanical wear without a maintenance cooldown.",
      recommendedAction: "Schedule a preventative hydraulic & track wear inspection.",
      fingerprint: `continuous_duty:${asset.operatingDays}`,
    });
  }

  if (asset.engineHrsPerDay === 0 && asset.status !== "Idle" && asset.operatingDays > 0) {
    out.push({
      id: `${asset.id}-anomaly-zero_runtime`,
      type: "anomaly",
      severity: "critical",
      assetId: asset.id,
      siteId: asset.site,
      entityType: "Equipment",
      entityId: asset.id,
      title: `${asset.id} Zero Engine Runtime Recorded`,
      signal: `0.0h engine × ${asset.operatingDays} operating days (${asset.idleHrsPerDay}h idle/day)`,
      impact: "Asset is billing/holding costs without producing any work.",
      recommendedAction: "Verify telemetry sensor or redeploy to an active site.",
      fingerprint: `zero_runtime:${asset.operatingDays}`,
    });
  }

  return out;
}

function buildContractAlerts(contract: RentalContract): Alert[] {
  const out: Alert[] = [];

  const inspectionHasIssue = (rec: RentalContract["postInspection"]) =>
    rec != null &&
    [rec.engine, rec.hydraulics, rec.body, rec.tracksTires, rec.cabin, rec.lights, rec.safety].some(
      (c) => c !== "Good",
    );

  if (inspectionHasIssue(contract.postInspection) || inspectionHasIssue(contract.preInspection)) {
    const rec = contract.postInspection ?? contract.preInspection!;
    const damaged = [rec.engine, rec.hydraulics, rec.body, rec.tracksTires, rec.cabin, rec.lights, rec.safety].some(
      (c) => c === "Damaged",
    );
    out.push({
      id: `${contract.id}-inspection_issue`,
      type: "inspection_issue",
      severity: damaged ? "critical" : "warning",
      assetId: contract.equipmentId,
      siteId: contract.siteId,
      entityType: "Contract",
      entityId: contract.contractNumber,
      title: `${contract.equipmentId} Inspection Flagged an Issue`,
      signal: `${rec.type === "pre_checkout" ? "Pre-checkout" : "Post-return"} inspection recorded a non-Good condition item.`,
      impact: "May require repair before redeployment or affect deposit refund.",
      recommendedAction: "Review inspection detail and approve any required deduction.",
      fingerprint: `inspection:${rec.id}`,
    });
  }

  if (contract.rentalStatus === "Checked In" || contract.depositStatus === "Refund Pending") {
    if (contract.damageDeduction > 0) {
      out.push({
        id: `${contract.id}-return_condition_issue`,
        type: "return_condition_issue",
        severity: contract.damageDeduction >= contract.securityDepositAmount * 0.3 ? "critical" : "warning",
        assetId: contract.equipmentId,
        siteId: contract.siteId,
        entityType: "Contract",
        entityId: contract.contractNumber,
        title: `${contract.equipmentId} Return Condition Requires Deduction`,
        signal: `Approved deduction ₹${contract.damageDeduction.toLocaleString("en-IN")} against ₹${contract.securityDepositAmount.toLocaleString("en-IN")} deposit.`,
        impact: "Customer refund is reduced; may need formal documentation.",
        recommendedAction: contract.deductionReason || "Confirm deduction reason with customer.",
        fingerprint: `deduction:${contract.damageDeduction}`,
      });
    }
  }

  if (contract.paymentStatus === "Failed" || contract.paymentStatus === "Disputed" || contract.depositStatus === "Disputed") {
    out.push({
      id: `${contract.id}-payment_deposit_issue`,
      type: "payment_deposit_issue",
      severity: "critical",
      assetId: contract.equipmentId,
      siteId: contract.siteId,
      entityType: "Contract",
      entityId: contract.contractNumber,
      title: `${contract.contractNumber} Payment/Deposit Issue (${contract.paymentStatus === "Disputed" || contract.depositStatus === "Disputed" ? "Disputed" : "Failed"})`,
      signal: `Payment status: ${contract.paymentStatus} · Deposit status: ${contract.depositStatus}`,
      impact: "Revenue at risk; contract may need to be placed on hold.",
      recommendedAction: "Escalate to finance/supervisor for resolution.",
      fingerprint: `payment:${contract.paymentStatus}:${contract.depositStatus}`,
    });
  }

  return out;
}

/**
 * The one alert engine every screen must use. Deterministic given the same
 * assets/contracts — no randomness, no hidden state.
 */
export function buildAlerts(assets: Asset[], contracts: RentalContract[], today: Date = DEMO_TODAY): Alert[] {
  const assetAlerts = assets.flatMap((a) => buildAssetAlerts(a, today));
  const contractAlerts = contracts.flatMap((c) => buildContractAlerts(c));
  return [...assetAlerts, ...contractAlerts];
}

export const ALERT_TYPE_LABEL: Record<AlertType, string> = {
  overdue_rental: "Overdue",
  equipment_due_soon: "Due Soon",
  unassigned_equipment: "Unassigned",
  low_utilization: "Low Utilization",
  high_idle_hours: "High Idle Hours",
  anomaly: "Anomaly",
  inspection_issue: "Inspection Issue",
  return_condition_issue: "Return Condition",
  payment_deposit_issue: "Payment/Deposit",
};

export function alertsBySeverityCount(alerts: Alert[]) {
  return {
    critical: alerts.filter((a) => a.severity === "critical").length,
    warning: alerts.filter((a) => a.severity === "warning").length,
    info: alerts.filter((a) => a.severity === "info").length,
    total: alerts.length,
  };
}
