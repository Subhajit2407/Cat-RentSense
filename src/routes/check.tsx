import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ScanLine,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Sparkles,
  Building2,
  User,
  Clock,
  ShieldCheck,
  Camera,
  DollarSign,
  RotateCcw,
  FileCheck,
  PlusCircle,
  Truck,
} from "lucide-react";
import { Shell } from "@/components/Shell";
import { Panel } from "@/components/Panel";
import { Table, StatusPill } from "@/components/Table";
import { EquipmentHero } from "@/components/EquipmentHero";
import { CameraQRScanner } from "@/components/CameraQRScanner";
import { RegisterMachineModal } from "@/components/RegisterMachineModal";
import { DeployMachineModal } from "@/components/DeployMachineModal";
import { InspectionComparisonModal } from "@/components/InspectionComparisonModal";
import {
  useFleet,
  approveCheckOut,
  approveCheckIn,
  recordAdHocReturn,
  clearCheckActionHint,
  SITES,
  OPERATORS,
  SITES_META,
  type AssetCondition,
  type Asset,
  type InspectionRecord,
  type RentalContract,
} from "@/data/fleet";

export const Route = createFileRoute("/check")({
  head: () => ({
    meta: [
      { title: "Equipment Check-In / Check-Out — RentSense" },
      {
        name: "description",
        content: "Optical QR scanning, 9-point condition inspection, customer verification, and dispatch approval.",
      },
    ],
  }),
  component: CheckPage,
});

function CheckPage() {
  const { assets, contracts, currentUser, checkActionHint } = useFleet();
  // If we were navigated here from an alert's "Take Action" (see routes/alerts.tsx),
  // checkActionHint tells us which asset/mode to open straight into instead of the
  // generic EQX1007 default — read once on mount, then cleared below.
  const [assetId, setAssetId] = useState(() => checkActionHint?.assetId ?? "EQX1007");
  const [mode, setMode] = useState<"checkout" | "checkin">(() => checkActionHint?.mode ?? "checkout");
  const [showCameraScanner, setShowCameraScanner] = useState(false);
  const [showRegisterMachine, setShowRegisterMachine] = useState(false);
  const [showDeployMachine, setShowDeployMachine] = useState(false);
  const [checkinError, setCheckinError] = useState("");
  const [submittingCheckin, setSubmittingCheckin] = useState(false);

  useEffect(() => {
    if (checkActionHint) clearCheckActionHint();
    // Only ever consume the hint once, right after mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 9-point inspection state
  const [engineCond, setEngineCond] = useState<AssetCondition>("Good");
  const [hydraulicsCond, setHydraulicsCond] = useState<AssetCondition>("Good");
  const [bodyCond, setBodyCond] = useState<AssetCondition>("Good");
  const [tracksCond, setTracksCond] = useState<AssetCondition>("Good");
  const [cabinCond, setCabinCond] = useState<AssetCondition>("Good");
  const [lightsCond, setLightsCond] = useState<AssetCondition>("Good");
  const [safetyCond, setSafetyCond] = useState<AssetCondition>("Good");
  const [fuelLevel, setFuelLevel] = useState<number>(95);
  const [hourMeter, setHourMeter] = useState<number>(1240);
  const [inspectionNotes, setInspectionNotes] = useState("");

  const [targetSite, setTargetSite] = useState("S003");
  const [targetOperator, setTargetOperator] = useState("OP101");
  const [selectedContractId, setSelectedContractId] = useState<string>("");
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(() => (checkActionHint ? 2 : 1));
  const [completedMsg, setCompletedMsg] = useState("");
  const [inspectComparisonContract, setInspectComparisonContract] = useState<RentalContract | null>(null);

  const foundAsset = (assets.find((a) => a.id === assetId) || assets[0])!;
  const activeContract = contracts.find(
    (c) => c.equipmentId === assetId && (c.rentalStatus === "Active Rental" || c.rentalStatus === "Pending Checkout" || c.rentalStatus === "Return Requested"),
  );

  const handleQRScanSuccess = (scannedId: string) => {
    setAssetId(scannedId);
    setShowCameraScanner(false);
    setActiveStep(2);
  };

  const handleExecuteCheckout = () => {
    const inspection: InspectionRecord = {
      id: `insp-pre-${Date.now()}`,
      contractId: activeContract?.id ?? `cnt-adhoc-${Date.now()}`,
      equipmentId: foundAsset.id,
      type: "pre_checkout",
      inspectorName: currentUser.name,
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      engine: engineCond,
      hydraulics: hydraulicsCond,
      body: bodyCond,
      tracksTires: tracksCond,
      cabin: cabinCond,
      lights: lightsCond,
      safety: safetyCond,
      fuelPct: fuelLevel,
      hourMeter,
      notes: inspectionNotes || "Pre-rental dispatch checklist completed. Nominal condition.",
    };

    if (activeContract) {
      approveCheckOut(activeContract.id, inspection);
      setCompletedMsg(`Check-Out Approved! ${foundAsset.id} dispatched under Contract #${activeContract.contractNumber}.`);
    } else {
      setCompletedMsg(`Pre-inspection recorded for ${foundAsset.id}. Ready for assignment.`);
    }
    setActiveStep(4);
  };

  const handleExecuteCheckin = async () => {
    const inspection: InspectionRecord = {
      id: `insp-post-${Date.now()}`,
      contractId: activeContract?.id ?? `cnt-adhoc-${Date.now()}`,
      equipmentId: foundAsset.id,
      type: "post_checkin",
      inspectorName: currentUser.name,
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      engine: engineCond,
      hydraulics: hydraulicsCond,
      body: bodyCond,
      tracksTires: tracksCond,
      cabin: cabinCond,
      lights: lightsCond,
      safety: safetyCond,
      fuelPct: fuelLevel,
      hourMeter,
      notes: inspectionNotes || "Post-rental return inspection completed.",
    };

    setCheckinError("");

    if (activeContract) {
      approveCheckIn(activeContract.id, inspection);
      setInspectComparisonContract(activeContract);
      setCompletedMsg(`Check-In Completed! ${foundAsset.id} received. Ready for deposit refund review.`);
      setActiveStep(4);
      return;
    }

    // No rental contract behind this asset (e.g. equipment dispatched or
    // flagged without a formal booking) — still record the real return so
    // status/site/operator actually clear and any Overdue/Unassigned alert
    // on it resolves, instead of silently doing nothing to the asset.
    setSubmittingCheckin(true);
    const result = await recordAdHocReturn(foundAsset.id, inspection);
    setSubmittingCheckin(false);

    if (!result.ok) {
      setCheckinError(result.error ?? "Could not record this return. Please try again.");
      return;
    }

    setCompletedMsg(`Check-In recorded for ${foundAsset.id}. Returned to Central Holding Depot — status cleared.`);
    setActiveStep(4);
  };

  const resetForm = () => {
    setActiveStep(1);
    setCompletedMsg("");
    setInspectionNotes("");
  };

  return (
    <Shell crumb="Check-In / Out Operations">
      <div className="space-y-5">
        {/* Step Progression Ribbon */}
        <div className="flex items-center justify-between rounded-[24px] border border-border/70 bg-white p-4 shadow-panel">
          {[
            { num: 1, title: "1. Scan QR / RFID" },
            { num: 2, title: "2. Verify Customer & Payment" },
            { num: 3, title: "3. 9-Point Condition Inspection" },
            { num: 4, title: "4. Gate Pass Authorization" },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => s.num <= activeStep && setActiveStep(s.num as any)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all ${
                activeStep === s.num
                  ? "bg-accent text-accent-foreground font-bold shadow-xs"
                  : activeStep > s.num
                    ? "text-ok font-semibold"
                    : "text-muted-foreground opacity-60"
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-current text-[10px] text-background font-bold">
                {activeStep > s.num ? "✓" : s.num}
              </span>
              <span className="text-[12.5px] hidden sm:inline">{s.title}</span>
            </div>
          ))}
        </div>

        {/* Camera Modal if open */}
        {showCameraScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-lg">
              <CameraQRScanner
                onScan={handleQRScanSuccess}
                onClose={() => setShowCameraScanner(false)}
              />
            </div>
          </div>
        )}

        {/* Main 2-Column Operational Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 7 Columns: Step-by-Step Forms */}
          <div className="lg:col-span-7">
            <Panel
              title={mode === "checkout" ? "Equipment Check-Out & Dispatch" : "Equipment Return & Check-In"}
              subtitle="Verified gate dispatch with real camera QR scanning and multi-point inspection"
            >
              <div className="p-6 space-y-5 text-[13px]">
                {/* Mode Selector */}
                <div className="flex rounded-full bg-muted/60 p-1 border border-border/60">
                  <button
                    onClick={() => {
                      setMode("checkout");
                      setActiveStep(1);
                    }}
                    className={`flex-1 rounded-full py-2 text-[12.5px] font-bold transition-all ${
                      mode === "checkout" ? "bg-accent text-accent-foreground shadow-xs" : "text-muted-foreground"
                    }`}
                  >
                    Check-Out Dispatch
                  </button>
                  <button
                    onClick={() => {
                      setMode("checkin");
                      setActiveStep(1);
                    }}
                    className={`flex-1 rounded-full py-2 text-[12.5px] font-bold transition-all ${
                      mode === "checkin" ? "bg-foreground text-background shadow-xs" : "text-muted-foreground"
                    }`}
                  >
                    Return Check-In
                  </button>
                </div>

                {/* STEP 1: SCAN QR / RFID */}
                {activeStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Scan Machine QR Tag
                      </label>
                      <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted/20 p-3">
                        <ScanLine size={18} className="text-muted-foreground ml-2" />
                        <input
                          value={assetId}
                          onChange={(e) => setAssetId(e.target.value.toUpperCase())}
                          placeholder="Type or scan asset ID (e.g. EQX1007)..."
                          className="w-full bg-transparent text-[13.5px] font-bold text-foreground outline-none"
                        />
                        <button
                          onClick={() => setShowCameraScanner(true)}
                          className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95"
                        >
                          <Camera size={14} /> Open Live Camera
                        </button>
                      </div>
                    </div>

                    {/* Quick Asset Chips */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
                          Or Quick Select from Fleet:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setShowDeployMachine(true)}
                            className="flex items-center gap-1 rounded-full border border-dashed border-border bg-muted/30 px-2.5 py-1 text-[11px] font-bold text-foreground hover:bg-muted"
                          >
                            <Truck size={12} /> Deploy / Reassign Machine
                          </button>
                          <button
                            onClick={() => setShowRegisterMachine(true)}
                            className="flex items-center gap-1 rounded-full border border-dashed border-brand/60 bg-brand/5 px-2.5 py-1 text-[11px] font-bold text-brand hover:bg-brand/10"
                          >
                            <PlusCircle size={12} /> Register New Machine
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {assets.map((a) => (
                          <button
                            key={a.id}
                            onClick={() => setAssetId(a.id)}
                            className={`rounded-full px-3 py-1 text-[11.5px] font-semibold border transition-all ${
                              assetId === a.id
                                ? "border-foreground bg-foreground text-background"
                                : "border-border/80 bg-white text-muted-foreground hover:border-foreground"
                            }`}
                          >
                            {a.id} ({a.type})
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveStep(2)}
                      className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-[13px] font-bold text-background shadow-xs hover:opacity-95"
                    >
                      Verify {foundAsset?.id} Contract &amp; Payment <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {/* STEP 2: VERIFY CUSTOMER, PAYMENT & DEPOSIT */}
                {activeStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="rounded-2xl border border-border/70 bg-card p-4 space-y-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Rental Pre-Flight Verification
                      </h4>

                      <div className="space-y-2 text-[12.5px]">
                        <div className="flex items-center justify-between py-1 border-b border-border/40">
                          <span className="text-muted-foreground">Customer Verification:</span>
                          <span className="text-ok font-bold flex items-center gap-1">
                            <CheckCircle2 size={13} /> Verified (Apex Infra Ltd.)
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-border/40">
                          <span className="text-muted-foreground">Rental Contract:</span>
                          <strong className="text-foreground">
                            {activeContract ? `#${activeContract.contractNumber}` : "Direct Dispatch"}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-border/40">
                          <span className="text-muted-foreground">Monthly Rental Payment:</span>
                          <span className="text-ok font-bold">
                            ₹{(activeContract?.monthlyRentalRate ?? foundAsset.monthlyRentalRate).toLocaleString("en-IN")} PAID
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-border/40">
                          <span className="text-muted-foreground">Refundable Security Deposit:</span>
                          <span className="text-ok font-bold">
                            ₹{(activeContract?.securityDepositAmount ?? Math.round(foundAsset.monthlyRentalRate * foundAsset.securityDepositRatio)).toLocaleString("en-IN")} HELD IN ESCROW
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-1">
                          <span className="text-muted-foreground">Agreement Acceptance:</span>
                          <strong className="text-ok">✓ Explicitly Signed by Customer</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveStep(1)}
                        className="flex-1 rounded-full border border-border px-4 py-2.5 text-[12.5px] font-semibold text-foreground hover:bg-muted"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setActiveStep(3)}
                        className="flex-[2] flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[12.5px] font-bold text-background hover:opacity-95"
                      >
                        Proceed to 9-Point Inspection <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: 9-POINT CONDITION INSPECTION */}
                {activeStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="rounded-2xl border border-border/70 bg-card p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {mode === "checkout" ? "Pre-Checkout 9-Point Checklist" : "Post-Return 9-Point Checklist"}
                        </h4>
                        <span className="text-[11px] text-muted-foreground font-medium">Inspector: {currentUser.name}</span>
                      </div>

                      {/* Checklist items grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          { label: "Engine & Ignition", val: engineCond, set: setEngineCond },
                          { label: "Hydraulics & Seals", val: hydraulicsCond, set: setHydraulicsCond },
                          { label: "Body Work & Chassis", val: bodyCond, set: setBodyCond },
                          { label: "Tracks / Tires", val: tracksCond, set: setTracksCond },
                          { label: "Cabin & Controls", val: cabinCond, set: setCabinCond },
                          { label: "Lights & Signals", val: lightsCond, set: setLightsCond },
                          { label: "Safety Equipment", val: safetyCond, set: setSafetyCond },
                        ].map((item, idx) => (
                          <div key={idx} className="rounded-xl border border-border/60 bg-muted/20 p-2.5 text-[11.5px]">
                            <span className="font-semibold text-foreground block mb-1">{item.label}</span>
                            <div className="flex gap-1">
                              {(["Good", "Needs Attention", "Damaged"] as const).map((c) => (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => item.set(c)}
                                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition-all ${
                                    item.val === c
                                      ? c === "Good"
                                        ? "bg-ok text-white font-bold"
                                        : c === "Needs Attention"
                                          ? "bg-warn text-warn-foreground font-bold"
                                          : "bg-danger text-white font-bold"
                                      : "bg-white text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  {c.slice(0, 4)}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Telemetry Sensor Inputs */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-[10.5px] font-semibold text-muted-foreground mb-1">
                            Fuel Level (% Tank)
                          </label>
                          <input
                            type="number"
                            value={fuelLevel}
                            onChange={(e) => setFuelLevel(Number(e.target.value))}
                            className="w-full rounded-xl border border-border bg-muted/20 px-3 py-1.5 font-bold text-foreground outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-semibold text-muted-foreground mb-1">
                            Hour Meter (hrs)
                          </label>
                          <input
                            type="number"
                            value={hourMeter}
                            onChange={(e) => setHourMeter(Number(e.target.value))}
                            className="w-full rounded-xl border border-border bg-muted/20 px-3 py-1.5 font-bold text-foreground outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-semibold text-muted-foreground mb-1">
                          Inspection Notes &amp; Observations
                        </label>
                        <input
                          value={inspectionNotes}
                          onChange={(e) => setInspectionNotes(e.target.value)}
                          placeholder="e.g. Minor cosmetic paint wear on right boom; all hydraulics tight..."
                          className="w-full rounded-xl border border-border px-3 py-2 text-[12px] text-foreground outline-none"
                        />
                      </div>
                    </div>

                    {checkinError && (
                      <div className="flex items-start gap-2 rounded-2xl border border-danger/40 bg-danger/5 p-3 text-[12px] font-semibold text-danger">
                        <AlertTriangle size={15} className="mt-0.5 shrink-0" />
                        <span>{checkinError}</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveStep(2)}
                        className="flex-1 rounded-full border border-border px-4 py-2.5 text-[12.5px] font-semibold text-foreground hover:bg-muted"
                      >
                        Back
                      </button>
                      <button
                        onClick={mode === "checkout" ? handleExecuteCheckout : handleExecuteCheckin}
                        disabled={submittingCheckin}
                        className="flex-[2] flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[12.5px] font-bold text-accent-foreground shadow-xs hover:opacity-95 disabled:opacity-50"
                      >
                        <CheckCircle2 size={15} />
                        {submittingCheckin
                          ? "Saving..."
                          : <>Confirm &amp; Sign {mode === "checkout" ? "Check-Out" : "Check-In"}</>}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: CONFIRMATION & GATE PASS */}
                {activeStep === 4 && (
                  <div className="space-y-4 animate-fade-in text-center py-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ok/15 text-ok">
                      <CheckCircle2 size={36} />
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-foreground">Operational Transaction Recorded</h4>
                      <p className="mt-1 text-[13px] text-muted-foreground font-medium">{completedMsg}</p>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 text-left text-[12.5px] space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Asset Tag:</span>
                        <strong className="text-foreground">{foundAsset.id} ({foundAsset.type})</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Inspector:</span>
                        <strong className="text-foreground">{currentUser.name}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Security Deposit Status:</span>
                        <strong className="text-ok">Secured in Escrow</strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={resetForm}
                        className="flex-1 rounded-full bg-foreground px-5 py-3 text-[13px] font-bold text-background hover:opacity-95"
                      >
                        Process Another Asset
                      </button>
                      <button
                        onClick={() => setShowDeployMachine(true)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-border px-5 py-3 text-[13px] font-bold text-foreground hover:bg-muted"
                      >
                        <Truck size={14} /> Deploy to New Location
                      </button>
                      {inspectComparisonContract && (
                        <button
                          onClick={() => setInspectComparisonContract(inspectComparisonContract)}
                          className="flex-1 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground hover:opacity-95"
                        >
                          Review Deposit Refund
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Panel>
          </div>

          {/* Right 5 Columns: 3D Asset Inspection Visual */}
          <div className="lg:col-span-5">
            <Panel title="Identified Asset &amp; QR Tag" subtitle="Real-time telemetric validation for gate dispatch">
              <div className="p-6 space-y-5">
                <div className="rounded-[24px] border border-border/60 bg-gradient-to-b from-slate-50/70 to-white p-5">
                  <EquipmentHero asset={foundAsset} showTelemetryHUD={true} />
                </div>

                <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-2 text-[12.5px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Serial Number:</span>
                    <strong className="text-foreground">{foundAsset.serialNumber}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">QR Code Tag:</span>
                    <code className="rounded bg-muted px-2 py-0.5 text-[11px] font-mono text-foreground font-bold">
                      {foundAsset.qrCodePayload}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Base Rate:</span>
                    <strong className="text-foreground">₹{foundAsset.monthlyRentalRate.toLocaleString("en-IN")} / mo</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Refundable Security Deposit:</span>
                    <strong className="text-ok">
                      ₹{Math.round(foundAsset.monthlyRentalRate * foundAsset.securityDepositRatio).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>

      {inspectComparisonContract && (
        <InspectionComparisonModal
          contract={inspectComparisonContract}
          isOpen={Boolean(inspectComparisonContract)}
          onClose={() => setInspectComparisonContract(null)}
        />
      )}

      <RegisterMachineModal
        isOpen={showRegisterMachine}
        onClose={() => setShowRegisterMachine(false)}
        onRegistered={(newAssetId) => {
          setAssetId(newAssetId);
          setActiveStep(2);
        }}
      />

      <DeployMachineModal
        isOpen={showDeployMachine}
        onClose={() => setShowDeployMachine(false)}
        initialAssetId={foundAsset?.id}
        onDeployed={(deployedAssetId) => {
          setAssetId(deployedAssetId);
        }}
      />
    </Shell>
  );
}
