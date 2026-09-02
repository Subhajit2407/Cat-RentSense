import { useState } from "react";
import { useFleet, selectAsset, openActionSheet, reassignAsset, setAppMode, type Asset } from "@/data/fleet";
import { Sparkles, Send, X, ArrowRight, Bot, CheckCircle2, Zap, AlertCircle, DollarSign, Building2 } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  evidence?: string | undefined;
  recommendation?: string | undefined;
  actionButton?:
    | {
        label: string;
        onClick: () => void;
      }
    | undefined;
};

export function AIAssistantModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { assets, contracts, optimizationPlans } = useFleet();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      sender: "ai",
      text: "Hello! I am your RentSense Fleet & Rental Intelligence Copilot. I analyze live telemetry, rental contract windows, escrow security deposits, and predictive site demand across all equipment in real-time.",
      recommendation: "Tip: Click any prompt chip below or type a query to inspect optimization opportunities.",
    },
  ]);

  if (!isOpen) return null;

  const handleQuery = (queryText: string) => {
    const q = queryText.toLowerCase();
    const userMsg: Message = { id: `u-${Date.now()}`, sender: "user", text: queryText };

    let aiMsg: Message;

    if (q.includes("deposit") || q.includes("refund") || q.includes("escrow") || q.includes("held")) {
      const totalHeld = contracts.filter((c) => c.depositStatus === "Held").reduce((s, c) => s + c.securityDepositAmount, 0);
      const pendingRefund = contracts.filter((c) => c.depositStatus === "Refund Pending");
      aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Currently holding ₹${totalHeld.toLocaleString("en-IN")} in secured escrow deposits across active rentals. ${pendingRefund.length} deposit refund(s) are awaiting operational inspection sign-off.`,
        evidence: `Deposit policy maintains an 80% refundable liability ratio against machine damages. ₹${pendingRefund.reduce((s, c) => s + c.refundAmount, 0).toLocaleString("en-IN")} is eligible for return.`,
        recommendation: "Review the Rental Operations Approval Queue to audit condition inspections and authorize releases.",
        actionButton: {
          label: "Open Deposit Approvals Queue",
          onClick: () => {
            setAppMode("rental_ops");
            onClose();
          },
        },
      };
    } else if (q.includes("available") || q.includes("ready") || q.includes("hire")) {
      const available = assets.filter((a) => a.status === "Unassigned" || a.status === "Idle");
      const headline = available.slice(0, 3).map((a) => `${a.id} (${a.type})`).join(", ") || "none right now";
      const example = available[0];
      aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `There are ${available.length} heavy equipment units available for hire: ${headline}.`,
        evidence: example
          ? `${example.id} has ${example.fuelPct}% fuel, ${example.condition.toLowerCase()} condition, and is located at ${example.location} for ₹${example.monthlyRentalRate.toLocaleString("en-IN")}/mo (₹${Math.round(example.monthlyRentalRate * example.securityDepositRatio).toLocaleString("en-IN")} refundable deposit).`
          : "No units are currently available — check the Fleet Control Tower for expected return dates.",
        recommendation: "You can book directly via the Customer Portal or dispatch via Check-Out Operations.",
        actionButton: {
          label: "View in Customer Portal",
          onClick: () => {
            setAppMode("customer_portal");
            onClose();
          },
        },
      };
    } else if (q.includes("underutil") || q.includes("idle") || q.includes("zero engine")) {
      const underutilized = [...assets].filter((a) => a.utilizationPct < 25).sort((a, b) => a.utilizationPct - b.utilizationPct);
      const headline = underutilized.slice(0, 3).map((a) => `${a.id} (${a.utilizationPct}%)`).join(", ") || "none right now";
      const worst = underutilized[0];
      const plan = worst ? optimizationPlans.find((p) => p.assetId === worst.id) : undefined;
      aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Found ${underutilized.length} underutilized equipment units: ${headline}.`,
        evidence: worst
          ? `${worst.id} is logging ${worst.idleHrsPerDay} idle hrs/day at ${worst.location} with ${worst.fuelPct}% fuel and ${worst.condition.toLowerCase()} condition.`
          : "All equipment is currently above the 25% utilization threshold.",
        recommendation: plan ? plan.why : "Review the Usage page for redeployment candidates.",
        actionButton: plan
          ? {
              label: plan.title,
              onClick: () => {
                openActionSheet(plan);
                onClose();
              },
            }
          : undefined,
      };
    } else if (q.includes("s003") || q.includes("bhopal") || q.includes("demand")) {
      aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Site S003 (Bhopal Metro Line 2) has a projected demand surge of 3 excavators. Currently, only 1 excavator (EQX1001) is on site.",
        evidence: "Demand Gap: 2 excavators. Expected project milestone deadline: May 16, 2025.",
        recommendation: "Immediate candidate: EQX1007 (Excavator, Unassigned, 0% util). Mobilization distance is 142 km (~2.5 hrs transit).",
        actionButton: {
          label: "Mobilize EQX1007 Now",
          onClick: () => {
            reassignAsset("EQX1007", "S003", "OP101", "AI Copilot expedited dispatch");
            onClose();
          },
        },
      };
    } else if (q.includes("overdue") || q.includes("alerts")) {
      aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "EQX1002 (Crane) is currently 41 days overdue past its contracted return date of 2025-03-30.",
        evidence: "Asset is currently at Central Holding Depot with 0 engine hours recorded over the entire window, costing ₹85,000/mo in idle lease charges.",
        recommendation: "Schedule immediate off-hire depot return and inspection.",
        actionButton: {
          label: "Inspect EQX1002 in Alerts",
          onClick: () => {
            selectAsset("EQX1002");
            onClose();
          },
        },
      };
    } else {
      aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Fleet analysis complete for "${queryText}". All 7 machines, 5 sites, and active rental contracts are synchronized with Supabase.`,
        evidence: "Active utilization is 52% average with ₹4.8L in security deposits held.",
        recommendation: "Optimal next action: Assign unassigned assets (EQX1007) to high-demand infrastructure sites (S003).",
        actionButton: {
          label: "View Fleet Optimizer",
          onClick: () => {
            setAppMode("optimizer");
            onClose();
          },
        },
      };
    }

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) handleQuery(input.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/25 backdrop-blur-md animate-fade-in">
      <div className="relative flex flex-col h-[640px] w-full max-w-2xl overflow-hidden rounded-[28px] border border-border/80 bg-white shadow-float animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/70 bg-gradient-to-r from-accent/15 via-white to-white">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground font-bold shadow-xs">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-foreground">Fleet &amp; Rental Copilot</h3>
                <span className="rounded-full bg-ok/15 px-2 py-0.2 text-[10px] font-bold text-ok">
                  Supabase Live
                </span>
              </div>
              <p className="text-[11.5px] text-muted-foreground">
                Autonomous telemetry intelligence &amp; rental transaction advisory
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          >
            <X size={16} />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-[13px]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] rounded-[20px] p-4 ${
                  m.sender === "user"
                    ? "bg-foreground text-background font-medium"
                    : "border border-border/80 bg-card text-foreground shadow-xs"
                }`}
              >
                {m.sender === "ai" && (
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-ok mb-1">
                    <Bot size={13} />
                    <span>Copilot Recommendation</span>
                  </div>
                )}
                <p className="leading-relaxed">{m.text}</p>

                {m.evidence && (
                  <div className="mt-2.5 rounded-xl border border-border/60 bg-muted/40 p-2.5 text-[11.5px] text-muted-foreground">
                    <strong className="text-foreground block mb-0.5">Telemetry Evidence:</strong>
                    {m.evidence}
                  </div>
                )}

                {m.recommendation && (
                  <div className="mt-2 text-[11.5px] text-muted-foreground">
                    {m.recommendation}
                  </div>
                )}

                {m.actionButton && (
                  <button
                    onClick={m.actionButton.onClick}
                    className="mt-3 flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[11.5px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all"
                  >
                    <Zap size={12} />
                    {m.actionButton.label}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="border-t border-border/60 bg-muted/20 px-6 py-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] pb-1">
            <span className="text-muted-foreground font-semibold shrink-0">Quick Queries:</span>
            {[
              "Which equipment is currently available?",
              "How much deposit is held in escrow?",
              "Which rentals are overdue?",
              "What is Site S003 demand gap?",
              "Which deposits are waiting for refund?",
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleQuery(prompt)}
                className="shrink-0 rounded-full border border-border/80 bg-white px-3 py-1 font-medium text-foreground hover:border-foreground hover:bg-muted/30 shadow-apple-xs transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-border/70 p-4 bg-white">
          <div className="flex items-center gap-2 rounded-full border border-border/80 bg-muted/30 px-4 py-2 focus-within:border-foreground focus-within:bg-white shadow-apple-xs transition-all">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Copilot about equipment availability, deposits, returns, or forecasts..."
              className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              onClick={() => input.trim() && handleQuery(input.trim())}
              disabled={!input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xs hover:opacity-90 disabled:opacity-30 transition-all"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
