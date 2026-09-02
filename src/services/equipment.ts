// Supabase persistence for fleet equipment location — used by new-machine
// registration and by manually deploying/reassigning a machine already in
// the fleet.
//
// Reuses the existing `equipment` table exactly as defined in
// supabase/schema.sql — no new table or duplicate location fields. The
// asset's structured location lives in three existing columns:
//   - current_site_id  → sites.id (nullable — a machine can be registered
//                         or parked before it's dispatched to a project site)
//   - lat / lng         → the machine's real GPS position (always required)
//   - location_name     → human-readable city/area/yard label (always required)
//
// Both calls are awaited by their callers in data/fleet.ts (registerAsset,
// deployAsset) before the asset is added/updated in the in-memory fleet
// store — a Supabase failure must not show the machine as successfully
// added or moved. When Supabase isn't configured at all (the default in
// local/demo environments), these no-op successfully so the app keeps
// working exactly as every other flow already does in that mode.
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Asset } from "@/data/fleet";

export async function recordNewEquipment(asset: Asset): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured) return { ok: true };

  try {
    const { error } = await supabase.from("equipment").insert({
      id: asset.id,
      type: asset.type,
      serial_number: asset.serialNumber,
      monthly_rental_rate: asset.monthlyRentalRate,
      security_deposit_ratio: asset.securityDepositRatio,
      operational_status: asset.status,
      condition: asset.condition,
      fuel_pct: asset.fuelPct,
      engine_hours_total: 0,
      idle_hours_total: 0,
      engine_hours_per_day: asset.engineHrsPerDay,
      idle_hours_per_day: asset.idleHrsPerDay,
      operating_days: asset.operatingDays,
      utilization_pct: asset.utilizationPct,
      current_site_id: asset.site,
      current_operator_id: asset.operator,
      lat: asset.lat,
      lng: asset.lng,
      location_name: asset.location,
      qr_code_payload: asset.qrCodePayload,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error saving equipment to Supabase." };
  }
}

export async function recordEquipmentLocationUpdate(asset: Asset): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured) return { ok: true };

  try {
    const { error } = await supabase
      .from("equipment")
      .update({
        current_site_id: asset.site,
        current_operator_id: asset.operator,
        operational_status: asset.status,
        lat: asset.lat,
        lng: asset.lng,
        location_name: asset.location,
        updated_at: new Date().toISOString(),
      })
      .eq("id", asset.id);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error updating equipment location in Supabase." };
  }
}
