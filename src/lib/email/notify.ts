// Client-side entry point for triggering a Smart Rental alert email.
//
// This module NEVER talks to Resend directly and never sees RESEND_API_KEY —
// it only invokes the `send-alert-email` Supabase Edge Function, which is
// the sole place the secret is read (see supabase/functions/send-alert-email).
//
// Two layers of duplicate-send protection:
//  1. Client-side (here): a per-browser-session Set of "already attempted"
//     alert+fingerprint keys, so re-renders/page loads within the same tab
//     don't even make the network call.
//  2. Server-side (authoritative): the Edge Function re-checks the
//     `notifications` table for a prior `sent` row with the same
//     alert_id + alert_fingerprint before ever calling Resend.
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import type { Alert, AlertType } from "@/lib/alerts/engine";

type ResendNotificationType =
  | "rental_overdue"
  | "equipment_due_soon"
  | "equipment_unassigned"
  | "inspection_issue"
  | "return_condition_issue"
  | "low_utilization"
  | "anomaly"
  | "payment_deposit_issue"
  | "optimization_recommendation";

const NOTIFICATION_TYPE_MAP: Record<AlertType, ResendNotificationType> = {
  overdue_rental: "rental_overdue",
  equipment_due_soon: "equipment_due_soon",
  unassigned_equipment: "equipment_unassigned",
  low_utilization: "low_utilization",
  high_idle_hours: "low_utilization",
  anomaly: "anomaly",
  inspection_issue: "inspection_issue",
  return_condition_issue: "return_condition_issue",
  payment_deposit_issue: "payment_deposit_issue",
};

// Alert types worth interrupting an inbox for. Deliberately excludes
// "equipment_due_soon" being an unconditional info-blast on its own is
// still allowed here — the *actual* spam guard is the server-side
// notification_preferences + dedup gate, this set just skips the network
// round-trip for alert types Smart Rental never emails about.
const EMAIL_ELIGIBLE_TYPES = new Set<AlertType>(Object.keys(NOTIFICATION_TYPE_MAP) as AlertType[]);

const SESSION_STORAGE_KEY = "smart-rental:notified-fingerprints";

function readSessionSentSet(): Set<string> {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function rememberSessionSent(key: string) {
  try {
    const set = readSessionSentSet();
    set.add(key);
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // best-effort only — the Edge Function's DB-backed dedup is authoritative
  }
}

export type EmailRecipient = { email: string; name?: string | undefined; userId?: string | undefined };

export type AlertEmailEnrichment = { equipmentType?: string | undefined; siteLabel?: string | undefined };

/**
 * Fire-and-forget: sends (or skips) the email for one alert. Safe to call
 * on every alert on every render — it no-ops instantly when Supabase isn't
 * configured, and skips via sessionStorage before it ever reaches the
 * network for an alert/fingerprint pair already attempted this session.
 */
export async function dispatchAlertEmail(
  alert: Alert,
  recipient: EmailRecipient,
  enrich: AlertEmailEnrichment = {},
): Promise<{ status: string } | null> {
  if (!isSupabaseConfigured) return null;
  if (!EMAIL_ELIGIBLE_TYPES.has(alert.type)) return null;
  if (!recipient.email) return null;

  const sessionKey = `${alert.id}:${alert.fingerprint}`;
  if (readSessionSentSet().has(sessionKey)) return null;
  rememberSessionSent(sessionKey); // set eagerly to collapse concurrent calls for the same alert

  try {
    const { data, error } = await supabase.functions.invoke("send-alert-email", {
      body: {
        alert: {
          alertId: alert.id,
          fingerprint: alert.fingerprint,
          notificationType: NOTIFICATION_TYPE_MAP[alert.type],
          severity: alert.severity,
          entityType: alert.entityType,
          entityId: alert.entityId,
          title: alert.title,
          equipmentId: alert.assetId,
          equipmentType: enrich.equipmentType,
          siteLabel: enrich.siteLabel,
          detail: alert.signal,
          metric: alert.impact,
          recommendedAction: alert.recommendedAction,
        },
        recipient,
      },
    });
    if (error) return null;
    return data as { status: string };
  } catch {
    return null;
  }
}

/**
 * Section 18(8): "Optimization recommendation requiring attention" is not
 * produced by the alert engine (it comes from the forecast/optimization
 * flow), so it gets its own dispatcher sharing the same Edge Function and
 * notifications ledger under notification_type = "optimization_recommendation".
 */
export async function dispatchOptimizationRecommendationEmail(
  plan: { id: string; title: string; why: string; expectedImpact: string; assetId: string; confidence: string },
  recipient: EmailRecipient,
): Promise<{ status: string } | null> {
  if (!isSupabaseConfigured) return null;
  if (!recipient.email) return null;

  const fingerprint = `plan:${plan.confidence}`;
  const sessionKey = `opt-${plan.id}:${fingerprint}`;
  if (readSessionSentSet().has(sessionKey)) return null;
  rememberSessionSent(sessionKey);

  try {
    const { data, error } = await supabase.functions.invoke("send-alert-email", {
      body: {
        alert: {
          alertId: `opt-${plan.id}`,
          fingerprint,
          notificationType: "optimization_recommendation" satisfies ResendNotificationType,
          severity: "info",
          entityType: "Equipment",
          entityId: plan.assetId,
          title: plan.title,
          equipmentId: plan.assetId,
          detail: plan.why,
          metric: plan.expectedImpact,
          recommendedAction: "Review and approve the recommendation in the Optimization Center.",
        },
        recipient,
      },
    });
    if (error) return null;
    return data as { status: string };
  } catch {
    return null;
  }
}
