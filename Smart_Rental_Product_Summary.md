# RentSense — Heavy Equipment Operational OS & Control Tower

> **A next-generation Apple-inspired operating system and operational control tower for heavy-equipment rental, telematics tracking, escrowed security deposits, condition inspections, and fleet intelligence.**

---

## 1. Executive Summary

**RentSense** transforms heavy-machinery leasing from fragmented spreadsheets and static rental buttons into a **unified digital operating system**. It bridges transactional equipment leasing with real-time IoT telematics, AI-driven demand forecasting, optical QR code verification, 9-point physical condition inspections, and secured escrow deposit refunds.

---

## 2. Core Personas & Role-Based Access Control

The platform enforces clean, operationally streamlined role authorization:

```
                      ┌─────────────────────────────────────────┐
                      │            RENTSENSE PLATFORM           │
                      └────────────────────┬────────────────────┘
                                           │
         ┌─────────────────────────────────┴─────────────────────────────────┐
         │                                                                   │
         ▼                                                                   ▼
┌─────────────────────────────────┐               ┌─────────────────────────────────┐
│            CUSTOMER             │               │      RENTAL STAFF (ADMIN)       │
│   (e.g. Apex Infra Projects)    │               │    (Operations & Fleet Lead)    │
├─────────────────────────────────┤               ├─────────────────────────────────┤
│• User registration & login      │               │• Staff/Admin registration & auth│
│• Browse fleet (3D cutouts)      │               │• Real optical camera QR scanner │
│• Book equipment & select site   │               │• 9-point pre/post inspections   │
│• Review & accept rental terms   │               │• Assign operator & site dispatch│
│• Pay rent + refundable deposit  │               │• Side-by-side condition audits  │
│• Track live rental countdown    │               │• Deposit refund authorizations  │
│• One-click return requests      │               │• Manage approvals & overrides   │
└─────────────────────────────────┘               └─────────────────────────────────┘
```

1. **Customer (`customer`)**:
   - Registers with **Full Name**, **Email**, **Phone Number**, **Password**, and optional **Company**.
   - Accesses the **Customer Rental Portal**.
   - Browses available heavy equipment with 3D transparent cutout visuals.
   - Configures rental windows, selects destination construction sites, and chooses certified operators.
   - Explicitly signs Master Equipment Rental Agreements and pays via escrow.
   - Monitors live duty cycles, days remaining, and tracks refundable security deposits.
   - Initiates one-click equipment return requests.

2. **Rental Staff / Admin (`rental_staff`)**:
   - The **Rental Staff is the Admin** who takes complete charge of operations.
   - Accesses the **Fleet Control Tower**, **Rental Operations Center**, and **Approval Queue**.
   - Uses device camera for live optical QR scanning of machine asset tags.
   - Conducts rigorous 9-point pre-checkout and post-return condition inspections.
   - Verifies customer KYC status and authorizes physical gate dispatch.
   - Reviews side-by-side condition variances (checkout vs return).
   - Authorizes security deposit releases and approves damage/wear deductions with photo evidence.

---

## 3. End-to-End Rental Lifecycle

```
[CUSTOMER]                    [TRANSACTION]                  [RENTAL STAFF (ADMIN)]
Register / Login  ──────────►  Execute Contract ────────────► Live Camera QR Scan
(Name, Phone, Email)           (Rent + 80% Deposit)            (9-Point Pre-Inspection)
     │                              │                               │
     ▼                              ▼                               ▼
Browse & Select Site          Escrow Secured                  Gate Dispatch Pass
(3D Machine Cutouts)          (HDFC Escrow)                   (Live Telemetry Sync)
     │                              │                               │
     ▼                              ▼                               ▼
Return Request Initiated  ◄────────────────────────────────── Side-by-Side Audit
(Post-Milestone)                                              (Deposit Released)
```

1. **Registration & Auth**: Customer or Staff registers with Name, Email, Phone, and Password.
2. **Discovery & Selection**: Customer selects heavy machinery (e.g. `EQX1007` Excavator).
3. **Configuration**: Chooses project duration (e.g., 01 May → 30 May), site (`S003`), and certified operator (`OP101`).
4. **Transparent Financial Breakdown**: System calculates monthly hire rate + refundable escrow security deposit.
5. **Legal Execution**: Customer accepts legal terms, damage liabilities, and deposit refund policies.
6. **Payment & Escrow Lock**: Initial payment completed; rental payment credited to revenue, security deposit locked in escrow.
7. **QR Scan & Verification**: Rental Staff (Admin) scans machine QR tag via live camera stream at the yard gate.
8. **Pre-Rental 9-Point Inspection**: Staff inspects Engine, Hydraulics, Body, Tracks/Tires, Cabin, Lights, Safety, Fuel %, and Hour Meter.
9. **Gate Pass & Telemetry Sync**: Check-out approved; asset status updates to `Active Rental`, GPS and duty-cycle tracking begin on the Control Tower map and Gantt timeline.
10. **Return Request**: Customer triggers return via the portal upon project milestone completion.
11. **Post-Rental Inspection**: Staff scans machine upon depot arrival and completes post-return inspection.
12. **Side-by-Side Comparison Audit**: System compares checkout vs check-in condition, highlighting variances.
13. **Deposit Release & Re-Availability**: Staff/Admin authorizes refund (minus any approved deductions); asset returns to `Available / Idle` status.

---

## 4. Financial Architecture: Rent vs. Refundable Security Deposit

$$\text{Total Payable Today} = \text{Monthly Rental Rate} + \text{Refundable Security Deposit}$$

| Component | Example Value | Financial Classification | Purpose |
| :--- | :--- | :--- | :--- |
| **Monthly Rental Rate** | **₹50,000 / mo** | Operating Revenue | Machine hire fee for project duration. |
| **Security Deposit (80%)** | **₹40,000** | **Refundable Escrow Liability** | Held against abnormal damages, gross negligence, or unreturned equipment. **NOT REVENUE**. |
| **Total Initial Payment** | **₹90,000** | Gross Inflow | Split immediately into revenue account & escrow account. |

---

## 5. Hardware & Real Camera QR Scanning

- **Real Optical Camera Engine**: Uses browser `getUserMedia` and Canvas decoding (`jsQR`) to read physical equipment tags (`SMART-RENTAL-EQX1007` / `EQX1007`).
- **Interactive Viewfinder**: Live targeting reticle with animated laser scan line and camera permission handling.
- **Manual ID Fallback**: Instant input fallback for extreme weather or damaged physical QR plates.

---

## 6. 9-Point Condition Inspection Engine

Inspections are recorded in Supabase both **Pre-Checkout** and **Post-Return**:
1. Engine & Ignition Health
2. Hydraulics & Pressure Seals
3. Body Work & Chassis Integrity
4. Tracks / Tires Tread Depth
5. Cabin & Instrumentation
6. Lighting & Electrical Signals
7. Safety Systems & Emergency Cutoff
8. Fuel Tank Level (% Sensor)
9. Telemetric Hour Meter (Engine Runtime)

---

## 7. Fleet Control Tower & Spatial Canvas

- **Apple-Inspired Design Language**: Warm off-white canvas, glassmorphic acrylic blurs, multi-layered soft drop shadows, and luminous fluorescent/lime operational accents (`oklch(0.91 0.19 118)`).
- **3D Hero Machine Stage**: Heavy equipment rendered with transparent cutouts, soft ambient spotlights, and HUD telemetry chips.
- **Live Cartography (Leaflet Map)**: Spatial map displaying all sites (`S001`–`S006`), active machinery, pulsing demand coverage rings, and inter-site mobilization route lines.
- **Timeline Gantt Canvas**: Horizontal schedule showing active contracts, today marker line, and overdue warning stripes.

---

## 8. Usage, Alerts, Forecasting & Anomaly Detection

- **Usage Analytics (`/usage`)**: Duty cycle analytics, engine vs idle hours, underutilized asset optimization, and fleet leaderboard.
- **Alert Command Center (`/alerts`)**: Severity-ranked operational flags with 1-click action triggers.
- **Predictive Demand Forecasting (`/forecast`)**: 7/14/30-day site capacity vs demand gap calculations with pre-positioning cards.
- **Telemetry Anomaly Engine (`/anomalies`)**: Rule-based detection of abnormal duty cycles, unassigned yard idle, and overdue equipment.

---

## 9. Planning Canvas & AI Fleet Optimizer

- **Optimizer Center Mode**: Automated ROI copilot calculating revenue uplift, idle reduction, and fuel savings from fleet rebalancing.
- **Planning Workspace Mode**: Interactive 2-column transit planning canvas with route logistics and dispatch simulation.

---

## 10. Autonomous AI Fleet & Rental Copilot

- Natural language assistant accessible via `⌘K` Spotlight or header Copilot modal.
- Provides real-time answers for available equipment, escrow balances, overdue returns, and site deficits with 1-click executable actions.

---

## 11. Immutable Audit Trail

Every operational transaction (registrations, bookings, gate passes, inspections, refunds) is permanently logged in an immutable audit ledger with timestamp, user identity, entity reference, and full detail.
