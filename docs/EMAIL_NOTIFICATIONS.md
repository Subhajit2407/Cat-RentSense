# Smart Rental — Secure Resend Email Notification System

## 1. Overview & Architecture

Smart Rental uses **Resend** to deliver automated, real-time email notifications for operational fleet alerts (overdue returns, critical inspection damages, high idle dwell, and telemetry anomalies).

### 🔒 Zero Client Secret Exposure Architecture

```
SMART RENTAL REACT UI (Browser)
      ↓
Alert Created / Detected by buildAlerts()
      ↓
notifyAlertEmail() [Client Dispatcher]
      │  • Sends Alert Metadata & Bearer JWT Session Token
      │  • Does NOT send raw or arbitrary email addresses
      ↓
SUPABASE EDGE FUNCTION (/functions/v1/send-alert-email)
      │  1. Authenticates User JWT against Supabase Auth
      │  2. Resolves Verified Recipient from `profiles` Table
      │  3. Checks User `notification_preferences` (e.g. overdue, inspection, etc.)
      │  4. Queries `notifications` Table to Prevent Duplicate Emails
      │  5. Reads `RESEND_API_KEY` from Supabase Server Secrets
      ↓
RESEND API (POST https://api.resend.com/emails)
      │  • Safe 1-retry backoff on network failures
      ↓
RECIPIENT INBOX (Operations Manager / Site Supervisor)
      ↓
DATABASE AUDIT LOG (`notifications` table record updated to 'sent' or 'failed')
```

---

## 2. Where Secrets Are Stored

| Secret | Storage Location | Accessible By |
|--------|-----------------|----------------|
| `RESEND_API_KEY` | **Supabase Server Secret** (`supabase secrets set`) | Deno Edge Function ONLY |
| `RESEND_FROM_EMAIL` | **Supabase Server Secret / Environment** | Deno Edge Function ONLY |
| `VITE_SUPABASE_URL` | `.env.local` | Frontend (Public URL) |
| `VITE_SUPABASE_ANON_KEY` | `.env.local` | Frontend (Protected by RLS) |

> [!CAUTION]
> **NEVER** expose `RESEND_API_KEY` in `src/`, `public/`, `VITE_` variables, or Git-tracked files. The browser must never receive the Resend secret.

---

## 3. How the Edge Function Works

Location: [`supabase/functions/send-alert-email/index.ts`](file:///d:/Cat/Cat-Hack/supabase/functions/send-alert-email/index.ts)

1. **Request Validation**: Validates `alertId`, `alertType`, `title`, and `assetId`.
2. **Server-Side Authentication**:
   - Extracts the `Authorization: Bearer <token>` header.
   - Validates the token with `supabase.auth.getUser()`.
   - Looks up the user's verified email and role from the `profiles` table.
3. **Notification Preferences Gating**:
   - Queries `notification_preferences` for the user.
   - If the user has disabled emails or the specific category (e.g. low utilization), the function returns `{ success: true, skipped: true }` and halts.
4. **Duplicate Protection**:
   - Queries `notifications` table: `WHERE alert_id = ? AND user_id = ? AND channel = 'email' AND status = 'sent'`.
   - If already sent, skips sending and returns `{ success: true, duplicate: true }`.
5. **Brand Email Generation**: Generates clean, mobile-responsive HTML with Smart Rental Dark `#0F172A` header, lime accent badge `#E2FD52`, diagnostic signal card, and direct CTA button.
6. **Delivery via Resend**: Sends via `https://api.resend.com/emails` with 1 automatic retry on network errors.
7. **Delivery Logging**: Updates the database `notifications` record with `status = 'sent'` and `provider_message_id`.

---

## 4. Supported Alert Email Types

| Alert Category | Severity | Trigger Condition | Default Email Setting |
|----------------|----------|-------------------|----------------------|
| **Rental Overdue** | `critical` | Past scheduled return date and still active | **ON** |
| **Due Soon** | `warning` | Return scheduled within 5 days | **ON** |
| **Inspection Damage** | `critical` | Check-in post-inspection records `Damaged` engine/hydraulics/body | **ON** |
| **Unassigned Yard Dwell** | `warning` | 0% utilization with 12h idle in staging yard | **ON** |
| **Low Utilization** | `warning` | Duty cycle below 25% | **OFF** (Opt-in) |
| **Telemetry Anomaly** | `critical`/`warning` | Night operation or sensor anomaly | **ON** |
| **Forecast Recommendation** | `info`/`warning` | Site capacity deficit pre-positioning | **ON** |

---

## 5. Duplicate Protection Policy

To ensure zero spam or repeated emails, duplicate protection is enforced at two layers:

### Layer A: In-Memory Client State (`fleet.ts`)
- `state.sentNotificationIds: Set<string>` tracks alert IDs notified during the active browser session.
- Refreshing the Dashboard, navigating between routes (`/alerts`, `/forecast`, `/check`), or recalculating forecasts **never** triggers repeat emails.

### Layer B: Database Persistence (`notifications` table)
- Schema constraint: `UNIQUE (alert_id, user_id, channel)`
- Before dispatching, the Edge Function queries the `notifications` table. If `status = 'sent'` exists, the call returns `skipped: true`.

---

## 6. Error Handling & Failure Resilience

If Resend or the network fails:
1. **The application continues working seamlessly** — rental check-ins, check-outs, and alert workflows are NEVER blocked by email delivery failures.
2. The `notifications` table records `status = 'failed'` along with `error_message`.
3. The UI shows the alert normally with status `Email Pending / Unconfigured`.

---

## 7. Deployment & Configuration Guide

### Step 1: Install Supabase CLI
```bash
npm install -g supabase
```

### Step 2: Link Project & Set Server Secrets
```bash
supabase login
supabase link --project-ref <your-project-ref>

# Set the Resend API key as a secure server secret:
supabase secrets set RESEND_API_KEY=re_your_real_key_here
supabase secrets set RESEND_FROM_EMAIL="Smart Rental <alerts@your-verified-domain.com>"
```

### Step 3: Deploy the Edge Function
```bash
supabase functions deploy send-alert-email --no-verify-jwt
```

### Step 4: Configure Frontend `.env.local`
```ini
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 8. Database Notification Tables

```sql
-- User Notification Preferences
CREATE TABLE notification_preferences (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  email_enabled BOOLEAN DEFAULT true NOT NULL,
  critical_alerts BOOLEAN DEFAULT true NOT NULL,
  overdue_rentals BOOLEAN DEFAULT true NOT NULL,
  inspection_issues BOOLEAN DEFAULT true NOT NULL,
  unassigned_equipment BOOLEAN DEFAULT true NOT NULL,
  low_utilization BOOLEAN DEFAULT false NOT NULL,
  forecast_recommendations BOOLEAN DEFAULT true NOT NULL,
  anomalies BOOLEAN DEFAULT true NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Notification Delivery Log
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alert_id TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  notification_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  channel notification_channel DEFAULT 'email' NOT NULL,
  status notification_status DEFAULT 'pending' NOT NULL,
  provider_message_id TEXT,
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_alert_user_channel UNIQUE (alert_id, user_id, channel)
);
```
