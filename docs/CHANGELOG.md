# Smart Rental — CHANGELOG

All notable changes to Smart Rental (RentSense) are documented here.

---

## [2026-09-02] — Repository Audit & Improvement Release

### 🔒 Security Fixes
- **Added `.env` to `.gitignore`** — environment files containing real secrets were previously not protected from accidental git commits. Fixed by adding `.env`, `.env.local`, `.env.*.local`, and `.env.production` patterns.
- **Created `.env.example`** — documents all required environment variables with placeholder values. Includes `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `RESEND_API_KEY`, and app URL settings.
- **Resend API key is server-side only** — email sending goes through a Supabase Edge Function. `RESEND_API_KEY` is stored as a Supabase Secret and never bundled into the browser.

### 🗑️ Repository Cleanup
- **Deleted `download-images.mjs`** — one-off script for downloading equipment photos. Not part of the application.
- **Deleted `search-wikimedia.mjs`** — one-off Wikimedia search script. Not part of the application.
- **`lovable-error-reporting.ts` reviewed** — kept as-is. It gracefully no-ops when `window.__lovableEvents` is not present (outside Lovable editor), so no change needed.

### ⏰ Fixed Frozen Date Bug
- **`TODAY` changed from `new Date("2025-05-10")` to `new Date()`** — the application was using a static May 2025 date for all overdue calculations, making every date comparison incorrect.
- **`isOverdue()` improved** — now correctly excludes `Unassigned` assets (they're flagged separately) and uses the real current date.

### 🚨 Unified Alert System
- **Single `buildAlerts()` function** — previously, the Dashboard status bar (`summary()`), the Alerts page, and the Notification Center each computed alert counts independently from different logic. This caused inconsistent counts across the UI.
- **`buildAlerts()` is now exported from `fleet.ts`** — the single source of truth. Used by:
  - `summary()` in fleet.ts (Dashboard status bar)
  - `/alerts` route (Alert Command Center)
  - Future: Notification Center
- **Alert types now unified**: `Overdue`, `Due Soon`, `Unassigned`, `Low Utilization`, `Maintenance`

### 💰 Fixed Rental Amount — Now Editable
- **`NewRentalModal.tsx` updated** — rental staff can now enter a custom monthly rate and security deposit amount for each booking, instead of using the hard-coded asset default.
- **Both fields pre-populated but editable** — the asset's stored `monthlyRentalRate` and `securityDepositRatio` are used as defaults, but can be changed to match any negotiated contract terms.
- **Security deposit clearly labeled as REFUNDABLE / ESCROW** — with explanatory text distinguishing it from rental revenue.
- **`createRentalContract()` updated** — now accepts `monthlyRentalRate` and `securityDepositAmount` as explicit parameters. Removed the hard-coded `?? 50000` fallback.
- **Contract number improved** — now includes timestamp suffix to prevent duplicates: `SR-2026-1007-4821`

### 📊 Forecast Honesty
- **Renamed "AI projection" → "Demand Optimization Engine"** — the forecast calculation is deterministic math (`need × horizonMultiplier`), not a machine learning model. Labels now accurately reflect this.
- **Added "estimated" disclaimer** on confidence chips.
- **Removed hard-coded `EQX1007` reference** — the redeployment recommendation now dynamically selects the lowest-utilization unassigned asset from the live fleet data.
- **Removed hard-coded `$2,400/month` claim** — replaced with a factual statement about standby lease cost reduction.

### 📧 Resend Email Notifications
- **New: `src/lib/email/templates.ts`** — HTML + plain text email template builders for alert notifications and daily digests.
- **New: `src/lib/email/notify.ts`** — client-side dispatcher that calls the Supabase Edge Function (never calls Resend directly from the browser).
- **New: `supabase/functions/send-alert-email/index.ts`** — Deno Edge Function that calls the Resend API server-side with `RESEND_API_KEY` from Supabase Secrets.
- **Auto-notification in Alerts page** — critical alerts now automatically trigger email notifications when first seen, using `sentNotificationIds` in fleet state for deduplication.

### 📚 Documentation
- **New: `docs/DATABASE.md`** — complete database schema documentation for all tables, columns, RLS policies, and business rules.
- **New: `docs/ARCHITECTURE.md`** — application architecture: stack, folder structure, data flow, alert system, email architecture, and financial design decisions.
- **New: `docs/CHANGELOG.md`** — this file.

### 🏗️ Internal State Improvements
- **Added `sentNotificationIds: Set<string>` to fleet state** — prevents duplicate email notifications on re-renders and page refreshes.
- **Added `markNotificationSent()` and `hasNotificationBeenSent()` exports** — clean API for email deduplication.
- **`summary()` now uses `buildAlerts()`** — ensures the dashboard status bar always shows the same overdue count as the Alerts page.

---

## Known Limitations (Post-Audit)

1. **Supabase not yet connected** — all data is in-memory mock data. The schema is production-ready.
2. **Email requires Supabase Edge Function deployment** — must run `supabase functions deploy send-alert-email` and set `RESEND_API_KEY` as a Supabase Secret.
3. **`SITES_META.demandForecast` values are hard-coded** — these are illustrative estimates, not computed from real historical data.
4. **Mock users have hard-coded email addresses** — real authentication via Supabase Auth will provide actual user emails when connected.
