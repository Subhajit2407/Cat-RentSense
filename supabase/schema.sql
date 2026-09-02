-- ================================================================
-- SMART RENTAL CONTROL TOWER & RENTAL OS DATABASE SCHEMA
-- PostgreSQL / Supabase Migration
-- ================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & ROLES
CREATE TYPE user_role AS ENUM ('customer', 'rental_staff', 'supervisor_admin');

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role DEFAULT 'customer' NOT NULL,
  phone TEXT,
  company_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. CUSTOMERS
CREATE TYPE verification_status AS ENUM ('not_verified', 'verification_pending', 'verified', 'rejected');

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  verification_status verification_status DEFAULT 'verified' NOT NULL,
  verification_doc_url TEXT,
  credit_limit NUMERIC DEFAULT 500000.00,
  active_rentals_count INT DEFAULT 0,
  outstanding_balance NUMERIC DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. SITES & REGIONAL LOGISTICS
CREATE TABLE IF NOT EXISTS sites (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  manager_name TEXT NOT NULL,
  contact_phone TEXT,
  demand_excavators INT DEFAULT 1,
  demand_bulldozers INT DEFAULT 0,
  demand_cranes INT DEFAULT 0,
  demand_graders INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. OPERATORS
CREATE TABLE IF NOT EXISTS operators (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  license_number TEXT NOT NULL,
  certification_level TEXT DEFAULT 'Level 2' NOT NULL,
  phone TEXT,
  current_site_id TEXT REFERENCES sites(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'Available' NOT NULL
);

-- 5. EQUIPMENT & FLEET
CREATE TYPE equipment_type AS ENUM ('Excavator', 'Crane', 'Bulldozer', 'Grader');
CREATE TYPE operational_status AS ENUM ('Active', 'Idle', 'Overdue', 'Unknown', 'Due Soon', 'Unassigned');

CREATE TABLE IF NOT EXISTS equipment (
  id TEXT PRIMARY KEY, -- e.g. EQX1001
  type equipment_type NOT NULL,
  serial_number TEXT UNIQUE NOT NULL,
  monthly_rental_rate NUMERIC DEFAULT 50000.00 NOT NULL,
  security_deposit_ratio NUMERIC DEFAULT 0.80 NOT NULL, -- 80% refundable deposit
  operational_status operational_status DEFAULT 'Unassigned' NOT NULL,
  condition TEXT DEFAULT 'Good' NOT NULL,
  fuel_pct INT DEFAULT 100 NOT NULL,
  engine_hours_total NUMERIC DEFAULT 0.0 NOT NULL,
  idle_hours_total NUMERIC DEFAULT 0.0 NOT NULL,
  engine_hours_per_day NUMERIC DEFAULT 0.0 NOT NULL,
  idle_hours_per_day NUMERIC DEFAULT 0.0 NOT NULL,
  operating_days INT DEFAULT 0 NOT NULL,
  utilization_pct INT DEFAULT 0 NOT NULL,
  current_site_id TEXT REFERENCES sites(id) ON DELETE SET NULL,
  current_operator_id TEXT REFERENCES operators(id) ON DELETE SET NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  location_name TEXT NOT NULL,
  qr_code_payload TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. RENTAL CONTRACTS
CREATE TYPE rental_status AS ENUM (
  'Available',
  'Reserved',
  'Pending Checkout',
  'Checked Out',
  'Active Rental',
  'Return Requested',
  'Pending Inspection',
  'Checked In',
  'Refund Pending',
  'Completed',
  'Overdue',
  'Disputed',
  'Cancelled'
);

CREATE TYPE payment_status AS ENUM (
  'Pending',
  'Processing',
  'Paid',
  'Failed',
  'Refund Pending',
  'Refunded',
  'Partially Deducted',
  'Disputed'
);

CREATE TABLE IF NOT EXISTS rental_contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_number TEXT UNIQUE NOT NULL, -- e.g. SR-2026-1007
  customer_id UUID REFERENCES customers(id) ON DELETE RESTRICT NOT NULL,
  equipment_id TEXT REFERENCES equipment(id) ON DELETE RESTRICT NOT NULL,
  site_id TEXT REFERENCES sites(id) ON DELETE RESTRICT NOT NULL,
  operator_id TEXT REFERENCES operators(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  monthly_rental_rate NUMERIC NOT NULL,
  security_deposit_amount NUMERIC NOT NULL,
  total_initial_payable NUMERIC NOT NULL,
  payment_status payment_status DEFAULT 'Pending' NOT NULL,
  rental_status rental_status DEFAULT 'Pending Checkout' NOT NULL,
  agreement_accepted BOOLEAN DEFAULT false NOT NULL,
  agreement_accepted_at TIMESTAMPTZ,
  agreement_accepted_by_ip TEXT,
  return_requested_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. SECURITY DEPOSIT LIFECYCLE
CREATE TYPE deposit_status AS ENUM (
  'Held',
  'Refund Pending',
  'Refund Processing',
  'Refunded',
  'Partially Deducted',
  'Disputed'
);

CREATE TABLE IF NOT EXISTS security_deposits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID REFERENCES rental_contracts(id) ON DELETE CASCADE NOT NULL,
  amount_held NUMERIC NOT NULL,
  deposit_status deposit_status DEFAULT 'Held' NOT NULL,
  damage_deduction NUMERIC DEFAULT 0.00 NOT NULL,
  other_deduction NUMERIC DEFAULT 0.00 NOT NULL,
  deduction_reason TEXT,
  inspection_evidence_url TEXT,
  refund_amount NUMERIC NOT NULL,
  supervisor_approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  supervisor_approved_at TIMESTAMPTZ,
  refund_transaction_ref TEXT,
  refund_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. EQUIPMENT INSPECTIONS (Pre-Checkout & Post-Checkin)
CREATE TYPE inspection_type AS ENUM ('pre_checkout', 'post_checkin');

CREATE TABLE IF NOT EXISTS equipment_inspections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID REFERENCES rental_contracts(id) ON DELETE CASCADE NOT NULL,
  equipment_id TEXT REFERENCES equipment(id) ON DELETE RESTRICT NOT NULL,
  type inspection_type NOT NULL,
  inspector_name TEXT NOT NULL,
  engine_condition TEXT DEFAULT 'Good' NOT NULL,
  hydraulics_condition TEXT DEFAULT 'Good' NOT NULL,
  body_condition TEXT DEFAULT 'Good' NOT NULL,
  tracks_tires_condition TEXT DEFAULT 'Good' NOT NULL,
  cabin_condition TEXT DEFAULT 'Good' NOT NULL,
  lights_condition TEXT DEFAULT 'Good' NOT NULL,
  safety_condition TEXT DEFAULT 'Good' NOT NULL,
  fuel_pct INT NOT NULL,
  hour_meter NUMERIC NOT NULL,
  notes TEXT,
  photos TEXT[],
  customer_acknowledged BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. IMMUTABLE AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  user_role TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details TEXT NOT NULL,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. NOTIFICATION PREFERENCES & EMAIL AUDIT
CREATE TYPE notification_channel AS ENUM ('email', 'sms', 'in_app');
CREATE TYPE notification_status AS ENUM ('pending', 'sent', 'failed', 'skipped');

CREATE TABLE IF NOT EXISTS notification_preferences (
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

CREATE TABLE IF NOT EXISTS notifications (
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

-- 11. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Customers can view their own contracts
CREATE POLICY "Customers view own contracts" ON rental_contracts
  FOR SELECT USING (
    auth.uid() = created_by OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('rental_staff', 'supervisor_admin'))
  );

-- Staff can manage all fleet and contracts
CREATE POLICY "Staff manage all contracts" ON rental_contracts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('rental_staff', 'supervisor_admin'))
  );

-- Everyone authenticated can view available equipment
CREATE POLICY "Public authenticated equipment view" ON equipment
  FOR SELECT USING (true);

-- Users can manage their own notification preferences
CREATE POLICY "Users manage own notification preferences" ON notification_preferences
  FOR ALL USING (auth.uid() = user_id);

-- Staff can view all notifications; users view their own
CREATE POLICY "Users view own notifications" ON notifications
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('rental_staff', 'supervisor_admin'))
  );

