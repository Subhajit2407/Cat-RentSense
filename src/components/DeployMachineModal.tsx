import { useEffect, useState } from "react";
import {
  useFleet,
  SITES,
  SITES_META,
  OPERATORS,
  deployAsset,
} from "@/data/fleet";
import {
  MapPin,
  CheckCircle2,
  ArrowRight,
  X,
  AlertCircle,
  Crosshair,
  Loader2,
  Truck,
} from "lucide-react";

type FieldErrors = Partial<Record<"asset" | "location" | "lat" | "lng", string>>;

/**
 * Deploy/reassign an EXISTING machine to a new real-world location. Shares
 * the same required-location shape (site optional, city/area + lat/lng
 * mandatory) as RegisterMachineModal, so an ops user gets one consistent
 * mental model for "where is this machine" whether it's brand new or
 * already in the fleet.
 */
export function DeployMachineModal({
  isOpen,
  onClose,
  initialAssetId,
  onDeployed,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialAssetId?: string | undefined;
  onDeployed?: (assetId: string) => void;
}) {
  const { assets } = useFleet();

  const [assetId, setAssetId] = useState(initialAssetId ?? assets[0]?.id ?? "");
  const [siteId, setSiteId] = useState<string>("");
  const [locationLabel, setLocationLabel] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [operatorId, setOperatorId] = useState<string>("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  // Re-seed the picker to the asset the page had selected whenever the
  // modal is (re)opened, e.g. from an alert's "Take Action".
  useEffect(() => {
    if (isOpen) {
      setAssetId(initialAssetId ?? assets[0]?.id ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialAssetId]);

  if (!isOpen) return null;

  const selectedAsset = assets.find((a) => a.id === assetId);

  const useSiteCoordinates = () => {
    if (!siteId) return;
    const site = SITES_META[siteId];
    if (!site) return;
    setLat(String(site.lat));
    setLng(String(site.lng));
    if (!locationLabel.trim()) setLocationLabel(site.name);
  };

  const useCurrentLocation = () => {
    if (!selectedAsset) return;
    setSiteId(selectedAsset.site ?? "");
    setLocationLabel(selectedAsset.location);
    setLat(String(selectedAsset.lat));
    setLng(String(selectedAsset.lng));
  };

  const resetForm = () => {
    setAssetId(initialAssetId ?? assets[0]?.id ?? "");
    setSiteId("");
    setLocationLabel("");
    setLat("");
    setLng("");
    setOperatorId("");
    setErrors({});
    setSubmitError("");
    setSuccessId(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!assetId) next.asset = "Select a machine to deploy.";
    if (!locationLabel.trim()) next.location = "Location (site/city/area) is required.";

    const latNum = Number(lat);
    if (lat.trim() === "" || Number.isNaN(latNum) || latNum < -90 || latNum > 90) {
      next.lat = "Enter a valid latitude between -90 and 90.";
    }
    const lngNum = Number(lng);
    if (lng.trim() === "" || Number.isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
      next.lng = "Enter a valid longitude between -180 and 180.";
    }
    return next;
  };

  const handleSubmit = async () => {
    const fieldErrors = validate();
    setErrors(fieldErrors);
    setSubmitError("");
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    const result = await deployAsset({
      id: assetId,
      siteId: siteId || null,
      locationLabel,
      lat: Number(lat),
      lng: Number(lng),
      operatorId: operatorId || null,
    });
    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error ?? "Could not redeploy this machine. Please try again.");
      return;
    }

    setSuccessId(assetId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-border/80 bg-white p-7 shadow-float animate-scale-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <X size={16} />
        </button>

        {successId ? (
          <div className="py-6 text-center space-y-4 animate-fade-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ok/15 text-ok">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-ok">
                Machine Deployed &amp; Saved
              </span>
              <h3 className="text-2xl font-bold text-foreground">{successId} redeployed</h3>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Live Site Map and fleet views are already showing the new position.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 text-left text-[12.5px] space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <strong className="text-foreground">{locationLabel}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coordinates:</span>
                <strong className="text-foreground tabular-nums">{Number(lat).toFixed(4)}, {Number(lng).toFixed(4)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Site:</span>
                <strong className="text-foreground">{siteId ? `${siteId} — ${SITES_META[siteId]?.name}` : "Unassigned (holding yard)"}</strong>
              </div>
              {operatorId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Operator:</span>
                  <strong className="text-foreground">{operatorId}</strong>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={resetForm}
                className="flex-1 rounded-full border border-border px-5 py-3 text-[13px] font-bold text-foreground hover:bg-muted"
              >
                Deploy Another
              </button>
              <button
                onClick={() => {
                  onDeployed?.(successId);
                  handleClose();
                }}
                className="flex-1 rounded-full bg-foreground px-5 py-3 text-[13px] font-bold text-background hover:opacity-95"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Fleet Redeployment
              </span>
              <h3 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <Truck size={18} /> Deploy / Reassign Machine
              </h3>
              <p className="text-[12.5px] text-muted-foreground mt-0.5">
                Move any machine already in the fleet to a new location. A physical location is required.
              </p>
            </div>

            <div className="mt-4">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Machine
              </label>
              <select
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                className="w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-bold text-foreground outline-none"
              >
                {assets.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.id} ({a.type}) — currently {a.site ? `Site ${a.site}` : a.location}
                  </option>
                ))}
              </select>
              {errors.asset && <p className="mt-1 text-[11px] font-semibold text-danger">{errors.asset}</p>}
              {selectedAsset && (
                <p className="mt-1 text-[10.5px] text-muted-foreground">
                  Currently at {selectedAsset.location} [{selectedAsset.lat.toFixed(4)}, {selectedAsset.lng.toFixed(4)}] · Status: {selectedAsset.status}
                </p>
              )}
            </div>

            {/* Location Block — required, structured */}
            <div className="mt-5 rounded-2xl border border-border/70 bg-card p-4 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <MapPin size={13} /> New Location (Required)
                </h4>
                <div className="flex items-center gap-3">
                  {selectedAsset && (
                    <button
                      type="button"
                      onClick={useCurrentLocation}
                      className="text-[11px] font-bold text-muted-foreground hover:underline"
                    >
                      Keep Current Location
                    </button>
                  )}
                  {siteId && (
                    <button
                      type="button"
                      onClick={useSiteCoordinates}
                      className="flex items-center gap-1 text-[11px] font-bold text-brand hover:underline"
                    >
                      <Crosshair size={11} /> Use Site Coordinates
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10.5px] font-semibold text-muted-foreground mb-1">
                    Project Site (optional)
                  </label>
                  <select
                    value={siteId}
                    onChange={(e) => setSiteId(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white px-3 py-2 font-semibold text-foreground outline-none"
                  >
                    <option value="">— No site (holding yard) —</option>
                    {SITES.map((s) => (
                      <option key={s} value={s}>
                        Site {s} — {SITES_META[s]?.name ?? s}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[10.5px] text-muted-foreground">
                    Leaving this unset marks the machine "Unassigned" — its real coordinates below are still mandatory.
                  </p>
                </div>

                <div>
                  <label className="block text-[10.5px] font-semibold text-muted-foreground mb-1">
                    City / Area / Yard Label
                  </label>
                  <input
                    value={locationLabel}
                    onChange={(e) => setLocationLabel(e.target.value)}
                    placeholder="e.g. Nagpur Express Corridor S002"
                    className="w-full rounded-xl border border-border bg-white px-3 py-2 font-medium text-foreground outline-none"
                  />
                  {errors.location && <p className="mt-1 text-[11px] font-semibold text-danger">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-[10.5px] font-semibold text-muted-foreground mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="21.1458"
                    className="w-full rounded-xl border border-border bg-white px-3 py-2 font-mono text-foreground outline-none tabular-nums"
                  />
                  {errors.lat && <p className="mt-1 text-[11px] font-semibold text-danger">{errors.lat}</p>}
                </div>

                <div>
                  <label className="block text-[10.5px] font-semibold text-muted-foreground mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    placeholder="79.0882"
                    className="w-full rounded-xl border border-border bg-white px-3 py-2 font-mono text-foreground outline-none tabular-nums"
                  />
                  {errors.lng && <p className="mt-1 text-[11px] font-semibold text-danger">{errors.lng}</p>}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Assign Operator (optional)
              </label>
              <select
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                className="w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-semibold text-foreground outline-none"
              >
                <option value="">— Keep unassigned —</option>
                {OPERATORS.map((o) => (
                  <option key={o} value={o}>
                    Operator {o} (Level 2 Certified)
                  </option>
                ))}
              </select>
            </div>

            {submitError && (
              <div className="mt-4 flex items-start gap-2 rounded-2xl border border-danger/40 bg-danger/5 p-3 text-[12px] font-semibold text-danger">
                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting || assets.length === 0}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-95 disabled:opacity-50 transition-all active:scale-[0.99]"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Saving to Supabase...
                </>
              ) : (
                <>
                  Deploy Machine <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
