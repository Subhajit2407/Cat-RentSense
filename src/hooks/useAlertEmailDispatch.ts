import { useEffect, useRef } from "react";
import { useFleet, SITES_META } from "@/data/fleet";
import { buildAlerts } from "@/lib/alerts/engine";
import { dispatchAlertEmail } from "@/lib/email/notify";

/**
 * Watches the single alert engine's output and fires (deduplicated) emails
 * for staff. Mount this once — Shell does it — not per-page, so alerts are
 * evaluated once per fleet-state change regardless of which route is open.
 *
 * Actual send/skip decisions (preferences, duplicate detection) happen
 * server-side in the send-alert-email Edge Function; this hook's own
 * `attempted` ref just stops the same alert from re-triggering a network
 * call on every re-render within one mounted session.
 */
export function useAlertEmailDispatch() {
  const { assets, contracts, currentUser } = useFleet();
  const attempted = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (currentUser.role === "customer") return; // operational fleet alerts are staff-facing

    const alerts = buildAlerts(assets, contracts);
    const unseen = alerts.filter((a) => !attempted.current.has(`${a.id}:${a.fingerprint}`));
    if (unseen.length === 0) return;

    for (const alert of unseen) {
      attempted.current.add(`${alert.id}:${alert.fingerprint}`);
      const asset = assets.find((a) => a.id === alert.assetId);
      const siteMeta = alert.siteId ? SITES_META[alert.siteId] : undefined;
      void dispatchAlertEmail(
        alert,
        { email: currentUser.email, name: currentUser.name, userId: currentUser.id },
        {
          equipmentType: asset?.type,
          siteLabel: siteMeta ? `${siteMeta.id} — ${siteMeta.name}` : undefined,
        },
      );
    }
  }, [assets, contracts, currentUser]);
}
