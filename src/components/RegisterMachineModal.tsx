import { useState } from "react";
import {
  type Asset,
  SITES,
  SITES_META,
  registerAsset,
  nextSuggestedAssetId,
} from "@/data/fleet";
import {
  MapPin,
  CheckCircle2,
  ArrowRight,
  X,
  AlertCircle,
  Crosshair,
  Loader2,
} from "lucide-react";

const EQUIPMENT_TYPES: Asset["type"][] = ["Excavator", "Crane", "Bulldozer", "Grader"];

type FieldErrors = Partial<Record<"id" | "serialNumber" | "location" | "lat" | "lng", string>>;

export function RegisterMachineModal({
  isOpen,
  onClose,
  onRegistered,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRegistered?: (assetId: string) => void;
}) {
  const [id, setId] = useState(() => nextSuggestedAssetId());
  const [type, setType] = useState<Asset["type"]>("Excavator");
  const [serialNumber, setSerialNumber] = useState("");
  const [siteId, setSiteId] = useState<string>("");
  const [locationLabel, setLocationLabel] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [monthlyRate, setMonthlyRate] = useState<number>(50000);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  if (!isOpen) return null;

  const useSiteCoordinates = () => {
    if (!siteId) return;
    const site = SITES_META[siteId];
    if (!site) return;
    setLat(String(site.lat));
    setLng(String(site.lng));
    if (!locationLabel.trim()) setLocationLabel(site.name);
  };

  const resetForm = () => {
    setId(nextSuggestedAssetId());
    setType("Excavator");
    setSerialNumber("");
    setSiteId("");
    setLocationLabel("");
    setLat("");
    setLng("");
    setMonthlyRate(50000);
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
    if (!id.trim()) next.id = "Asset ID is required.";
    if (!serialNumber.trim()) next.serialNumber = "Serial number is required.";
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
    const result = await registerAsset({
      id,
      type,
      serialNumber,
      siteId: siteId || null,
      locationLabel,
      lat: Number(lat),
      lng: Number(lng),
      monthlyRentalRate: monthlyRate,
    });
    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error ?? "Could not save this machine. Please try again.");
      return;
    }

    setSuccessId(id.trim().toUpperCase());
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
                Machine Registered &amp; Saved
              </span>
              <h3 className="text-2xl font-bold text-foreground">{successId} added to fleet</h3>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Now visible on the Live Site Map and available in Check-In / Check-Out.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 text-left text-[12.5px] space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <strong className="text-foreground">{type}</strong>
              </div>
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
            </div>

            <div className="flex gap-2">
              <button
                onClick={resetForm}
                className="flex-1 rounded-full border border-border px-5 py-3 text-[13px] font-bold text-foreground hover:bg-muted"
              >
                Register Another
              </button>
              <button
                onClick={() => {
                  onRegistered?.(successId);
                  handleClose();
                }}
                className="flex-1 rounded-full bg-foreground px-5 py-3 text-[13px] font-bold text-background hover:opacity-95"
              >
                Continue to Dispatch
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Fleet Registration
              </span>
              <h3 className="text-xl font-bold tracking-tight text-foreground">Register New Machine</h3>
              <p className="text-[12.5px] text-muted-foreground mt-0.5">
                A physical location is required before this unit can be created or dispatched.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[13px]">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Asset ID
                </label>
                <input
                  value={id}
                  onChange={(e) => setId(e.target.value.toUpperCase())}
                  placeholder="EQX1008"
                  className="w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-bold text-foreground outline-none"
                />
                {errors.id && <p className="mt-1 text-[11px] font-semibold text-danger">{errors.id}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Equipment Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as Asset["type"])}
                  className="w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-semibold text-foreground outline-none"
                >
                  {EQUIPMENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Serial Number
                </label>
                <input
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="CAT-320D-8941"
                  className="w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-medium text-foreground outline-none"
                />
                {errors.serialNumber && <p className="mt-1 text-[11px] font-semibold text-danger">{errors.serialNumber}</p>}
              </div>
            </div>

            {/* Location Block — required, structured */}
            <div className="mt-5 rounded-2xl border border-border/70 bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <MapPin size={13} /> Machine Location (Required)
                </h4>
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
                    Leaving this unset keeps the machine operationally "Unassigned", but its real location below is still mandatory.
                  </p>
                </div>

                <div>
                  <label className="block text-[10.5px] font-semibold text-muted-foreground mb-1">
                    City / Area / Yard Label
                  </label>
                  <input
                    value={locationLabel}
                    onChange={(e) => setLocationLabel(e.target.value)}
                    placeholder="e.g. Central Holding Depot, Jabalpur"
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
                    placeholder="23.2599"
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
                    placeholder="77.4126"
                    className="w-full rounded-xl border border-border bg-white px-3 py-2 font-mono text-foreground outline-none tabular-nums"
                  />
                  {errors.lng && <p className="mt-1 text-[11px] font-semibold text-danger">{errors.lng}</p>}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Monthly Rental Rate (List Price)
              </label>
              <div className="flex items-center gap-1 rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5">
                <span className="text-muted-foreground">₹</span>
                <input
                  type="number"
                  min={0}
                  value={monthlyRate}
                  onChange={(e) => setMonthlyRate(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-transparent font-bold text-foreground outline-none tabular-nums"
                />
              </div>
            </div>

            {submitError && (
              <div className="mt-4 flex items-start gap-2 rounded-2xl border border-danger/40 bg-danger/5 p-3 text-[12px] font-semibold text-danger">
                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-95 disabled:opacity-50 transition-all active:scale-[0.99]"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Saving to Supabase...
                </>
              ) : (
                <>
                  Save Machine <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
