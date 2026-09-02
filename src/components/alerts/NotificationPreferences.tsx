import { useEffect, useState } from "react";
import { useFleet } from "@/data/fleet";
import { Switch } from "@/components/ui/switch";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { fetchNotificationPreferences, saveNotificationPreferences } from "@/services/notifications";
import { DEFAULT_NOTIFICATION_PREFERENCES, type NotificationPreferences } from "@/types/fleet";
import { Mail, CheckCircle2 } from "lucide-react";

const ROWS: { key: keyof NotificationPreferences; label: string; hint: string }[] = [
  { key: "criticalAlerts", label: "Critical Alerts", hint: "Anomalies and payment/deposit disputes" },
  { key: "overdueRentals", label: "Overdue Rentals & Due Soon", hint: "Return date breaches and upcoming returns" },
  { key: "inspectionIssues", label: "Inspection Issues", hint: "Pre/post inspection and return-condition flags" },
  { key: "lowUtilization", label: "Low Utilization", hint: "Low duty-cycle and high idle hours" },
  { key: "forecastSuggestions", label: "Forecast Suggestions", hint: "AI optimization/redeployment recommendations" },
];

/**
 * Section 21 — a deliberately simple ON/OFF preference panel, backed by
 * the `notification_preferences` table. Read/written per signed-in user;
 * falls back to safe defaults when Supabase isn't configured (local/demo).
 */
export function NotificationPreferencesPanel() {
  const { currentUser } = useFleet();
  const [prefs, setPrefs] = useState<NotificationPreferences>(DEFAULT_NOTIFICATION_PREFERENCES);
  const [loading, setLoading] = useState(true);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchNotificationPreferences(currentUser.id).then((p) => {
      if (!cancelled) {
        setPrefs(p);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [currentUser.id]);

  const handleToggle = async (key: keyof NotificationPreferences) => {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    const { ok } = await saveNotificationPreferences(currentUser.id, next);
    if (ok) {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1400);
    }
  };

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-muted text-foreground">
            <Mail size={14} />
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-foreground">Email Notifications</h4>
            <p className="text-[11px] text-muted-foreground">Sent via Resend to {currentUser.email}</p>
          </div>
        </div>
        {savedFlash && (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-ok animate-fade-in">
            <CheckCircle2 size={13} /> Saved
          </span>
        )}
      </div>

      {!isSupabaseConfigured && (
        <p className="rounded-xl bg-warn/10 px-3 py-2 text-[11px] text-warn-foreground">
          Supabase isn&apos;t configured in this environment — preferences shown are defaults and won&apos;t persist.
        </p>
      )}

      <div className="divide-y divide-border/40">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between py-2.5">
            <div>
              <span className="block text-[12.5px] font-semibold text-foreground">{row.label}</span>
              <span className="block text-[11px] text-muted-foreground">{row.hint}</span>
            </div>
            <Switch
              checked={prefs[row.key]}
              disabled={loading}
              onCheckedChange={() => handleToggle(row.key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
