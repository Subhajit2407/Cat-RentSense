// Supabase persistence for the rental lifecycle: rental_contracts,
// security_deposits, equipment_inspections and audit_logs.
//
// The fleet store (src/data/fleet.ts) remains the source of truth for the
// UI's optimistic, synchronous state — every screen renders from it
// instantly, exactly as before. These functions are called *alongside*
// each store mutation to persist the same event to Supabase. They are
// fire-and-forget from the caller's perspective (never block or throw into
// the UI) and no-op cleanly whenever Supabase isn't configured, which is
// the default in local/demo environments without a linked project.
//
// See docs/DATABASE.md for the full table reference and docs/ARCHITECTURE.md
// for why the store isn't a thin Supabase cache today.
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import type { RentalContract, InspectionRecord } from "@/types/fleet";

function warnOnce(scope: string, error: unknown) {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn(`[services/rentals] ${scope} persistence skipped:`, error);
  }
}

export async function recordRentalContract(contract: RentalContract, createdByUserId: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    const { error } = await supabase.from("rental_contracts").insert({
      id: contract.id,
      contract_number: contract.contractNumber,
      customer_id: contract.customerId,
      equipment_id: contract.equipmentId,
      site_id: contract.siteId,
      operator_id: contract.operatorId,
      start_date: contract.startDate,
      end_date: contract.endDate,
      monthly_rental_rate: contract.monthlyRentalRate,
      security_deposit_amount: contract.securityDepositAmount,
      currency: contract.currency,
      total_initial_payable: contract.totalInitialPayable,
      payment_status: contract.paymentStatus,
      rental_status: contract.rentalStatus,
      agreement_accepted: contract.agreementAccepted,
      agreement_accepted_at: contract.agreementAcceptedAt ?? null,
      created_by: createdByUserId,
    });
    if (error) warnOnce("createRentalContract", error);
  } catch (error) {
    warnOnce("createRentalContract", error);
  }
}

async function insertInspection(record: InspectionRecord): Promise<void> {
  const { error } = await supabase.from("equipment_inspections").insert({
    id: record.id,
    contract_id: record.contractId,
    equipment_id: record.equipmentId,
    type: record.type,
    inspector_name: record.inspectorName,
    engine_condition: record.engine,
    hydraulics_condition: record.hydraulics,
    body_condition: record.body,
    tracks_tires_condition: record.tracksTires,
    cabin_condition: record.cabin,
    lights_condition: record.lights,
    safety_condition: record.safety,
    fuel_pct: record.fuelPct,
    hour_meter: record.hourMeter,
    notes: record.notes,
  });
  if (error) warnOnce("inspection", error);
}

export async function recordCheckOutInspection(contractId: string, inspection: InspectionRecord): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    await insertInspection(inspection);
    const { error } = await supabase
      .from("rental_contracts")
      .update({ rental_status: "Active Rental" })
      .eq("id", contractId);
    if (error) warnOnce("approveCheckOut", error);
  } catch (error) {
    warnOnce("approveCheckOut", error);
  }
}

export async function recordCheckInInspection(contractId: string, inspection: InspectionRecord): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    await insertInspection(inspection);
    const { error } = await supabase
      .from("rental_contracts")
      .update({ rental_status: "Checked In" })
      .eq("id", contractId);
    if (error) warnOnce("approveCheckIn", error);
  } catch (error) {
    warnOnce("approveCheckIn", error);
  }
}

export async function recordDepositRefund(
  contract: RentalContract,
  damageDeduction: number,
  deductionReason: string,
  supervisorId: string | undefined,
): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    const { error: depositError } = await supabase.from("security_deposits").insert({
      contract_id: contract.id,
      amount_held: contract.securityDepositAmount,
      deposit_status: damageDeduction > 0 ? "Partially Deducted" : "Refunded",
      damage_deduction: damageDeduction,
      deduction_reason: deductionReason || null,
      refund_amount: Math.max(0, contract.securityDepositAmount - damageDeduction),
      supervisor_approved_by: supervisorId ?? null,
      supervisor_approved_at: new Date().toISOString(),
    });
    if (depositError) warnOnce("recordDepositRefund (deposit)", depositError);

    const { error: contractError } = await supabase
      .from("rental_contracts")
      .update({ rental_status: "Completed" })
      .eq("id", contract.id);
    if (contractError) warnOnce("recordDepositRefund (contract)", contractError);
  } catch (error) {
    warnOnce("recordDepositRefund", error);
  }
}

export async function recordAuditLog(entry: {
  userId?: string | undefined;
  userName: string;
  userRole: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  location?: string | undefined;
}): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    const { error } = await supabase.from("audit_logs").insert({
      user_id: entry.userId ?? null,
      user_name: entry.userName,
      user_role: entry.userRole,
      action: entry.action,
      entity_type: entry.entityType,
      entity_id: entry.entityId,
      details: entry.details,
      location: entry.location ?? null,
    });
    if (error) warnOnce("recordAuditLog", error);
  } catch (error) {
    warnOnce("recordAuditLog", error);
  }
}
