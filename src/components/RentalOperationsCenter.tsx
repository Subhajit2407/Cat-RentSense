import { useState } from "react";
import { useFleet } from "@/data/fleet";
import { ApprovalCenter } from "@/components/ApprovalCenter";
import { DepositManager } from "@/components/DepositManager";
import { Table, StatusPill } from "@/components/Table";
import {
  Truck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  DollarSign,
  FileCheck,
  ShieldCheck,
  History,
  TrendingUp,
} from "lucide-react";

export function RentalOperationsCenter() {
  const { contracts, auditLogs, assets } = useFleet();
  const [activeTab, setActiveTab] = useState<"approvals" | "deposits" | "contracts" | "audit">("approvals");

  const activeRentalsCount = contracts.filter((c) => c.rentalStatus === "Active Rental").length;
  const pendingCheckoutCount = contracts.filter((c) => c.rentalStatus === "Pending Checkout").length;
  const returnRequestsCount = contracts.filter((c) => c.rentalStatus === "Return Requested").length;
  const overdueCount = assets.filter((a) => a.status === "Overdue").length;
  const totalDepositsHeld = contracts
    .filter((c) => c.depositStatus === "Held")
    .reduce((s, c) => s + c.securityDepositAmount, 0);
  const totalRefundsPending = contracts
    .filter((c) => c.depositStatus === "Refund Pending")
    .reduce((s, c) => s + c.refundAmount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Top Executive KPI Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="rounded-[24px] border border-border/70 bg-white p-4 shadow-panel">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block">
            Active Rentals
          </span>
          <p className="text-2xl font-black text-foreground mt-1 tabular-nums">{activeRentalsCount}</p>
          <span className="text-[10.5px] text-ok font-medium mt-0.5 block">Live contracts</span>
        </div>

        <div className="rounded-[24px] border border-border/70 bg-white p-4 shadow-panel">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block">
            Check-Out Today
          </span>
          <p className="text-2xl font-black text-brand mt-1 tabular-nums">{pendingCheckoutCount}</p>
          <span className="text-[10.5px] text-muted-foreground font-medium mt-0.5 block">Pending gate pass</span>
        </div>

        <div className="rounded-[24px] border border-border/70 bg-white p-4 shadow-panel">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block">
            Returns Today
          </span>
          <p className="text-2xl font-black text-foreground mt-1 tabular-nums">{returnRequestsCount}</p>
          <span className="text-[10.5px] text-muted-foreground font-medium mt-0.5 block">Inspection pending</span>
        </div>

        <div className="rounded-[24px] border border-border/70 bg-white p-4 shadow-panel">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block">
            Overdue Returns
          </span>
          <p className="text-2xl font-black text-danger mt-1 tabular-nums">{overdueCount}</p>
          <span className="text-[10.5px] text-danger font-medium mt-0.5 block">Standby lease fee</span>
        </div>

        <div className="rounded-[24px] border border-border/70 bg-white p-4 shadow-panel">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block">
            Deposits Held
          </span>
          <p className="text-2xl font-black text-ok mt-1 tabular-nums">
            ₹{(totalDepositsHeld / 100000).toFixed(1)}L
          </p>
          <span className="text-[10.5px] text-ok font-medium mt-0.5 block">Secured in escrow</span>
        </div>

        <div className="rounded-[24px] border border-border/70 bg-white p-4 shadow-panel">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block">
            Refunds Pending
          </span>
          <p className="text-2xl font-black text-warn mt-1 tabular-nums">
            ₹{(totalRefundsPending / 100000).toFixed(1)}L
          </p>
          <span className="text-[10.5px] text-warn font-medium mt-0.5 block">Awaiting sign-off</span>
        </div>
      </div>

      {/* ── Sub-Navigation Tabs ── */}
      <div className="flex items-center gap-1.5 border-b border-border/60 pb-2 overflow-x-auto text-[13px]">
        {[
          { id: "approvals" as const, label: "Operational Approval Queue" },
          { id: "deposits" as const, label: "Deposit Management & Escrow" },
          { id: "contracts" as const, label: `All Active Contracts (${contracts.length})` },
          { id: "audit" as const, label: "Auditable Activity Trail" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`rounded-full px-4 py-2 font-bold transition-all ${
              activeTab === t.id
                ? "bg-foreground text-background shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content Panes */}
      {activeTab === "approvals" && <ApprovalCenter />}
      {activeTab === "deposits" && <DepositManager />}

      {/* ALL CONTRACTS TAB */}
      {activeTab === "contracts" && (
        <div className="rounded-[28px] border border-border/70 bg-white overflow-hidden shadow-panel">
          <Table
            selectable={false}
            columns={[
              { key: "contract", label: "Contract #" },
              { key: "asset", label: "Equipment" },
              { key: "customer", label: "Customer Company" },
              { key: "site", label: "Site" },
              { key: "status", label: "Rental Status" },
              { key: "rent", label: "Monthly Rent", align: "right" },
              { key: "deposit", label: "Deposit (Held)", align: "right" },
            ]}
            rows={contracts.map((c) => ({
              id: c.id,
              cells: {
                contract: <strong className="text-foreground">{c.contractNumber}</strong>,
                asset: `${c.equipmentId} (${c.equipmentType})`,
                customer: c.customerCompany,
                site: `Site ${c.siteId}`,
                status: <StatusPill status={c.rentalStatus === "Active Rental" ? "Active" : c.rentalStatus} />,
                rent: `₹${c.monthlyRentalRate.toLocaleString("en-IN")}`,
                deposit: <strong className="text-ok">₹{c.securityDepositAmount.toLocaleString("en-IN")}</strong>,
              },
            }))}
          />
        </div>
      )}

      {/* AUDIT TRAIL TAB */}
      {activeTab === "audit" && (
        <div className="rounded-[28px] border border-border/70 bg-white p-6 shadow-panel space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div>
              <h3 className="text-base font-bold text-foreground">Immutable Audit Trail</h3>
              <p className="text-[12px] text-muted-foreground">Traceable operational log for compliance, check-in, dispatch, and deposit release</p>
            </div>
            <span className="text-[11px] font-semibold text-ok flex items-center gap-1">
              <ShieldCheck size={14} /> Tamper-Proof Event Ledger
            </span>
          </div>

          <div className="divide-y divide-border/40 text-[12.5px]">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{log.action}</span>
                    <span className="rounded-md bg-muted px-2 py-0.2 text-[10px] font-semibold text-muted-foreground">
                      {log.entityType}: {log.entityId}
                    </span>
                  </div>
                  <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">{log.details}</p>
                </div>
                <div className="text-right text-muted-foreground whitespace-nowrap text-[11.5px] tabular-nums">
                  <span className="font-semibold text-foreground block">{log.userName}</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
