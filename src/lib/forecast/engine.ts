// Demand Forecast / Optimization Engine — NOT a machine-learning model.
//
// This is a deterministic, rule-based calculation:
//   predictedNeed = seededSiteDemand.need × horizonMultiplier
//   gap = max(0, predictedNeed − assetsCurrentlyOnSite)
//
// `seededSiteDemand.need` comes from SITES_META in src/data/fleet.ts, which
// is *configured* per-site demand (what a regional planner has told the
// system to expect), not a value learned from a historical usage time
// series — Smart Rental does not currently persist a usage-history table,
// so there is no real time series to fit a model against. Labelling this
// "AI" would overstate what it does; it is called out here as a rule-based
// engine, and its confidence is honestly reported as "Estimated" rather
// than inventing a High/Medium/Low score with no statistical basis.
//
// See docs/FORECASTING.md for the full audit of this subsystem.
import type { Asset, SiteMeta } from "@/types/fleet";

export type ForecastHorizon = "7d" | "14d" | "30d";

export const HORIZON_MULTIPLIER: Record<ForecastHorizon, number> = {
  "7d": 1,
  "14d": 1.4,
  "30d": 2.0,
};

export type SiteDemandForecast = {
  siteId: string;
  name: string;
  primaryNeed: SiteMeta["demandForecast"]["primaryNeed"];
  need: number;
  have: number;
  gap: number;
  /** Always "Estimated" today — see file header. Kept as a field so a real
   *  historical model can report calibrated confidence later without
   *  changing every call site. */
  confidenceLabel: string;
};

/**
 * Minimum number of fleet-wide history events Smart Rental would want on
 * record before a confidence score (rather than a flat "Estimated" label)
 * could be defended. The app does not persist that history today, so this
 * constant currently only documents the bar — see docs/FORECASTING.md.
 */
export const MIN_HISTORY_EVENTS_FOR_CONFIDENCE = 30;

export function buildSiteDemandForecast(
  sites: Record<string, SiteMeta>,
  assets: Asset[],
  horizon: ForecastHorizon,
): SiteDemandForecast[] {
  const multiplier = HORIZON_MULTIPLIER[horizon];
  return Object.values(sites).map((site) => {
    const onSite = assets.filter((a) => a.site === site.id);
    const predictedNeed = Math.round(site.demandForecast.need * multiplier);
    const gap = Math.max(0, predictedNeed - onSite.length);
    return {
      siteId: site.id,
      name: site.name,
      primaryNeed: site.demandForecast.primaryNeed,
      need: predictedNeed,
      have: onSite.length,
      gap,
      confidenceLabel: "Estimated — limited historical data",
    };
  });
}
