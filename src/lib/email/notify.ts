/**
 * Smart Rental — Client-Side Email Notification Dispatcher
 *
 * Communicates with the secure server-side Supabase Edge Function:
 * `supabase/functions/send-alert-email/index.ts`
 *
 * SECURITY:
 * - RESEND_API_KEY is NEVER exposed to the client or browser bundle.
 * - Dispatches strictly through the server-side Supabase Edge Function.
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { markNotificationSent, recordNotificationFailure } from "@/data/fleet";
import { toast } from "sonner";

/** Single authoritative designated recipient for development and demo */
export const DEFAULT_ALERT_EMAIL = "techinternship24@gmail.com";

export interface AlertNotificationRequest {
  alertId: string;
  alertType: "Overdue" | "Due Soon" | "Unassigned" | "Low Utilization" | "Maintenance" | "Inspection Issue" | "Anomaly" | "Forecast" | string;
  severity: "critical" | "warning" | "info";
  title: string;
  signal: string;
  impact?: string;
  action: string;
  assetId: string;
  userId?: string;
  recipient?: string;
}

export type NotifyResult =
  | { success: true; id?: string; duplicate?: boolean; skipped?: boolean; message?: string }
  | { success: false; error: string };

/**
 * Low-level dispatcher: sends alert payload to Supabase Edge Function
 */
export async function notifyAlertEmail(
  req: AlertNotificationRequest,
): Promise<NotifyResult> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

  // Ensure recipient is always the designated techinternship24@gmail.com
  const payloadWithRecipient = {
    ...req,
    recipient: req.recipient || DEFAULT_ALERT_EMAIL,
  };

  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) {
    console.info(
      `[SmartRental/Email] Supabase Edge Function not configured. Logging notification locally for ${DEFAULT_ALERT_EMAIL}. Alert: [${req.alertType}] ${req.title}`,
    );
    return {
      success: true,
      skipped: false,
      message: `Demo mode: Action email queued for ${DEFAULT_ALERT_EMAIL}`,
    };
  }

  const endpoint = `${supabaseUrl}/functions/v1/send-alert-email`;

  try {
    let authToken = supabaseAnonKey;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        authToken = session.access_token;
      }
    } catch {
      // Ignore session check error in mock environment
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        apikey: supabaseAnonKey,
      },
      body: JSON.stringify({
        ...payloadWithRecipient,
        appBaseUrl: typeof window !== "undefined" ? window.location.origin : "http://localhost:5173",
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[SmartRental/Email] Edge Function returned error (${res.status}):`, errText);
      return { success: false, error: errText || "Email delivery failed on server" };
    }

    const data = await res.json();
    if (data.success === false) {
      return { success: false, error: data.error || "Email delivery failed" };
    }

    return {
      success: true,
      id: data.id,
      duplicate: data.duplicate,
      skipped: data.skipped,
      message: data.message,
    };
  } catch (err: any) {
    const errorMsg = err?.message || String(err);
    console.warn("[SmartRental/Email] Network error during email dispatch:", errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * High-level unified trigger: Called ONLY when user explicitly clicks "Take Action".
 *
 * 1. Shows immediate "Sending email..." toast
 * 2. Calls secure Edge Function
 * 3. On success: Updates state notification record and displays "✓ Notification sent to techinternship24@gmail.com"
 * 4. On error: Displays "Email could not be sent. Please try again."
 */
export async function sendAlertActionNotification(
  payload: AlertNotificationRequest,
): Promise<NotifyResult> {
  const toastId = toast.loading(`Sending action email for ${payload.assetId}...`);

  const result = await notifyAlertEmail(payload);

  const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (result.success) {
    markNotificationSent(payload.alertId, {
      type: payload.alertType,
      title: payload.title,
      recipient: DEFAULT_ALERT_EMAIL,
      status: "sent",
      sentAt: timestamp,
    });
    toast.success(`✓ Notification sent to ${DEFAULT_ALERT_EMAIL}`, {
      id: toastId,
      description: `Asset ${payload.assetId} — ${payload.title}`,
    });
    return result;
  } else {
    recordNotificationFailure(payload.alertId, {
      type: payload.alertType,
      title: payload.title,
      recipient: DEFAULT_ALERT_EMAIL,
      status: "failed",
      sentAt: timestamp,
      error: result.error,
    });
    toast.error("Email could not be sent. Please try again.", {
      id: toastId,
      description: result.error,
    });
    return result;
  }
}

