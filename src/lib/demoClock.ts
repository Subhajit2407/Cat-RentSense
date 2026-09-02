// The fleet simulation's seed data (src/data/fleet.ts) is authored relative
// to a fixed "today" so overdue/due-soon relationships stay meaningful
// regardless of the real calendar date the app happens to be opened on.
// Every overdue/due-soon computation in the app — the fleet store's
// summary(), the shared alert engine, the Gantt timeline — must anchor to
// this same constant, or counts drift out of sync with each other (and,
// once real Supabase-backed dates replace the seed data, this is the one
// line to change to `new Date()`).
export const DEMO_TODAY = new Date("2025-05-10");
