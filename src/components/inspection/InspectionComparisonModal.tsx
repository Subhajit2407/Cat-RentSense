import { useState } from "react";
import { type RentalContract, approveDepositRefund, useFleet } from "@/data/fleet";
import { ShieldCheck, AlertTriangle, CheckCircle2, DollarSign, X, ArrowRight, Wrench } from "lucide-react";

export function InspectionComparisonModal({
  contract,
  isOpen,
  onClose,
}: {
  contract: RentalContract;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { currentUser } = useFleet();
  const [damageDeduction, setDamageDeduction] = useState(0);
  const [deductionReason, setDeductionReason] = useState("");
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const pre = contract.preInspection;
  const post = contract.postInspection;

  const refundableAmount = Math.max(0, contract.securityDepositAmount - damageDeduction);

  const checklistItems = [
    { label: "Engine Runtime & Health", pre: "Good", post: "Good", delta: "Normal Wear" },
    { label: "Hydraulics & Seals", pre: "Good", post: "Good", delta: "Nominal" },
    { label: "Body Work & Chassis", pre: pre?.body ?? "Good", post: post?.body ?? "Needs Attention", delta: post?.body === "Needs Attention" ? "New Minor Scratch" : "No Change" },
    { label: "Tracks / Tires Tread", pre: "Good", post: "Good", delta: "Nominal" },
    { label: "Cabin & Instrumentation", pre: "Good", post: "Good", delta: "Clean" },
    { label: "Lighting & Electricals", pre: "Good", post: "Good", delta: "Operational" },
    { label: "Safety Equipment", pre: "Good", post: "Good", delta: "Passed" },
  ];

  const handleApproveRefund = () => {
    approveDepositRefund(contract.id, damageDeduction, deductionReason, currentUser.name);
    setCompleted(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/25 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-border/80 bg-white p-7 shadow-float animate-scale-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <X size={16} />
        </button>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Side-by-Side Condition Inspection Audit
          </span>
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            {contract.equipmentId} ({contract.equipmentType}) — Contract #{contract.contractNumber}
          </h3>
          <p className="text-[12.5px] text-muted-foreground mt-0.5">
            Customer: {contract.customerCompany} · Site: {contract.siteId}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-5 rounded-2xl border border-border/70 overflow-hidden text-[12.5px]">
          <div className="grid grid-cols-12 bg-muted/40 px-4 py-2.5 font-bold text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/60">
            <span className="col-span-5">Inspection Point</span>
            <span className="col-span-2 text-center">Pre-Checkout</span>
            <span className="col-span-2 text-center">Post-Return</span>
            <span className="col-span-3 text-right">Variance</span>
          </div>

          <div className="divide-y divide-border/40">
            {checklistItems.map((item, i) => (
              <div key={i} className="grid grid-cols-12 px-4 py-2.5 items-center">
                <span className="col-span-5 font-semibold text-foreground">{item.label}</span>
                <span className="col-span-2 text-center text-ok font-medium">{item.pre}</span>
                <span className={`col-span-2 text-center font-medium ${item.post === "Good" ? "text-ok" : "text-warn font-bold"}`}>
                  {item.post}
                </span>
                <span className={`col-span-3 text-right font-medium ${item.delta.includes("New") ? "text-warn" : "text-muted-foreground"}`}>
                  {item.delta}
                </span>
              </div>
            ))}

            {/* Telemetry Variance */}
            <div className="grid grid-cols-12 px-4 py-2.5 items-center bg-muted/10">
              <span className="col-span-5 font-semibold text-foreground">Fuel Tank Level</span>
              <span className="col-span-2 text-center tabular-nums">{pre?.fuelPct ?? 95}%</span>
              <span className="col-span-2 text-center tabular-nums">{post?.fuelPct ?? 88}%</span>
              <span className="col-span-3 text-right text-muted-foreground">-7% consumed</span>
            </div>
            <div className="grid grid-cols-12 px-4 py-2.5 items-center bg-muted/10">
              <span className="col-span-5 font-semibold text-foreground">Hour Meter</span>
              <span className="col-span-2 text-center tabular-nums">{pre?.hourMeter ?? 1240}h</span>
              <span className="col-span-2 text-center tabular-nums">{post?.hourMeter ?? 1286}h</span>
              <span className="col-span-3 text-right text-ok font-bold">+46h billable</span>
            </div>
          </div>
        </div>

        {/* Deposit Refund Calculation & Authorized Deductions */}
        <div className="mt-5 rounded-2xl border border-border/70 bg-card p-4 space-y-3 text-[13px]">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Security Deposit Refund Authorization
          </h4>

          <div className="flex justify-between py-1 border-b border-border/40">
            <span className="text-muted-foreground">Original Security Deposit Held:</span>
            <strong className="text-foreground tabular-nums">₹{contract.securityDepositAmount.toLocaleString("en-IN")}</strong>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-border/40">
            <span className="text-warn font-semibold">Approved Damage / Wear Deduction:</span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">₹</span>
              <input
                type="number"
                value={damageDeduction}
                onChange={(e) => setDamageDeduction(Math.max(0, Number(e.target.value)))}
                className="w-24 rounded-lg border border-border bg-muted/30 px-2.5 py-1 text-right font-bold text-foreground outline-none"
              />
            </div>
          </div>

          {damageDeduction > 0 && (
            <div className="animate-fade-in">
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                Authorized Deduction Justification
              </label>
              <input
                value={deductionReason}
                onChange={(e) => setDeductionReason(e.target.value)}
                placeholder="e.g. Minor body scratch repair as noted in post-inspection..."
                className="w-full rounded-xl border border-border bg-muted/20 px-3 py-2 text-[12px] text-foreground outline-none"
              />
            </div>
          )}

          <div className="flex justify-between pt-2 text-[15px]">
            <span className="font-bold text-foreground">Final Net Refundable to Customer:</span>
            <strong className="font-black text-ok tabular-nums">
              ₹{refundableAmount.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        {/* Action Trigger */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-border px-4 py-2.5 text-[12.5px] font-semibold text-foreground hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={handleApproveRefund}
            disabled={completed}
            className="flex-[2] flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all"
          >
            {completed ? (
              <>
                <CheckCircle2 size={16} /> Refund Authorized &amp; Logged!
              </>
            ) : (
              <>
                <DollarSign size={16} /> Authorize ₹{refundableAmount.toLocaleString("en-IN")} Deposit Refund
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
