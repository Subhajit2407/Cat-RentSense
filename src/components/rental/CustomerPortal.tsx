import { useState } from "react";
import { useFleet, type Asset, type RentalContract, requestReturn } from "@/data/fleet";
import { EquipmentHero } from "@/components/fleet/EquipmentHero";
import { NewRentalModal } from "@/components/rental/NewRentalModal";
import { StatusPill } from "@/components/common/Table";
import {
  Building2,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Plus,
  HelpCircle,
  Truck,
} from "lucide-react";

export function CustomerPortal() {
  const { assets, contracts, currentUser } = useFleet();
  const [activeTab, setActiveTab] = useState<"rentals" | "browse" | "deposits" | "agreements">("rentals");
  const [bookingAsset, setBookingAsset] = useState<Asset | null>(null);

  // User's contracts
  const myContracts = contracts.filter((c) => c.customerId === currentUser.id);
  const activeRentals = myContracts.filter((c) => c.rentalStatus === "Active Rental" || c.rentalStatus === "Pending Checkout" || c.rentalStatus === "Return Requested");

  const availableAssets = assets.filter((a) => a.status === "Unassigned" || a.status === "Idle");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Customer Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-border/70 bg-white p-6 shadow-panel">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background font-bold text-lg shadow-apple-sm">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-foreground">{currentUser.name}</h2>
              <span className="rounded-full bg-ok/15 px-2.5 py-0.5 text-[11px] font-bold text-ok flex items-center gap-1">
                <CheckCircle2 size={12} /> Verified Customer
              </span>
            </div>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              {currentUser.companyName} · Account ID: {currentUser.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("browse")}
            className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus size={15} /> Book Equipment
          </button>
        </div>
      </div>

      {/* Customer Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-border/60 pb-2 overflow-x-auto text-[13px]">
        {[
          { id: "rentals" as const, label: `My Active Rentals (${activeRentals.length})` },
          { id: "browse" as const, label: `Available Fleet (${availableAssets.length})` },
          { id: "deposits" as const, label: `Security Deposits & Escrow` },
          { id: "agreements" as const, label: "Rental Agreements & Invoices" },
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

      {/* TAB 1: ACTIVE RENTALS (Large Apple Equipment Cards) */}
      {activeTab === "rentals" && (
        <div className="space-y-4">
          {activeRentals.length === 0 ? (
            <div className="rounded-[28px] border border-border/70 bg-white p-12 text-center text-muted-foreground">
              <Truck size={40} className="mx-auto text-muted-foreground mb-3 opacity-60" />
              <h3 className="text-base font-bold text-foreground">No active rentals right now</h3>
              <p className="text-[13px] mt-1">Browse our heavy equipment fleet to book excavators, cranes, bulldozers or graders.</p>
              <button
                onClick={() => setActiveTab("browse")}
                className="mt-4 rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold text-accent-foreground shadow-xs"
              >
                Browse Available Fleet
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {activeRentals.map((contract) => {
                const asset = assets.find((a) => a.id === contract.equipmentId) || assets[0];
                if (!asset) return null;
                const isReturnPending = contract.rentalStatus === "Return Requested";

                return (
                  <div
                    key={contract.id}
                    className="flex flex-col justify-between rounded-[28px] border border-border/70 bg-card p-6 shadow-panel hover:shadow-widget transition-all"
                  >
                    <div>
                      {/* Top Header Card Info */}
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            {contract.equipmentType} · Contract #{contract.contractNumber}
                          </span>
                          <h3 className="text-2xl font-bold tracking-tight text-foreground mt-0.5">
                            {contract.equipmentId}
                          </h3>
                          <p className="text-[12.5px] text-muted-foreground mt-0.5">
                            Site {contract.siteId} · Operator {contract.operatorId ?? "Unassigned"}
                          </p>
                        </div>

                        <div className="text-right">
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                              isReturnPending
                                ? "bg-warn/20 text-warn-foreground"
                                : "bg-ok/15 text-ok"
                            }`}
                          >
                            {isReturnPending ? "Return Requested" : "Active Rental"}
                          </span>
                        </div>
                      </div>

                      {/* 3D Hero Machine Stage */}
                      <div className="mt-4 rounded-2xl border border-border/60 bg-gradient-to-b from-slate-50/70 to-white p-4">
                        <EquipmentHero asset={asset} compact={true} showTelemetryHUD={true} />
                      </div>

                      {/* Rental Contract Metadata */}
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-2xl border border-border/60 bg-muted/20 p-3.5 text-center text-[12px]">
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Period</span>
                          <strong className="text-foreground">{contract.startDate} → {contract.endDate}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Monthly Rate</span>
                          <strong className="text-foreground tabular-nums">₹{contract.monthlyRentalRate.toLocaleString("en-IN")}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Deposit (Held)</span>
                          <strong className="text-ok tabular-nums">₹{contract.securityDepositAmount.toLocaleString("en-IN")}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Condition</span>
                          <strong className="text-foreground">{asset.condition}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Action Strip */}
                    <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between gap-3">
                      <div className="text-[11.5px] text-muted-foreground">
                        Deposit 100% refundable post-inspection
                      </div>

                      {isReturnPending ? (
                        <span className="text-[12px] font-semibold text-warn flex items-center gap-1">
                          <Clock size={13} /> Return scheduled with staff
                        </span>
                      ) : (
                        <button
                          onClick={() => requestReturn(contract.id)}
                          className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[12.5px] font-bold text-background shadow-xs hover:opacity-90 active:scale-95 transition-all"
                        >
                          <RotateCcw size={13} /> Request Equipment Return
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: BROWSE AVAILABLE FLEET */}
      {activeTab === "browse" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {availableAssets.map((asset) => (
            <div
              key={asset.id}
              className="flex flex-col justify-between rounded-[28px] border border-border/70 bg-card p-6 shadow-panel hover:shadow-widget transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {asset.type}
                  </span>
                  <span className="rounded-full bg-ok/15 px-2.5 py-0.5 text-[10.5px] font-bold text-ok">
                    Ready for Hire
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground mt-1">{asset.id}</h3>
                <p className="text-[12px] text-muted-foreground">{asset.location}</p>

                {/* 3D Equipment Image */}
                <div className="mt-3 rounded-2xl border border-border/60 bg-gradient-to-b from-slate-50/70 to-white p-4">
                  <EquipmentHero asset={asset} compact={true} showTelemetryHUD={false} />
                </div>

                {/* Price Matrix */}
                <div className="mt-4 rounded-2xl border border-border/60 bg-muted/20 p-3.5 space-y-1.5 text-[12.5px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Rental:</span>
                    <strong className="text-foreground">₹{asset.monthlyRentalRate.toLocaleString("en-IN")} / mo</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Refundable Deposit:</span>
                    <strong className="text-ok">₹{Math.round(asset.monthlyRentalRate * asset.securityDepositRatio).toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setBookingAsset(asset)}
                className="mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all"
              >
                Configure &amp; Rent {asset.id}
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: SECURITY DEPOSITS & ESCROW */}
      {activeTab === "deposits" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-[24px] border border-border/70 bg-white p-5 shadow-panel">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Active Security Deposits Held
              </span>
              <p className="text-2xl font-black text-foreground mt-1 tabular-nums">
                ₹{myContracts.filter((c) => c.depositStatus === "Held").reduce((s, c) => s + c.securityDepositAmount, 0).toLocaleString("en-IN")}
              </p>
              <span className="text-[11px] text-ok mt-1 block">Held in secured escrow</span>
            </div>

            <div className="rounded-[24px] border border-border/70 bg-white p-5 shadow-panel">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Refunds in Processing
              </span>
              <p className="text-2xl font-black text-warn mt-1 tabular-nums">
                ₹{myContracts.filter((c) => c.depositStatus === "Refund Pending" || c.depositStatus === "Refund Processing").reduce((s, c) => s + c.refundAmount, 0).toLocaleString("en-IN")}
              </p>
              <span className="text-[11px] text-muted-foreground mt-1 block">Awaiting return inspection sign-off</span>
            </div>

            <div className="rounded-[24px] border border-border/70 bg-white p-5 shadow-panel">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Total Refunded to Date
              </span>
              <p className="text-2xl font-black text-ok mt-1 tabular-nums">
                ₹{myContracts.filter((c) => c.depositStatus === "Refunded" || c.depositStatus === "Partially Deducted").reduce((s, c) => s + c.refundAmount, 0).toLocaleString("en-IN")}
              </p>
              <span className="text-[11px] text-ok mt-1 block">100% compliant return history</span>
            </div>
          </div>

          <div className="rounded-[28px] border border-border/70 bg-white overflow-hidden shadow-panel">
            <div className="px-6 py-4 border-b border-border/50">
              <h3 className="text-base font-bold text-foreground">Security Deposit Ledger</h3>
            </div>
            <div className="divide-y divide-border/50 text-[13px]">
              {myContracts.map((c) => (
                <div key={c.id} className="flex items-center justify-between px-6 py-3.5">
                  <div>
                    <span className="font-bold text-foreground">{c.equipmentId} ({c.equipmentType})</span>
                    <p className="text-[11.5px] text-muted-foreground">Contract #{c.contractNumber} · Site {c.siteId}</p>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-foreground tabular-nums">₹{c.securityDepositAmount.toLocaleString("en-IN")}</span>
                    <span className="block text-[11px] font-semibold text-ok">{c.depositStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AGREEMENTS */}
      {activeTab === "agreements" && (
        <div className="rounded-[28px] border border-border/70 bg-white p-6 shadow-panel space-y-4">
          <h3 className="text-base font-bold text-foreground">Executed Rental Agreements</h3>
          <div className="divide-y divide-border/50 text-[13px]">
            {myContracts.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Agreement #{c.contractNumber}</h4>
                    <p className="text-[11.5px] text-muted-foreground">
                      Executed {c.agreementAcceptedAt ?? c.createdAt} · {c.equipmentId} to {c.customerCompany}
                    </p>
                  </div>
                </div>

                <button className="rounded-full border border-border bg-white px-3.5 py-1.5 text-[11.5px] font-bold text-foreground hover:bg-muted shadow-xs">
                  View PDF Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingAsset && (
        <NewRentalModal
          asset={bookingAsset}
          isOpen={Boolean(bookingAsset)}
          onClose={() => setBookingAsset(null)}
        />
      )}
    </div>
  );
}
