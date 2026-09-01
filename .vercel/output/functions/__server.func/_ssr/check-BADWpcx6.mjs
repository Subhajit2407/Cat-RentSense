import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { B as Camera, I as CircleCheck, J as ArrowRight, V as CameraOff, h as ScanLine, n as X, v as QrCode } from "../_libs/lucide-react.mjs";
import { C as useFleet, h as approveCheckOut, i as InspectionComparisonModal, m as approveCheckIn, n as EquipmentHero, s as Panel, u as Shell } from "./Shell-CeYa9aSo.mjs";
import { t as require_jsQR } from "../_libs/jsqr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/check-BADWpcx6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_jsQR = /* @__PURE__ */ __toESM(require_jsQR());
function CameraQRScanner({ onScan, onClose }) {
	const videoRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const animationFrameRef = (0, import_react.useRef)(null);
	const [hasCamera, setHasCamera] = (0, import_react.useState)(null);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const [isScanning, setIsScanning] = (0, import_react.useState)(true);
	const [scannedCode, setScannedCode] = (0, import_react.useState)(null);
	const [manualInput, setManualInput] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let stream = null;
		async function startCamera() {
			try {
				setErrorMsg(null);
				stream = await navigator.mediaDevices.getUserMedia({ video: {
					facingMode: "environment",
					width: { ideal: 1280 },
					height: { ideal: 720 }
				} });
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					videoRef.current.setAttribute("playsinline", "true");
					await videoRef.current.play();
					setHasCamera(true);
					scanFrame();
				}
			} catch (err) {
				console.warn("Camera access failed or unavailable:", err);
				setHasCamera(false);
				setErrorMsg(err.name === "NotAllowedError" ? "Camera permission denied by browser. Please enable camera access or enter Asset ID manually." : "No active webcam or rear camera detected. Use manual ID entry below.");
			}
		}
		startCamera();
		return () => {
			if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
			if (stream) stream.getTracks().forEach((t) => t.stop());
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
			const code = (0, import_jsQR.default)(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
			if (code && code.data) {
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
	const handleManualSubmit = (e) => {
		e.preventDefault();
		if (manualInput.trim()) onScan(manualInput.trim().toUpperCase());
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-[26px] border border-border/80 bg-slate-950 text-white p-6 shadow-float",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between pb-4 border-b border-white/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-accent-foreground font-bold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { size: 16 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[15px] font-bold tracking-tight",
						children: "Real-Time Camera Scanner"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-white/60",
						children: "Live optical QR barcode detection for equipment check-in / check-out"
					})] })]
				}), onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-4 flex items-center justify-center h-64 sm:h-72 w-full overflow-hidden rounded-2xl bg-black border border-white/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: videoRef,
						className: "absolute inset-0 h-full w-full object-cover",
						muted: true,
						playsInline: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: canvasRef,
						className: "hidden"
					}),
					hasCamera && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex flex-col items-center justify-center pointer-events-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-44 w-44 rounded-2xl border-2 border-accent/80 shadow-[0_0_20px_rgba(214,255,56,0.3)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-1 -left-1 h-5 w-5 border-t-3 border-l-3 border-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-1 -right-1 h-5 w-5 border-t-3 border-r-3 border-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-1 -left-1 h-5 w-5 border-b-3 border-l-3 border-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-1 -right-1 h-5 w-5 border-b-3 border-r-3 border-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-3 rounded-full bg-black/70 px-3 py-1 text-[10.5px] font-semibold text-accent backdrop-blur-md",
							children: "Point camera at Equipment QR tag"
						})]
					}),
					!hasCamera && errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 p-6 text-center max-w-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraOff, {
								size: 32,
								className: "mx-auto text-amber-400 mb-2 opacity-80"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-sm font-bold text-white",
								children: "Camera Standby Mode"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11.5px] text-white/70 leading-relaxed",
								children: errorMsg
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleManualSubmit,
				className: "mt-4 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: manualInput,
					onChange: (e) => setManualInput(e.target.value.toUpperCase()),
					placeholder: "Or type Asset Tag (e.g. EQX1007, EQX1001)...",
					className: "flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-[13px] text-white placeholder:text-white/40 outline-none focus:border-accent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "rounded-full bg-accent px-5 py-2.5 text-[12.5px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all",
					children: "Lookup Asset"
				})]
			})
		]
	});
}
function CheckPage() {
	const { assets, contracts, currentUser } = useFleet();
	const [assetId, setAssetId] = (0, import_react.useState)("EQX1007");
	const [mode, setMode] = (0, import_react.useState)("checkout");
	const [showCameraScanner, setShowCameraScanner] = (0, import_react.useState)(false);
	const [engineCond, setEngineCond] = (0, import_react.useState)("Good");
	const [hydraulicsCond, setHydraulicsCond] = (0, import_react.useState)("Good");
	const [bodyCond, setBodyCond] = (0, import_react.useState)("Good");
	const [tracksCond, setTracksCond] = (0, import_react.useState)("Good");
	const [cabinCond, setCabinCond] = (0, import_react.useState)("Good");
	const [lightsCond, setLightsCond] = (0, import_react.useState)("Good");
	const [safetyCond, setSafetyCond] = (0, import_react.useState)("Good");
	const [fuelLevel, setFuelLevel] = (0, import_react.useState)(95);
	const [hourMeter, setHourMeter] = (0, import_react.useState)(1240);
	const [inspectionNotes, setInspectionNotes] = (0, import_react.useState)("");
	const [targetSite, setTargetSite] = (0, import_react.useState)("S003");
	const [targetOperator, setTargetOperator] = (0, import_react.useState)("OP101");
	const [selectedContractId, setSelectedContractId] = (0, import_react.useState)("");
	const [activeStep, setActiveStep] = (0, import_react.useState)(1);
	const [completedMsg, setCompletedMsg] = (0, import_react.useState)("");
	const [inspectComparisonContract, setInspectComparisonContract] = (0, import_react.useState)(null);
	const foundAsset = assets.find((a) => a.id === assetId) || assets[0];
	const activeContract = contracts.find((c) => c.equipmentId === assetId && (c.rentalStatus === "Active Rental" || c.rentalStatus === "Pending Checkout" || c.rentalStatus === "Return Requested"));
	const handleQRScanSuccess = (scannedId) => {
		setAssetId(scannedId);
		setShowCameraScanner(false);
		setActiveStep(2);
	};
	const handleExecuteCheckout = () => {
		const inspection = {
			id: `insp-pre-${Date.now()}`,
			contractId: activeContract?.id ?? `cnt-adhoc-${Date.now()}`,
			equipmentId: foundAsset.id,
			type: "pre_checkout",
			inspectorName: currentUser.name,
			timestamp: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "),
			engine: engineCond,
			hydraulics: hydraulicsCond,
			body: bodyCond,
			tracksTires: tracksCond,
			cabin: cabinCond,
			lights: lightsCond,
			safety: safetyCond,
			fuelPct: fuelLevel,
			hourMeter,
			notes: inspectionNotes || "Pre-rental dispatch checklist completed. Nominal condition."
		};
		if (activeContract) {
			approveCheckOut(activeContract.id, inspection);
			setCompletedMsg(`Check-Out Approved! ${foundAsset.id} dispatched under Contract #${activeContract.contractNumber}.`);
		} else setCompletedMsg(`Pre-inspection recorded for ${foundAsset.id}. Ready for assignment.`);
		setActiveStep(4);
	};
	const handleExecuteCheckin = () => {
		const inspection = {
			id: `insp-post-${Date.now()}`,
			contractId: activeContract?.id ?? `cnt-adhoc-${Date.now()}`,
			equipmentId: foundAsset.id,
			type: "post_checkin",
			inspectorName: currentUser.name,
			timestamp: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "),
			engine: engineCond,
			hydraulics: hydraulicsCond,
			body: bodyCond,
			tracksTires: tracksCond,
			cabin: cabinCond,
			lights: lightsCond,
			safety: safetyCond,
			fuelPct: fuelLevel,
			hourMeter,
			notes: inspectionNotes || "Post-rental return inspection completed."
		};
		if (activeContract) {
			approveCheckIn(activeContract.id, inspection);
			setInspectComparisonContract(activeContract);
			setCompletedMsg(`Check-In Completed! ${foundAsset.id} received. Ready for deposit refund review.`);
		} else setCompletedMsg(`Check-In recorded for ${foundAsset.id}.`);
		setActiveStep(4);
	};
	const resetForm = () => {
		setActiveStep(1);
		setCompletedMsg("");
		setInspectionNotes("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		crumb: "Check-In / Out Operations",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between rounded-[24px] border border-border/70 bg-white p-4 shadow-panel",
					children: [
						{
							num: 1,
							title: "1. Scan QR / RFID"
						},
						{
							num: 2,
							title: "2. Verify Customer & Payment"
						},
						{
							num: 3,
							title: "3. 9-Point Condition Inspection"
						},
						{
							num: 4,
							title: "4. Gate Pass Authorization"
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => s.num <= activeStep && setActiveStep(s.num),
						className: `flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all ${activeStep === s.num ? "bg-accent text-accent-foreground font-bold shadow-xs" : activeStep > s.num ? "text-ok font-semibold" : "text-muted-foreground opacity-60"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-5 w-5 items-center justify-center rounded-full bg-current text-[10px] text-background font-bold",
							children: activeStep > s.num ? "✓" : s.num
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[12.5px] hidden sm:inline",
							children: s.title
						})]
					}, s.num))
				}),
				showCameraScanner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-md animate-fade-in",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full max-w-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraQRScanner, {
							onScan: handleQRScanSuccess,
							onClose: () => setShowCameraScanner(false)
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: mode === "checkout" ? "Equipment Check-Out & Dispatch" : "Equipment Return & Check-In",
							subtitle: "Verified gate dispatch with real camera QR scanning and multi-point inspection",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 space-y-5 text-[13px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex rounded-full bg-muted/60 p-1 border border-border/60",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setMode("checkout");
												setActiveStep(1);
											},
											className: `flex-1 rounded-full py-2 text-[12.5px] font-bold transition-all ${mode === "checkout" ? "bg-accent text-accent-foreground shadow-xs" : "text-muted-foreground"}`,
											children: "Check-Out Dispatch"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setMode("checkin");
												setActiveStep(1);
											},
											className: `flex-1 rounded-full py-2 text-[12.5px] font-bold transition-all ${mode === "checkin" ? "bg-foreground text-background shadow-xs" : "text-muted-foreground"}`,
											children: "Return Check-In"
										})]
									}),
									activeStep === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 animate-fade-in",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5",
												children: "Scan Machine QR Tag"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 rounded-2xl border border-border bg-muted/20 p-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, {
														size: 18,
														className: "text-muted-foreground ml-2"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														value: assetId,
														onChange: (e) => setAssetId(e.target.value.toUpperCase()),
														placeholder: "Type or scan asset ID (e.g. EQX1007)...",
														className: "w-full bg-transparent text-[13.5px] font-bold text-foreground outline-none"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => setShowCameraScanner(true),
														className: "flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { size: 14 }), " Open Live Camera"]
													})
												]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5",
												children: "Or Quick Select from Fleet:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap gap-1.5",
												children: assets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => setAssetId(a.id),
													className: `rounded-full px-3 py-1 text-[11.5px] font-semibold border transition-all ${assetId === a.id ? "border-foreground bg-foreground text-background" : "border-border/80 bg-white text-muted-foreground hover:border-foreground"}`,
													children: [
														a.id,
														" (",
														a.type,
														")"
													]
												}, a.id))
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setActiveStep(2),
												className: "mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-[13px] font-bold text-background shadow-xs hover:opacity-95",
												children: [
													"Verify ",
													foundAsset?.id,
													" Contract & Payment ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })
												]
											})
										]
									}),
									activeStep === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 animate-fade-in",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-border/70 bg-card p-4 space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
												children: "Rental Pre-Flight Verification"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2 text-[12.5px]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between py-1 border-b border-border/40",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: "Customer Verification:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-ok font-bold flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), " Verified (Apex Infra Ltd.)"]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between py-1 border-b border-border/40",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: "Rental Contract:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-foreground",
															children: activeContract ? `#${activeContract.contractNumber}` : "Direct Dispatch"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between py-1 border-b border-border/40",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: "Monthly Rental Payment:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-ok font-bold",
															children: [
																"₹",
																(activeContract?.monthlyRentalRate ?? foundAsset.monthlyRentalRate).toLocaleString("en-IN"),
																" PAID"
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between py-1 border-b border-border/40",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: "Refundable Security Deposit:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-ok font-bold",
															children: [
																"₹",
																(activeContract?.securityDepositAmount ?? Math.round(foundAsset.monthlyRentalRate * foundAsset.securityDepositRatio)).toLocaleString("en-IN"),
																" HELD IN ESCROW"
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between py-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: "Agreement Acceptance:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-ok",
															children: "✓ Explicitly Signed by Customer"
														})]
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setActiveStep(1),
												className: "flex-1 rounded-full border border-border px-4 py-2.5 text-[12.5px] font-semibold text-foreground hover:bg-muted",
												children: "Back"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setActiveStep(3),
												className: "flex-[2] flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[12.5px] font-bold text-background hover:opacity-95",
												children: ["Proceed to 9-Point Inspection ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
											})]
										})]
									}),
									activeStep === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 animate-fade-in",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-border/70 bg-card p-4 space-y-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
														children: mode === "checkout" ? "Pre-Checkout 9-Point Checklist" : "Post-Return 9-Point Checklist"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[11px] text-muted-foreground font-medium",
														children: ["Inspector: ", currentUser.name]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid grid-cols-2 sm:grid-cols-3 gap-2.5",
													children: [
														{
															label: "Engine & Ignition",
															val: engineCond,
															set: setEngineCond
														},
														{
															label: "Hydraulics & Seals",
															val: hydraulicsCond,
															set: setHydraulicsCond
														},
														{
															label: "Body Work & Chassis",
															val: bodyCond,
															set: setBodyCond
														},
														{
															label: "Tracks / Tires",
															val: tracksCond,
															set: setTracksCond
														},
														{
															label: "Cabin & Controls",
															val: cabinCond,
															set: setCabinCond
														},
														{
															label: "Lights & Signals",
															val: lightsCond,
															set: setLightsCond
														},
														{
															label: "Safety Equipment",
															val: safetyCond,
															set: setSafetyCond
														}
													].map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-xl border border-border/60 bg-muted/20 p-2.5 text-[11.5px]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-foreground block mb-1",
															children: item.label
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex gap-1",
															children: [
																"Good",
																"Needs Attention",
																"Damaged"
															].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => item.set(c),
																className: `rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition-all ${item.val === c ? c === "Good" ? "bg-ok text-white font-bold" : c === "Needs Attention" ? "bg-warn text-warn-foreground font-bold" : "bg-danger text-white font-bold" : "bg-white text-muted-foreground hover:text-foreground"}`,
																children: c.slice(0, 4)
															}, c))
														})]
													}, idx))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-2 gap-3 pt-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block text-[10.5px] font-semibold text-muted-foreground mb-1",
														children: "Fuel Level (% Tank)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "number",
														value: fuelLevel,
														onChange: (e) => setFuelLevel(Number(e.target.value)),
														className: "w-full rounded-xl border border-border bg-muted/20 px-3 py-1.5 font-bold text-foreground outline-none"
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block text-[10.5px] font-semibold text-muted-foreground mb-1",
														children: "Hour Meter (hrs)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "number",
														value: hourMeter,
														onChange: (e) => setHourMeter(Number(e.target.value)),
														className: "w-full rounded-xl border border-border bg-muted/20 px-3 py-1.5 font-bold text-foreground outline-none"
													})] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[10.5px] font-semibold text-muted-foreground mb-1",
													children: "Inspection Notes & Observations"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: inspectionNotes,
													onChange: (e) => setInspectionNotes(e.target.value),
													placeholder: "e.g. Minor cosmetic paint wear on right boom; all hydraulics tight...",
													className: "w-full rounded-xl border border-border px-3 py-2 text-[12px] text-foreground outline-none"
												})] })
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setActiveStep(2),
												className: "flex-1 rounded-full border border-border px-4 py-2.5 text-[12.5px] font-semibold text-foreground hover:bg-muted",
												children: "Back"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: mode === "checkout" ? handleExecuteCheckout : handleExecuteCheckin,
												className: "flex-[2] flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[12.5px] font-bold text-accent-foreground shadow-xs hover:opacity-95",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 15 }),
													" Confirm & Sign ",
													mode === "checkout" ? "Check-Out" : "Check-In"
												]
											})]
										})]
									}),
									activeStep === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 animate-fade-in text-center py-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ok/15 text-ok",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 36 })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-xl font-bold text-foreground",
												children: "Operational Transaction Recorded"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-[13px] text-muted-foreground font-medium",
												children: completedMsg
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-border/60 bg-muted/20 p-4 text-left text-[12.5px] space-y-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: "Asset Tag:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
															className: "text-foreground",
															children: [
																foundAsset.id,
																" (",
																foundAsset.type,
																")"
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: "Inspector:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-foreground",
															children: currentUser.name
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: "Security Deposit Status:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-ok",
															children: "Secured in Escrow"
														})]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: resetForm,
													className: "flex-1 rounded-full bg-foreground px-5 py-3 text-[13px] font-bold text-background hover:opacity-95",
													children: "Process Another Asset"
												}), inspectComparisonContract && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setInspectComparisonContract(inspectComparisonContract),
													className: "flex-1 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground hover:opacity-95",
													children: "Review Deposit Refund"
												})]
											})
										]
									})
								]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Identified Asset & QR Tag",
							subtitle: "Real-time telemetric validation for gate dispatch",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 space-y-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-[24px] border border-border/60 bg-gradient-to-b from-slate-50/70 to-white p-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentHero, {
										asset: foundAsset,
										showTelemetryHUD: true
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-card p-4 space-y-2 text-[12.5px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Serial Number:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: foundAsset.serialNumber
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "QR Code Tag:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
												className: "rounded bg-muted px-2 py-0.5 text-[11px] font-mono text-foreground font-bold",
												children: foundAsset.qrCodePayload
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Monthly Base Rate:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
												className: "text-foreground",
												children: [
													"₹",
													foundAsset.monthlyRentalRate.toLocaleString("en-IN"),
													" / mo"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Refundable Security Deposit:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
												className: "text-ok",
												children: ["₹", Math.round(foundAsset.monthlyRentalRate * foundAsset.securityDepositRatio).toLocaleString("en-IN")]
											})]
										})
									]
								})]
							})
						})
					})]
				})
			]
		}), inspectComparisonContract && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectionComparisonModal, {
			contract: inspectComparisonContract,
			isOpen: Boolean(inspectComparisonContract),
			onClose: () => setInspectComparisonContract(null)
		})]
	});
}
//#endregion
export { CheckPage as component };
