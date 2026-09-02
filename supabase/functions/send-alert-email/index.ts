// Supabase Edge Function: send-alert-email
//
// Server-side ONLY entry point for outbound alert emails. This is the sole
// place RESEND_API_KEY is read — it is a Supabase secret
// (`supabase secrets set RESEND_API_KEY=...`), never a VITE_ / browser env
// var, so it never ships in the client bundle.
//
// Called from the browser via `supabase.functions.invoke("send-alert-email", ...)`.
// The Supabase JS client attaches the signed-in user's JWT automatically,
// so `verify_jwt` (the project default) confirms the caller is authenticated
// before this code runs at all.
//
// Duplicate-email protection lives here, not in the caller: every request
// is re-checked against the `notifications` table using the alert's
// deterministic fingerprint before Resend is ever called, so even a buggy
// or duplicated client call cannot spam a recipient.
import { createClient } from "jsr:@supabase/supabase-js@2";

const RESEND_API_URL = "https://api.resend.com/emails";
const APP_URL = Deno.env.get("PUBLIC_APP_URL") ?? "https://app.rentsense.example";
const FROM_ADDRESS = Deno.env.get("RESEND_FROM_ADDRESS") ?? "Smart Rental <alerts@notifications.rentsense.app>";

type NotificationType =
  | "rental_overdue"
  | "equipment_due_soon"
  | "equipment_unassigned"
  | "inspection_issue"
  | "return_condition_issue"
  | "low_utilization"
  | "anomaly"
  | "payment_deposit_issue"
  | "optimization_recommendation";

type AlertPayload = {
  alertId: string;
  fingerprint: string;
  notificationType: NotificationType;
  severity: "critical" | "warning" | "info";
  entityType: string;
  entityId: string;
  title: string;
  equipmentId?: string;
  equipmentType?: string;
  siteLabel?: string;
  detail: string;
  metric?: string;
  recommendedAction: string;
};

type SendRequest = {
  alert: AlertPayload;
  recipient: { email: string; name?: string; userId?: string };
};

const PREFERENCE_KEY_BY_TYPE: Record<NotificationType, string | null> = {
  rental_overdue: "overdue_rentals",
  equipment_due_soon: "overdue_rentals",
  equipment_unassigned: "low_utilization",
  inspection_issue: "inspection_issues",
  return_condition_issue: "inspection_issues",
  low_utilization: "low_utilization",
  anomaly: "critical_alerts",
  payment_deposit_issue: "critical_alerts",
  optimization_recommendation: "forecast_suggestions",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function severityBadge(severity: AlertPayload["severity"]) {
  switch (severity) {
    case "critical":
      return { label: "CRITICAL", color: "#dc2626", bg: "#fef2f2" };
    case "warning":
      return { label: "WARNING", color: "#b45309", bg: "#fffbeb" };
    default:
      return { label: "INFO", color: "#334155", bg: "#f1f5f9" };
  }
}

const TITLE_ICON: Record<NotificationType, string> = {
  rental_overdue: "⚠️",
  equipment_due_soon: "⏰",
  equipment_unassigned: "📍",
  inspection_issue: "🔧",
  return_condition_issue: "🧾",
  low_utilization: "📉",
  anomaly: "🛰️",
  payment_deposit_issue: "💳",
  optimization_recommendation: "✨",
};

function buildEmailHtml(alert: AlertPayload) {
  const badge = severityBadge(alert.severity);
  const icon = TITLE_ICON[alert.notificationType] ?? "⚠️";
  const rows = [
    alert.equipmentId ? ["Equipment", `${alert.equipmentId}${alert.equipmentType ? ` (${alert.equipmentType})` : ""}`] : null,
    alert.siteLabel ? ["Site", alert.siteLabel] : null,
    alert.metric ? ["Signal", alert.metric] : null,
  ].filter(Boolean) as [string, string][];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px;">${label}</td>
          <td style="padding:8px 0;color:#111827;font-size:13px;font-weight:600;">${value}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
            <tr>
              <td style="background:#111827;padding:20px 28px;">
                <span style="color:#e4ff3a;font-size:13px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;">Smart Rental</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 28px 8px;">
                <span style="display:inline-block;background:${badge.bg};color:${badge.color};font-size:11px;font-weight:800;letter-spacing:0.04em;padding:4px 10px;border-radius:999px;text-transform:uppercase;">${badge.label}</span>
                <h1 style="margin:14px 0 0;font-size:19px;line-height:1.35;color:#111827;">${icon} ${alert.title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px 4px;">
                <p style="margin:0;color:#374151;font-size:13.5px;line-height:1.6;">${alert.detail}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 28px 24px;">
                <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:14px;padding:14px 16px;">
                  <span style="display:block;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px;">Recommended Action</span>
                  <span style="font-size:13.5px;color:#111827;font-weight:600;">${alert.recommendedAction}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px;">
                <a href="${APP_URL}" style="display:inline-block;background:#111827;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:999px;">Open Smart Rental →</a>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;border-top:1px solid #f0f0f0;">
                <p style="margin:0;font-size:11px;color:#9ca3af;">You are receiving this because your Smart Rental notification preferences include this alert type. Manage preferences in Settings → Notifications.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Server misconfigured: Supabase service credentials missing" }, 500);
  }

  let body: SendRequest;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const { alert, recipient } = body;
  if (!alert?.alertId || !alert?.fingerprint || !recipient?.email) {
    return jsonResponse({ error: "alert.alertId, alert.fingerprint and recipient.email are required" }, 400);
  }

  // Service-role client: bypasses RLS deliberately so this function is the
  // only writer of "sent"/"skipped_*" rows in the notifications ledger.
  const admin = createClient(supabaseUrl, serviceRoleKey);

  // 1. Notification preference gate — do not spam opted-out recipients.
  const prefKey = PREFERENCE_KEY_BY_TYPE[alert.notificationType];
  if (prefKey && recipient.userId) {
    const { data: prefs } = await admin
      .from("notification_preferences")
      .select(prefKey)
      .eq("user_id", recipient.userId)
      .maybeSingle();
    // No row yet = defaults apply (table DEFAULTs already match the "safe" posture).
    if (prefs && (prefs as Record<string, boolean>)[prefKey] === false) {
      await admin.from("notifications").insert({
        alert_id: alert.alertId,
        alert_fingerprint: alert.fingerprint,
        notification_type: alert.notificationType,
        severity: alert.severity,
        recipient: recipient.email,
        recipient_user_id: recipient.userId ?? null,
        subject: alert.title,
        entity_type: alert.entityType,
        entity_id: alert.entityId,
        delivery_status: "skipped_preference",
      });
      return jsonResponse({ status: "skipped_preference" });
    }
  }

  // 2. Duplicate-send gate — same alert + same fingerprint already sent.
  const { data: existing } = await admin
    .from("notifications")
    .select("id")
    .eq("alert_id", alert.alertId)
    .eq("alert_fingerprint", alert.fingerprint)
    .eq("delivery_status", "sent")
    .limit(1)
    .maybeSingle();

  if (existing) {
    return jsonResponse({ status: "skipped_duplicate" });
  }

  if (!resendApiKey) {
    await admin.from("notifications").insert({
      alert_id: alert.alertId,
      alert_fingerprint: alert.fingerprint,
      notification_type: alert.notificationType,
      severity: alert.severity,
      recipient: recipient.email,
      recipient_user_id: recipient.userId ?? null,
      subject: alert.title,
      entity_type: alert.entityType,
      entity_id: alert.entityId,
      delivery_status: "failed",
      error_message: "RESEND_API_KEY not configured on the Edge Function",
    });
    return jsonResponse({ error: "RESEND_API_KEY not configured" }, 500);
  }

  // 3. Send via Resend.
  const html = buildEmailHtml(alert);
  let providerMessageId: string | null = null;
  let deliveryStatus: "sent" | "failed" = "sent";
  let errorMessage: string | null = null;

  try {
    const resendResp = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [recipient.email],
        subject: `[Smart Rental] ${alert.title}`,
        html,
      }),
    });

    const resendJson = await resendResp.json().catch(() => ({}));
    if (!resendResp.ok) {
      deliveryStatus = "failed";
      errorMessage = (resendJson as { message?: string })?.message ?? `Resend responded ${resendResp.status}`;
    } else {
      providerMessageId = (resendJson as { id?: string })?.id ?? null;
    }
  } catch (err) {
    deliveryStatus = "failed";
    errorMessage = err instanceof Error ? err.message : String(err);
  }

  await admin.from("notifications").insert({
    alert_id: alert.alertId,
    alert_fingerprint: alert.fingerprint,
    notification_type: alert.notificationType,
    severity: alert.severity,
    recipient: recipient.email,
    recipient_user_id: recipient.userId ?? null,
    subject: alert.title,
    entity_type: alert.entityType,
    entity_id: alert.entityId,
    delivery_status: deliveryStatus,
    provider_message_id: providerMessageId,
    error_message: errorMessage,
    sent_at: deliveryStatus === "sent" ? new Date().toISOString() : null,
  });

  if (deliveryStatus === "failed") {
    return jsonResponse({ status: "failed", error: errorMessage }, 502);
  }

  return jsonResponse({ status: "sent", providerMessageId });
});
