import { useState } from "react";
import { useFleet, type RentalContract, approveCheckOut, approveCheckIn, type InspectionRecord } from "@/data/fleet";
import { InspectionComparisonModal } from "@/components/inspection/InspectionComparisonModal";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";

export function ApprovalCenter() {
  const { contracts, assets, currentUser } = useFleet();
  const [comparingContract, setComparingContract] = useState<RentalContract | null>(null);

  const pendingCheckouts = contracts.filter((c) => c.rentalStatus === "Pending Checkout");
  const returnRequests = contracts.filter((c) => c.rentalStatus === "Return Requested" || c.rentalStatus === "Checked In" || c.depositStatus === "Refund Pending");

  const handleQuickApproveCheckout = (contract: RentalContract) => {
    const dummyPreInspection: InspectionRecord = {
      id: `insp-pre-${Date.now()}`,
      contractId: contract.id,
      equipmentId: contract.equipmentId,
      type: "pre_checkout",
      inspectorName: currentUser.name,
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      engine: "Good",
      hydraulics: "Good",
      body: "Good",
      tracksTires: "Good",
      cabin: "Good",
      lights: "Good",
      safety: "Good",
      fuelPct: 95,
      hourMeter: 1240,
      notes: "Pre-rental dispatch checklist completed. Machine in nominal operating order.",
    };
    approveCheckOut(contract.id, dummyPreInspection);
  };

  const handleQuickApproveCheckin = (contract: RentalContract) => {
    const dummyPostInspection: InspectionRecord = {
      id: `insp-post-${Date.now()}`,
      contractId: contract.id,
      equipmentId: contract.equipmentId,
      type: "post_checkin",
      inspectorName: currentUser.name,
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      engine: "Good",
      hydraulics: "Good",
      body: "Good",
      tracksTires: "Good",
      cabin: "Good",
      lights: "Good",
      safety: "Good",
      fuelPct: 88,
      hourMeter: 1286,
      notes: "Post-rental checkin completed. Normal nominal duty wear.",
    };
    approveCheckIn(contract.id, dummyPostInspection);
  };

  return (
    <div className="space-y-6">
      {/* 1. Pending Check-Out Approvals */}
      <div>
        <div className="flex items-center justify-between pb-3">
          <div>
            <h3 className="text-base font-bold text-foreground">Pending Check-Out Approvals</h3>
            <p className="text-[12px] text-muted-foreground">Equipment bookings awaiting operational inspection and gate dispatch</p>
          </div>
          <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-accent-foreground">
            {pendingCheckouts.length} Pending
          </span>
        </div>

        {pendingCheckouts.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-6 text-center text-[13px] text-muted-foreground">
            No check-outs currently pending operational approval.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingCheckouts.map((c) => (
              <div
                key={c.id}
                className="rounded-[24px] border border-border/70 bg-card p-5 shadow-panel space-y-3 text-[12.5px]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
                      Contract #{c.contractNumber}
                    </span>
                    <h4 className="text-base font-bold text-foreground mt-0.5">
                      {c.equipmentId} ({c.equipmentType})
                    </h4>
                    <p className="text-[12px] text-muted-foreground">
                      {c.customerCompany} · Site {c.siteId}
                    </p>
                  </div>
                  <span className="rounded-full bg-ok/15 px-2.5 py-0.5 text-[11px] font-bold text-ok">
                    ₹{c.totalInitialPayable.toLocaleString("en-IN")} Paid
                  </span>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1 text-[11.5px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rental Window:</span>
                    <strong className="text-foreground">{c.startDate} → {c.endDate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Deposit (Held):</span>
                    <strong className="text-ok">₹{c.securityDepositAmount.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned Operator:</span>
                    <strong className="text-foreground">{c.operatorId ?? "Unassigned"}</strong>
                  </div>
                </div>

                <button
                  onClick={() => handleQuickApproveCheckout(c)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-[12.5px] font-bold text-accent-foreground shadow-xs hover:opacity-95 active:scale-95"
                >
                  <CheckCircle2 size={14} /> Approve Pre-Inspection &amp; Check-Out
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Return & Deposit Refund Approvals */}
      <div>
        <div className="flex items-center justify-between pb-3">
          <div>
            <h3 className="text-base font-bold text-foreground">Return &amp; Security Deposit Approvals</h3>
            <p className="text-[12px] text-muted-foreground">Returned assets requiring condition inspection review and deposit refund release</p>
          </div>
          <span className="rounded-full bg-ok/15 px-3 py-1 text-[11px] font-bold text-ok">
            {returnRequests.length} Pending Review
          </span>
        </div>

        {returnRequests.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-6 text-center text-[13px] text-muted-foreground">
            All return inspections and deposit refunds processed.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {returnRequests.map((c) => (
              <div
                key={c.id}
                className="rounded-[24px] border border-border/70 bg-card p-5 shadow-panel space-y-3 text-[12.5px]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
                      Return Contract #{c.contractNumber}
                    </span>
                    <h4 className="text-base font-bold text-foreground mt-0.5">
                      {c.equipmentId} ({c.equipmentType})
                    </h4>
                    <p className="text-[12px] text-muted-foreground">{c.customerCompany}</p>
                  </div>
                  <span className="rounded-full bg-warn/20 px-2.5 py-0.5 text-[11px] font-bold text-warn-foreground">
                    ₹{c.securityDepositAmount.toLocaleString("en-IN")} Refundable
                  </span>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1 text-[11.5px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rental Status:</span>
                    <strong className="text-foreground">{c.rentalStatus}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deposit Status:</span>
                    <strong className="text-warn">{c.depositStatus}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {c.rentalStatus === "Return Requested" ? (
                    <button
                      onClick={() => handleQuickApproveCheckin(c)}
                      className="flex-1 flex items-center justify-center gap-1 rounded-full bg-foreground px-4 py-2.5 text-[12px] font-bold text-background shadow-xs hover:opacity-95"
                    >
                      <RotateCcw size={13} /> Complete Check-In
                    </button>
                  ) : null}

                  <button
                    onClick={() => setComparingContract(c)}
                    className="flex-1 flex items-center justify-center gap-1 rounded-full bg-accent px-4 py-2.5 text-[12px] font-bold text-accent-foreground shadow-xs hover:opacity-95"
                  >
                    <FileCheck size={13} /> Audit Inspection &amp; Refund
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {comparingContract && (
        <InspectionComparisonModal
          contract={comparingContract}
          isOpen={Boolean(comparingContract)}
          onClose={() => setComparingContract(null)}
        />
      )}
    </div>
  );
}
