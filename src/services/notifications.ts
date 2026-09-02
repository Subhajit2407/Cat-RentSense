// Supabase-backed notification preferences service. Falls back to sane
// defaults (see types/fleet DEFAULT_NOTIFICATION_PREFERENCES) whenever
// Supabase isn't configured, so the Settings UI always renders something
// usable in local/demo mode.
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { DEFAULT_NOTIFICATION_PREFERENCES, type NotificationPreferences } from "@/types/fleet";

export async function fetchNotificationPreferences(userId: string): Promise<NotificationPreferences> {
  if (!isSupabaseConfigured) return DEFAULT_NOTIFICATION_PREFERENCES;
  try {
    const { data, error } = await supabase
      .from("notification_preferences")
      .select("critical_alerts, overdue_rentals, inspection_issues, low_utilization, forecast_suggestions")
      .eq("user_id", userId)
      .maybeSingle();
    if (error || !data) return DEFAULT_NOTIFICATION_PREFERENCES;
    return {
      criticalAlerts: data.critical_alerts,
      overdueRentals: data.overdue_rentals,
      inspectionIssues: data.inspection_issues,
      lowUtilization: data.low_utilization,
      forecastSuggestions: data.forecast_suggestions,
    };
  } catch {
    return DEFAULT_NOTIFICATION_PREFERENCES;
  }
}

export async function saveNotificationPreferences(
  userId: string,
  prefs: NotificationPreferences,
): Promise<{ ok: boolean }> {
  if (!isSupabaseConfigured) return { ok: false };
  try {
    const { error } = await supabase.from("notification_preferences").upsert({
      user_id: userId,
      critical_alerts: prefs.criticalAlerts,
      overdue_rentals: prefs.overdueRentals,
      inspection_issues: prefs.inspectionIssues,
      low_utilization: prefs.lowUtilization,
      forecast_suggestions: prefs.forecastSuggestions,
      updated_at: new Date().toISOString(),
    });
    return { ok: !error };
  } catch {
    return { ok: false };
  }
}
