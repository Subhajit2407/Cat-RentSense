# Forecasting Audit

Section 10/11 of the cleanup brief asks for an honest audit of how
"AI Forecasting" currently works, and to relabel it accurately if it isn't
actually ML. It isn't — here's exactly what it is.

## What it is

**A deterministic, rule-based Demand Forecast / Optimization Engine.**
Not a trained model, not a statistical forecast, no historical time series
involved. It lives in [`src/lib/forecast/engine.ts`](../src/lib/forecast/engine.ts)
(`buildSiteDemandForecast`), called from `routes/forecast.tsx`.

The calculation, in full:

```
predictedNeed = site.demandForecast.need × horizonMultiplier
gap = max(0, predictedNeed − countOfAssetsCurrentlyOnSite)
```

Where `horizonMultiplier` is `1` / `1.4` / `2.0` for the 7/14/30-day toggle,
and `site.demandForecast.need` is a **configured constant** per site,
defined in `SITES_META` in `src/data/fleet.ts` — e.g. Site S003 is
hand-set to need 3 excavators. It is not derived from any usage log.

## What data it reads

- **Current fleet placement** (real, live): `assets.filter(a => a.site === site.id).length` —
  this part genuinely reflects the in-memory fleet state at the moment the
  page renders.
- **Configured site demand** (static seed, not computed): `SITES_META[site].demandForecast.need`.
- **Nothing historical.** Smart Rental does not persist a usage-history or
  demand-history table — `equipment.engine_hours_per_day`,
  `idle_hours_per_day`, and `utilization_pct` in the schema are current
  snapshots, overwritten in place, not an append-only series. There is
  nothing to fit a trend against.

## Is it AI/ML? Is it deterministic?

**Deterministic and rule-based.** Same inputs always produce the same
output; no model weights, no training data, no external inference call.
Before this pass, the UI labeled this "AI projection" and displayed a
`High/Medium/Low` "confidence" score sourced from the same static
`SITES_META` seed — i.e. a fabricated confidence, not a statistical one.

**Fixed in this pass:**
- Page copy relabeled: "Demand Forecast & Optimization Engine", "rule-based
  projection … not a machine-learning model" (`routes/forecast.tsx`).
- The confidence badge now always reads **"Estimated — limited historical
  data"** (`SiteDemandForecast.confidenceLabel` in `lib/forecast/engine.ts`),
  per section 11's explicit instruction, instead of a fabricated
  High/Medium/Low.
- The calculation itself was extracted from the route component into
  `lib/forecast/engine.ts` so it has one implementation and one place to
  eventually swap in a real model.

## Forecast → Recommendation → Action chain

The brief asks whether this chain (section 12) actually works end-to-end,
not just visually:

```
CURRENT FLEET DATA (data/fleet.ts assets)
        ↓
USAGE ANALYSIS (/usage — engine vs idle hours, utilization %)
        ↓
SITE DEMAND (SITES_META, sites.demand_* in schema)
        ↓
FORECAST (lib/forecast/engine.ts — gap = need − have)
        ↓
UNDERUTILIZED ASSETS (utilizationPct < 25%, computed in lib/alerts/engine.ts
                       and reused by /usage's "Underutilized Assets" panel)
        ↓
RECOMMENDATION (OptimizationPlan objects in data/fleet.ts, e.g. "Reassign
                EQX1007 → S003")
        ↓
USER APPROVAL (ActionSheet component — user clicks "Approve & Execute")
        ↓
OPTIMIZATION ACTION (data/fleet.ts:applyOptimizationPlan → reassignAsset)
        ↓
DATABASE UPDATE — asset's site/operator/status/location/utilization are
                   updated in the in-memory store; an audit_logs-shaped
                   entry is recorded via addAuditLog (persisted to
                   Supabase when configured, see services/rentals.ts)
        ↓
FLEET UI UPDATE — every subscribed screen (Dashboard, Map, Asset Inspector,
                   Forecast, Usage, Alerts) re-renders immediately via
                   useSyncExternalStore — there is exactly one fleet state,
                   so this is not a "some screens stale" situation.
```

This chain is real, not just visual text: `reassignAsset()` mutates actual
asset fields (`site`, `operator`, `status`, `lat/lng`, `utilizationPct`,
`idleHrsPerDay`) that every downstream screen reads from the same store, and
writes an audit log entry. What it does **not** yet do is persist the
equipment update to Supabase's `equipment` table (see
[ARCHITECTURE.md](./ARCHITECTURE.md#known-limitations) — fleet master data
isn't wired to Supabase in this pass), so the optimization's effect
survives within the browser session but not a hard refresh with a fresh
Supabase-backed load (there isn't one yet).

## What a real (ML-backed) version would need

Not built in this pass — noted for the roadmap, per section 11's spirit of
not inventing what isn't there:

1. An append-only `usage_history` table (equipment_id, recorded_at, engine
   hours, idle hours, utilization) written on a schedule, not overwritten
   in place.
2. Enough historical points per site/equipment-type to fit even a simple
   moving-average or linear trend — the `MIN_HISTORY_EVENTS_FOR_CONFIDENCE`
   constant in `lib/forecast/engine.ts` documents the bar (30 events) this
   codebase would want before reporting a real confidence score instead of
   "Estimated".
3. A confidence formula tied to sample size / variance, replacing the flat
   label once (2) is satisfied.
