import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { J as ArrowRight, c as TrendingUp, l as Sparkles, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { C as useFleet, _ as reassignAsset, d as StatusPill, g as openActionSheet, l as SITES_META, p as Table, s as Panel, u as Shell } from "./Shell-CeYa9aSo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forecast-CVEz6j_O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForecastPage() {
	const { assets, optimizationPlans } = useFleet();
	const [horizon, setHorizon] = (0, import_react.useState)("7d");
	const horizonMultiplier = horizon === "7d" ? 1 : horizon === "14d" ? 1.4 : 2;
	const demandData = Object.values(SITES_META).map((site) => {
		const onSite = assets.filter((a) => a.site === site.id);
		const predictedNeed = Math.round(site.demandForecast.need * horizonMultiplier);
		const gap = Math.max(0, predictedNeed - onSite.length);
		return {
			siteId: site.id,
			name: site.name,
			primaryNeed: site.demandForecast.primaryNeed,
			need: predictedNeed,
			have: onSite.length,
			gap,
			confidence: site.demandForecast.confidence
		};
	});
	const idleUnassigned = assets.filter((a) => a.utilizationPct < 25);
	assets.find((a) => a.id === "EQX1007");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		crumb: "Demand Forecast",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-border/70 bg-white p-5 shadow-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground font-bold shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 22 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold tracking-tight text-foreground",
							children: "Predictive Equipment Demand Horizon"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12.5px] text-muted-foreground",
							children: "AI projection based on regional infrastructure construction milestones and historical utilization."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1 rounded-full bg-muted/60 p-1 border border-border/60 text-[12px]",
						children: [
							{
								id: "7d",
								label: "Next 7 Days"
							},
							{
								id: "14d",
								label: "Next 14 Days"
							},
							{
								id: "30d",
								label: "Next 30 Days"
							}
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setHorizon(h.id),
							className: `rounded-full px-4 py-1.5 font-bold transition-all ${horizon === h.id ? "bg-accent text-accent-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
							children: h.label
						}, h.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Predicted Demand vs On-Site Fleet by Location",
							subtitle: "Comparing required heavy machinery against currently mobilized inventory",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4 p-6",
								children: demandData.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-card p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-[13px] mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-foreground",
														children: d.siteId
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[12px] text-muted-foreground",
														children: ["· ", d.name]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-md bg-muted px-2 py-0.5 text-[10.5px] font-semibold text-foreground",
														children: d.primaryNeed
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 tabular-nums text-[12px]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Need: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: d.need
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "|"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Have: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-ok",
														children: d.have
													})] }),
													d.gap > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "rounded-full bg-warn/20 px-2 py-0.5 text-[11px] font-bold text-warn-foreground",
														children: ["Gap: -", d.gap]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full bg-ok/15 px-2 py-0.5 text-[11px] font-bold text-ok",
														children: "Satisfied"
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex h-3.5 gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex-1 overflow-hidden rounded-full bg-muted",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-full rounded-full bg-accent transition-all duration-500",
													style: { width: `${Math.min(d.need / 4 * 100, 100)}%` },
													title: `Predicted need: ${d.need}`
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex-1 overflow-hidden rounded-full bg-muted",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-full rounded-full bg-ok transition-all duration-500",
													style: { width: `${Math.min(d.have / 4 * 100, 100)}%` },
													title: `On site: ${d.have}`
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex items-center justify-between text-[10.5px] text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lime track: Projected Demand · Green track: Active Fleet" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 font-semibold text-ok",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }),
													" ",
													d.confidence,
													" Confidence"
												]
											})]
										})
									]
								}, d.siteId))
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-5 space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "AI Pre-Positioning Recommendations",
							subtitle: "1-click operational bridge from forecast to dispatch",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/70 bg-accent p-5 shadow-float",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-accent-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 13 }), " Forecast Gap Solution"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "High Confidence" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-2 text-base font-bold text-accent-foreground leading-snug",
											children: "Pre-position EQX1007 → Site S003 (Bhopal)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1.5 text-[12px] text-accent-foreground/85 leading-relaxed font-medium",
											children: "S003 requires 2 additional excavators for next week's deep excavation phase. Unassigned excavator EQX1007 (0% util, 12h idle) is available in the central staging yard."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 rounded-xl bg-white/75 p-3 text-[11.5px] text-foreground space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Expected Utilization Uplift:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-ok",
													children: "+18% fleet average"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Transit Duration:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground",
													children: "2.5 hrs flatbed"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												if (optimizationPlans[0]) openActionSheet(optimizationPlans[0]);
												else reassignAsset("EQX1007", "S003", "OP101", "Pre-positioned from forecast");
											},
											className: "mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-[12.5px] font-bold text-background shadow-xs hover:opacity-95",
											children: ["Execute Pre-position EQX1007", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 13 })]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/70 bg-card p-5 shadow-panel",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Standby Elimination" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-danger",
												children: "Overdue 41d"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-2 text-base font-bold text-foreground",
											children: "Return EQX1002 (Crane) to Central Off-Hire Depot"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1.5 text-[12px] text-muted-foreground leading-relaxed",
											children: "Zero demand forecasted across all sites for heavy crane equipment over the next 30 days. Off-hiring EQX1002 saves $2,400/month."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												if (optimizationPlans[1]) openActionSheet(optimizationPlans[1]);
											},
											className: "mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[12px] font-bold text-foreground hover:bg-muted shadow-xs",
											children: ["Review Decommission Plan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 12 })]
										})
									]
								})]
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Predictive Signal Ranking & Redeployment Matrix",
					subtitle: "Ranked list of idle equipment ready for deployment to forecast deficit sites",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
						columns: [
							{
								key: "asset",
								label: "Asset"
							},
							{
								key: "type",
								label: "Type"
							},
							{
								key: "site",
								label: "Current Site"
							},
							{
								key: "status",
								label: "Status"
							},
							{
								key: "signal",
								label: "Predictive Signal"
							},
							{
								key: "util",
								label: "Util %",
								align: "right"
							}
						],
						rows: idleUnassigned.map((a) => ({
							id: a.id,
							cells: {
								asset: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: a.id
								}),
								type: a.type,
								site: a.site ? `Site ${a.site}` : "Unassigned Yard",
								status: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: a.status }),
								signal: `${a.engineHrsPerDay}h engine vs ${a.idleHrsPerDay}h idle/day → prime redeployment candidate`,
								util: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-foreground",
									children: [a.utilizationPct, "%"]
								})
							}
						}))
					})
				})
			]
		})
	});
}
//#endregion
export { ForecastPage as component };
