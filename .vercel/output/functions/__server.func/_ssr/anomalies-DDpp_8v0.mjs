import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { I as CircleCheck, J as ArrowRight, R as ChevronUp, s as TriangleAlert, t as Zap, z as ChevronDown } from "../_libs/lucide-react.mjs";
import { C as useFleet, g as openActionSheet, s as Panel, u as Shell, v as resolveAlert, y as selectAsset } from "./Shell-CeYa9aSo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anomalies-DDpp_8v0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatAnomaly(asset, rawAnomaly, idx) {
	if (rawAnomaly.includes("Zero engine runtime") || rawAnomaly.includes("0 engine")) return {
		key: `${asset.id}-an-${idx}`,
		asset,
		title: "ZERO ENGINE RUNTIME RECORDED",
		severity: "critical",
		ruleExpression: "engineHrsPerDay == 0 over full operating window",
		detectedValue: `0.0 hrs engine × ${asset.operatingDays} operating days (${asset.idleHrsPerDay} idle hrs/day)`,
		possibleCause: "Asset is parked in holding yard or telemetric ignition sensor requires calibration.",
		recommendation: "Reassign machine to high-demand site or schedule off-hire return to eliminate idle standby costs."
	};
	if (rawAnomaly.includes("Continuous high utilization") || rawAnomaly.includes("no idle time")) return {
		key: `${asset.id}-an-${idx}`,
		asset,
		title: "CONTINUOUS PEAK DUTY CYCLE (SERVICE DUE)",
		severity: "warning",
		ruleExpression: "utilizationPct >= 95% AND idleHrsPerDay == 0 across 30 days",
		detectedValue: `${asset.utilizationPct}% utilization · 8.0 hrs/day continuous heavy load`,
		possibleCause: "24/7 quarry earthmoving shift without recorded maintenance cooldown.",
		recommendation: "Schedule a preventative 50-hour hydraulic & track wear inspection before next deployment window."
	};
	if (rawAnomaly.includes("No site") || rawAnomaly.includes("No operator")) return {
		key: `${asset.id}-an-${idx}`,
		asset,
		title: "UNASSIGNED ASSET IN STAGING FIELD",
		severity: "warning",
		ruleExpression: "site == null || operator == null while asset status != 'Idle'",
		detectedValue: `Site: ${asset.site ?? "None"} · Operator: ${asset.operator ?? "None"}`,
		possibleCause: "Off-contract returned to staging yard without formal dispatch booking.",
		recommendation: "Assign certified operator and dispatch to Site S003 to fill active regional demand deficit."
	};
	return {
		key: `${asset.id}-an-${idx}`,
		asset,
		title: rawAnomaly.toUpperCase(),
		severity: "info",
		ruleExpression: "custom telemetry threshold trigger",
		detectedValue: `${asset.utilizationPct}% utilization · ${asset.idleHrsPerDay}h idle`,
		possibleCause: "Operational anomaly detected by autonomous fleet monitoring rule.",
		recommendation: "Review asset telemetry logs and inspect machine condition."
	};
}
function AnomaliesPage() {
	const { assets, optimizationPlans, resolvedAlertIds } = useFleet();
	const [selectedAnomalyKey, setSelectedAnomalyKey] = (0, import_react.useState)(null);
	const [expandedRuleKey, setExpandedRuleKey] = (0, import_react.useState)(null);
	const activeRows = assets.flatMap((a) => (a.anomalies ?? []).map((an, i) => formatAnomaly(a, an, i))).filter((r) => !resolvedAlertIds.has(r.key));
	const selectedAnomaly = activeRows.find((r) => r.key === selectedAnomalyKey);
	const toggleRuleExpand = (key) => {
		setExpandedRuleKey((prev) => prev === key ? null : key);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		crumb: "Telemetry Anomalies",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-border/70 bg-white p-5 shadow-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-warn/20 text-warn-foreground font-bold shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 22 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold tracking-tight text-foreground",
						children: "Autonomous Telemetry Anomaly Detection"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] text-muted-foreground",
						children: "Synthesizing real-time IoT sensors, duty cycles, and rule-based exceptions into human-readable decisions."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-accent px-4 py-1.5 text-[12px] font-bold text-accent-foreground shadow-xs",
					children: [activeRows.length, " Active Telemetry Exceptions"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-7 space-y-4",
					children: activeRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[26px] border border-border/60 bg-white p-12 text-center text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								size: 36,
								className: "mx-auto text-ok mb-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-base font-bold text-foreground",
								children: "All Telemetry Nominal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px] mt-1",
								children: "Zero rule violations detected across the active fleet."
							})
						]
					}) : activeRows.map((item) => {
						const isExpanded = expandedRuleKey === item.key;
						const matchingPlan = optimizationPlans.find((p) => p.assetId === item.asset.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => setSelectedAnomalyKey(item.key),
							className: `rounded-[24px] border bg-card p-5 shadow-panel transition-all cursor-pointer hover:shadow-widget ${item.key === selectedAnomalyKey ? "border-accent ring-2 ring-accent/50" : "border-border/70"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${item.severity === "critical" ? "bg-danger text-white" : "bg-warn text-warn-foreground"}`,
											children: item.severity.toUpperCase()
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-[14.5px] font-bold text-foreground tracking-tight",
											children: item.title
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[12px] font-bold text-foreground",
										children: [
											item.asset.id,
											" · ",
											item.asset.type
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 rounded-2xl border border-border/60 bg-muted/20 p-3 text-[12px] space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground font-medium",
											children: "Detected Telemetric Signal:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: item.detectedValue
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground font-medium",
											children: "Likely Cause:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground/90",
											children: item.possibleCause
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: (e) => {
											e.stopPropagation();
											toggleRuleExpand(item.key);
										},
										className: "flex items-center gap-1 text-[11.5px] font-semibold text-muted-foreground hover:text-foreground transition-colors",
										children: [isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 }), "Why was this flagged? (Technical Rule Logic)"]
									}), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 rounded-xl border border-border/70 bg-slate-900 text-slate-100 p-3 font-mono text-[11px] space-y-1 animate-fade-in",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-accent font-semibold",
												children: "// Autonomous telemetry trigger definition"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-400",
												children: "RULE: "
											}), item.ruleExpression] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-400",
												children: "EVAL: "
											}), item.detectedValue] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 pt-3 border-t border-border/50 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[12px] font-semibold text-brand flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 13 }),
											" ",
											item.recommendation
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: (e) => {
												e.stopPropagation();
												resolveAlert(item.key);
											},
											className: "rounded-full border border-border bg-white px-3 py-1.5 text-[11.5px] font-semibold text-ok hover:bg-ok/10",
											children: "Resolve"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: (e) => {
												e.stopPropagation();
												if (matchingPlan) openActionSheet(matchingPlan);
												else selectAsset(item.asset.id);
											},
											className: "flex items-center gap-1 rounded-full bg-accent px-3.5 py-1.5 text-[11.5px] font-bold text-accent-foreground shadow-xs hover:opacity-95",
											children: ["Take Action ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 12 })]
										})]
									})]
								})
							]
						}, item.key);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Telemetry Inspector & Diagnostic Drawer",
						subtitle: "Detailed sensor values and automated remediation actions",
						children: selectedAnomaly ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 space-y-4 text-[13px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-muted/20 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
											children: "Target Equipment"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "text-lg font-bold text-foreground mt-0.5",
											children: [
												selectedAnomaly.asset.id,
												" — ",
												selectedAnomaly.asset.type
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[12px] text-muted-foreground mt-0.5",
											children: [
												"Serial: ",
												selectedAnomaly.asset.serialNumber,
												" · Location: ",
												selectedAnomaly.asset.location
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-card p-4 space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
											children: "Live Telemetric Telemetry"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between py-1 border-b border-border/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Engine Runtime:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
												className: "text-foreground",
												children: [selectedAnomaly.asset.engineHrsPerDay, " hrs/day"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between py-1 border-b border-border/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Idle Runtime:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
												className: "text-foreground",
												children: [selectedAnomaly.asset.idleHrsPerDay, " hrs/day"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between py-1 border-b border-border/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Fuel Tank Level:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
												className: "text-foreground",
												children: [selectedAnomaly.asset.fuelPct, "%"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between py-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Mechanical Condition:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: selectedAnomaly.asset.condition
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-accent/60 bg-accent/20 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-[11px] font-bold uppercase tracking-wider text-accent-foreground",
										children: "AI Action Recommendation"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[12.5px] text-accent-foreground/90 font-medium leading-relaxed",
										children: selectedAnomaly.recommendation
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										const plan = optimizationPlans.find((p) => p.assetId === selectedAnomaly.asset.id);
										if (plan) openActionSheet(plan);
										else selectAsset(selectedAnomaly.asset.id);
									},
									className: "w-full flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-[13px] font-bold text-background shadow-xs hover:opacity-95",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 14 }), " Mobilize Remediation Plan"]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-12 text-center text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13px]",
								children: "Select any anomaly card on the left to inspect detailed telemetry diagnostics."
							})
						})
					})
				})]
			})]
		})
	});
}
//#endregion
export { AnomaliesPage as component };
