# Database Reference

This document is the audit trail for section 6/7 of the Smart Rental cleanup
brief: exactly what Supabase stores, what's wired up today, and what still
runs on local in-memory state. Read this before adding a new table — several
tables here already cover fields a new feature might otherwise duplicate.

Schema source: [`supabase/schema.sql`](../supabase/schema.sql) (baseline) +
[`supabase/migrations/0002_notifications_and_currency.sql`](../supabase/migrations/0002_notifications_and_currency.sql)
(notifications, preferences, `rental_contracts.currency`).

## The most important fact about this schema

**The Supabase schema is fully designed but was, before this pass, entirely
unused.** `src/lib/supabase/client.ts` (`supabase`, `isSupabaseConfigured`)
existed and was exported, but no file in the app imported it. Every screen
ran on `src/data/fleet.ts` — a module-level, `useSyncExternalStore`-backed
JS object seeded once at load and mutated in memory. Refreshing the page
resets everything to the seed data; nothing persisted.

This pass wires the **rental transaction lifecycle** (booking, check-out,
check-in, deposit refund, audit log) and the **new notification system**
into real Supabase writes via `src/services/rentals.ts` and
`src/services/notifications.ts`, called from the fleet store's mutators.
Fleet/site/operator/customer master data (the "control tower" simulation —
GPS positions, telemetry trends, demand seeding) is **not** wired to
Supabase yet; see [ARCHITECTURE.md](./ARCHITECTURE.md#data-flow) for why and
what a follow-up migration would need.

Every write call is wrapped so it silently no-ops when
`isSupabaseConfigured` is `false` (no `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`,
the default in this environment) — the UI never blocks or errors because a
Supabase project isn't linked.

## Table reference

### `profiles`
**Purpose:** One row per Supabase Auth user — name, role, contact info.
**PK:** `id` (= `auth.users.id`). **Status values (`role`):** `customer`,
`rental_staff`, `supervisor_admin`.
**Wired?** No. `src/components/auth/AuthModal.tsx` currently fakes sign
in/register entirely client-side (see [ARCHITECTURE.md](./ARCHITECTURE.md#authentication)
for why this is flagged, not fixed, in this pass) — no row here is ever
read or written by the app today. `src/data/fleet.ts`'s `UserProfile`
mirrors this table's shape 1:1 so wiring real Supabase Auth later is a
drop-in.

### `customers`
**Purpose:** Company/billing profile for a renting customer, separate from
their `profiles` login identity (a company can have a profile-holder plus
KYC/credit fields that don't belong on every user).
**PK:** `id`. **FK:** `profile_id → profiles.id`.
**Status values (`verification_status`):** `not_verified`,
`verification_pending`, `verified`, `rejected`.
**Wired?** No — not read/written by the app. `RentalContract.customerId`
in the local store holds a mock id (`cust-001`) rather than a `customers.id`.

### `sites`
**Purpose:** Construction/project sites where equipment is deployed —
location, manager, and the **seeded** per-equipment-type demand numbers the
forecast engine reads (`demand_excavators`, etc.).
**PK:** `id` (e.g. `S003`).
**Wired?** No. `SITES_META` in `src/data/fleet.ts` is the live source; its
shape matches this table so a future migration is a straight `INSERT`.
**Read by:** `/forecast` (via `lib/forecast/engine.ts`), `/` dashboard map,
`/usage` per-site rollup.

### `operators`
**Purpose:** Certified equipment operators and their current assignment.
**PK:** `id` (e.g. `OP101`). **FK:** `current_site_id → sites.id`.
**Wired?** No — `OPERATORS` is a flat id list in `data/fleet.ts` today, not
even matching this table's richer shape (license, certification level).

### `equipment`
**Purpose:** The fleet master record — one row per physical machine: type,
list rental rate, deposit ratio, live telemetry snapshot (engine/idle
hours, utilization, fuel), GPS position, QR payload.
**PK:** `id` (e.g. `EQX1007`, matches the physical QR tag). **FK:**
`current_site_id → sites.id`, `current_operator_id → operators.id`.
**Status values (`operational_status`):** `Active`, `Idle`, `Overdue`,
`Unknown`, `Due Soon`, `Unassigned`.
**Wired?** No — `INITIAL_ASSETS` in `data/fleet.ts` is the live source.
**Read by:** nearly every screen (Dashboard, Check-In/Out, Usage, Alerts,
Anomalies, Forecast). **Written by:** `reassignAsset`/`approveCheckOut`/
`approveCheckIn` in the local store only (not yet persisted here).

### `rental_contracts`
**Purpose:** One row per booked rental — the record this cleanup pass
centers on. `monthly_rental_rate` and `security_deposit_amount` are the
two fields section 4/5 of the brief required: a manually-entered rental
amount, kept as a financial concept **separate** from the deposit.
**PK:** `id`. **FK:** `customer_id → customers.id`,
`equipment_id → equipment.id`, `site_id → sites.id`,
`operator_id → operators.id`, `created_by → profiles.id`.
**Status values:** `rental_status` — `Available` … `Cancelled` (13 states,
see schema); `payment_status` — `Pending` … `Disputed`.
**`currency`** (added in migration 0002): ISO 4217 code, defaults `INR`.
**Wired?** **Yes, as of this pass.** `createRentalContract()` in
`data/fleet.ts` calls `services/rentals.ts → recordRentalContract()`, which
inserts this exact row shape. `approveCheckOut`/`approveCheckIn` update
`rental_status`. `approveDepositRefund` updates it to `Completed`.
**Read/written by:** `NewRentalModal` (booking, staff-editable amount/deposit
inputs), `check.tsx` (check-in/out), `RentalOperationsCenter`,
`CustomerPortal`, `DepositManager`.

### `security_deposits`
**Purpose:** The refund lifecycle for one contract's deposit — held
amount, any approved damage deduction (with reason + evidence), final
refund amount, and who approved it. Kept as its own table (not columns
bolted onto `rental_contracts`) because a deposit has its own approval
workflow and audit needs, distinct from the rent itself — this is the
schema-level enforcement of "deposit ≠ revenue" from section 5.
**PK:** `id`. **FK:** `contract_id → rental_contracts.id`,
`supervisor_approved_by → profiles.id`.
**Status values (`deposit_status`):** `Held`, `Refund Pending`,
`Refund Processing`, `Refunded`, `Partially Deducted`, `Disputed`.
**Wired?** **Yes.** `approveDepositRefund()` → `recordDepositRefund()`
inserts a row here on every refund decision.
**Read/written by:** `InspectionComparisonModal` (the deduction input UI),
`DepositManager`.

### `equipment_inspections`
**Purpose:** The 9-point condition checklist, recorded both
`pre_checkout` and `post_checkin`, with the fuel/hour-meter readings used
for the side-by-side comparison audit.
**PK:** `id`. **FK:** `contract_id → rental_contracts.id`,
`equipment_id → equipment.id`.
**Wired?** **Yes.** `approveCheckOut`/`approveCheckIn` →
`recordCheckOutInspection`/`recordCheckInInspection` insert a row per
inspection.
**Read/written by:** `check.tsx` (the 9-point form),
`InspectionComparisonModal`.

### `audit_logs`
**Purpose:** Immutable event ledger — every booking, check-out, check-in,
and refund decision, human-readable.
**PK:** `id`. **FK:** `user_id → profiles.id`.
**Wired?** **Yes.** `addAuditLog()` (called by every mutator above) now
also calls `recordAuditLog()`.
**Read by:** `RentalOperationsCenter`'s "Auditable Activity Trail" tab.

### `notification_preferences` *(new — migration 0002)*
**Purpose:** Per-user email opt-in/out for each alert category — section
21's "simple preference system". One row per `profiles.id`, defaults
already reflect a sane out-of-the-box posture (critical/overdue/inspection
ON, low-utilization/forecast-suggestion OFF).
**PK:** `user_id → profiles.id`.
**Wired?** **Yes.** `src/services/notifications.ts` reads/writes this via
`src/components/alerts/NotificationPreferences.tsx` (the panel behind the
gear icon in the notification bell). Also read server-side by the
`send-alert-email` Edge Function before it ever calls Resend.

### `notifications` *(new — migration 0002)*
**Purpose:** The Resend delivery ledger and **the duplicate-email guard**
required by section 20. One row per email *attempt* (sent, failed, or
skipped), keyed by `alert_id` + `alert_fingerprint` so the same underlying
condition (e.g. "EQX1002 overdue by 41 days") is never re-emailed just
because a page reloaded — only a fingerprint change (day-count crossing a
new week, utilization crossing a new bucket, etc. — see
`src/lib/alerts/engine.ts`) creates a new sendable row.
**PK:** `id`. **FK:** `recipient_user_id → profiles.id`.
**Status values (`delivery_status`):** `pending`, `sent`, `failed`,
`skipped_duplicate`, `skipped_preference`.
**Indexes:** `(alert_id, alert_fingerprint, delivery_status)` — the exact
lookup the dedup check runs; `(recipient_user_id, created_at desc)` — for a
future "your notification history" screen.
**Written by:** exclusively `supabase/functions/send-alert-email` using the
service-role key — no client-side INSERT policy exists, so a browser can
never forge a "sent" row.

## Relationships at a glance

```
profiles ──┬── customers (profile_id)
           ├── notification_preferences (user_id, 1:1)
           ├── notifications (recipient_user_id)
           ├── rental_contracts (created_by)
           ├── security_deposits (supervisor_approved_by)
           └── audit_logs (user_id)

sites ──┬── operators (current_site_id)
        ├── equipment (current_site_id)
        └── rental_contracts (site_id)

equipment ──┬── operators (current_operator_id, reverse)
            ├── rental_contracts (equipment_id)
            └── equipment_inspections (equipment_id)

rental_contracts ──┬── security_deposits (contract_id)
                    └── equipment_inspections (contract_id)
```

## End-to-end data flow (as designed by the schema)

```
USER → AUTH (profiles) → RENTAL (rental_contracts, customers)
     → EQUIPMENT (equipment, sites, operators)
     → INSPECTION (equipment_inspections)
     → USAGE (equipment telemetry columns)
     → ALERT / ANOMALY (computed — see docs/ALERTS.md, no dedicated table)
     → FORECAST (sites.demand_*, computed — see docs/FORECASTING.md)
     → RECOMMENDATION (in-memory OptimizationPlan — no table yet)
     → ACTION (equipment/rental_contracts updates)
     → AUDIT LOG (audit_logs)
     → EMAIL NOTIFICATION (notifications, via notification_preferences)
```

Note the two links that are **computed, not stored**: alerts/anomalies and
forecasts are derived on read from `equipment`/`rental_contracts`, not
persisted rows. See [ALERTS.md](./ALERTS.md) and [FORECASTING.md](./FORECASTING.md)
for why, and what persisting them would take.

## RLS summary

- `rental_contracts`: customers see their own (`created_by = auth.uid()`);
  staff/supervisor roles see everything.
- `equipment`: any authenticated user can `SELECT`.
- `notification_preferences`: a user can only read/write their own row.
- `notifications`: staff can read all; a user can read rows addressed to
  them; **no client INSERT policy** — only the Edge Function (service role)
  writes.
- `profiles`, `customers`, `security_deposits`, `equipment_inspections`,
  `audit_logs`: RLS is enabled in `schema.sql` but no fine-grained policy
  is defined yet beyond the staff-role check pattern used elsewhere —
  tighten before using these tables in production.

## Seed vs. production data

`src/data/fleet.ts`'s `INITIAL_ASSETS`, `INITIAL_CONTRACTS`,
`INITIAL_PROFILES`, `SITES_META` are demo/seed data for the local
simulation store — they are **not** written anywhere in `supabase/`. If/when
fleet data moves to Supabase, the same objects can seed a `supabase/seed.sql`
without change (field names were kept aligned for exactly this reason).
