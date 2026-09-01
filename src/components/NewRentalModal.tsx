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
  const [startDate, setStartDate] = useState("2025-05-15");
  const [endDate, setEndDate] = useState("2025-06-14");
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showAgreementDoc, setShowAgreementDoc] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successContract, setSuccessContract] = useState<any>(null);

  if (!isOpen) return null;

  const monthlyRate = asset.monthlyRentalRate;
  const depositRatio = asset.securityDepositRatio;
  const securityDeposit = Math.round(monthlyRate * depositRatio);
  const totalPayable = monthlyRate + securityDeposit;

  const handleBookRental = () => {
    if (!agreementChecked) return;
    setSubmitting(true);

    const contract = createRentalContract({
      equipmentId: asset.id,
      siteId,
      operatorId: operatorId || null,
      startDate,
      endDate,
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
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Rental Paid:</span>
                <strong className="text-foreground">₹{monthlyRate.toLocaleString("en-IN")}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Refundable Security Deposit:</span>
                <strong className="text-ok">₹{securityDeposit.toLocaleString("en-IN")} (Held in Escrow)</strong>
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

            {/* Financial Breakdown (Requirement #8: Clear distinction between Rent vs Deposit) */}
            <div className="mt-5 rounded-2xl border border-border/70 bg-card p-4 space-y-2 text-[12.5px]">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Pricing &amp; Security Deposit Breakdown
              </h4>

              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Monthly Base Rental Rate:</span>
                <strong className="text-foreground tabular-nums">₹{monthlyRate.toLocaleString("en-IN")}</strong>
              </div>

              <div className="flex justify-between py-1 border-b border-border/40">
                <div>
                  <span className="text-foreground font-semibold">Refundable Security Deposit:</span>
                  <span className="ml-2 rounded-full bg-ok/15 px-2 py-0.2 text-[10px] font-bold text-ok">
                    REFUNDABLE
                  </span>
                  <p className="text-[10.5px] text-muted-foreground">
                    Held in security escrow during rental duration. 100% refunded post-inspection.
                  </p>
                </div>
                <strong className="text-ok tabular-nums">₹{securityDeposit.toLocaleString("en-IN")}</strong>
              </div>

              <div className="flex justify-between pt-2 text-[14px]">
                <span className="font-bold text-foreground">Total Initial Payable Today:</span>
                <strong className="font-black text-foreground tabular-nums">
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
                  <p><strong>1. Deposit Terms:</strong> Security deposit is held as refundable guarantee against major damages or gross negligence.</p>
                  <p><strong>2. Fuel & Maintenance:</strong> Return machine with nominal fuel level matching pre-inspection reading.</p>
                  <p><strong>3. Inspection Verification:</strong> Pre-checkout condition and check-in inspection reports govern final deposit release within 48h.</p>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <button
              onClick={handleBookRental}
              disabled={!agreementChecked || submitting}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-95 disabled:opacity-50 transition-all active:scale-[0.99]"
            >
              {submitting ? "Processing Payment & Agreement..." : `Pay ₹${totalPayable.toLocaleString("en-IN")} & Execute Rental`}
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
