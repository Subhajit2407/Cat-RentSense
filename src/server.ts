import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

async function handleSendAlertEmail(request: Request, env: any): Promise<Response> {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await request.json();
    const resendKey =
      (typeof process !== "undefined" && process.env?.RESEND_API_KEY) ||
      (env && typeof env === "object" && (env as any).RESEND_API_KEY) ||
      "";

    const fromEmail =
      (typeof process !== "undefined" && process.env?.RESEND_FROM_EMAIL) ||
      (env && typeof env === "object" && (env as any).RESEND_FROM_EMAIL) ||
      "Smart Rental <onboarding@resend.dev>";

    const recipient = payload.recipient || "techinternship24@gmail.com";

    const { buildAlertEmail } = await import("./lib/email/templates");

    const emailContent = buildAlertEmail({
      alertTitle: payload.title || "Operational Alert",
      alertType: payload.alertType || "Alert",
      severity: payload.severity || "warning",
      assetId: payload.assetId || "EQX1002",
      signal: payload.signal || "Operational threshold exceeded",
      impact: payload.impact || "Action required",
      action: payload.action || "Review alert details",
      recipientName: "Operations Lead",
      recipientEmail: recipient,
      appBaseUrl: payload.appBaseUrl || "http://localhost:5173",
    });

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipient],
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      }),
    });

    if (!resendResponse.ok) {
      const errData = await resendResponse.json().catch(() => ({}));
      return new Response(
        JSON.stringify({
          success: false,
          error: (errData as any).message || `Resend error (${resendResponse.status})`,
        }),
        { status: resendResponse.status, headers: corsHeaders }
      );
    }

    const data = await resendResponse.json();
    return new Response(
      JSON.stringify({
        success: true,
        id: data.id,
        recipient,
        message: `Notification sent to ${recipient}`,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || String(err) }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/send-alert-email") {
        return await handleSendAlertEmail(request, env);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
