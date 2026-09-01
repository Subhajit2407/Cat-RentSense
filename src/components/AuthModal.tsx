import { useState } from "react";
import { useFleet, switchUserRole, registerUser, type UserRole, INITIAL_PROFILES } from "@/data/fleet";
import {
  User,
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  X,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  UserPlus,
  LogIn,
} from "lucide-react";

export function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { currentUser } = useFleet();
  const [authMode, setAuthMode] = useState<"signin" | "register">("signin");

  // Sign in state
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("••••••••••••");
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.role);

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regRole, setRegRole] = useState<UserRole>("customer");

  const [statusMsg, setStatusMsg] = useState("");

  if (!isOpen) return null;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(INITIAL_PROFILES[role]?.email || (role === "customer" ? "rajesh.patel@apexinfra.com" : "admin@rentsense.com"));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    switchUserRole(selectedRole);
    setStatusMsg(`Authenticated as ${INITIAL_PROFILES[selectedRole]?.name || "User"} (${selectedRole === "customer" ? "Customer" : "Rental Staff / Admin"})`);
    setTimeout(() => {
      onClose();
      setStatusMsg("");
    }, 500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPhone.trim()) {
      setStatusMsg("Please fill in Name, Email, and Phone number.");
      return;
    }

    const created = registerUser({
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      role: regRole,
      companyName: regCompany.trim() || undefined,
    });

    setStatusMsg(`Account Created! Welcome ${created.name} (${regRole === "customer" ? "Customer" : "Rental Staff / Admin"}).`);
    setTimeout(() => {
      onClose();
      setStatusMsg("");
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/25 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-border/80 bg-white p-7 shadow-float animate-scale-in max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <X size={16} />
        </button>

        {/* RentSense Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background shadow-apple-sm mb-3">
            <span className="h-4 w-4 rounded-full bg-accent" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">RentSense</h3>
          <p className="text-[12.5px] text-muted-foreground mt-0.5">
            Heavy Equipment Operations &amp; Customer Portal
          </p>
        </div>

        {/* Tab Switcher (Sign In vs Register) */}
        <div className="mt-5 flex rounded-full bg-muted/60 p-1 border border-border/60">
          <button
            type="button"
            onClick={() => {
              setAuthMode("signin");
              setStatusMsg("");
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 text-[12.5px] font-bold transition-all ${
              authMode === "signin" ? "bg-white text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LogIn size={13} />
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("register");
              setStatusMsg("");
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 text-[12.5px] font-bold transition-all ${
              authMode === "register" ? "bg-accent text-accent-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserPlus size={13} />
            Create Account
          </button>
        </div>

        {authMode === "signin" ? (
          /* SIGN IN FORM */
          <form onSubmit={handleLogin} className="mt-5 space-y-3.5 text-[13px] animate-fade-in">
            {/* Role Quick Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Sign In Role Profile
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "customer" as const, label: "Customer", sub: "Rental Client" },
                  { id: "rental_staff" as const, label: "Rental Staff (Admin)", sub: "Operations Lead" },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleSelect(r.id)}
                    className={`flex flex-col items-center rounded-2xl border p-3 text-center transition-all ${
                      selectedRole === r.id
                        ? "border-foreground bg-foreground text-background shadow-xs font-bold"
                        : "border-border/80 bg-muted/30 text-muted-foreground hover:border-foreground"
                    }`}
                  >
                    <span className="text-[12px]">{r.label}</span>
                    <span className="text-[10px] opacity-75">{r.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2.5 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2.5 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
              />
            </div>

            {statusMsg && (
              <p className="text-center text-[12px] font-bold text-ok flex items-center justify-center gap-1">
                <CheckCircle2 size={13} /> {statusMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-[0.98] transition-all mt-2"
            >
              Sign In to RentSense
              <ArrowRight size={14} />
            </button>
          </form>
        ) : (
          /* REGISTER NEW ACCOUNT FORM */
          <form onSubmit={handleRegister} className="mt-5 space-y-3 text-[13px] animate-fade-in">
            {/* Account Type Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRegRole("customer")}
                  className={`rounded-2xl border p-2.5 text-center transition-all ${
                    regRole === "customer"
                      ? "border-foreground bg-foreground text-background font-bold shadow-xs"
                      : "border-border/80 bg-muted/30 text-muted-foreground"
                  }`}
                >
                  <span className="text-[12px] block">Customer</span>
                  <span className="text-[10px] opacity-75">Hire heavy equipment</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRegRole("rental_staff")}
                  className={`rounded-2xl border p-2.5 text-center transition-all ${
                    regRole === "rental_staff"
                      ? "border-foreground bg-foreground text-background font-bold shadow-xs"
                      : "border-border/80 bg-muted/30 text-muted-foreground"
                  }`}
                >
                  <span className="text-[12px] block">Rental Staff (Admin)</span>
                  <span className="text-[10px] opacity-75">Full fleet &amp; operations</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Ramesh Chandra"
                className="w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  value={regCompany}
                  onChange={(e) => setRegCompany(e.target.value)}
                  placeholder="e.g. Skyline Builders"
                  className="w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
                />
              </div>
            </div>

            {statusMsg && (
              <p className="text-center text-[12px] font-bold text-ok flex items-center justify-center gap-1 pt-1">
                <CheckCircle2 size={13} /> {statusMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-[0.98] transition-all mt-2"
            >
              Create Account &amp; Access RentSense
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Protected by RentSense Enterprise Supabase Authentication
        </p>
      </div>
    </div>
  );
}
