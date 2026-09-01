import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { Camera, CameraOff, Sparkles, X, RefreshCw, AlertCircle, QrCode } from "lucide-react";

export function CameraQRScanner({
  onScan,
  onClose,
}: {
  onScan: (assetId: string) => void;
  onClose?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState("");

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        setErrorMsg(null);
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          await videoRef.current.play();
          setHasCamera(true);
          scanFrame();
        }
      } catch (err: any) {
        console.warn("Camera access failed or unavailable:", err);
        setHasCamera(false);
        setErrorMsg(
          err.name === "NotAllowedError"
            ? "Camera permission denied by browser. Please enable camera access or enter Asset ID manually."
            : "No active webcam or rear camera detected. Use manual ID entry below.",
        );
      }
    }

    startCamera();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const scanFrame = () => {
    if (!videoRef.current || !canvasRef.current || !isScanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code && code.data) {
        // Clean and extract asset ID (e.g. SMART-RENTAL-EQX1007 -> EQX1007)
        const raw = code.data.trim();
        const matched = raw.match(/EQX\d{4}/i);
        const resolvedId = matched ? matched[0].toUpperCase() : raw;

        setScannedCode(resolvedId);
        setIsScanning(false);
        onScan(resolvedId);
        return;
      }
    }

    animationFrameRef.current = requestAnimationFrame(scanFrame);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      const id = manualInput.trim().toUpperCase();
      onScan(id);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-border/80 bg-slate-950 text-white p-6 shadow-float">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-accent-foreground font-bold">
            <QrCode size={16} />
          </div>
          <div>
            <h3 className="text-[15px] font-bold tracking-tight">Real-Time Camera Scanner</h3>
            <p className="text-[11px] text-white/60">Live optical QR barcode detection for equipment check-in / check-out</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Camera Viewport Canvas */}
      <div className="relative mt-4 flex items-center justify-center h-64 sm:h-72 w-full overflow-hidden rounded-2xl bg-black border border-white/10">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Viewfinder Reticle */}
        {hasCamera && (
          <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
            <div className="relative h-44 w-44 rounded-2xl border-2 border-accent/80 shadow-[0_0_20px_rgba(214,255,56,0.3)]">
              {/* Corner target reticles */}
              <span className="absolute -top-1 -left-1 h-5 w-5 border-t-3 border-l-3 border-accent" />
              <span className="absolute -top-1 -right-1 h-5 w-5 border-t-3 border-r-3 border-accent" />
              <span className="absolute -bottom-1 -left-1 h-5 w-5 border-b-3 border-l-3 border-accent" />
              <span className="absolute -bottom-1 -right-1 h-5 w-5 border-b-3 border-r-3 border-accent" />

              {/* Scanning laser beam animation */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
            </div>
            <span className="mt-3 rounded-full bg-black/70 px-3 py-1 text-[10.5px] font-semibold text-accent backdrop-blur-md">
              Point camera at Equipment QR tag
            </span>
          </div>
        )}

        {/* Camera Permission / Error Fallback Overlay */}
        {!hasCamera && errorMsg && (
          <div className="relative z-10 p-6 text-center max-w-sm">
            <CameraOff size={32} className="mx-auto text-amber-400 mb-2 opacity-80" />
            <h4 className="text-sm font-bold text-white">Camera Standby Mode</h4>
            <p className="mt-1 text-[11.5px] text-white/70 leading-relaxed">{errorMsg}</p>
          </div>
        )}
      </div>

      {/* Manual Input Fallback Strip */}
      <form onSubmit={handleManualSubmit} className="mt-4 flex items-center gap-2">
        <input
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value.toUpperCase())}
          placeholder="Or type Asset Tag (e.g. EQX1007, EQX1001)..."
          className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-[13px] text-white placeholder:text-white/40 outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-full bg-accent px-5 py-2.5 text-[12.5px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all"
        >
          Lookup Asset
        </button>
      </form>
    </div>
  );
}
