# Architecture

How data actually moves through Smart Rental today, where business logic
lives, and — explicitly — what still needs a real backend behind it. This
is the map a new contributor should read before touching `src/data/fleet.ts`.

## Stack

TanStack Start (React 19 + TanStack Router, SSR via Nitro/Vercel) +
Tailwind v4 + shadcn/ui primitives + Supabase (`@supabase/supabase-js`) +
Leaflet + Recharts. Not a Next.js or Vite-SPA app — routes are file-based
under `src/routes/`, generated into `src/routeTree.gen.ts`.

## The one thing to understand before anything else

**There are two separate state layers that do not yet talk to each other
automatically:**

1. **`src/data/fleet.ts`** — a synchronous, in-memory store
   (`useSyncExternalStore`) holding assets, contracts, audit logs, the
   current "logged in" user, and UI mode. Every screen reads from this via
   `useFleet()`. It is fast, has zero network latency, and is what makes
   the demo feel instant — but it is **not persisted**: a page refresh
   resets it to the seed data in the same file.
2. **Supabase** — a fully-designed Postgres schema (see
   [DATABASE.md](./DATABASE.md)) that, before this pass, no code path ever
   called.

This pass does **not** merge these into one Supabase-backed store — that
would mean rewriting every screen's read path (map, Gantt, dashboard KPIs,
usage analytics — over a dozen components) against async Supabase queries,
with no live Supabase project available in this environment to validate
the rewrite against. That is flagged as the clear next step (see
[Limitations](#known-limitations) below), not silently skipped.

What **is** wired end-to-end: every mutation on the transactional side —
booking a rental, checking equipment out/in, refunding a deposit, writing
an audit log entry, sending an alert email — now **also** writes to
Supabase, alongside updating the in-memory store the UI reads from. The
in-memory store stays the instant, optimistic source of truth for
rendering; Supabase becomes the durable record and the source of truth for
anything that needs to survive a refresh or be queried outside the app
(the notification dedup ledger, the audit trail, the rental record).

```
User action (click "Pay & Execute Rental")
        │
        ▼
data/fleet.ts mutator (e.g. createRentalContract)
        │
        ├──► in-memory state update → emit() → useSyncExternalStore
        │        → every subscribed component re-renders instantly
        │
        └──► services/rentals.ts (fire-and-forget, no-ops if
             isSupabaseConfigured is false)
                  │
                  ▼
             Supabase INSERT/UPDATE (rental_contracts, security_deposits,
             equipment_inspections, audit_logs)
```

## Layer map

```
src/
├── routes/            One file per page (TanStack Router file-based routing).
│                       Owns page-level layout + wires hooks/services to components.
├── components/
│   ├── common/         Shell (app chrome/nav), Panel, Table, CommandPalette,
│   │                    NotificationCenter, ActionSheet, AIAssistantModal
│   ├── auth/            AuthModal (see Authentication below)
│   ├── fleet/           EquipmentHero, LeafletMap, Gantt, AssetInspector,
│   │                    SiteInspector, CameraQRScanner
│   ├── rental/          NewRentalModal, RentalOperationsCenter, ApprovalCenter,
│   │                    DepositManager, CustomerPortal
│   ├── inspection/      InspectionComparisonModal
│   ├── alerts/          NotificationPreferences
│   └── ui/              shadcn/ui primitives (design-system kit; kept complete
│                        even where a given primitive isn't used yet — this is
│                        the base components.json expects `shadcn add` to extend)
├── data/fleet.ts       The in-memory store described above — types, seed data,
│                       mutators, selectors (summary(), isOverdue()).
├── types/fleet.ts      Domain types (Asset, RentalContract, …), imported by
│                       both data/fleet.ts and services/lib so services never
│                       need to import the stateful store module.
├── lib/
│   ├── supabase/client.ts   Supabase client + isSupabaseConfigured guard.
│   ├── alerts/engine.ts     The ONE alert-computation function — see ALERTS.md.
│   ├── forecast/engine.ts   The ONE demand-forecast calculation — see FORECASTING.md.
│   ├── email/notify.ts      Client-side alert→email dispatch (calls the Edge Function).
│   ├── demoClock.ts         The fixed "today" the seed data is anchored to.
│   └── utils.ts             cn() and other generic helpers.
├── services/
│   ├── rentals.ts       Supabase writes for the rental lifecycle (see above).
│   └── notifications.ts Supabase reads/writes for notification_preferences.
├── hooks/
│   └── useAlertEmailDispatch.ts  Mounted once in Shell; watches the alert
│                                  engine's output and fires eligible emails.
└── supabase/
    ├── schema.sql            Baseline schema.
    ├── migrations/            Incremental changes (0002_… adds notifications).
    └── functions/send-alert-email/  Edge Function — the only place RESEND_API_KEY
                                       is read. See EMAIL below.
```

## Where business logic lives

| Concern | Lives in | Notes |
|---|---|---|
| Rental pricing (rate/deposit entry, total payable) | `components/rental/NewRentalModal.tsx` + `data/fleet.ts:createRentalContract` | Staff can override the list rate/deposit per contract — not a fixed ₹50,000. |
| Check-in/out + 9-point inspection | `routes/check.tsx` + `data/fleet.ts:approveCheckOut/approveCheckIn` | |
| Deposit refund + deduction | `components/inspection/InspectionComparisonModal.tsx` + `data/fleet.ts:approveDepositRefund` | Deposit math (`held − deduction = refund`) is computed once here, not duplicated in the UI. |
| Alerts/anomalies | `lib/alerts/engine.ts` | Single source of truth — see ALERTS.md. |
| Forecast/demand gap | `lib/forecast/engine.ts` | Single source of truth — see FORECASTING.md. |
| Optimization recommendations → action | `data/fleet.ts:applyOptimizationPlan/reassignAsset` | Updates equipment state + writes an audit log entry. |
| Email dispatch + dedup | `hooks/useAlertEmailDispatch.ts` (client trigger) + `supabase/functions/send-alert-email` (send + authoritative dedup) | See EMAIL below. |

## Authentication

The brief's instruction is "keep the existing Supabase email/password
auth." **The audit finding is that this doesn't exist yet**:
`components/auth/AuthModal.tsx` has Sign In and Register forms with
password fields, but `handleLogin`/`handleRegister` never call
`supabase.auth.signInWithPassword` / `supabase.auth.signUp` — they call
`switchUserRole()` / `registerUser()` in `data/fleet.ts`, which just swaps
which mock `UserProfile` is "current" with **no password check at all**.

This is called out rather than silently patched because wiring real
Supabase Auth touches session persistence, protected routes, and the
identity every RLS policy in `schema.sql` depends on (`auth.uid()`) — a
change this session cannot validate against a live Supabase project. See
[Known Limitations](#known-limitations).

## Email notification flow (Resend)

```
Fleet state changes (assets/contracts update)
        │
        ▼
lib/alerts/engine.ts buildAlerts() — same call every screen uses
        │
        ▼
hooks/useAlertEmailDispatch.ts (mounted once in Shell, staff only)
  for each alert not yet attempted this browser session:
        │
        ▼
lib/email/notify.ts dispatchAlertEmail()
  — no-ops if Supabase isn't configured or the alert type isn't emailable
        │
        ▼ supabase.functions.invoke("send-alert-email")  [JWT attached automatically]
        │
        ▼
supabase/functions/send-alert-email/index.ts  (Deno, service-role client)
  1. Check notification_preferences for this recipient/alert type → skip if OFF
  2. Check notifications table for a prior `sent` row with the same
     alert_id + alert_fingerprint → skip if found (THE dedup guard)
  3. Build HTML email, POST to Resend using RESEND_API_KEY (server-only secret)
  4. Insert a notifications row recording the outcome (sent/failed/skipped_*)
        │
        ▼
Resend → recipient inbox
```

`RESEND_API_KEY` is read exactly once, inside the Edge Function, via
`Deno.env.get("RESEND_API_KEY")` — set as a Supabase secret
(`supabase secrets set RESEND_API_KEY=...`), never a `VITE_`-prefixed
variable, so it is never bundled into client JS. See
[ALERTS.md](./ALERTS.md#email-notifications) for the full trigger list and
dedup mechanics.

## Known limitations

Documented explicitly, not silently worked around:

1. **Authentication is mocked.** See above. Fixing this is the prerequisite
   for RLS to mean anything and for email recipients to be real addresses
   rather than the locally-selected demo profile's email.
2. **Fleet/site/operator/customer master data is not Supabase-backed.**
   The schema and the in-memory store agree on shape, but nothing syncs
   them. A migration would add a data-fetching layer (React Query is
   already a dependency, just unused) in front of every read site.
3. **No historical usage time series is persisted**, so the forecast
   engine's "confidence" is honestly labeled "Estimated" rather than
   scored — see FORECASTING.md.
4. **This environment has no live Supabase project**, so every Supabase
   write path added in this pass is code-reviewed and type-checked but not
   runtime-verified against a real database. Before relying on it in
   production: run `supabase db push` (applies `schema.sql` +
   `migrations/`), deploy the Edge Function
   (`supabase functions deploy send-alert-email`), set the three secrets
   (`RESEND_API_KEY`, `RESEND_FROM_ADDRESS`, `PUBLIC_APP_URL`), and set
   `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` in the app's environment.
