import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { I as CircleCheck, J as ArrowRight, K as BellOff, d as ShieldAlert, t as Zap } from "../_libs/lucide-react.mjs";
import { C as useFleet, a as LeafletMap, f as TODAY, g as openActionSheet, s as Panel, u as Shell, v as resolveAlert, x as snoozeAlert, y as selectAsset } from "./Shell-CeYa9aSo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alerts-b0e4Wo_j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function buildAlerts(assets) {
	const out = [];
	for (const a of assets) {
		const days = Math.round((TODAY.getTime() - new Date(a.checkIn).getTime()) / 864e5);
		if (days > 0 && a.status !== "Idle") out.push({
			id: `${a.id}-od`,
			asset: a.id,
			type: "Overdue",
			severity: "critical",
			title: `${a.id} Rental Overdue (${days} days past return)`,
			signal: `Return due date was ${a.checkIn} · zero active check-in logged`,
			impact: "Accumulating unexpected idle lease cost ($2,400/mo) & compliance risk",
			action: "Schedule depot pickup & off-hire"
		});
		if (!a.site || !a.operator) out.push({
			id: `${a.id}-un`,
			asset: a.id,
			type: "Unassigned",
			severity: "warning",
			title: `${a.id} Parked Unassigned in Staging Yard`,
			signal: `${!a.site ? "No site assigned" : ""}${!a.site && !a.operator ? " · " : ""}${!a.operator ? "No operator allocated" : ""} · 12 idle hrs/day`,
			impact: "Zero asset ROI while regional sites (S003) report deficit",
			action: "Reassign & Pre-position to Site S003"
		});
		if (a.utilizationPct < 25 && a.status !== "Unassigned") out.push({
			id: `${a.id}-lu`,
			asset: a.id,
			type: "Low Utilization",
			severity: "warning",
			title: `${a.id} Low Duty Cycle Utilization (${a.utilizationPct}%)`,
			signal: `${a.engineHrsPerDay}h engine vs ${a.idleHrsPerDay}h idle per day`,
			impact: "Sub-optimal operating efficiency; idle lease penalties",
			action: "Reallocate to higher-demand trenching shift"
		});
		if (a.anomalies?.some((an) => an.includes("Continuous high utilization"))) out.push({
			id: `${a.id}-maint`,
			asset: a.id,
			type: "Maintenance",
			severity: "info",
			title: `${a.id} Continuous High Duty Cycle (Service Inspection Due)`,
			signal: "100% utilization over 30 days with 0 idle hours logged",
			impact: "Risk of unexpected mechanical wear without routine inspection",
			action: "Schedule 30-day preventative check"
		});
	}
	return out;
}
function AlertsPage() {
	const { assets, resolvedAlertIds, snoozedAlertIds, optimizationPlans } = useFleet();
	const [filterSeverity, setFilterSeverity] = (0, import_react.useState)("all");
	const [selectedAlerts, setSelectedAlerts] = (0, import_react.useState)([]);
	const allAlerts = buildAlerts(assets);
	const activeAlerts = allAlerts.filter((a) => !resolvedAlertIds.has(a.id) && !snoozedAlertIds.has(a.id));
	const filteredAlerts = filterSeverity === "all" ? activeAlerts : filterSeverity === "resolved" ? allAlerts.filter((a) => resolvedAlertIds.has(a.id)) : activeAlerts.filter((a) => a.severity === filterSeverity);
	const flaggedAssetIds = new Set(activeAlerts.map((a) => a.asset));
	const flaggedAssets = assets.filter((a) => flaggedAssetIds.has(a.id));
	const handleToggleSelect = (id) => {
		setSelectedAlerts((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
	};
	const handleBulkResolve = () => {
		selectedAlerts.forEach((id) => resolveAlert(id));
		setSelectedAlerts([]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		crumb: "Alert Command Center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-border/70 bg-white p-5 shadow-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-danger/15 text-danger font-bold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 22 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold tracking-tight text-foreground",
							children: "Alert Command Center"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12.5px] text-muted-foreground",
							children: "Triage operational exceptions, overdue returns, and low-efficiency equipment."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1 rounded-full bg-muted/60 p-1 border border-border/60 text-[12px]",
						children: [
							{
								id: "all",
								label: `All Active (${activeAlerts.length})`
							},
							{
								id: "critical",
								label: "Critical"
							},
							{
								id: "warning",
								label: "Warning"
							},
							{
								id: "info",
								label: "Info"
							},
							{
								id: "resolved",
								label: `Resolved (${resolvedAlertIds.size})`
							}
						].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFilterSeverity(tab.id),
							className: `rounded-full px-3.5 py-1.5 font-semibold transition-all ${filterSeverity === tab.id ? "bg-white text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
							children: tab.label
						}, tab.id))
					})]
				}),
				selectedAlerts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-2xl border border-border/80 bg-foreground p-3.5 text-background shadow-float animate-fade-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[13px] font-bold px-2",
						children: [
							selectedAlerts.length,
							" alert",
							selectedAlerts.length > 1 ? "s" : "",
							" selected"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleBulkResolve,
							className: "flex items-center gap-1.5 rounded-full bg-ok px-4 py-1.5 text-[12px] font-bold text-white shadow-xs hover:opacity-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), " Resolve Selected"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedAlerts([]),
							className: "rounded-full bg-white/20 px-3.5 py-1.5 text-[12px] font-semibold text-white hover:bg-white/30",
							children: "Clear"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7 space-y-3.5",
						children: filteredAlerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[26px] border border-border/60 bg-white p-12 text-center text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									size: 36,
									className: "mx-auto text-ok mb-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-base font-bold text-foreground",
									children: "No active alerts in this category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[13px] mt-1",
									children: "All equipment within nominal operational parameters."
								})
							]
						}) : filteredAlerts.map((alert) => {
							const isChecked = selectedAlerts.includes(alert.id);
							const matchingPlan = optimizationPlans.find((p) => p.assetId === alert.asset);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-[24px] border bg-card p-5 shadow-panel transition-all hover:shadow-widget ${alert.severity === "critical" ? "border-danger/40 bg-gradient-to-r from-danger/5 via-card to-card" : "border-border/70"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-start justify-between gap-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: isChecked,
											onChange: () => handleToggleSelect(alert.id),
											className: "mt-1 h-4 w-4 rounded border-border accent-foreground cursor-pointer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${alert.severity === "critical" ? "bg-danger text-white" : alert.severity === "warning" ? "bg-warn text-warn-foreground" : "bg-muted text-muted-foreground"}`,
													children: alert.type
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-[14px] font-bold text-foreground",
													children: alert.title
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-[12px] text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: "Signal:"
													}),
													" ",
													alert.signal
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-[12px] text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: "Impact:"
													}),
													" ",
													alert.impact
												]
											})
										] })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-[12px] font-bold text-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
												size: 13,
												className: "text-brand"
											}),
											"Recommended: ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-brand",
												children: alert.action
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => snoozeAlert(alert.id),
												title: "Snooze alert",
												className: "flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1.5 text-[11.5px] font-medium text-muted-foreground hover:text-foreground shadow-2xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellOff, { size: 12 }), " Snooze"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => resolveAlert(alert.id),
												className: "flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1.5 text-[11.5px] font-semibold text-ok hover:bg-ok/10 shadow-2xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 }), " Resolve"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => {
													if (matchingPlan) openActionSheet(matchingPlan);
													else selectAsset(alert.asset);
												},
												className: "flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[12px] font-bold text-accent-foreground shadow-xs hover:opacity-95",
												children: ["Take Action ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 12 })]
											})
										]
									})]
								})]
							}, alert.id);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: `Flagged Assets Topology (${flaggedAssets.length})`,
							subtitle: "Geographic distribution of assets requiring operational attention",
							className: "h-[560px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeafletMap, {
								assets: flaggedAssets,
								selectedId: flaggedAssets[0]?.id,
								onSelect: selectAsset
							})
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { AlertsPage as component };
