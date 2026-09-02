# Alerts & Anomalies Audit

Section 13-15 of the cleanup brief. Covers where alerts come from, why
three screens used to disagree on counts, and how email notifications
plug into the same engine.

## Before this pass: three different alert implementations

| Screen | Old source |
|---|---|
| `/alerts` | Its own local `buildAlerts()` — overdue, unassigned, low-util, one hardcoded "Continuous high utilization" check. |
| Notification bell (`NotificationCenter`) | A **separate**, narrower ad-hoc list — overdue + unassigned only, using a different "unassigned" condition (`status === "Unassigned"` vs. `/alerts`'s `!site \|\| !operator`) and missing low-utilization entirely. |
| `/anomalies` | Read `Asset.anomalies` — **static string arrays baked into the seed data** in `data/fleet.ts` (e.g. `["No site assigned", "12 idle hrs/day"]` on `EQX1007`). These strings never recompute, so if telemetry changed, the anomaly list would silently go stale or show conditions that no longer exist. |

This is exactly the failure mode section 15 warns about: "Dashboard says 5
Overdue, Alerts page says 3 Overdue" was a real risk here, not a
hypothetical — the bell and the Alerts page could and did disagree.

## After this pass: one engine

[`src/lib/alerts/engine.ts`](../src/lib/alerts/engine.ts) exports a single
`buildAlerts(assets, contracts, today?)` function. Every consumer imports
it — there is no second implementation anywhere in the codebase:

- `routes/alerts.tsx` — the Alert Command Center.
- `components/common/NotificationCenter.tsx` — the bell, now driven by the
  same list instead of its own subset.
- `routes/anomalies.tsx` — filters the same list to `type === "anomaly"`
  and reads live telemetry via the alert's own `signal`/`impact` fields,
  no longer the static seed strings.
- `data/fleet.ts:summary()` — the `flagged` count shown in `Shell`'s status
  bar and used for the bell's red dot is now `buildAlerts(assets, []).length`
  worth of unique assets, not a separate `anomalies?.length || isOverdue()`
  check.
- `hooks/useAlertEmailDispatch.ts` — the email trigger (see below).

**Alerts are calculated dynamically, on every render, from current
`assets`/`contracts` state — they are not persisted rows.** This is a
deliberate, documented choice for this pass: persisting alerts would need
an `alerts` table plus a generation job (cron or trigger) to keep it in
sync with `equipment`/`rental_contracts`, and since fleet data itself isn't
Supabase-backed yet (see ARCHITECTURE.md), a persisted-alerts table would
have nothing durable to key off. What **is** persisted is the
*consequence* of an alert existing long enough to be worth emailing about —
the `notifications` table (see below) — which is where duplicate
protection actually needs to live.

Because generation is pure and dynamic, **"duplicate alerts on every page
load" isn't a real risk for the in-app UI** (there's nothing to duplicate —
it's recomputed, not appended). The duplicate-protection problem the brief
describes (section 20) applies specifically to *emails*, where a
recompute-on-every-render *would* spam an inbox without a persisted dedup
key — solved via the `notifications` ledger, below.

One consequence of computing today's date via a fixed `DEMO_TODAY` anchor
(`src/lib/demoClock.ts`, `2025-05-10`) rather than the real wall clock: the
seed data's overdue/due-soon relationships stay meaningful regardless of
when the app is actually opened. Every overdue/due-soon computation in the
app (the alert engine, `data/fleet.ts:isOverdue`, the Gantt "today" line)
reads this one constant — changing it to `new Date()` is the single line to
flip once real dated records replace the seed data.

## Alert types

All nine of section 14's types are implemented, one rule function per type
in `lib/alerts/engine.ts`:

| Type | Trigger | Severity |
|---|---|---|
| `overdue_rental` | `asset.status === "Overdue"` (the authoritative field — see note below) | critical |
| `equipment_due_soon` | `status === "Due Soon"` | info |
| `unassigned_equipment` | no site or no operator assigned | warning |
| `low_utilization` | `utilizationPct < 25%` and not already Unassigned | warning |
| `high_idle_hours` | `idleHrsPerDay >= 8` and not Unassigned | warning |
| `anomaly` | zero engine runtime while active, or ≥95% utilization with 0 idle hours over 14+ days | critical / warning |
| `inspection_issue` | any 9-point checklist item isn't "Good" on pre/post inspection | critical (if "Damaged") / warning |
| `return_condition_issue` | an approved damage deduction exists on a returned contract | critical (≥30% of deposit) / warning |
| `payment_deposit_issue` | `paymentStatus` Failed/Disputed or `depositStatus` Disputed | critical |

No new alert types were invented beyond what the existing three
implementations already covered plus the ones section 14 explicitly asked
for and the old code didn't have (`inspection_issue`,
`return_condition_issue`, `payment_deposit_issue`, `equipment_due_soon`,
`high_idle_hours` as its own type distinct from low utilization).

**A concrete instance of the "5 vs 3 Overdue" problem was found and
fixed here.** `overdue_rental` used to be computed as
`new Date(checkIn) < today && status !== "Idle"` — independently
re-implemented in `alerts.tsx`, the Gantt chart, and `fleet.ts`'s
`isOverdue()`. That formula flagged three healthy, still-`Active` rentals
(their original expected-return date had passed while the rental was
simply extended) as overdue, in addition to the one asset genuinely in
that state. Meanwhile `RentalOperationsCenter`'s KPI card used a
different, correct rule the whole time: `status === "Overdue"`. Result:
before this pass, the Alert Command Center / notification bell / Gantt
showed 4 overdue units while the Rental Operations dashboard showed 1 —
for the exact same fleet state. Fixed by making `status === "Overdue"`
(already authoritative everywhere a status pill is rendered) the one rule,
used by `lib/alerts/engine.ts`, `data/fleet.ts:isOverdue`, and the Gantt
chart alike.

## Resolve/snooze

Alerts can be resolved or snoozed from `/alerts` and `/anomalies`
(`resolveAlert`/`snoozeAlert` in `data/fleet.ts`), tracked as
`resolvedAlertIds`/`snoozedAlertIds` `Set`s in the in-memory store, keyed
by the alert's deterministic `id`. This state is session-local (resets on
refresh, same caveat as the rest of the fleet store) — a persisted
`alerts` table would be needed to make resolutions durable across
sessions/devices, noted as a follow-up alongside fleet-data persistence.

## Email notifications

See [ARCHITECTURE.md](./ARCHITECTURE.md#email-notification-flow-resend)
for the full request flow diagram. Summary of the pieces relevant to
alerts specifically:

- `hooks/useAlertEmailDispatch.ts` is mounted once (in `Shell`) and watches
  `buildAlerts()`'s output for staff users. For every alert whose
  `id:fingerprint` pair hasn't been attempted yet this browser session, it
  calls `lib/email/notify.ts:dispatchAlertEmail`.
- **Fingerprints, not just alert ids, gate re-sends.** An alert's `id` is
  stable for the life of the condition (e.g. `EQX1002-overdue_rental`), but
  its `fingerprint` changes when the condition meaningfully changes — e.g.
  overdue alerts bucket by week (`Math.floor(daysOverdue / 7)`), so a
  rental that's been overdue for 41 days re-emails as it crosses each new
  week rather than every page load, and also rather than never again after
  the first email.
- The **authoritative** dedup check is server-side: `send-alert-email`
  queries `notifications` for a prior `sent` row with the same
  `alert_id` + `alert_fingerprint` before ever calling Resend. The client
  guard (a `sessionStorage` set) is only a cheap short-circuit to avoid an
  unnecessary network round-trip — it is not trusted for correctness.
- `notification_preferences` gates delivery per alert category before the
  dedup check even runs — see the mapping in
  `supabase/functions/send-alert-email/index.ts`'s `PREFERENCE_KEY_BY_TYPE`.
- Not every alert type reaches this dispatcher — see
  `EMAIL_ELIGIBLE_TYPES` in `lib/email/notify.ts` and the preference
  defaults in migration `0002` for which categories are on by default vs.
  opt-in (low utilization and forecast suggestions are OFF by default,
  matching section 21's example).
