# Smart Rental — Database Architecture

> Source of truth: `supabase/schema.sql`
> Application: `src/data/fleet.ts` (in-memory store mirrors this schema)

---

## Tables

### `user_profiles`
Extends Supabase Auth users. Created automatically on `auth.users` INSERT via trigger.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | Same as `auth.users.id` |
| `name` | text | Full display name |
| `email` | text | Mirrors `auth.users.email` |
| `role` | enum | `customer`, `rental_staff`, `supervisor_admin` |
| `company_name` | text | Customer's company |
| `phone` | text | Contact number |
| `verified` | boolean | KYC/document check status |
| `created_at` | timestamptz | Row creation time |

**RLS**: Users can only read/update their own profile. Staff/admin can read all.

---

### `assets` (Equipment Registry)
One row per physical machine.

| Column | Type | Notes |
|--------|------|-------|
| `id` | text PK | e.g. `EQX1007` |
| `type` | text | `Excavator`, `Crane`, `Bulldozer`, `Grader` |
| `serial_number` | text | Manufacturer serial |
| `site` | text | Current site ID or NULL |
| `operator` | text | Assigned operator ID or NULL |
| `status` | text | `Active`, `Idle`, `Overdue`, `Unassigned`, `Due Soon` |
| `condition` | text | `Good`, `Needs Attention`, `Damaged` |
| `monthly_rental_rate` | numeric | **Base rate** — overridable at contract creation |
| `security_deposit_ratio` | numeric | e.g. `0.80` — default multiplier |
| `utilization_pct` | integer | 0–100 |
| `fuel_pct` | integer | 0–100 |
| `engine_hrs_per_day` | numeric | From telematics |
| `idle_hrs_per_day` | numeric | From telematics |
| `operating_days` | integer | Days under current assignment |
| `lat`, `lng` | double precision | GPS coordinates |
| `location` | text | Human-readable site description |
| `check_out`, `check_in` | date | Current rental window |
| `qr_code_payload` | text | QR scan content for field check-in |
| `telemetry_trend` | integer[] | 7-day utilization sparkline |
| `anomalies` | text[] | Active anomaly signals |

---

### `rental_contracts`
One row per rental agreement. **Key financial architecture decision:**

> The `monthly_rental_rate` and `security_deposit_amount` are **separate columns**.
> The security deposit is **never** combined into rental revenue.
> It is an escrow liability until post-inspection approval.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | Internal |
| `contract_number` | text | Human-readable e.g. `SR-2026-1007-4821` |
| `customer_id` | uuid FK | → `user_profiles.id` |
| `equipment_id` | text FK | → `assets.id` |
| `site_id` | text | Where equipment deployed |
| `operator_id` | text | Assigned operator |
| `start_date`, `end_date` | date | Contract rental window |
| `monthly_rental_rate` | numeric | **Agreed rate** — entered by rental staff at booking |
| `security_deposit_amount` | numeric | **Escrow amount** — separate from revenue |
| `total_initial_payable` | numeric | Sum of rate + deposit |
| `payment_status` | text | `Paid`, `Pending`, `Failed`, etc. |
| `rental_status` | text | `Pending Checkout` → `Active Rental` → `Checked In` → `Completed` |
| `agreement_accepted` | boolean | Customer agreement checkbox state |
| `deposit_status` | text | `Held` → `Refund Pending` → `Refunded` / `Partially Deducted` |
| `damage_deduction` | numeric | Amount deducted from deposit (requires supervisor approval) |
| `refund_amount` | numeric | `security_deposit_amount - damage_deduction` |

---

### `inspection_records`
Two inspections per contract: `pre_checkout` and `post_checkin`.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `contract_id` | uuid FK | → `rental_contracts.id` |
| `equipment_id` | text | Denormalized for query ease |
| `type` | text | `pre_checkout` or `post_checkin` |
| `inspector_name` | text | Staff member conducting inspection |
| `timestamp` | timestamptz | When inspection occurred |
| `engine`, `hydraulics`, `body`, `tracks_tires`, `cabin`, `lights`, `safety` | text | 9-point: `Good`, `Needs Attention`, `Damaged` |
| `fuel_pct` | integer | Fuel at time of inspection |
| `hour_meter` | integer | Engine hours at time of inspection |
| `notes` | text | Free-form inspector notes |

**Business rule**: The delta between `pre_checkout.hour_meter` and `post_checkin.hour_meter` is the billable machine hours for the rental.

---

### `audit_logs`
Immutable append-only audit trail.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `user_name` | text | Who performed the action |
| `user_role` | text | Role at time of action |
| `action` | text | e.g. `Rental Agreement Executed` |
| `entity_type` | text | `Contract`, `Asset`, `Inspection`, etc. |
| `entity_id` | text | ID of the affected entity |
| `details` | text | Human-readable full description |
| `timestamp` | timestamptz | When it happened |
| `location` | text | Site or location context |

**RLS**: Append-only. No UPDATE or DELETE permitted. Supervisors can read all.

---

## RLS Policies Summary

| Table | Customer | Rental Staff | Supervisor Admin |
|-------|----------|-------------|-----------------|
| `user_profiles` | Read own | Read all | Read/Write all |
| `assets` | Read only | Read/Write | Read/Write all |
| `rental_contracts` | Read own | Read/Write all | Read/Write all |
| `inspection_records` | Read own | Insert/Read all | Read/Write all |
| `audit_logs` | Read own | Read all | Read all |

---

## Important Notes

### Security Deposit Architecture
The security deposit is stored as **`security_deposit_amount`** — completely separate from `monthly_rental_rate`. In accounting terms, the deposit is an **escrow liability** (money the company holds but does not own until damages are assessed), not rental revenue. This is reflected in the schema and enforced in the application's `createRentalContract()` function.

### Rental Rate Editability
The `monthly_rental_rate` in `rental_contracts` is the **negotiated rate** entered by rental staff at booking time — NOT automatically inherited from `assets.monthly_rental_rate`. The asset's rate is a default starting point only.

### Current Status (2026-09)
The application currently runs on in-memory mock data (`src/data/fleet.ts`). The Supabase schema is complete and ready to connect. To activate live data:
1. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`
2. Run `supabase db push` to apply the schema
3. Replace the mock `INITIAL_ASSETS` in fleet.ts with Supabase queries
