-- ================================================================
-- MIGRATION 0002: EMAIL NOTIFICATIONS, PREFERENCES & RENTAL CURRENCY
-- Adds the infrastructure required for Resend email notifications
-- (dedup ledger + per-user preferences) and a `currency` column on
-- rental_contracts. Reuses every existing table/column — nothing here
-- duplicates data that already lives in schema.sql.
-- ================================================================

-- 1. RENTAL CONTRACTS — explicit currency (amount/deposit columns already exist)
ALTER TABLE rental_contracts
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'INR' NOT NULL;

-- 2. NOTIFICATION PREFERENCES (per profile)
-- Keeps email volume sane — section 21 of the ops brief. Defaults mirror
-- what most rental desks want on day one: safety/financial alerts ON,
-- optimization noise OFF.
CREATE TABLE IF NOT EXISTS notification_preferences (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  critical_alerts BOOLEAN DEFAULT true NOT NULL,
  overdue_rentals BOOLEAN DEFAULT true NOT NULL,
  inspection_issues BOOLEAN DEFAULT true NOT NULL,
  low_utilization BOOLEAN DEFAULT false NOT NULL,
  forecast_suggestions BOOLEAN DEFAULT false NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own notification preferences" ON notification_preferences
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. NOTIFICATIONS LEDGER (Resend dedup + delivery audit trail)
-- One row per email actually attempted. `alert_id` is the deterministic
-- id the alert engine assigns (e.g. "EQX1002-overdue") so a repeat scan of
-- the same condition can be detected and skipped before calling Resend.
CREATE TYPE notification_type AS ENUM (
  'rental_overdue',
  'equipment_due_soon',
  'equipment_unassigned',
  'inspection_issue',
  'return_condition_issue',
  'low_utilization',
  'anomaly',
  'payment_deposit_issue',
  'optimization_recommendation'
);

CREATE TYPE notification_delivery_status AS ENUM (
  'pending',
  'sent',
  'failed',
  'skipped_duplicate',
  'skipped_preference'
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alert_id TEXT NOT NULL,
  alert_fingerprint TEXT NOT NULL, -- hash of alert_id + the values that, if changed, justify a resend
  notification_type notification_type NOT NULL,
  severity TEXT NOT NULL,
  recipient TEXT NOT NULL,
  recipient_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  delivery_status notification_delivery_status DEFAULT 'pending' NOT NULL,
  provider_message_id TEXT,
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- One dedup lookup per (alert, fingerprint): "has this exact alert state
-- already produced a *sent* email?" is the query the client runs before
-- ever calling the edge function.
CREATE INDEX IF NOT EXISTS idx_notifications_dedup
  ON notifications (alert_id, alert_fingerprint, delivery_status);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient
  ON notifications (recipient_user_id, created_at DESC);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff view all notifications" ON notifications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('rental_staff', 'supervisor_admin'))
    OR recipient_user_id = auth.uid()
  );

-- Inserts/updates to the notifications ledger happen from the
-- send-alert-email Edge Function using the service role key, which
-- bypasses RLS by design — no client-side INSERT policy is defined so
-- browser code can never forge a "sent" row.
