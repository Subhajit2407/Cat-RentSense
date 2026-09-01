import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { F as Clock, H as Calendar, I as CircleCheck, J as ArrowRight, S as MapPin, U as Building2, c as TrendingUp, i as User, l as Sparkles, n as X, r as Users, t as Zap } from "../_libs/lucide-react.mjs";
import { C as useFleet, S as summary, _ as reassignAsset, a as LeafletMap, b as selectSite, c as PlanningWorkspace, d as StatusPill, g as openActionSheet, l as SITES_META, n as EquipmentHero, o as OptimizationCenter, p as Table, r as Gantt, s as Panel, t as EQUIPMENT_PHOTOS, u as Shell, y as selectAsset } from "./Shell-CeYa9aSo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CPpwr1dr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AssetInspector({ asset, activeTab, onTabChange }) {
	const { optimizationPlans } = useFleet();
	const [expandedSections, setExpandedSections] = (0, import_react.useState)({
		telemetry: true,
		rental: true,
		financial: false
	});
	const matchingPlan = optimizationPlans.find((p) => p.assetId === asset.id);
	const getAIInsight = () => {
		if (asset.utilizationPct === 0 && asset.status === "Unassigned") return "EQX1007 has logged 0 engine hours with 12 idle hrs/day while Site S003 demand is rising. Redeployment will yield +72% utilization.";
		if (asset.status === "Overdue") return "Contract expired on " + asset.checkIn + " (41 days overdue). Continuing off-contract accumulates unwanted rental and standby costs.";
		if (asset.utilizationPct >= 95) return "Continuous high utilization with 0 idle hours. Recommend scheduling routine maintenance interval to prevent field breakdown.";
		if (asset.utilizationPct < 25) return "Low utilization pattern detected (" + asset.utilizationPct + "%). Idle ratio is high relative to operating cost.";
		return "Operational parameters within normal nominal ranges. Telemetry reporting healthy engine-to-idle duty cycle.";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-6 pt-5 pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
							children: [
								asset.type,
								" · ",
								asset.serialNumber
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold tracking-tight text-foreground",
								children: asset.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: asset.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 flex items-center gap-1 text-[12px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								size: 12,
								className: "text-muted-foreground"
							}), asset.location]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10.5px] uppercase font-semibold text-muted-foreground",
							children: "Utilization"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-2xl font-black tracking-tight text-foreground tabular-nums",
							children: [asset.utilizationPct, "%"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-6 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative rounded-[24px] border border-border/60 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40 p-4 shadow-apple-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentHero, {
						asset,
						showTelemetryHUD: true
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-6 pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1 border-b border-border/60 pb-2",
					children: [
						"Overview",
						"Planning",
						"Statistics",
						"History"
					].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onTabChange(tab),
						className: `rounded-full px-3.5 py-1 text-[12px] font-medium transition-all ${activeTab === tab ? "bg-foreground text-background shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"}`,
						children: tab
					}, tab))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 px-6 py-4 space-y-4 text-[13px]",
				children: [
					activeTab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-accent/70 bg-accent/20 p-3.5 shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-[11.5px] font-bold text-accent-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 13 }), "Operational AI Insight"]
								}), matchingPlan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => openActionSheet(matchingPlan),
									className: "flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[10.5px] font-bold text-accent-foreground shadow-2xs hover:opacity-90",
									children: ["Action Plan ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 10 })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-[12.5px] leading-relaxed text-accent-foreground/90 font-medium",
								children: getAIInsight()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 sm:grid-cols-4 gap-2 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/60 bg-card p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase font-semibold text-muted-foreground",
										children: "Engine/day"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-base font-bold text-foreground tabular-nums",
										children: [asset.engineHrsPerDay, "h"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/60 bg-card p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase font-semibold text-muted-foreground",
										children: "Idle/day"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-base font-bold text-foreground tabular-nums",
										children: [asset.idleHrsPerDay, "h"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/60 bg-card p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase font-semibold text-muted-foreground",
										children: "Operating"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-base font-bold text-foreground tabular-nums",
										children: [asset.operatingDays, "d"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/60 bg-card p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase font-semibold text-muted-foreground",
										children: "Fuel Tank"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-base font-bold text-foreground tabular-nums",
										children: [asset.fuelPct, "%"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "7-Day Utilization Trend"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-semibold text-ok flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 12 }), " Live Sync"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-end gap-2 h-14 pt-2",
								children: asset.telemetryTrend.map((val, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 flex flex-col items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full rounded-t-md bg-accent transition-all hover:opacity-80",
										style: { height: `${Math.max(val / 100 * 44, 4)}px` },
										title: `Day ${i + 1}: ${val}%`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[9px] text-muted-foreground",
										children: ["D", i + 1]
									})]
								}, i))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-card p-4 space-y-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between pb-1 border-b border-border/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "Assignment & Rental Period"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] text-muted-foreground",
										children: "Current Operator"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold text-foreground flex items-center gap-1 mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
											size: 13,
											className: "text-muted-foreground"
										}), asset.operator ?? "Unassigned"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] text-muted-foreground",
										children: "Active Site"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold text-foreground flex items-center gap-1 mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
											size: 13,
											className: "text-muted-foreground"
										}), asset.site ? `Site ${asset.site}` : "Staging Yard"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] text-muted-foreground",
										children: "Check-Out Date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold text-foreground flex items-center gap-1 mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
											size: 13,
											className: "text-muted-foreground"
										}), asset.checkOut]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] text-muted-foreground",
										children: "Check-In Due"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold text-foreground flex items-center gap-1 mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
											size: 13,
											className: "text-muted-foreground"
										}), asset.checkIn]
									})] })
								]
							})]
						})
					] }),
					activeTab === "Planning" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-card p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-[12px] font-bold text-foreground",
									children: "Operational Planning Forecast"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[12px] text-muted-foreground leading-relaxed",
									children: [
										"Projected redeployment profile for ",
										asset.id,
										" based on regional civil construction demand."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 rounded-xl border border-border/60 bg-muted/30 p-3 text-[12px] space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Recommended Destination"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: "Site S003 (Bhopal Metro)"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Transit Distance"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: "142 km (~2.5 hrs flatbed)"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Target Project Phase"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: "Deep Trench Excavation"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Expected Utilization Delta"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-ok",
												children: "+18% fleet average (+72% on machine)"
											})]
										})
									]
								}),
								matchingPlan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => openActionSheet(matchingPlan),
									className: "mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[12.5px] font-bold text-accent-foreground shadow-xs hover:opacity-95",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), " Open AI Action Proposal"]
								})
							]
						})
					}),
					activeTab === "Statistics" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-card p-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[12px] font-bold text-foreground",
								children: "Detailed Telemetric Breakdown"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-[12px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between py-1 border-b border-border/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Total Accumulated Engine Time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-foreground tabular-nums",
											children: [(asset.engineHrsPerDay * asset.operatingDays).toFixed(1), " hrs"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between py-1 border-b border-border/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Total Accumulated Idle Time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-foreground tabular-nums",
											children: [(asset.idleHrsPerDay * asset.operatingDays).toFixed(1), " hrs"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between py-1 border-b border-border/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Idle-to-Engine Ratio"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground tabular-nums",
											children: asset.engineHrsPerDay > 0 ? (asset.idleHrsPerDay / asset.engineHrsPerDay).toFixed(2) : "Infinite (100% idle)"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between py-1 border-b border-border/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Estimated Fuel Consumed"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-foreground tabular-nums",
											children: [(asset.engineHrsPerDay * asset.operatingDays * 14.5).toFixed(0), " Liters"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between py-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Mechanical Condition Index"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-ok",
											children: "98.4% (Nominal)"
										})]
									})
								]
							})]
						})
					}),
					activeTab === "History" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[12px] font-bold text-foreground px-1",
							children: "Auditable Rental & Event Log"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative pl-6 space-y-4 border-l-2 border-border/60 ml-2",
							children: asset.history.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-foreground shadow-xs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-card p-3 shadow-2xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
												className: "text-[12px] font-bold text-foreground",
												children: h.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground",
												children: h.time
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[11.5px] text-muted-foreground leading-relaxed",
											children: h.detail
										}),
										h.site && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "mt-2 inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-foreground",
											children: [
												"Site ",
												h.site,
												" ",
												h.operator ? `· Op: ${h.operator}` : ""
											]
										})
									]
								})]
							}, h.id))
						})]
					})
				]
			})
		]
	});
}
function SiteInspector({ siteId, onClose }) {
	const { assets } = useFleet();
	const site = SITES_META[siteId];
	if (!site) return null;
	const onSiteAssets = assets.filter((a) => a.site === siteId);
	const unassignedExcavator = assets.find((a) => a.status === "Unassigned" && a.type === site.demandForecast.primaryNeed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute right-4 top-4 z-[1002] w-80 sm:w-96 overflow-hidden rounded-[24px] border border-border/80 bg-white/95 p-5 shadow-float backdrop-blur-xl animate-scale-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
							children: site.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-accent/80 px-2 py-0.5 text-[10px] font-bold text-accent-foreground",
							children: [
								"Demand: ",
								site.demandForecast.need,
								" req."
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[16px] font-bold tracking-tight text-foreground leading-snug",
						children: site.name
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-3 gap-2 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/60 bg-muted/30 p-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase font-semibold text-muted-foreground",
							children: "Required"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-bold text-foreground tabular-nums",
							children: site.demandForecast.need
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/60 bg-muted/30 p-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase font-semibold text-muted-foreground",
							children: "On Site"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-bold text-foreground tabular-nums",
							children: onSiteAssets.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl border p-2.5 ${site.demandForecast.gap > 0 ? "border-warn/40 bg-warn/15 text-warn-foreground" : "border-border/60 bg-ok/10 text-ok"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase font-semibold",
							children: "Demand Gap"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-bold tabular-nums",
							children: site.demandForecast.gap > 0 ? `-${site.demandForecast.gap}` : "Optimal"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
					children: "Active Units On Site"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 space-y-1.5",
					children: onSiteAssets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] text-muted-foreground italic",
						children: "No equipment currently assigned."
					}) : onSiteAssets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => selectAsset(a.id),
						className: "flex items-center justify-between rounded-xl border border-border/50 bg-card p-2 text-[12px] cursor-pointer hover:bg-muted/40 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${a.status === "Active" ? "bg-ok" : "bg-warn"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: a.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: ["· ", a.type]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right tabular-nums",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-foreground",
								children: [a.utilizationPct, "%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground ml-1",
								children: "util"
							})]
						})]
					}, a.id))
				})]
			}),
			site.demandForecast.gap > 0 && unassignedExcavator && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-2xl border border-accent/60 bg-accent/20 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-[11px] font-bold text-accent-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 13 }), "Instant AI Pre-position"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[12px] text-accent-foreground/90",
						children: [
							"Unassigned ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: unassignedExcavator.id }),
							" (",
							unassignedExcavator.type,
							") is available to fill this site gap."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => reassignAsset(unassignedExcavator.id, site.id, "OP101", `Filled demand gap at ${site.name}`),
						className: "mt-2.5 w-full flex items-center justify-center gap-1.5 rounded-full bg-accent px-3 py-2 text-[12px] font-bold text-accent-foreground shadow-xs hover:opacity-95",
						children: [
							"Pre-position ",
							unassignedExcavator.id,
							" → ",
							site.id,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 13 })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3.5 flex items-center justify-between pt-3 border-t border-border/50 text-[11px] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 12 }),
						"Manager: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: site.manager
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1 text-ok",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 }), " Telemetry Live"]
				})]
			})
		]
	});
}
function Dashboard() {
	const { assets, selectedId, selectedSiteId, appMode } = useFleet();
	const [inspectorTab, setInspectorTab] = (0, import_react.useState)("Overview");
	summary(assets);
	const sel = assets.find((a) => a.id === selectedId) ?? assets[0];
	if (appMode === "optimizer") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		crumb: "Optimizer Center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizationCenter, {})
	});
	if (appMode === "planning") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		crumb: "Operational Planning",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanningWorkspace, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		crumb: "Control Tower",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						title: "Live Site Map & Regional Operations",
						subtitle: "Interactive equipment GPS telemetry and site demand coverage",
						className: "h-[560px]",
						bodyClassName: "relative h-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeafletMap, {
							assets,
							selectedId,
							onSelect: selectAsset,
							onSelectSite: selectSite
						}), selectedSiteId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteInspector, {
							siteId: selectedSiteId,
							onClose: () => selectSite(null)
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Spatial Asset Inspector",
						subtitle: "Live mechanical condition, telemetry trend & rental history",
						className: "h-[560px]",
						bodyClassName: "h-full",
						children: sel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetInspector, {
							asset: sel,
							activeTab: inspectorTab,
							onTabChange: setInspectorTab
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: `Equipment Fleet (${assets.length})`,
						subtitle: "Live telemetry and deployment overview across all active contracts",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
							columns: [
								{
									key: "photo",
									label: ""
								},
								{
									key: "id",
									label: "Asset"
								},
								{
									key: "type",
									label: "Type"
								},
								{
									key: "site",
									label: "Site"
								},
								{
									key: "status",
									label: "Status"
								},
								{
									key: "util",
									label: "Util %",
									align: "right"
								}
							],
							rows: assets.map((a) => ({
								id: a.id,
								highlight: a.id === selectedId,
								cells: {
									photo: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-8 w-11 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-white p-0.5 shadow-2xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: EQUIPMENT_PHOTOS[a.type],
											alt: a.type,
											className: "h-full w-full object-contain mix-blend-multiply"
										})
									}),
									id: a.id,
									type: a.type,
									site: a.site ? `Site ${a.site}` : "Unassigned",
									status: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: a.status }),
									util: `${a.utilizationPct}%`
								}
							})),
							onRowClick: selectAsset
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Rental Timeline & Contract Schedules",
						subtitle: "Gantt-style horizon showing current active dates vs return deadlines",
						tabs: ["Gantt"],
						activeTab: "Gantt",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gantt, {
							assets,
							selectedId,
							onSelect: selectAsset
						})
					})
				})]
			})]
		})
	});
}
//#endregion
export { Dashboard as component };
