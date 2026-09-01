import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { D as Gauge, F as Clock, c as TrendingUp, l as Sparkles, s as TriangleAlert, t as Zap } from "../_libs/lucide-react.mjs";
import { C as useFleet, d as StatusPill, g as openActionSheet, p as Table, s as Panel, u as Shell } from "./Shell-CeYa9aSo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/usage-uATjac13.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UsagePage() {
	const { assets, optimizationPlans } = useFleet();
	const [filter, setFilter] = (0, import_react.useState)("All");
	const totalEngineHrs = assets.reduce((s, a) => s + a.engineHrsPerDay * a.operatingDays, 0);
	const totalIdleHrs = assets.reduce((s, a) => s + a.idleHrsPerDay * a.operatingDays, 0);
	const avgUtil = Math.round(assets.reduce((s, a) => s + a.utilizationPct, 0) / (assets.length || 1));
	const highestUtilAsset = [...assets].sort((a, b) => b.utilizationPct - a.utilizationPct)[0];
	const underutilized = assets.filter((a) => a.utilizationPct < 25);
	const topPerformers = [...assets].sort((a, b) => b.utilizationPct - a.utilizationPct).slice(0, 3);
	const perSite = Array.from(new Set(assets.map((a) => a.site ?? "Unassigned"))).map((s) => {
		const rows = assets.filter((a) => (a.site ?? "Unassigned") === s);
		return {
			site: s,
			engine: rows.reduce((n, a) => n + a.engineHrsPerDay * a.operatingDays, 0),
			idle: rows.reduce((n, a) => n + a.idleHrsPerDay * a.operatingDays, 0),
			util: Math.round(rows.reduce((n, a) => n + a.utilizationPct, 0) / rows.length),
			count: rows.length
		};
	});
	const filtered = filter === "All" ? assets : assets.filter((a) => a.type === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		crumb: "Usage Analytics",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[24px] border border-border/70 bg-white p-5 shadow-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold uppercase tracking-wider",
										children: "Total Engine Hours"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-7 w-7 items-center justify-center rounded-full bg-ok/10 text-ok",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { size: 14 })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-2xl font-black tracking-tight text-foreground tabular-nums",
									children: [
										totalEngineHrs.toFixed(1),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold text-muted-foreground",
											children: "hrs"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 text-[11px] font-medium text-ok flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 11 }), " Productive billable telemetry"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[24px] border border-border/70 bg-white p-5 shadow-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold uppercase tracking-wider",
										children: "Total Idle Hours"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-7 w-7 items-center justify-center rounded-full bg-warn/15 text-warn",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 14 })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-2xl font-black tracking-tight text-foreground tabular-nums",
									children: [
										totalIdleHrs.toFixed(1),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold text-muted-foreground",
											children: "hrs"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 text-[11px] font-medium text-warn flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 11 }), " Standby / yard dwell time"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[24px] border border-border/70 bg-white p-5 shadow-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold uppercase tracking-wider",
										children: "Avg Fleet Utilization"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-2xl font-black tracking-tight text-foreground tabular-nums",
									children: [avgUtil, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 text-[11px] font-medium text-muted-foreground",
									children: "Target nominal: 70%+"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[24px] border border-border/70 bg-white p-5 shadow-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold uppercase tracking-wider",
										children: "Highest Utilized Asset"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 14 })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-2xl font-black tracking-tight text-foreground tabular-nums",
									children: [
										highestUtilAsset?.id ?? "—",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm font-semibold text-ok",
											children: [highestUtilAsset?.utilizationPct, "%"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 text-[11px] font-medium text-muted-foreground",
									children: [
										highestUtilAsset?.type,
										" · ",
										highestUtilAsset?.site ? `Site ${highestUtilAsset.site}` : "Depot"
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Underutilized Assets & Redeployment Opportunities",
							subtitle: "Equipment units below 25% utilization available for immediate optimization",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-5 space-y-3",
								children: underutilized.map((u) => {
									const plan = optimizationPlans.find((p) => p.assetId === u.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-2xs hover:border-border transition-all",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-warn/15 text-warn font-black text-[12px]",
												children: [u.utilizationPct, "%"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "text-[13.5px] font-bold text-foreground",
														children: u.id
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[12px] text-muted-foreground",
														children: ["· ", u.type]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: u.status })
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11.5px] text-muted-foreground mt-0.5",
												children: [
													u.idleHrsPerDay,
													" idle hrs/day · ",
													u.engineHrsPerDay,
													" engine hrs/day · ",
													u.location
												]
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-2 self-end sm:self-auto",
											children: plan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => openActionSheet(plan),
												className: "flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-[11.5px] font-bold text-accent-foreground shadow-xs hover:opacity-95",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 12 }), " Optimize Plan"]
											})
										})]
									}, u.id);
								})
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Top Performing Fleet",
							subtitle: "Units delivering maximum contract uptime and operating efficiency",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-5 space-y-3",
								children: topPerformers.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-2xl border border-border/60 bg-muted/20 p-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-background font-bold text-[12px]",
											children: ["#", idx + 1]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-[13px] font-bold text-foreground",
											children: t.id
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11.5px] text-muted-foreground",
											children: [
												t.type,
												" · Site ",
												t.site ?? "—"
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-base font-black text-ok tabular-nums",
											children: [t.utilizationPct, "%"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground uppercase font-semibold",
											children: "Utilization"
										})]
									})]
								}, t.id))
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Engine vs Idle Duty Cycle (hrs / day)",
							tabs: ["Per Asset"],
							activeTab: "Per Asset",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3.5 p-6",
								children: [assets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1.5 flex justify-between text-[12.5px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-foreground",
										children: [
											a.id,
											" (",
											a.type,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums text-muted-foreground font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
												className: "text-ok",
												children: [a.engineHrsPerDay, "h"]
											}),
											" engine ·",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
												className: "text-warn",
												children: [a.idleHrsPerDay, "h"]
											}),
											" idle"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-3.5 overflow-hidden rounded-full bg-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-ok rounded-l-full transition-all",
										style: { width: `${a.engineHrsPerDay / 12 * 100}%` },
										title: `${a.engineHrsPerDay} engine hrs/day`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-warn rounded-r-full transition-all",
										style: { width: `${a.idleHrsPerDay / 12 * 100}%` },
										title: `${a.idleHrsPerDay} idle hrs/day`
									})]
								})] }, a.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 flex items-center gap-4 text-[11px] text-muted-foreground border-t border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-ok" }), " Green = Engine Runtime (0–12h)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-warn" }), " Yellow = Standby Idle (0–12h)"]
									})]
								})]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Regional Site Operating Efficiency",
							subtitle: "Aggregated engine hours and utilization across active sites",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
								selectable: false,
								columns: [
									{
										key: "site",
										label: "Site Location"
									},
									{
										key: "count",
										label: "Fleet Count",
										align: "center"
									},
									{
										key: "engine",
										label: "Engine Hrs",
										align: "right"
									},
									{
										key: "idle",
										label: "Idle Hrs",
										align: "right"
									},
									{
										key: "util",
										label: "Avg Util %",
										align: "right"
									}
								],
								rows: perSite.map((p) => ({
									id: p.site,
									cells: {
										site: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: p.site
										}),
										count: p.count,
										engine: `${p.engine.toFixed(1)}h`,
										idle: `${p.idle.toFixed(1)}h`,
										util: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: p.util >= 60 ? "text-ok" : "text-warn",
											children: [p.util, "%"]
										})
									}
								}))
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Raw Telemetry Usage Matrix",
					subtitle: "Detailed telemetry log with operating days, engine vs idle runtimes",
					tabs: [
						"All",
						"Excavator",
						"Crane",
						"Bulldozer",
						"Grader"
					],
					activeTab: filter,
					onTabChange: setFilter,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
						columns: [
							{
								key: "id",
								label: "Asset"
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
								key: "days",
								label: "Operating Days",
								align: "right"
							},
							{
								key: "engine",
								label: "Total Engine Hrs",
								align: "right"
							},
							{
								key: "idle",
								label: "Total Idle Hrs",
								align: "right"
							},
							{
								key: "util",
								label: "Utilization",
								align: "right"
							}
						],
						rows: filtered.map((a) => ({
							id: a.id,
							cells: {
								id: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-foreground",
									children: [
										a.id,
										" (",
										a.type,
										")"
									]
								}),
								site: a.site ? `Site ${a.site}` : "Unassigned Depot",
								status: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: a.status }),
								days: `${a.operatingDays} days`,
								engine: `${(a.engineHrsPerDay * a.operatingDays).toFixed(1)} hrs`,
								idle: `${(a.idleHrsPerDay * a.operatingDays).toFixed(1)} hrs`,
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
export { UsagePage as component };
