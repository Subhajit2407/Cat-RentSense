import { useState } from "react";
import { useFleet, type RentalContract, type DepositState } from "@/data/fleet";
import { InspectionComparisonModal } from "@/components/inspection/InspectionComparisonModal";
import { DollarSign, ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

export function DepositManager() {
  const { contracts } = useFleet();
  const [filter, setFilter] = useState<"All" | DepositState>("All");
  const [selectedContract, setSelectedContract] = useState<RentalContract | null>(null);

  const filteredContracts =
    filter === "All" ? contracts : contracts.filter((c) => c.depositStatus === filter);

  const totalHeld = contracts
    .filter((c) => c.depositStatus === "Held")
    .reduce((s, c) => s + c.securityDepositAmount, 0);

  const totalPendingRefund = contracts
    .filter((c) => c.depositStatus === "Refund Pending")
    .reduce((s, c) => s + c.refundAmount, 0);

  return (
    <div className="space-y-5">
      {/* Top Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[24px] border border-border/70 bg-white p-5 shadow-panel">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Total Deposits Held in Escrow
          </span>
          <p className="text-2xl font-black text-foreground mt-1 tabular-nums">
            ₹{totalHeld.toLocaleString("en-IN")}
          </p>
          <span className="text-[11px] text-ok mt-1 block">Active security collateral</span>
        </div>

        <div className="rounded-[24px] border border-border/70 bg-white p-5 shadow-panel">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Refunds Awaiting Sign-off
          </span>
          <p className="text-2xl font-black text-warn mt-1 tabular-nums">
            ₹{totalPendingRefund.toLocaleString("en-IN")}
          </p>
          <span className="text-[11px] text-muted-foreground mt-1 block">Pending post-inspection check</span>
        </div>

        <div className="rounded-[24px] border border-border/70 bg-white p-5 shadow-panel">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Deposit Policy
          </span>
          <p className="text-2xl font-black text-foreground mt-1 tabular-nums">80% Nominal</p>
          <span className="text-[11px] text-muted-foreground mt-1 block">Configurable liability ratio</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[12px]">
        {(["All", "Held", "Refund Pending", "Refunded", "Partially Deducted", "Disputed"] as const).map(
          (t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full px-3.5 py-1.5 font-bold transition-all ${
                filter === t
                  ? "bg-foreground text-background shadow-xs"
                  : "bg-muted/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ),
        )}
      </div>

      {/* Deposit Ledger Table */}
      <div className="rounded-[28px] border border-border/70 bg-white overflow-hidden shadow-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60">
              <tr>
                <th className="px-6 py-3">Equipment &amp; Contract</th>
                <th className="px-6 py-3">Customer Company</th>
                <th className="px-6 py-3 text-right">Deposit Held</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-right">Deduction</th>
                <th className="px-6 py-3 text-right">Net Refund</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredContracts.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3.5">
                    <span className="font-bold text-foreground block">{c.equipmentId} ({c.equipmentType})</span>
                    <span className="text-[11px] text-muted-foreground">Contract #{c.contractNumber}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="font-semibold text-foreground">{c.customerCompany}</span>
                    <span className="text-[11px] text-muted-foreground block">{c.customerName}</span>
                  </td>
                  <td className="px-6 py-3.5 text-right font-bold text-foreground tabular-nums">
                    ₹{c.securityDepositAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        c.depositStatus === "Held"
                          ? "bg-accent/40 text-accent-foreground"
                          : c.depositStatus === "Refund Pending"
                            ? "bg-warn/20 text-warn-foreground"
                            : c.depositStatus === "Refunded"
                              ? "bg-ok/15 text-ok"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {c.depositStatus}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right tabular-nums text-muted-foreground">
                    {c.damageDeduction > 0 ? `₹${c.damageDeduction.toLocaleString("en-IN")}` : "—"}
                  </td>
                  <td className="px-6 py-3.5 text-right font-bold text-ok tabular-nums">
                    ₹{c.refundAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedContract(c)}
                      className="rounded-full bg-muted/80 px-3 py-1 text-[11.5px] font-bold text-foreground hover:bg-foreground hover:text-background transition-colors"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedContract && (
        <InspectionComparisonModal
          contract={selectedContract}
          isOpen={Boolean(selectedContract)}
          onClose={() => setSelectedContract(null)}
        />
      )}
    </div>
  );
}
