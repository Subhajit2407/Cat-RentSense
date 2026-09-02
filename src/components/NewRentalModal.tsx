import { useState } from "react";
import { type Asset, SITES, OPERATORS, SITES_META, createRentalContract, useFleet } from "@/data/fleet";
import { EquipmentHero } from "@/components/EquipmentHero";
import {
  Sparkles,
  Calendar,
  Building2,
  User,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  X,
  FileText,
  AlertCircle,
  IndianRupee,
  Info,
} from "lucide-react";

export function NewRentalModal({
  asset,
  isOpen,
  onClose,
}: {
  asset: Asset;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { currentUser } = useFleet();
  const [siteId, setSiteId] = useState("S003");
  const [operatorId, setOperatorId] = useState<string>("OP101");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  );
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showAgreementDoc, setShowAgreementDoc] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successContract, setSuccessContract] = useState<any>(null);

  // ── Editable Rental Amount Fields ────────────────────────────────────────────
  // Pre-populated from the asset's stored base rate, but the rental team
  // can override both values to match the negotiated contract terms.
  const [monthlyRate, setMonthlyRate] = useState<number>(asset.monthlyRentalRate);
  const [securityDeposit, setSecurityDeposit] = useState<number>(
    Math.round(asset.monthlyRentalRate * asset.securityDepositRatio),
  );
  const totalPayable = monthlyRate + securityDeposit;

  if (!isOpen) return null;

  const handleBookRental = () => {
    if (!agreementChecked) return;
    if (monthlyRate <= 0 || securityDeposit < 0) return;
    setSubmitting(true);

    // Pass the explicitly entered rates — not asset defaults
    const contract = createRentalContract({
      equipmentId: asset.id,
      siteId,
      operatorId: operatorId || null,
      startDate,
      endDate,
      monthlyRentalRate: monthlyRate,
      securityDepositAmount: securityDeposit,
    });

    setTimeout(() => {
      setSubmitting(false);
      setSuccessContract(contract);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-border/80 bg-white p-7 shadow-float animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <X size={16} />
        </button>

        {successContract ? (
          /* Success Screen */
          <div className="py-6 text-center space-y-4 animate-fade-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ok/15 text-ok">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-ok">
                Rental Contract Executed
              </span>
              <h3 className="text-2xl font-bold text-foreground">
                Contract #{successContract.contractNumber} Active
              </h3>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Assigned to {currentUser.companyName} at Site {siteId} ({SITES_META[siteId]?.name}).
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 text-left text-[12.5px] space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Equipment:</span>
                <strong className="text-foreground">{asset.id} ({asset.type})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rental Window:</span>
                <strong className="text-foreground">{startDate} → {endDate}</strong>
              </div>
              <div className="flex justify-between border-t border-border/40 pt-2 mt-1">
                <span className="text-muted-foreground">Monthly Rental:</span>
                <strong className="text-foreground">₹{monthlyRate.toLocaleString("en-IN")} / mo</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Refundable Security Deposit:</span>
                <strong className="text-ok">₹{securityDeposit.toLocaleString("en-IN")} (Held in Escrow)</strong>
              </div>
              <div className="flex justify-between border-t border-border/40 pt-2 mt-1 text-[13px]">
                <span className="font-bold text-foreground">Total Paid Today:</span>
                <strong className="font-black text-foreground">₹{totalPayable.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full rounded-full bg-foreground px-5 py-3 text-[13px] font-bold text-background hover:opacity-95"
            >
              View in Customer Portal
            </button>
          </div>
        ) : (
          /* Rental Form */
          <div>
            {/* Header */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                New Equipment Rental Booking
              </span>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Rent {asset.id} — {asset.type}
              </h3>
              <p className="text-[12.5px] text-muted-foreground mt-0.5">
                Book for {currentUser.companyName} ({currentUser.name})
              </p>
            </div>

            {/* 3D Equipment Hero Visual */}
            <div className="mt-4 rounded-2xl border border-border/60 bg-gradient-to-b from-slate-50/70 to-white p-4">
              <EquipmentHero asset={asset} compact={true} showTelemetryHUD={false} />
            </div>

            {/* Configuration Parameters */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[13px]">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Destination Site
                </label>
                <select
                  value={siteId}
                  onChange={(e) => setSiteId(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-semibold text-foreground outline-none"
                >
                  {SITES.map((s) => (
                    <option key={s} value={s}>
                      Site {s} — {SITES_META[s]?.name ?? s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Dedicated Certified Operator
                </label>
                <select
                  value={operatorId}
                  onChange={(e) => setOperatorId(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-semibold text-foreground outline-none"
                >
                  {OPERATORS.map((o) => (
                    <option key={o} value={o}>
                      Operator {o} (Level 2 Certified)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Rental Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-medium text-foreground outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Rental Return Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-medium text-foreground outline-none"
                />
              </div>
            </div>

            {/* ── Editable Financial Breakdown ─────────────────────────────────────
              * Rental amount is NOT hard-coded. Rental team enters the agreed rate.
              * Security deposit is kept SEPARATE from rental revenue (not combined).
              * ─────────────────────────────────────────────────────────────────── */}
            <div className="mt-5 rounded-2xl border border-border/70 bg-card p-4 space-y-3 text-[12.5px]">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Pricing & Security Deposit
                </h4>
                <span className="flex items-center gap-1 text-[10.5px] text-muted-foreground font-medium">
                  <Info size={11} />
                  Edit to match agreed contract terms
                </span>
              </div>

              {/* Monthly Rental Rate — editable */}
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold text-foreground">Monthly Rental Rate</span>
                    <p className="text-[10.5px] text-muted-foreground mt-0.5">
                      Operating revenue — machine hire fee for contract duration
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-1.5 shadow-2xs">
                    <span className="text-[12px] font-bold text-muted-foreground">₹</span>
                    <input
                      type="number"
                      value={monthlyRate}
                      onChange={(e) => setMonthlyRate(Math.max(0, Number(e.target.value)))}
                      min={0}
                      step={1000}
                      className="w-28 text-right font-black text-foreground text-[14px] outline-none bg-transparent tabular-nums"
                    />
                    <span className="text-[10px] text-muted-foreground font-medium">/mo</span>
                  </div>
                </div>
              </div>

              {/* Security Deposit — editable, clearly NOT revenue */}
              <div className="rounded-xl border border-ok/30 bg-ok/5 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-foreground">Refundable Security Deposit</span>
                      <span className="rounded-full bg-ok/15 px-2 py-0.5 text-[9.5px] font-bold text-ok">
                        REFUNDABLE
                      </span>
                    </div>
                    <p className="text-[10.5px] text-muted-foreground mt-0.5">
                      Held in escrow — NOT rental revenue. Returned post-inspection.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl border border-ok/40 bg-white px-3 py-1.5 shadow-2xs">
                    <span className="text-[12px] font-bold text-ok">₹</span>
                    <input
                      type="number"
                      value={securityDeposit}
                      onChange={(e) => setSecurityDeposit(Math.max(0, Number(e.target.value)))}
                      min={0}
                      step={1000}
                      className="w-28 text-right font-black text-ok text-[14px] outline-none bg-transparent tabular-nums"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Default: {Math.round(asset.monthlyRentalRate * asset.securityDepositRatio * 100 / asset.monthlyRentalRate)}% of base rate
                  (₹{Math.round(asset.monthlyRentalRate * asset.securityDepositRatio).toLocaleString("en-IN")}).
                  Adjust per negotiated terms.
                </p>
              </div>

              {/* Total Payable — read-only computed from above */}
              <div className="flex justify-between items-center pt-2 border-t border-border/60 text-[14px]">
                <div>
                  <span className="font-bold text-foreground">Total Payable Today</span>
                  <p className="text-[10.5px] text-muted-foreground">Rental + Escrow Deposit (split on receipt)</p>
                </div>
                <strong className="font-black text-foreground tabular-nums text-[18px]">
                  ₹{totalPayable.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            {/* Rental Agreement Acceptance Checkbox */}
            <div className="mt-4 rounded-2xl border border-border/60 bg-muted/20 p-3.5 text-[12px] space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreementChecked}
                  onChange={(e) => setAgreementChecked(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border accent-foreground cursor-pointer"
                />
                <span className="text-foreground leading-relaxed">
                  I explicitly agree to the Master Equipment Rental Agreement, operator safety regulations, and the{" "}
                  <strong>Refundable Security Deposit Policy</strong>.
                </span>
              </label>

              <button
                type="button"
                onClick={() => setShowAgreementDoc(!showAgreementDoc)}
                className="text-[11px] font-bold text-brand hover:underline flex items-center gap-1"
              >
                <FileText size={12} /> {showAgreementDoc ? "Hide" : "Review"} Full Agreement Terms
              </button>

              {showAgreementDoc && (
                <div className="rounded-xl bg-white p-3 border border-border text-[11px] text-muted-foreground max-h-32 overflow-y-auto space-y-1 animate-fade-in">
                  <p><strong>1. Deposit Terms:</strong> Security deposit is held as refundable guarantee against major damages or gross negligence. It is NOT rental revenue and is returned within 48 hours of approved post-return inspection.</p>
                  <p><strong>2. Fuel & Maintenance:</strong> Return machine with nominal fuel level matching pre-inspection reading.</p>
                  <p><strong>3. Inspection Verification:</strong> Pre-checkout condition and check-in inspection reports govern final deposit release.</p>
                  <p><strong>4. Damage Deductions:</strong> Any approved deductions from the security deposit require supervisor sign-off with photographic evidence.</p>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <button
              onClick={handleBookRental}
              disabled={!agreementChecked || submitting || monthlyRate <= 0}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-95 disabled:opacity-50 transition-all active:scale-[0.99]"
            >
              {submitting
                ? "Processing Payment & Agreement..."
                : `Pay ₹${totalPayable.toLocaleString("en-IN")} & Execute Rental`}
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
