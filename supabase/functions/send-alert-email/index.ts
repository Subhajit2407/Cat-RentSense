/**
 * Supabase Edge Function: send-alert-email
 *
 * Runs in the Supabase Deno runtime (server-side).
 * RESEND_API_KEY is stored strictly as a server-side secret — NEVER exposed to the browser.
 *
 * Deployment:
 *   supabase functions deploy send-alert-email --no-verify-jwt
 *
 * Configuration:
 *   supabase secrets set RESEND_API_KEY=re_your_api_key_here
 *   supabase secrets set RESEND_FROM_EMAIL="Smart Rental <alerts@your-verified-domain.com>"
 */

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface AlertEmailPayload {
  alertId: string;
  alertType: "Overdue" | "Due Soon" | "Unassigned" | "Low Utilization" | "Maintenance" | "Inspection Issue" | "Anomaly" | "Forecast" | string;
  severity: "critical" | "warning" | "info";
  title: string;
  signal: string;
  impact: string;
  action: string;
  assetId: string;
  userId?: string;
  recipient?: string;
  appBaseUrl?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  try {
    const payload = (await req.json()) as AlertEmailPayload;
    const {
      alertId,
      alertType,
      severity = "info",
      title,
      signal,
      impact,
      action,
      assetId,
      userId,
      appBaseUrl = "http://localhost:5173",
    } = payload;

    if (!alertId || !title || !assetId) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters: alertId, title, assetId" }),
        { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
      );
    }

    // ── 1. Initialize Supabase Server Client ─────────────────────────────────
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "";
    
    let supabase = null;
    if (supabaseUrl && supabaseServiceKey) {
      supabase = createClient(supabaseUrl, supabaseServiceKey);
    }

    // ── 2. Authenticate & Determine Recipient ──────────────────────────────
    // Development/Demo Environment: DEFAULT_ALERT_RECIPIENT is techinternship24@gmail.com
    const DEFAULT_ALERT_RECIPIENT = Deno.env.get("DEFAULT_ALERT_RECIPIENT") || "techinternship24@gmail.com";
    let recipientEmail = payload.recipient || DEFAULT_ALERT_RECIPIENT;
    let recipientName = "Operations Manager";
    let targetUserId = userId || null;

    // Extract Bearer token from header if available
    const authHeader = req.headers.get("Authorization");
    if (supabase && authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      if (token && token !== supabaseServiceKey) {
        const { data: { user } } = await supabase.auth.getUser(token);
        if (user) {
          targetUserId = user.id;
        }
      }
    }

    // ── 3. Check Notification Preferences ───────────────────────────────────
    if (supabase && targetUserId) {
      const { data: prefs } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", targetUserId)
        .maybeSingle();

      if (prefs) {
        if (prefs.email_enabled === false) {
          return new Response(
            JSON.stringify({ success: true, skipped: true, reason: "User disabled all email notifications" }),
            { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
          );
        }

        // Category-specific preference gating
        const typeNormalized = alertType.toLowerCase();
        if (typeNormalized.includes("overdue") && prefs.overdue_rentals === false) {
          return new Response(
            JSON.stringify({ success: true, skipped: true, reason: "Overdue alert emails disabled by user" }),
            { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
          );
        }
        if (typeNormalized.includes("inspection") && prefs.inspection_issues === false) {
          return new Response(
            JSON.stringify({ success: true, skipped: true, reason: "Inspection issue emails disabled by user" }),
            { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
          );
        }
        if (typeNormalized.includes("unassigned") && prefs.unassigned_equipment === false) {
          return new Response(
            JSON.stringify({ success: true, skipped: true, reason: "Unassigned equipment emails disabled by user" }),
            { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
          );
        }
        if (typeNormalized.includes("utilization") && prefs.low_utilization === false) {
          return new Response(
            JSON.stringify({ success: true, skipped: true, reason: "Low utilization emails disabled by user" }),
            { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
          );
        }
        if (typeNormalized.includes("forecast") && prefs.forecast_recommendations === false) {
          return new Response(
            JSON.stringify({ success: true, skipped: true, reason: "Forecast recommendation emails disabled by user" }),
            { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
          );
        }
        if ((typeNormalized.includes("anomaly") || typeNormalized.includes("maintenance")) && prefs.anomalies === false) {
          return new Response(
            JSON.stringify({ success: true, skipped: true, reason: "Anomaly emails disabled by user" }),
            { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
          );
        }
      }
    }

    // ── 4. Duplicate Email Protection (Database Check) ─────────────────────
    if (supabase && targetUserId) {
      const { data: existingNotification } = await supabase
        .from("notifications")
        .select("id, status, provider_message_id, created_at")
        .eq("alert_id", alertId)
        .eq("user_id", targetUserId)
        .eq("channel", "email")
        .eq("status", "sent")
        .maybeSingle();

      if (existingNotification) {
        return new Response(
          JSON.stringify({
            success: true,
            skipped: true,
            duplicate: true,
            message: "Email notification already delivered for this alert.",
            notificationId: existingNotification.id,
          }),
          { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
        );
      }
    }

    // ── 5. Record Initial Pending Delivery ─────────────────────────────────
    let dbNotificationId: string | null = null;
    if (supabase && targetUserId) {
      const { data: insertedNotif } = await supabase
        .from("notifications")
        .upsert(
          {
            alert_id: alertId,
            user_id: targetUserId,
            recipient_email: recipientEmail,
            notification_type: alertType,
            severity,
            channel: "email",
            status: "pending",
          },
          { onConflict: "alert_id,user_id,channel" },
        )
        .select("id")
        .maybeSingle();

      dbNotificationId = insertedNotif?.id || null;
    }

    // ── 6. Check Resend Server-Side Secret ─────────────────────────────────
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "Smart Rental <alerts@smartrental.app>";

    if (!resendKey) {
      console.warn("[send-alert-email] RESEND_API_KEY is not configured in server secrets.");
      if (supabase && dbNotificationId) {
        await supabase
          .from("notifications")
          .update({ status: "failed", error_message: "RESEND_API_KEY secret not configured" })
          .eq("id", dbNotificationId);
      }
      return new Response(
        JSON.stringify({ success: false, error: "Email provider unconfigured on server" }),
        { status: 503, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
      );
    }

    // ── 7. Generate Smart Rental Email HTML ────────────────────────────────
    const severityBadgeColor = severity === "critical" ? "#EF4444" : severity === "warning" ? "#F59E0B" : "#10B981";
    const severityLabel = severity === "critical" ? "CRITICAL ALERT" : severity === "warning" ? "OPERATIONAL WARNING" : "FLEET NOTICE";
    const emailSubject = `${severity === "critical" ? "🚨" : "⚠️"} [Smart Rental] ${title}`;

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${emailSubject}</title>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);">
    
    <!-- Top Brand Header (RentSense Dark + Lime Accent) -->
    <tr>
      <td style="background-color: #0F172A; padding: 28px 32px; text-align: left;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align: middle;">
              <div style="display: inline-flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: #E2FD52;"></span>
                <span style="color: #FFFFFF; font-size: 17px; font-weight: 800; letter-spacing: -0.02em;">RentSense</span>
                <span style="color: #64748B; font-size: 13px; font-weight: 500;">/ Smart Rental</span>
              </div>
            </td>
            <td style="text-align: right; vertical-align: middle;">
              <span style="display: inline-block; background-color: ${severityBadgeColor}; color: #FFFFFF; font-size: 10.5px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.06em;">
                ${severityLabel}
              </span>
            </td>
          </tr>
        </table>
        
        <h1 style="color: #FFFFFF; font-size: 20px; font-weight: 700; line-height: 1.35; margin: 20px 0 0 0; letter-spacing: -0.01em;">
          ${title}
        </h1>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding: 32px;">
        <p style="color: #64748B; font-size: 13.5px; margin: 0 0 24px 0;">
          Hello <strong style="color: #0F172A;">${recipientName}</strong>, an automated operational event has been logged on the Smart Rental fleet network:
        </p>

        <!-- Equipment Overview Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border-radius: 18px; border: 1px solid #E2E8F0; margin-bottom: 24px;">
          <tr>
            <td style="padding: 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding-bottom: 12px; vertical-align: top;">
                    <div style="font-size: 10.5px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px;">Equipment Asset</div>
                    <div style="font-size: 15px; font-weight: 800; color: #0F172A;">${assetId}</div>
                  </td>
                  <td width="50%" style="padding-bottom: 12px; vertical-align: top;">
                    <div style="font-size: 10.5px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px;">Alert Category</div>
                    <div style="font-size: 14px; font-weight: 600; color: #0F172A;">${alertType}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 10px; border-top: 1px solid #E2E8F0;">
                    <div style="font-size: 10.5px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px;">Diagnostic Signal</div>
                    <div style="font-size: 13px; color: #334155; line-height: 1.45;">${signal || "Telemetry exception triggered"}</div>
                  </td>
                </tr>
                ${impact ? `
                <tr>
                  <td colspan="2" style="padding-top: 12px;">
                    <div style="font-size: 10.5px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px;">Business Impact</div>
                    <div style="font-size: 13px; color: #64748B; line-height: 1.45;">${impact}</div>
                  </td>
                </tr>` : ""}
              </table>
            </td>
          </tr>
        </table>

        <!-- Recommended Action Box -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FEF9C3; border-left: 4px solid #EAB308; border-radius: 0 14px 14px 0; margin-bottom: 28px;">
          <tr>
            <td style="padding: 14px 18px;">
              <div style="font-size: 11px; font-weight: 800; color: #854D0E; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Recommended Action</div>
              <div style="font-size: 13.5px; font-weight: 600; color: #713F12; line-height: 1.4;">${action || "Open the Alert Command Center to triage."}</div>
            </td>
          </tr>
        </table>

        <!-- Action Button -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="${appBaseUrl}/alerts" style="display: inline-block; background-color: #0F172A; color: #FFFFFF; font-size: 13.5px; font-weight: 700; padding: 14px 32px; border-radius: 9999px; text-decoration: none; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.15);">
                Open Smart Rental Control Tower →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #F8FAFC; padding: 24px 32px; border-top: 1px solid #E2E8F0; text-align: center;">
        <p style="margin: 0 0 6px 0; font-size: 11.5px; font-weight: 600; color: #64748B;">
          Smart Rental — The Operating System for Modern Equipment Rental
        </p>
        <p style="margin: 0; font-size: 10.5px; color: #94A3B8;">
          Sent to verified operational contact: ${recipientEmail}. You can manage alert preferences in your user profile.
        </p>
      </td>
    </tr>

  </table>
</body>
</html>
`.trim();

    const textBody = `
[Smart Rental] ${severityLabel}: ${title}

Hello ${recipientName},

Asset: ${assetId}
Category: ${alertType}
Signal: ${signal}
Impact: ${impact}

RECOMMENDED ACTION:
${action}

Open Control Tower: ${appBaseUrl}/alerts

---
Smart Rental — The Operating System for Modern Equipment Rental
`.trim();

    // ── 8. Call Resend API with 1 Safe Retry on Network Failure ─────────────
    let resendData: any = null;
    let resendError = null;

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [recipientEmail],
            subject: emailSubject,
            html: htmlBody,
            text: textBody,
            tags: [
              { name: "alert_id", value: String(alertId) },
              { name: "asset_id", value: String(assetId) },
              { name: "severity", value: String(severity) },
            ],
          }),
        });

        resendData = await res.json();
        if (res.ok) {
          resendError = null;
          break;
        } else {
          resendError = resendData?.message || "Resend API error";
          if (attempt === 1) await new Promise((r) => setTimeout(r, 600));
        }
      } catch (e: any) {
        resendError = e.message || String(e);
        if (attempt === 1) await new Promise((r) => setTimeout(r, 600));
      }
    }

    // ── 9. Update Delivery Status in Database ──────────────────────────────
    if (supabase && dbNotificationId) {
      if (!resendError && resendData?.id) {
        await supabase
          .from("notifications")
          .update({
            status: "sent",
            provider_message_id: resendData.id,
            sent_at: new Date().toISOString(),
          })
          .eq("id", dbNotificationId);
      } else {
        await supabase
          .from("notifications")
          .update({
            status: "failed",
            error_message: String(resendError),
          })
          .eq("id", dbNotificationId);
      }
    }

    if (resendError) {
      console.error("[send-alert-email] Delivery failed:", resendError);
      return new Response(
        JSON.stringify({ success: false, error: resendError }),
        { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: resendData?.id, recipient: recipientEmail }),
      { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
    );

  } catch (err: any) {
    console.error("[send-alert-email] Internal error:", err);
    return new Response(
      JSON.stringify({ error: err?.message || "Internal server error" }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } },
    );
  }
});
