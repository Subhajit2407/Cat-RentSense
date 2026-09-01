# Fleet Watch

Build Prompt: Smart Rental Tracking System (Caterpillar)

Use this prompt as-is to generate the full site. It defines the design system, page structure, features, and default mock data. Build with plain, minimal code — one reusable Panel component and one reusable Table component shared across all pages. No unnecessary abstraction layers, no config wrappers, no state management library — plain component state is enough for a prototype.

1. Project Summary

Build a web dashboard called Smart Rental Tracking System for tracking rented construction/mining equipment (excavators, cranes, bulldozers, graders). Replace manual/spreadsheet tracking with: live asset status, check-in/check-out flow, usage logging, overdue alerts, demand forecasting, and anomaly detection. The dashboard should not just display data — every panel should surface a recommended action.

No real backend/telemetry required. Use the default dataset below, hardcoded in the app, to drive every screen.

2. Design System (match reference image exactly)

Layout shell (reused on every page):

Top nav bar, fixed height ~56px:

Left: logo mark + app name + breadcrumb/context label (e.g. "Rental Tracking / Dashboard")

Center: horizontal tab/module switcher with icons — Dashboard, Check-In/Out, Usage, Alerts, Forecast, Anomalies. Active tab gets a lime/yellow pill highlight; inactive tabs are neutral gray icons.

Right: icon cluster — search, refresh, undo/redo, list-view toggle, save, notification bell (with count badge), settings, user avatar.

Body: CSS grid of white/light rounded card panels (12–16px radius, soft shadow, 1px light border) on a very light gray page background.

Each panel has its own header row: title on left, small inline tab switcher if the panel has multiple views (e.g. "Planning / Distribution / Statistics"), and a small icon toolbar on the right (refresh, expand/fullscreen, list icon, settings).

Color system:

Background: #F4F5F7

Panel background: #FFFFFF

Accent (CTA, active states, highlighted numbers): lime/yellow #E8FF5C or similar

Text primary: near-black #14161A

Text muted/labels: gray #8A8F98

Status colors: Active/Good = green, Idle/Warning = yellow, Overdue/Anomaly = red, Unknown/Unassigned = gray

Components:

Panel: header (title + optional tabs + toolbar icons) + content slot. Every page section is a Panel.

Table: rows with checkbox, small icon/thumbnail, primary label, colored status pill, right-aligned numeric stats, trailing 3-dot menu. Used for every list/table across the app.

InsightCard: small floating card (like the "+$1,100 optimization" card in the reference) used to surface a recommendation on top of a map or chart panel. Shows a headline number, a short reason, and an action button.

Gantt: horizontal timeline panel — one row per asset, a bar spanning check-out → check-in dates, a vertical "today" marker line, overdue bars rendered in red.

Font: clean sans-serif (Inter or system sans). Numbers bold, labels muted gray, generous whitespace.

3. Global Data Model (default/mock data — hardcode this)

[
  { "id": "EQX1001", "type": "Excavator", "site": "S003", "checkOut": "2025-04-01", "checkIn": "2025-04-16",
    "engineHrsPerDay": 1.5, "idleHrsPerDay": 10, "operatingDays": 15, "operator": "OP101",
    "utilizationPct": 13, "status": "Idle" },

  { "id": "EQX1002", "type": "Crane", "site": null, "checkOut": "2025-03-10", "checkIn": "2025-03-30",
    "engineHrsPerDay": 0, "idleHrsPerDay": 11, "operatingDays": 20, "operator": null,
    "utilizationPct": 0, "status": "Unknown",
    "anomalies": ["No site assigned", "No operator", "Zero engine runtime"] },

  { "id": "EQX1003", "type": "Bulldozer", "site": "S002", "checkOut": "2025-02-15", "checkIn": "2025-03-11",
    "engineHrsPerDay": 7.5, "idleHrsPerDay": 0.5, "operatingDays": 25, "operator": "OP203",
    "utilizationPct": 94, "status": "Active" },

  { "id": "EQX1004", "type": "Excavator", "site": "S004", "checkOut": "2025-05-05", "checkIn": "2025-05-15",
    "engineHrsPerDay": 2, "idleHrsPerDay": 9, "operatingDays": 10, "operator": "OP106",
    "utilizationPct": 18, "status": "Idle" },

  { "id": "EQX1005", "type": "Bulldozer", "site": "S006", "checkOut": "2025-01-01", "checkIn": "2025-01-31",
    "engineHrsPerDay": 8, "idleHrsPerDay": 0, "operatingDays": 30, "operator": "OP301",
    "utilizationPct": 100, "status": "Active",
    "anomalies": ["Continuous high utilization — no idle time logged, verify maintenance schedule"] },

  { "id": "EQX1006", "type": "Grader", "site": "S001", "checkOut": "2025-04-05", "checkIn": "2025-04-23",
    "engineHrsPerDay": 3, "idleHrsPerDay": 6, "operatingDays": 18, "operator": "OP114",
    "utilizationPct": 33, "status": "Idle" },

  { "id": "EQX1007", "type": "Excavator", "site": null, "checkOut": "2025-03-20", "checkIn": "2025-04-01",
    "engineHrsPerDay": 0, "idleHrsPerDay": 12, "operatingDays": 12, "operator": null,
    "utilizationPct": 0, "status": "Unknown",
    "anomalies": ["No site assigned", "No operator", "Zero engine runtime", "12 idle hrs/day"] }
]


Derived summary stats to compute and reuse across panels:

Total assets: 7 · Active: 2 · Idle: 3 · Unknown/Unassigned: 2

Fleet avg utilization: mean of utilizationPct

Flagged anomalies: EQX1002, EQX1007, EQX1005 (3 of 7 — used in Anomalies page and dashboard insight card)

Default forecast (hardcoded):

{ "site": "S003", "predictedNeed": "Excavator", "window": "Next week", "confidence": "High" }


4. Pages (same shell, swap panel content per page)

4.1 Dashboard (home)

Top-left panel: Live Site Map — pin per asset, color-coded by status (green active, yellow idle, gray unknown). Floating InsightCard overlay: "Reassign EQX1007 → Site S003 — high demand predicted, unassigned excavator idle 12 hrs/day."

Top-right panel: Asset Detail — selected asset's type/image placeholder, key stats (engine hrs, idle hrs, utilization %), mini usage table.

Bottom-left panel: Equipment List (Table) — checkbox, type icon, ID, site, status pill, operator, 3-dot menu.

Bottom-right panel: Rental Timeline (Gantt) — one bar per asset from checkOut to checkIn, today marker, overdue bars in red.

4.2 Check-In / Check-Out

Left panel: Check-out/check-in form — asset ID lookup (simulated QR/RFID input field), action buttons.

Right panel: Assign form — site dropdown, operator dropdown, location note.

Bottom panel: Recent activity Table with explicit columns Who / What / Where / When (per design principle: every status change must answer these four).

4.3 Usage Logging

Left panel: bar/line chart — engine hrs vs idle hrs per asset.

Right panel: per-site summary Table — utilization %, total engine hrs, total idle hrs.

Bottom panel: raw usage log Table, filterable by site/type/status.

4.4 Alerts

Single full-width Table panel — one row per alert. Status pill = alert type (Overdue, Low Utilization, Unassigned). Sort by severity.

Small map panel (optional) showing only flagged assets.

4.5 Forecasting

Left panel: demand chart — predicted equipment need by site/time.

Right panel: InsightCard list — recommendation text + confidence + action button ("Pre-position Excavator → S003").

Bottom panel: ranked Table of all forecast signals.

4.6 Anomaly Detection

Full-width Table panel — asset ID, anomaly type, rule triggered, detected value, 3-dot menu.

Click a row → side drawer showing the exact rule/threshold that fired (keep detection transparent, per design principle).

5. Feature Checklist (must all work against the default data above)

[ ] Asset dashboard with live status (from status field)

[ ] Check-in/check-out flow that updates an asset's status and logs a Who/What/Where/When entry

[ ] Usage metrics + per-site summary

[ ] Overdue alert (derive from checkIn date vs today)

[ ] At least one forecast shown with reasoning (predictedNeed object above)

[ ] At least one anomaly shown with the exact rule that triggered it (use EQX1002/EQX1007/EQX1005 anomaly arrays)

[ ] Every recommendation card shows the data signal behind it, not just a verdict

6. Build Constraints

Keep code simple: one Panel component, one Table component, reused everywhere — do not build a separate component per page.

No backend, no auth, no real API calls — everything reads from the hardcoded dataset above (in-memory state, editable via check-in/out actions).

No unnecessary utility abstractions, wrapper configs, or extra libraries beyond what's needed for charts/maps.

Prioritize matching the visual language of the reference screenshot (panel style, table row style, color accents, floating insight card) over adding extra pages or features not listed above.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/824c9579-9a8d-4af2-a7a4-c789c7647955).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
