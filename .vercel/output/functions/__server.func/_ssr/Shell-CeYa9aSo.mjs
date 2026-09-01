import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as FileCheck, C as LogIn, D as Gauge, E as Layers, F as Clock, G as Bell, I as CircleCheck, J as ArrowRight, L as CircleAlert, M as DollarSign, N as Compass, O as Fuel, P as Command, T as LayoutDashboard, U as Building2, W as Bot, Y as ArrowLeftRight, _ as RefreshCw, a as UserPlus, b as Minus, c as TrendingUp, f as Settings2, g as RotateCcw, i as User, j as EllipsisVertical, k as FileText, l as Sparkles, m as Search, n as X, o as Truck, p as Send, q as ArrowUpRight, s as TriangleAlert, t as Zap, u as ShieldCheck, w as List, x as Maximize2, y as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Shell-CeYa9aSo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EQUIPMENT_PHOTOS = {
	Excavator: "/equipment/excavator.jpg",
	Crane: "/equipment/crane.jpg",
	Bulldozer: "/equipment/bulldozer.jpg",
	Grader: "/equipment/grader.jpg"
};
var SITES_META = {
	S003: {
		id: "S003",
		name: "Bhopal Metro Line 2 Extension",
		lat: 23.2599,
		lng: 77.4126,
		demandForecast: {
			need: 3,
			have: 1,
			gap: 2,
			confidence: "High",
			primaryNeed: "Excavator"
		},
		manager: "Dev Sharma",
		activeRentalsCount: 1
	},
	S002: {
		id: "S002",
		name: "Nagpur Express Corridor",
		lat: 21.1458,
		lng: 79.0882,
		demandForecast: {
			need: 2,
			have: 1,
			gap: 1,
			confidence: "High",
			primaryNeed: "Bulldozer"
		},
		manager: "Aman Verma",
		activeRentalsCount: 1
	},
	S004: {
		id: "S004",
		name: "Bhubaneswar Smart Port Access",
		lat: 20.2961,
		lng: 85.8245,
		demandForecast: {
			need: 1,
			have: 1,
			gap: 0,
			confidence: "Medium",
			primaryNeed: "Excavator"
		},
		manager: "Rajesh Mohanty",
		activeRentalsCount: 1
	},
	S001: {
		id: "S001",
		name: "Kolkata Eastern Bypass Expansion",
		lat: 22.5726,
		lng: 88.3639,
		demandForecast: {
			need: 1,
			have: 1,
			gap: 0,
			confidence: "Medium",
			primaryNeed: "Grader"
		},
		manager: "Pooja Banerjee",
		activeRentalsCount: 1
	},
	S006: {
		id: "S006",
		name: "Pune Industrial Logistics Hub",
		lat: 18.5204,
		lng: 73.8567,
		demandForecast: {
			need: 0,
			have: 1,
			gap: 0,
			confidence: "Low",
			primaryNeed: "Bulldozer"
		},
		manager: "Kunal Joshi",
		activeRentalsCount: 1
	}
};
var INITIAL_ASSETS = [
	{
		id: "EQX1001",
		type: "Excavator",
		site: "S003",
		checkOut: "2025-04-01",
		checkIn: "2025-04-16",
		monthlyRentalRate: 5e4,
		securityDepositRatio: .8,
		engineHrsPerDay: 1.5,
		idleHrsPerDay: 10,
		operatingDays: 15,
		operator: "OP101",
		utilizationPct: 13,
		status: "Idle",
		condition: "Good",
		fuelPct: 78,
		lat: 23.2599,
		lng: 77.4126,
		location: "Bhopal Metro Site S003",
		serialNumber: "CAT-320D-8941",
		qrCodePayload: "SMART-RENTAL-EQX1001",
		telemetryTrend: [
			18,
			14,
			12,
			16,
			13,
			11,
			13
		],
		history: [
			{
				id: "h1",
				time: "2025-04-01 08:30",
				type: "checkout",
				title: "Checked out to Site S003",
				detail: "Initial dispatch for metro excavation work.",
				site: "S003",
				operator: "OP101"
			},
			{
				id: "h2",
				time: "2025-04-04 14:15",
				type: "operator",
				title: "Operator OP101 Assigned",
				detail: "Shift supervisor confirmed primary operator license."
			},
			{
				id: "h3",
				time: "2025-04-10 18:20",
				type: "telemetry",
				title: "High Idle Ratio Detected",
				detail: "10 hrs idle vs 1.5 hrs engine recorded."
			}
		]
	},
	{
		id: "EQX1002",
		type: "Crane",
		site: null,
		checkOut: "2025-03-10",
		checkIn: "2025-03-30",
		monthlyRentalRate: 85e3,
		securityDepositRatio: .8,
		engineHrsPerDay: 0,
		idleHrsPerDay: 11,
		operatingDays: 20,
		operator: null,
		utilizationPct: 0,
		status: "Overdue",
		condition: "Needs Attention",
		fuelPct: 42,
		anomalies: [
			"Return overdue (41 days)",
			"No site assigned",
			"Zero engine runtime"
		],
		lat: 23.0934,
		lng: 78.7469,
		location: "Central Holding Depot",
		serialNumber: "CAT-LTM-1120",
		qrCodePayload: "SMART-RENTAL-EQX1002",
		telemetryTrend: [
			0,
			0,
			0,
			0,
			0,
			0,
			0
		],
		history: [{
			id: "h4",
			time: "2025-03-10 09:00",
			type: "checkout",
			title: "Initial dispatch without site tagging",
			detail: "Contract period expired 2025-03-30."
		}, {
			id: "h5",
			time: "2025-03-31 00:01",
			type: "anomaly",
			title: "Rental Overdue Triggered",
			detail: "Equipment has exceeded rental end date by 41+ days."
		}]
	},
	{
		id: "EQX1003",
		type: "Bulldozer",
		site: "S002",
		checkOut: "2025-02-15",
		checkIn: "2025-03-11",
		monthlyRentalRate: 6e4,
		securityDepositRatio: .8,
		engineHrsPerDay: 7.5,
		idleHrsPerDay: .5,
		operatingDays: 25,
		operator: "OP203",
		utilizationPct: 94,
		status: "Active",
		condition: "Good",
		fuelPct: 91,
		lat: 21.1458,
		lng: 79.0882,
		location: "Nagpur Express Corridor S002",
		serialNumber: "CAT-D6T-4432",
		qrCodePayload: "SMART-RENTAL-EQX1003",
		telemetryTrend: [
			92,
			94,
			96,
			91,
			95,
			93,
			94
		],
		history: [{
			id: "h6",
			time: "2025-02-15 08:12",
			type: "checkout",
			title: "Checked out to Site S002",
			detail: "Heavy earthmoving and ground grading operations.",
			site: "S002",
			operator: "OP203"
		}]
	},
	{
		id: "EQX1004",
		type: "Excavator",
		site: "S004",
		checkOut: "2025-05-05",
		checkIn: "2025-05-15",
		monthlyRentalRate: 5e4,
		securityDepositRatio: .8,
		engineHrsPerDay: 2,
		idleHrsPerDay: 9,
		operatingDays: 10,
		operator: "OP106",
		utilizationPct: 18,
		status: "Due Soon",
		condition: "Good",
		fuelPct: 65,
		lat: 20.2961,
		lng: 85.8245,
		location: "Bhubaneswar Port Site S004",
		serialNumber: "CAT-336GC-1092",
		qrCodePayload: "SMART-RENTAL-EQX1004",
		telemetryTrend: [
			15,
			20,
			18,
			16,
			22,
			19,
			18
		],
		history: [{
			id: "h8",
			time: "2025-05-05 07:45",
			type: "checkout",
			title: "Checked out to Site S004",
			detail: "Scheduled for return on 2025-05-15 (5 days remaining).",
			site: "S004",
			operator: "OP106"
		}]
	},
	{
		id: "EQX1005",
		type: "Bulldozer",
		site: "S006",
		checkOut: "2025-01-01",
		checkIn: "2025-01-31",
		monthlyRentalRate: 65e3,
		securityDepositRatio: .8,
		engineHrsPerDay: 8,
		idleHrsPerDay: 0,
		operatingDays: 30,
		operator: "OP301",
		utilizationPct: 100,
		status: "Active",
		condition: "Good",
		fuelPct: 84,
		anomalies: ["Continuous high utilization — 0 hrs idle logged, verify maintenance schedule"],
		lat: 18.5204,
		lng: 73.8567,
		location: "Pune Industrial Hub S006",
		serialNumber: "CAT-D8T-9921",
		qrCodePayload: "SMART-RENTAL-EQX1005",
		telemetryTrend: [
			100,
			100,
			100,
			100,
			100,
			100,
			100
		],
		history: [{
			id: "h9",
			time: "2025-01-01 08:00",
			type: "checkout",
			title: "Checked out to Site S006",
			detail: "Continuous shift quarry grading.",
			site: "S006",
			operator: "OP301"
		}]
	},
	{
		id: "EQX1006",
		type: "Grader",
		site: "S001",
		checkOut: "2025-04-05",
		checkIn: "2025-04-23",
		monthlyRentalRate: 55e3,
		securityDepositRatio: .8,
		engineHrsPerDay: 3,
		idleHrsPerDay: 6,
		operatingDays: 18,
		operator: "OP114",
		utilizationPct: 33,
		status: "Active",
		condition: "Good",
		fuelPct: 70,
		lat: 22.5726,
		lng: 88.3639,
		location: "Kolkata Bypass S001",
		serialNumber: "CAT-140M-3382",
		qrCodePayload: "SMART-RENTAL-EQX1006",
		telemetryTrend: [
			30,
			35,
			32,
			38,
			28,
			34,
			33
		],
		history: [{
			id: "h11",
			time: "2025-04-05 09:15",
			type: "checkout",
			title: "Checked out to Site S001",
			detail: "Road leveling and precision surface grading.",
			site: "S001",
			operator: "OP114"
		}]
	},
	{
		id: "EQX1007",
		type: "Excavator",
		site: null,
		checkOut: "2025-03-20",
		checkIn: "2025-04-01",
		monthlyRentalRate: 5e4,
		securityDepositRatio: .8,
		engineHrsPerDay: 0,
		idleHrsPerDay: 12,
		operatingDays: 12,
		operator: null,
		utilizationPct: 0,
		status: "Unassigned",
		condition: "Good",
		fuelPct: 95,
		anomalies: [
			"No site assigned",
			"No operator assigned",
			"Zero engine runtime",
			"12 idle hrs/day"
		],
		lat: 23.8134,
		lng: 79.1969,
		location: "Holding Yard (Near Jabalpur)",
		serialNumber: "CAT-330D2-5520",
		qrCodePayload: "SMART-RENTAL-EQX1007",
		telemetryTrend: [
			0,
			0,
			0,
			0,
			0,
			0,
			0
		],
		history: [{
			id: "h12",
			time: "2025-03-20 10:00",
			type: "checkout",
			title: "Off-contract returned to staging yard",
			detail: "Parked with full tank (95%), telemetry active."
		}]
	}
];
var INITIAL_PROFILES = {
	customer: {
		id: "cust-001",
		name: "Rajesh Patel",
		email: "rajesh.patel@apexinfra.com",
		role: "customer",
		companyName: "Apex Infra Projects Ltd.",
		phone: "+91 98230 44120",
		verified: true
	},
	rental_staff: {
		id: "staff-001",
		name: "Vikram Singh",
		email: "vikram.singh@rentsense.com",
		role: "rental_staff",
		companyName: "RentSense Fleet HQ",
		phone: "+91 99100 88210",
		verified: true
	},
	supervisor_admin: {
		id: "admin-001",
		name: "Vikram Singh",
		email: "admin@rentsense.com",
		role: "rental_staff",
		companyName: "RentSense Operations Leadership",
		phone: "+91 99100 88210",
		verified: true
	}
};
var INITIAL_CONTRACTS = [
	{
		id: "cnt-1001",
		contractNumber: "SR-2025-1001",
		customerId: "cust-001",
		customerName: "Rajesh Patel",
		customerCompany: "Apex Infra Projects Ltd.",
		equipmentId: "EQX1001",
		equipmentType: "Excavator",
		siteId: "S003",
		operatorId: "OP101",
		startDate: "2025-04-01",
		endDate: "2025-04-16",
		monthlyRentalRate: 5e4,
		securityDepositAmount: 4e4,
		totalInitialPayable: 9e4,
		paymentStatus: "Paid",
		rentalStatus: "Active Rental",
		agreementAccepted: true,
		agreementAcceptedAt: "2025-04-01 08:15",
		depositStatus: "Held",
		damageDeduction: 0,
		refundAmount: 4e4,
		createdAt: "2025-04-01 08:00"
	},
	{
		id: "cnt-1003",
		contractNumber: "SR-2025-1003",
		customerId: "cust-002",
		customerName: "Amitabh Roy",
		customerCompany: "Metro Express Roads",
		equipmentId: "EQX1003",
		equipmentType: "Bulldozer",
		siteId: "S002",
		operatorId: "OP203",
		startDate: "2025-02-15",
		endDate: "2025-03-11",
		monthlyRentalRate: 6e4,
		securityDepositAmount: 48e3,
		totalInitialPayable: 108e3,
		paymentStatus: "Paid",
		rentalStatus: "Active Rental",
		agreementAccepted: true,
		agreementAcceptedAt: "2025-02-15 07:45",
		depositStatus: "Held",
		damageDeduction: 0,
		refundAmount: 48e3,
		createdAt: "2025-02-15 07:30"
	},
	{
		id: "cnt-1005",
		contractNumber: "SR-2025-1005",
		customerId: "cust-003",
		customerName: "Sanjay Singhania",
		customerCompany: "Deccan Mining Logistics",
		equipmentId: "EQX1005",
		equipmentType: "Bulldozer",
		siteId: "S006",
		operatorId: "OP301",
		startDate: "2025-01-01",
		endDate: "2025-01-31",
		monthlyRentalRate: 65e3,
		securityDepositAmount: 52e3,
		totalInitialPayable: 117e3,
		paymentStatus: "Paid",
		rentalStatus: "Active Rental",
		agreementAccepted: true,
		agreementAcceptedAt: "2025-01-01 07:30",
		depositStatus: "Refund Pending",
		damageDeduction: 0,
		refundAmount: 52e3,
		createdAt: "2025-01-01 07:00"
	},
	{
		id: "cnt-1007",
		contractNumber: "SR-2025-1007",
		customerId: "cust-001",
		customerName: "Rajesh Patel",
		customerCompany: "Apex Infra Projects Ltd.",
		equipmentId: "EQX1007",
		equipmentType: "Excavator",
		siteId: "S003",
		operatorId: "OP101",
		startDate: "2025-05-01",
		endDate: "2025-05-30",
		monthlyRentalRate: 5e4,
		securityDepositAmount: 4e4,
		totalInitialPayable: 9e4,
		paymentStatus: "Paid",
		rentalStatus: "Pending Checkout",
		agreementAccepted: true,
		agreementAcceptedAt: "2025-05-01 09:10",
		depositStatus: "Held",
		damageDeduction: 0,
		refundAmount: 4e4,
		createdAt: "2025-05-01 09:00"
	}
];
var INITIAL_AUDIT_LOGS = [
	{
		id: "log-1",
		userName: "Rajesh Patel",
		userRole: "customer",
		action: "Rental Request Created",
		entityType: "Contract",
		entityId: "SR-2025-1007",
		details: "Requested EQX1007 for Site S003 (₹50,000 monthly + ₹40,000 refundable security deposit).",
		timestamp: "2025-05-01 09:00",
		location: "Online Portal"
	},
	{
		id: "log-2",
		userName: "System Payment Gateway",
		userRole: "system",
		action: "Payment & Deposit Received",
		entityType: "Payment",
		entityId: "PAY-99412",
		details: "Received ₹90,000 (₹50,000 rental fee + ₹40,000 refundable deposit held in escrow).",
		timestamp: "2025-05-01 09:05",
		location: "HDFC Escrow Gateway"
	},
	{
		id: "log-3",
		userName: "Rajesh Patel",
		userRole: "customer",
		action: "Agreement Accepted",
		entityType: "Contract",
		entityId: "SR-2025-1007",
		details: "Accepted Master Equipment Rental Agreement & Deposit Refund Policy.",
		timestamp: "2025-05-01 09:10",
		location: "103.21.58.92"
	}
];
var SITES = [
	"S001",
	"S002",
	"S003",
	"S004",
	"S006"
];
var OPERATORS = [
	"OP101",
	"OP106",
	"OP114",
	"OP203",
	"OP301"
];
var state = {
	assets: INITIAL_ASSETS,
	contracts: INITIAL_CONTRACTS,
	auditLogs: INITIAL_AUDIT_LOGS,
	currentUser: INITIAL_PROFILES.rental_staff,
	selectedId: "EQX1007",
	selectedSiteId: null,
	optimizationPlans: [{
		id: "opt-1",
		assetId: "EQX1007",
		type: "Redeploy",
		title: "Reassign EQX1007 → Site S003 (Bhopal)",
		fromSite: "Holding Yard (Unassigned)",
		toSite: "S003 (Bhopal Metro)",
		why: "Site S003 forecast requires 3 excavators next week, but only 1 is currently active. EQX1007 is parked with 12 idle hrs/day and 0% utilization.",
		whatWillChange: "EQX1007 moves from Unassigned to S003, operator OP101 assigned, ready for mobilization.",
		expectedImpact: "+18% fleet utilization uplift · $1,100 rental optimization · 12 idle hrs/day recovered.",
		utilizationDelta: "0% → 72%",
		idleReduction: "12 hrs/day saved",
		savings: "+$1,100 / wk",
		confidence: "High",
		status: "pending"
	}],
	activeActionPlan: null,
	appMode: "tower",
	resolvedAlertIds: /* @__PURE__ */ new Set(),
	snoozedAlertIds: /* @__PURE__ */ new Set()
};
var listeners = /* @__PURE__ */ new Set();
var emit = () => listeners.forEach((l) => l());
function subscribe(l) {
	listeners.add(l);
	return () => listeners.delete(l);
}
function useFleet() {
	return (0, import_react.useSyncExternalStore)(subscribe, () => state, () => state);
}
function now() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " ");
}
function selectAsset(id) {
	state = {
		...state,
		selectedId: id
	};
	emit();
}
function selectSite(siteId) {
	state = {
		...state,
		selectedSiteId: siteId
	};
	emit();
}
function setAppMode(mode) {
	state = {
		...state,
		appMode: mode
	};
	emit();
}
function switchUserRole(role) {
	state = {
		...state,
		currentUser: INITIAL_PROFILES[role] || INITIAL_PROFILES.rental_staff,
		appMode: role === "customer" ? "customer_portal" : "tower"
	};
	emit();
}
function registerUser(data) {
	const newProfile = {
		id: `user-${Date.now()}`,
		name: data.name,
		email: data.email,
		phone: data.phone,
		role: data.role,
		companyName: data.companyName || (data.role === "rental_staff" ? "RentSense Operations Admin HQ" : "Independent Contractor / Builder"),
		verified: true
	};
	state = {
		...state,
		currentUser: newProfile,
		appMode: data.role === "customer" ? "customer_portal" : "tower"
	};
	addAuditLog("User Registered & Logged In", "Account", newProfile.id, `New ${data.role === "rental_staff" ? "Rental Staff (Admin)" : "Customer"} account created for ${data.name} (${data.email}, ${data.phone}).`);
	emit();
	return newProfile;
}
function openActionSheet(plan) {
	state = {
		...state,
		activeActionPlan: plan
	};
	emit();
}
function addAuditLog(action, entityType, entityId, details, location = "Control Tower") {
	const newEntry = {
		id: `log-${Date.now()}`,
		userName: state.currentUser.name,
		userRole: state.currentUser.role,
		action,
		entityType,
		entityId,
		details,
		timestamp: now(),
		location
	};
	state = {
		...state,
		auditLogs: [newEntry, ...state.auditLogs]
	};
	emit();
}
/** Customer initiates rental request */
function createRentalContract(data) {
	const asset = state.assets.find((a) => a.id === data.equipmentId);
	const monthlyRate = asset?.monthlyRentalRate ?? 5e4;
	const depositRatio = asset?.securityDepositRatio ?? .8;
	const depositAmount = Math.round(monthlyRate * depositRatio);
	const total = monthlyRate + depositAmount;
	const contractNum = `SR-${(/* @__PURE__ */ new Date()).getFullYear()}-${data.equipmentId.slice(3)}`;
	const newContract = {
		id: `cnt-${Date.now()}`,
		contractNumber: contractNum,
		customerId: state.currentUser.id,
		customerName: state.currentUser.name,
		customerCompany: state.currentUser.companyName,
		equipmentId: data.equipmentId,
		equipmentType: asset?.type ?? "Excavator",
		siteId: data.siteId,
		operatorId: data.operatorId,
		startDate: data.startDate,
		endDate: data.endDate,
		monthlyRentalRate: monthlyRate,
		securityDepositAmount: depositAmount,
		totalInitialPayable: total,
		paymentStatus: "Paid",
		rentalStatus: "Pending Checkout",
		agreementAccepted: true,
		agreementAcceptedAt: now(),
		depositStatus: "Held",
		damageDeduction: 0,
		refundAmount: depositAmount,
		createdAt: now()
	};
	state = {
		...state,
		contracts: [newContract, ...state.contracts]
	};
	addAuditLog("Rental Agreement Executed", "Contract", contractNum, `Customer booked ${data.equipmentId} (₹${monthlyRate.toLocaleString("en-IN")} rent + ₹${depositAmount.toLocaleString("en-IN")} refundable deposit).`);
	emit();
	return newContract;
}
/** Staff approves check-out with pre-inspection */
function approveCheckOut(contractId, preInspection) {
	const contract = state.contracts.find((c) => c.id === contractId);
	if (!contract) return;
	state.assets.find((a) => a.id === contract.equipmentId);
	const siteMeta = SITES_META[contract.siteId];
	const newHistory = {
		id: `h-${Date.now()}`,
		time: now(),
		type: "checkout",
		title: `Checked out to ${contract.customerCompany}`,
		detail: `Rental #${contract.contractNumber} active at ${siteMeta?.name ?? contract.siteId}. Pre-inspection passed (${preInspection.body} condition).`,
		site: contract.siteId,
		operator: contract.operatorId ?? void 0
	};
	state = {
		...state,
		contracts: state.contracts.map((c) => c.id === contractId ? {
			...c,
			rentalStatus: "Active Rental",
			preInspection
		} : c),
		assets: state.assets.map((a) => a.id === contract.equipmentId ? {
			...a,
			status: "Active",
			site: contract.siteId,
			operator: contract.operatorId,
			location: siteMeta ? `${siteMeta.name} (${contract.siteId})` : `Site ${contract.siteId}`,
			lat: siteMeta?.lat ?? a.lat,
			lng: siteMeta?.lng ?? a.lng,
			anomalies: [],
			history: [newHistory, ...a.history]
		} : a)
	};
	addAuditLog("Check-Out Approved & Dispatched", "Equipment", contract.equipmentId, `Pre-rental inspection verified by ${preInspection.inspectorName}. Dispatched to Site ${contract.siteId}.`);
	emit();
}
/** Customer requests equipment return */
function requestReturn(contractId) {
	const contract = state.contracts.find((c) => c.id === contractId);
	if (!contract) return;
	state = {
		...state,
		contracts: state.contracts.map((c) => c.id === contractId ? {
			...c,
			rentalStatus: "Return Requested",
			returnRequestedAt: now()
		} : c)
	};
	addAuditLog("Return Requested", "Contract", contract.contractNumber, `Customer initiated return request for ${contract.equipmentId} from Site ${contract.siteId}.`);
	emit();
}
/** Staff processes check-in with post-inspection */
function approveCheckIn(contractId, postInspection) {
	const contract = state.contracts.find((c) => c.id === contractId);
	if (!contract) return;
	const newHistory = {
		id: `h-${Date.now()}`,
		time: now(),
		type: "checkin",
		title: `Checked in from ${contract.customerCompany}`,
		detail: `Returned to central yard. Post-inspection logged (${postInspection.body} condition). Deposit review pending.`
	};
	state = {
		...state,
		contracts: state.contracts.map((c) => c.id === contractId ? {
			...c,
			rentalStatus: "Checked In",
			depositStatus: "Refund Pending",
			postInspection
		} : c),
		assets: state.assets.map((a) => a.id === contract.equipmentId ? {
			...a,
			status: "Idle",
			site: null,
			operator: null,
			location: "Central Holding Depot",
			history: [newHistory, ...a.history]
		} : a)
	};
	addAuditLog("Equipment Check-In Completed", "Equipment", contract.equipmentId, `Post-rental inspection logged by ${postInspection.inspectorName}. Hour meter: ${postInspection.hourMeter} hrs. Deposit moved to Refund Pending.`);
	emit();
}
/** Supervisor authorizes deposit refund (with optional damage deduction) */
function approveDepositRefund(contractId, damageDeduction = 0, deductionReason = "", supervisorName = "Dev Sharma") {
	const contract = state.contracts.find((c) => c.id === contractId);
	if (!contract) return;
	const refundAmt = Math.max(0, contract.securityDepositAmount - damageDeduction);
	const status = damageDeduction > 0 ? "Partially Deducted" : "Refunded";
	state = {
		...state,
		contracts: state.contracts.map((c) => c.id === contractId ? {
			...c,
			depositStatus: status,
			damageDeduction,
			deductionReason: deductionReason || (damageDeduction > 0 ? "Approved maintenance wear deduction" : void 0),
			refundAmount: refundAmt,
			refundApprovedBy: supervisorName,
			refundDate: now(),
			rentalStatus: "Completed"
		} : c)
	};
	addAuditLog(damageDeduction > 0 ? "Deposit Partially Refunded (Deduction Approved)" : "Full Security Deposit Refunded", "Financial", contract.contractNumber, `Authorized refund ₹${refundAmt.toLocaleString("en-IN")}${damageDeduction > 0 ? ` (Deducted ₹${damageDeduction.toLocaleString("en-IN")}: ${deductionReason})` : ""} by ${supervisorName}.`);
	emit();
}
function snoozeAlert(alertId) {
	const snoozed = new Set(state.snoozedAlertIds);
	snoozed.add(alertId);
	state = {
		...state,
		snoozedAlertIds: snoozed
	};
	emit();
}
function resolveAlert(alertId) {
	const resolved = new Set(state.resolvedAlertIds);
	resolved.add(alertId);
	state = {
		...state,
		resolvedAlertIds: resolved
	};
	emit();
}
function reassignAsset(id, targetSite, targetOperator = "OP101", note = "") {
	const asset = state.assets.find((a) => a.id === id);
	if (!asset) return;
	const siteMeta = SITES_META[targetSite];
	const newHistory = {
		id: `h-${Date.now()}`,
		time: now(),
		type: "optimization",
		title: `AI Redeployment Executed → Site ${targetSite}`,
		detail: note || `Mobilized from ${asset.location} to ${siteMeta?.name ?? targetSite}. Expected utilization +18%.`,
		site: targetSite,
		operator: targetOperator
	};
	state = {
		...state,
		assets: state.assets.map((a) => a.id === id ? {
			...a,
			status: "Active",
			site: targetSite,
			operator: targetOperator,
			location: siteMeta ? `${siteMeta.name} (${targetSite})` : `Site ${targetSite}`,
			lat: siteMeta?.lat ?? a.lat,
			lng: siteMeta?.lng ?? a.lng,
			utilizationPct: Math.max(a.utilizationPct, 72),
			engineHrsPerDay: a.engineHrsPerDay === 0 ? 6.5 : a.engineHrsPerDay,
			idleHrsPerDay: 2,
			anomalies: [],
			history: [newHistory, ...a.history]
		} : a),
		optimizationPlans: state.optimizationPlans.map((p) => p.assetId === id ? {
			...p,
			status: "applied"
		} : p)
	};
	addAuditLog("AI Fleet Redeployment", "Asset", id, `Mobilized ${id} to ${targetSite} under operator ${targetOperator}.`);
	emit();
}
function applyOptimizationPlan(planId) {
	const plan = state.optimizationPlans.find((p) => p.id === planId);
	if (!plan) return;
	if (plan.type === "Redeploy" || plan.type === "Reassign") {
		const targetSite = plan.toSite.includes("S003") ? "S003" : "S002";
		reassignAsset(plan.assetId, targetSite, "OP101", `Executed plan: ${plan.title}`);
	}
	state = {
		...state,
		optimizationPlans: state.optimizationPlans.map((p) => p.id === planId ? {
			...p,
			status: "applied"
		} : p),
		activeActionPlan: null
	};
	emit();
}
var TODAY = /* @__PURE__ */ new Date("2025-05-10");
function isOverdue(a) {
	return new Date(a.checkIn) < TODAY && a.status !== "Idle";
}
function summary(assets) {
	const active = assets.filter((a) => a.status === "Active").length;
	const idle = assets.filter((a) => a.status === "Idle").length;
	const unassigned = assets.filter((a) => a.status === "Unassigned" || a.status === "Unknown").length;
	const dueSoon = assets.filter((a) => a.status === "Due Soon").length;
	const overdue = assets.filter((a) => isOverdue(a)).length;
	const avg = Math.round(assets.reduce((s, a) => s + a.utilizationPct, 0) / (assets.length || 1));
	const flagged = assets.filter((a) => a.anomalies?.length || isOverdue(a));
	return {
		total: assets.length,
		active,
		idle,
		unassigned,
		dueSoon,
		overdue,
		avg,
		flagged: flagged.length
	};
}
function CommandPalette({ isOpen, onClose }) {
	const navigate = useNavigate();
	const { assets, optimizationPlans } = useFleet();
	const [query, setQuery] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				if (isOpen) onClose();
				else setQuery("");
			}
			if (e.key === "Escape" && isOpen) onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);
	if (!isOpen) return null;
	const filteredAssets = assets.filter((a) => a.id.toLowerCase().includes(query.toLowerCase()) || a.type.toLowerCase().includes(query.toLowerCase()) || a.site && a.site.toLowerCase().includes(query.toLowerCase()) || a.operator && a.operator.toLowerCase().includes(query.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-foreground/25 backdrop-blur-md animate-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-xl overflow-hidden rounded-[26px] border border-border/80 bg-white shadow-float animate-scale-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-border/70 px-5 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 18,
						className: "text-muted-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						autoFocus: true,
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search assets, sites, operators, or AI actions (e.g. EQX1007, S003, Optimize)...",
						className: "w-full bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 rounded-md border border-border/80 bg-muted/50 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { size: 10 }), " K"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-full p-1 text-muted-foreground hover:bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[380px] overflow-y-auto p-3 space-y-4 text-[13px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "px-3 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
					children: "Operational Actions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 space-y-1",
					children: [
						{
							id: "act-opt",
							label: "Optimize Current Fleet (AI Recommendations)",
							icon: Sparkles,
							color: "text-brand",
							run: () => {
								if (optimizationPlans[0]) openActionSheet(optimizationPlans[0]);
								navigate({ to: "/" });
								onClose();
							}
						},
						{
							id: "act-planning",
							label: "Open Operational Planning Workspace",
							icon: LayoutDashboard,
							color: "text-foreground",
							run: () => {
								setAppMode("planning");
								navigate({ to: "/" });
								onClose();
							}
						},
						{
							id: "act-overdue",
							label: "View Overdue Assets (Alerts Command Center)",
							icon: Bell,
							color: "text-danger",
							run: () => {
								navigate({ to: "/alerts" });
								onClose();
							}
						},
						{
							id: "act-forecast",
							label: "View Demand Forecast & Gap Analysis",
							icon: TrendingUp,
							color: "text-ok",
							run: () => {
								navigate({ to: "/forecast" });
								onClose();
							}
						},
						{
							id: "act-anomalies",
							label: "Inspect Telemetry Anomalies",
							icon: TriangleAlert,
							color: "text-warn-foreground",
							run: () => {
								navigate({ to: "/anomalies" });
								onClose();
							}
						},
						{
							id: "act-checkout",
							label: "New Equipment Check-In / Check-Out",
							icon: ArrowLeftRight,
							color: "text-foreground",
							run: () => {
								navigate({ to: "/check" });
								onClose();
							}
						}
					].filter((a) => a.label.toLowerCase().includes(query.toLowerCase())).map((a) => {
						const Icon = a.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: a.run,
							className: "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 cursor-pointer hover:bg-muted/60 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex h-8 w-8 items-center justify-center rounded-xl bg-muted/80 ${a.color}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: a.label
							})]
						}, a.id);
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "px-3 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
					children: [
						"Equipment Fleet (",
						filteredAssets.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 space-y-1",
					children: filteredAssets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => {
							selectAsset(a.id);
							navigate({ to: "/" });
							onClose();
						},
						className: "flex items-center justify-between rounded-2xl px-3.5 py-2.5 cursor-pointer hover:bg-muted/60 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-8 w-8 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground font-bold text-[11px]",
								children: a.type.slice(0, 2).toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground",
									children: a.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: ["· ", a.type]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11.5px] text-muted-foreground",
								children: [
									a.site ? `Site ${a.site}` : "Unassigned",
									" · ",
									a.operator ?? "No operator"
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 tabular-nums text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-foreground",
								children: [a.utilizationPct, "%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase text-muted-foreground",
								children: "utilization"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2.5 w-2.5 rounded-full ${a.status === "Active" ? "bg-ok" : a.status === "Idle" ? "bg-warn" : "bg-danger"}` })]
						})]
					}, a.id))
				})] })]
			})]
		})
	});
}
function NotificationCenter({ isOpen, onClose }) {
	const { assets, optimizationPlans } = useFleet();
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("all");
	if (!isOpen) return null;
	const overdueAssets = assets.filter((a) => isOverdue(a));
	const unassignedAssets = assets.filter((a) => a.status === "Unassigned");
	assets.filter((a) => a.utilizationPct < 25 && a.status !== "Unassigned");
	const notifications = [
		...overdueAssets.map((a) => ({
			id: `notif-od-${a.id}`,
			category: "critical",
			title: `${a.id} (${a.type}) Rental Overdue`,
			detail: `Contract ended on ${a.checkIn}. Currently parked at ${a.location}.`,
			time: "Immediate Action",
			icon: TriangleAlert,
			color: "text-danger bg-danger/10",
			actionLabel: "Schedule Return",
			onAction: () => {
				selectAsset(a.id);
				onClose();
			}
		})),
		...optimizationPlans.map((p) => ({
			id: `notif-opt-${p.id}`,
			category: "ai",
			title: `AI Optimization: ${p.title}`,
			detail: p.why,
			time: "2h ago",
			icon: Sparkles,
			color: "text-accent-foreground bg-accent",
			actionLabel: "Review Plan",
			onAction: () => {
				openActionSheet(p);
				onClose();
			}
		})),
		...unassignedAssets.map((a) => ({
			id: `notif-un-${a.id}`,
			category: "actions",
			title: `${a.id} is Unassigned in Yard`,
			detail: `Logging 12 idle hrs/day with 0% utilization. Available for dispatch.`,
			time: "Today",
			icon: Clock,
			color: "text-warn bg-warn/15",
			actionLabel: "Assign Site",
			onAction: () => {
				selectAsset(a.id);
				onClose();
			}
		}))
	];
	const filteredNotifs = activeCategory === "all" ? notifications : notifications.filter((n) => n.category === activeCategory);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-foreground/15 backdrop-blur-xs animate-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-sm overflow-hidden rounded-[26px] border border-border/80 bg-white p-5 shadow-float animate-scale-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between pb-3 border-b border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 14 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[15px] font-bold tracking-tight text-foreground",
								children: "Notifications"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground",
								children: notifications.length
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-full p-1 text-muted-foreground hover:bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex items-center gap-1 overflow-x-auto pb-1 text-[11px]",
					children: [
						{
							id: "all",
							label: "All"
						},
						{
							id: "critical",
							label: "Critical"
						},
						{
							id: "ai",
							label: "AI Plans"
						},
						{
							id: "actions",
							label: "Actions"
						}
					].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveCategory(tab.id),
						className: `rounded-full px-3 py-1 font-medium transition-all ${activeCategory === tab.id ? "bg-foreground text-background shadow-xs" : "bg-muted/70 text-muted-foreground hover:text-foreground"}`,
						children: tab.label
					}, tab.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 max-h-[420px] space-y-2.5 overflow-y-auto pr-1",
					children: filteredNotifs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-center text-[12.5px] text-muted-foreground",
						children: "All operational tasks cleared."
					}) : filteredNotifs.map((n) => {
						const Icon = n.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "group rounded-2xl border border-border/70 bg-card p-3.5 shadow-xs transition-all hover:border-border hover:shadow-apple-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${n.color}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 14 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-[12.5px] font-bold text-foreground leading-snug",
												children: n.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground whitespace-nowrap",
												children: n.time
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[11.5px] text-muted-foreground leading-relaxed line-clamp-2",
											children: n.detail
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: n.onAction,
											className: "mt-2.5 flex items-center gap-1 rounded-full bg-muted/80 px-3 py-1 text-[11px] font-bold text-foreground transition-colors hover:bg-foreground hover:text-background",
											children: [n.actionLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 11 })]
										})
									]
								})]
							})
						}, n.id);
					})
				})
			]
		})
	});
}
function AIAssistantModal({ isOpen, onClose }) {
	const { assets, contracts, optimizationPlans } = useFleet();
	const [input, setInput] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([{
		id: "m0",
		sender: "ai",
		text: "Hello! I am your RentSense Fleet & Rental Intelligence Copilot. I analyze live telemetry, rental contract windows, escrow security deposits, and predictive site demand across all equipment in real-time.",
		recommendation: "Tip: Click any prompt chip below or type a query to inspect optimization opportunities."
	}]);
	if (!isOpen) return null;
	const handleQuery = (queryText) => {
		const q = queryText.toLowerCase();
		const userMsg = {
			id: `u-${Date.now()}`,
			sender: "user",
			text: queryText
		};
		let aiMsg;
		if (q.includes("deposit") || q.includes("refund") || q.includes("escrow") || q.includes("held")) {
			const totalHeld = contracts.filter((c) => c.depositStatus === "Held").reduce((s, c) => s + c.securityDepositAmount, 0);
			const pendingRefund = contracts.filter((c) => c.depositStatus === "Refund Pending");
			aiMsg = {
				id: `ai-${Date.now()}`,
				sender: "ai",
				text: `Currently holding ₹${totalHeld.toLocaleString("en-IN")} in secured escrow deposits across active rentals. ${pendingRefund.length} deposit refund(s) are awaiting operational inspection sign-off.`,
				evidence: `Deposit policy maintains an 80% refundable liability ratio against machine damages. ₹${pendingRefund.reduce((s, c) => s + c.refundAmount, 0).toLocaleString("en-IN")} is eligible for return.`,
				recommendation: "Review the Rental Operations Approval Queue to audit condition inspections and authorize releases.",
				actionButton: {
					label: "Open Deposit Approvals Queue",
					onClick: () => {
						setAppMode("rental_ops");
						onClose();
					}
				}
			};
		} else if (q.includes("available") || q.includes("ready") || q.includes("hire")) {
			const available = assets.filter((a) => a.status === "Unassigned" || a.status === "Idle");
			aiMsg = {
				id: `ai-${Date.now()}`,
				sender: "ai",
				text: `There are ${available.length} heavy equipment units available for hire: EQX1007 (Excavator), EQX1001 (Excavator), and EQX1003 (Bulldozer).`,
				evidence: `EQX1007 has 95% fuel, good condition, and is located in the Central Staging Yard at ₹50,000/mo (₹40,000 refundable deposit).`,
				recommendation: "You can book this unit directly via the Customer Portal or dispatch it via Check-Out Operations.",
				actionButton: {
					label: "View in Customer Portal",
					onClick: () => {
						setAppMode("customer_portal");
						onClose();
					}
				}
			};
		} else if (q.includes("underutil") || q.includes("idle") || q.includes("zero engine")) {
			const underutilized = assets.filter((a) => a.utilizationPct < 25);
			aiMsg = {
				id: `ai-${Date.now()}`,
				sender: "ai",
				text: `Found ${underutilized.length} underutilized equipment units: EQX1007 (0%), EQX1002 (0%), and EQX1001 (13%).`,
				evidence: `EQX1007 is logging 12 idle hrs/day in the staging yard with 95% fuel and good mechanical condition.`,
				recommendation: `Deploy EQX1007 to Site S003 (Bhopal Metro) where 2 additional excavators are required next week.`,
				actionButton: {
					label: "Pre-position EQX1007 → S003",
					onClick: () => {
						if (optimizationPlans[0]) openActionSheet(optimizationPlans[0]);
						onClose();
					}
				}
			};
		} else if (q.includes("s003") || q.includes("bhopal") || q.includes("demand")) aiMsg = {
			id: `ai-${Date.now()}`,
			sender: "ai",
			text: "Site S003 (Bhopal Metro Line 2) has a projected demand surge of 3 excavators. Currently, only 1 excavator (EQX1001) is on site.",
			evidence: "Demand Gap: 2 excavators. Expected project milestone deadline: May 16, 2025.",
			recommendation: "Immediate candidate: EQX1007 (Excavator, Unassigned, 0% util). Mobilization distance is 142 km (~2.5 hrs transit).",
			actionButton: {
				label: "Mobilize EQX1007 Now",
				onClick: () => {
					reassignAsset("EQX1007", "S003", "OP101", "AI Copilot expedited dispatch");
					onClose();
				}
			}
		};
		else if (q.includes("overdue") || q.includes("alerts")) aiMsg = {
			id: `ai-${Date.now()}`,
			sender: "ai",
			text: "EQX1002 (Crane) is currently 41 days overdue past its contracted return date of 2025-03-30.",
			evidence: "Asset is currently at Central Holding Depot with 0 engine hours recorded over the entire window, costing ₹85,000/mo in idle lease charges.",
			recommendation: "Schedule immediate off-hire depot return and inspection.",
			actionButton: {
				label: "Inspect EQX1002 in Alerts",
				onClick: () => {
					selectAsset("EQX1002");
					onClose();
				}
			}
		};
		else aiMsg = {
			id: `ai-${Date.now()}`,
			sender: "ai",
			text: `Fleet analysis complete for "${queryText}". All 7 machines, 5 sites, and active rental contracts are synchronized with Supabase.`,
			evidence: "Active utilization is 52% average with ₹4.8L in security deposits held.",
			recommendation: "Optimal next action: Assign unassigned assets (EQX1007) to high-demand infrastructure sites (S003).",
			actionButton: {
				label: "View Fleet Optimizer",
				onClick: () => {
					setAppMode("optimizer");
					onClose();
				}
			}
		};
		setMessages((prev) => [
			...prev,
			userMsg,
			aiMsg
		]);
		setInput("");
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (input.trim()) handleQuery(input.trim());
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/25 backdrop-blur-md animate-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-col h-[640px] w-full max-w-2xl overflow-hidden rounded-[28px] border border-border/80 bg-white shadow-float animate-scale-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-6 py-4 border-b border-border/70 bg-gradient-to-r from-accent/15 via-white to-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground font-bold shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 18 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-bold text-foreground",
								children: "Fleet & Rental Copilot"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-ok/15 px-2 py-0.2 text-[10px] font-bold text-ok",
								children: "Supabase Live"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11.5px] text-muted-foreground",
							children: "Autonomous telemetry intelligence & rental transaction advisory"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto p-6 space-y-4 text-[13px]",
					children: messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex ${m.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `max-w-[85%] rounded-[20px] p-4 ${m.sender === "user" ? "bg-foreground text-background font-medium" : "border border-border/80 bg-card text-foreground shadow-xs"}`,
							children: [
								m.sender === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-[11px] font-bold text-ok mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copilot Recommendation" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "leading-relaxed",
									children: m.text
								}),
								m.evidence && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2.5 rounded-xl border border-border/60 bg-muted/40 p-2.5 text-[11.5px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground block mb-0.5",
										children: "Telemetry Evidence:"
									}), m.evidence]
								}),
								m.recommendation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 text-[11.5px] text-muted-foreground",
									children: m.recommendation
								}),
								m.actionButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: m.actionButton.onClick,
									className: "mt-3 flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[11.5px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 12 }), m.actionButton.label]
								})
							]
						})
					}, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border/60 bg-muted/20 px-6 py-2.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 overflow-x-auto text-[11px] pb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground font-semibold shrink-0",
							children: "Quick Queries:"
						}), [
							"Which equipment is currently available?",
							"How much deposit is held in escrow?",
							"Which rentals are overdue?",
							"What is Site S003 demand gap?",
							"Which deposits are waiting for refund?"
						].map((prompt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleQuery(prompt),
							className: "shrink-0 rounded-full border border-border/80 bg-white px-3 py-1 font-medium text-foreground hover:border-foreground hover:bg-muted/30 shadow-apple-xs transition-all",
							children: prompt
						}, i))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border/70 p-4 bg-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-full border border-border/80 bg-muted/30 px-4 py-2 focus-within:border-foreground focus-within:bg-white shadow-apple-xs transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: input,
							onChange: (e) => setInput(e.target.value),
							onKeyDown: handleKeyDown,
							placeholder: "Ask Copilot about equipment availability, deposits, returns, or forecasts...",
							className: "flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => input.trim() && handleQuery(input.trim()),
							disabled: !input.trim(),
							className: "flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xs hover:opacity-90 disabled:opacity-30 transition-all",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 13 })
						})]
					})
				})
			]
		})
	});
}
function ActionSheet() {
	const { activeActionPlan, assets } = useFleet();
	if (!activeActionPlan) return null;
	const plan = activeActionPlan;
	assets.find((a) => a.id === plan.assetId);
	const handleConfirm = () => {
		applyOptimizationPlan(plan.id);
	};
	const handleReviewInWorkspace = () => {
		selectAsset(plan.assetId);
		openActionSheet(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/25 backdrop-blur-sm animate-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-lg overflow-hidden rounded-[26px] border border-border/80 bg-white p-6 shadow-float transition-all animate-scale-in",
			role: "dialog",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[12px] font-semibold text-accent-foreground shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							size: 13,
							className: "text-accent-foreground"
						}), "AI Operational Recommendation"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => openActionSheet(null),
						className: "flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold tracking-tight text-foreground",
						children: plan.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[13px] text-muted-foreground",
						children: [
							"Asset ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: plan.assetId
							}),
							" · Action type:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-brand",
								children: plan.type
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between rounded-2xl border border-border/70 bg-muted/40 p-3.5 text-[12.5px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10.5px] uppercase tracking-wide text-muted-foreground",
							children: "Current Origin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-foreground",
							children: plan.fromSite
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] uppercase tracking-wide text-muted-foreground",
								children: "Recommended Destination"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground",
								children: plan.toSite
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-3.5 text-[13px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-muted/20 p-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Why this action"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-foreground/90",
								children: plan.why
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-muted/20 p-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "What will change"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-foreground/90",
								children: plan.whatWillChange
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-accent/20 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-[10.5px] font-semibold text-accent-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 12 }), "Util Delta"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[14px] font-bold text-accent-foreground",
										children: plan.utilizationDelta
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-ok/10 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-[10.5px] font-semibold text-ok",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 12 }), "Idle Saved"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[14px] font-bold text-ok",
										children: plan.idleReduction
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-white p-3 shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-[10.5px] font-semibold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { size: 12 }), "Cost Benefit"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[14px] font-bold text-foreground",
										children: plan.savings
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-2 text-[12px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
						size: 14,
						className: "text-ok"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Confidence Level: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: plan.confidence
						}),
						" (Based on real-time site telemetry & 7-day demand forecast)"
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => openActionSheet(null),
							className: "flex-1 rounded-full border border-border bg-muted/50 px-4 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted",
							children: "Dismiss"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleReviewInWorkspace,
							className: "flex-1 rounded-full border border-border bg-white px-4 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted shadow-xs",
							children: "Review Plan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleConfirm,
							className: "flex-[1.5] flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold text-accent-foreground shadow-sm transition-transform hover:opacity-95 active:scale-[0.98]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), "Confirm Action"]
						})
					]
				})
			]
		})
	});
}
function AuthModal({ isOpen, onClose }) {
	const { currentUser } = useFleet();
	const [authMode, setAuthMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)(currentUser.email);
	const [password, setPassword] = (0, import_react.useState)("••••••••••••");
	const [selectedRole, setSelectedRole] = (0, import_react.useState)(currentUser.role);
	const [regName, setRegName] = (0, import_react.useState)("");
	const [regEmail, setRegEmail] = (0, import_react.useState)("");
	const [regPhone, setRegPhone] = (0, import_react.useState)("");
	const [regPassword, setRegPassword] = (0, import_react.useState)("");
	const [regCompany, setRegCompany] = (0, import_react.useState)("");
	const [regRole, setRegRole] = (0, import_react.useState)("customer");
	const [statusMsg, setStatusMsg] = (0, import_react.useState)("");
	if (!isOpen) return null;
	const handleRoleSelect = (role) => {
		setSelectedRole(role);
		setEmail(INITIAL_PROFILES[role]?.email || (role === "customer" ? "rajesh.patel@apexinfra.com" : "admin@rentsense.com"));
	};
	const handleLogin = (e) => {
		e.preventDefault();
		switchUserRole(selectedRole);
		setStatusMsg(`Authenticated as ${INITIAL_PROFILES[selectedRole]?.name || "User"} (${selectedRole === "customer" ? "Customer" : "Rental Staff / Admin"})`);
		setTimeout(() => {
			onClose();
			setStatusMsg("");
		}, 500);
	};
	const handleRegister = (e) => {
		e.preventDefault();
		if (!regName.trim() || !regEmail.trim() || !regPhone.trim()) {
			setStatusMsg("Please fill in Name, Email, and Phone number.");
			return;
		}
		const created = registerUser({
			name: regName.trim(),
			email: regEmail.trim(),
			phone: regPhone.trim(),
			role: regRole,
			companyName: regCompany.trim() || void 0
		});
		setStatusMsg(`Account Created! Welcome ${created.name} (${regRole === "customer" ? "Customer" : "Rental Staff / Admin"}).`);
		setTimeout(() => {
			onClose();
			setStatusMsg("");
		}, 600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/25 backdrop-blur-md animate-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md overflow-hidden rounded-[28px] border border-border/80 bg-white p-7 shadow-float animate-scale-in max-h-[92vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background shadow-apple-sm mb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 rounded-full bg-accent" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold tracking-tight text-foreground",
							children: "RentSense"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12.5px] text-muted-foreground mt-0.5",
							children: "Heavy Equipment Operations & Customer Portal"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex rounded-full bg-muted/60 p-1 border border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setAuthMode("signin");
							setStatusMsg("");
						},
						className: `flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 text-[12.5px] font-bold transition-all ${authMode === "signin" ? "bg-white text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { size: 13 }), "Sign In"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setAuthMode("register");
							setStatusMsg("");
						},
						className: `flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 text-[12.5px] font-bold transition-all ${authMode === "register" ? "bg-accent text-accent-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 13 }), "Create Account"]
					})]
				}),
				authMode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleLogin,
					className: "mt-5 space-y-3.5 text-[13px] animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2",
							children: "Sign In Role Profile"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [{
								id: "customer",
								label: "Customer",
								sub: "Rental Client"
							}, {
								id: "rental_staff",
								label: "Rental Staff (Admin)",
								sub: "Operations Lead"
							}].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => handleRoleSelect(r.id),
								className: `flex flex-col items-center rounded-2xl border p-3 text-center transition-all ${selectedRole === r.id ? "border-foreground bg-foreground text-background shadow-xs font-bold" : "border-border/80 bg-muted/30 text-muted-foreground hover:border-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[12px]",
									children: r.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] opacity-75",
									children: r.sub
								})]
							}, r.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-semibold text-muted-foreground mb-1",
							children: "Email Address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2.5 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-semibold text-muted-foreground mb-1",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2.5 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
						})] }),
						statusMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-center text-[12px] font-bold text-ok flex items-center justify-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }),
								" ",
								statusMsg
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "w-full flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-[0.98] transition-all mt-2",
							children: ["Sign In to RentSense", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleRegister,
					className: "mt-5 space-y-3 text-[13px] animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5",
							children: "Account Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setRegRole("customer"),
								className: `rounded-2xl border p-2.5 text-center transition-all ${regRole === "customer" ? "border-foreground bg-foreground text-background font-bold shadow-xs" : "border-border/80 bg-muted/30 text-muted-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[12px] block",
									children: "Customer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] opacity-75",
									children: "Hire heavy equipment"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setRegRole("rental_staff"),
								className: `rounded-2xl border p-2.5 text-center transition-all ${regRole === "rental_staff" ? "border-foreground bg-foreground text-background font-bold shadow-xs" : "border-border/80 bg-muted/30 text-muted-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[12px] block",
									children: "Rental Staff (Admin)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] opacity-75",
									children: "Full fleet & operations"
								})]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-semibold text-muted-foreground mb-1",
							children: "Full Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							required: true,
							value: regName,
							onChange: (e) => setRegName(e.target.value),
							placeholder: "e.g. Ramesh Chandra",
							className: "w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-semibold text-muted-foreground mb-1",
								children: "Email Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: regEmail,
								onChange: (e) => setRegEmail(e.target.value),
								placeholder: "name@company.com",
								className: "w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-semibold text-muted-foreground mb-1",
								children: "Phone Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "tel",
								required: true,
								value: regPhone,
								onChange: (e) => setRegPhone(e.target.value),
								placeholder: "+91 98765 43210",
								className: "w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-semibold text-muted-foreground mb-1",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								value: regPassword,
								onChange: (e) => setRegPassword(e.target.value),
								placeholder: "••••••••",
								className: "w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-semibold text-muted-foreground mb-1",
								children: "Company Name (Optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: regCompany,
								onChange: (e) => setRegCompany(e.target.value),
								placeholder: "e.g. Skyline Builders",
								className: "w-full rounded-2xl border border-border/80 bg-muted/30 px-4 py-2 text-foreground font-medium outline-none focus:border-foreground focus:bg-white"
							})] })]
						}),
						statusMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-center text-[12px] font-bold text-ok flex items-center justify-center gap-1 pt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }),
								" ",
								statusMsg
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "w-full flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-[0.98] transition-all mt-2",
							children: ["Create Account & Access RentSense", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-[11px] text-muted-foreground",
					children: "Protected by RentSense Enterprise Supabase Authentication"
				})
			]
		})
	});
}
function EquipmentHero({ asset, className = "", compact = false, showTelemetryHUD = true }) {
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const photo = EQUIPMENT_PHOTOS[asset.type];
	const statusGlow = asset.status === "Active" ? "from-ok/20 via-ok/5 to-transparent" : asset.status === "Idle" ? "from-warn/25 via-warn/5 to-transparent" : asset.status === "Overdue" ? "from-danger/25 via-danger/5 to-transparent" : "from-accent/30 via-accent/5 to-transparent";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `group relative flex flex-col items-center justify-center overflow-visible select-none ${className}`,
		onMouseEnter: () => setHovered(true),
		onMouseLeave: () => setHovered(false),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 -z-10 flex items-center justify-center pointer-events-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-gradient-radial ${statusGlow} blur-2xl transition-all duration-700 ${hovered ? "scale-115 opacity-100" : "scale-100 opacity-75"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute bottom-3 sm:bottom-4 h-5 sm:h-6 w-4/5 max-w-[340px] rounded-full bg-slate-900/15 blur-md transition-all duration-500 ${hovered ? "scale-x-95 opacity-60 translate-y-1" : "scale-x-100 opacity-80"}` })]
			}),
			showTelemetryHUD && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-2 inset-x-2 z-10 flex items-center justify-between pointer-events-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-foreground shadow-apple-sm backdrop-blur-md border border-border/60 pointer-events-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${asset.status === "Active" ? "bg-ok animate-pulse" : asset.status === "Idle" ? "bg-warn" : asset.status === "Overdue" ? "bg-danger" : "bg-muted-foreground"}` }),
						asset.type,
						" · ",
						asset.id
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 pointer-events-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-medium text-muted-foreground shadow-apple-sm backdrop-blur-md border border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, {
							size: 12,
							className: "text-amber-500"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-foreground tabular-nums",
							children: [asset.fuelPct, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-[10.5px] font-semibold text-accent-foreground shadow-apple-sm backdrop-blur-md border border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [asset.utilizationPct, "%"]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `relative z-0 flex items-center justify-center transition-transform duration-500 ease-out ${compact ? "h-32 sm:h-40" : "h-48 sm:h-60"} ${hovered ? "scale-105 -translate-y-1" : "scale-100"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: photo,
					alt: `${asset.type} — ${asset.id}`,
					className: "h-full max-h-full w-auto object-contain mix-blend-multiply filter contrast-[1.05] drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
				}, asset.id)
			}),
			showTelemetryHUD && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex w-full items-center justify-between px-2 pt-2 border-t border-border/40 text-[11px] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [asset.condition === "Good" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						size: 13,
						className: "text-ok"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						size: 13,
						className: "text-warn"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium text-foreground",
						children: [asset.condition, " condition"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 tabular-nums",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-foreground",
						children: [asset.engineHrsPerDay, "h"]
					}), " eng/day"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "text-foreground",
						children: [asset.idleHrsPerDay, "h"]
					}), " idle/day"] })]
				})]
			})
		]
	});
}
function NewRentalModal({ asset, isOpen, onClose }) {
	const { currentUser } = useFleet();
	const [siteId, setSiteId] = (0, import_react.useState)("S003");
	const [operatorId, setOperatorId] = (0, import_react.useState)("OP101");
	const [startDate, setStartDate] = (0, import_react.useState)("2025-05-15");
	const [endDate, setEndDate] = (0, import_react.useState)("2025-06-14");
	const [agreementChecked, setAgreementChecked] = (0, import_react.useState)(false);
	const [showAgreementDoc, setShowAgreementDoc] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [successContract, setSuccessContract] = (0, import_react.useState)(null);
	if (!isOpen) return null;
	const monthlyRate = asset.monthlyRentalRate;
	const depositRatio = asset.securityDepositRatio;
	const securityDeposit = Math.round(monthlyRate * depositRatio);
	const totalPayable = monthlyRate + securityDeposit;
	const handleBookRental = () => {
		if (!agreementChecked) return;
		setSubmitting(true);
		const contract = createRentalContract({
			equipmentId: asset.id,
			siteId,
			operatorId: operatorId || null,
			startDate,
			endDate
		});
		setTimeout(() => {
			setSubmitting(false);
			setSuccessContract(contract);
		}, 500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-md animate-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-border/80 bg-white p-7 shadow-float animate-scale-in max-h-[90vh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				className: "absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
			}), successContract ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-6 text-center space-y-4 animate-fade-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ok/15 text-ok",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 36 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold uppercase tracking-wider text-ok",
							children: "Rental Contract Executed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-2xl font-bold text-foreground",
							children: [
								"Contract #",
								successContract.contractNumber,
								" Active"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[13px] text-muted-foreground",
							children: [
								"Assigned to ",
								currentUser.companyName,
								" at Site ",
								siteId,
								" (",
								SITES_META[siteId]?.name,
								")."
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/60 bg-muted/20 p-4 text-left text-[12.5px] space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Equipment:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-foreground",
									children: [
										asset.id,
										" (",
										asset.type,
										")"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Rental Window:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-foreground",
									children: [
										startDate,
										" → ",
										endDate
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Monthly Rental Paid:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-foreground",
									children: ["₹", monthlyRate.toLocaleString("en-IN")]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Refundable Security Deposit:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-ok",
									children: [
										"₹",
										securityDeposit.toLocaleString("en-IN"),
										" (Held in Escrow)"
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "w-full rounded-full bg-foreground px-5 py-3 text-[13px] font-bold text-background hover:opacity-95",
						children: "View in Customer Portal"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "New Equipment Rental Booking"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-xl font-bold tracking-tight text-foreground",
						children: [
							"Rent ",
							asset.id,
							" — ",
							asset.type
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[12.5px] text-muted-foreground mt-0.5",
						children: [
							"Book for ",
							currentUser.companyName,
							" (",
							currentUser.name,
							")"
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 rounded-2xl border border-border/60 bg-gradient-to-b from-slate-50/70 to-white p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentHero, {
						asset,
						compact: true,
						showTelemetryHUD: false
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[13px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1",
							children: "Destination Site"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: siteId,
							onChange: (e) => setSiteId(e.target.value),
							className: "w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-semibold text-foreground outline-none",
							children: SITES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: s,
								children: [
									"Site ",
									s,
									" — ",
									SITES_META[s]?.name ?? s
								]
							}, s))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1",
							children: "Dedicated Certified Operator"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: operatorId,
							onChange: (e) => setOperatorId(e.target.value),
							className: "w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-semibold text-foreground outline-none",
							children: OPERATORS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: o,
								children: [
									"Operator ",
									o,
									" (Level 2 Certified)"
								]
							}, o))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1",
							children: "Rental Start Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: startDate,
							onChange: (e) => setStartDate(e.target.value),
							className: "w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-medium text-foreground outline-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1",
							children: "Rental Return Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: endDate,
							onChange: (e) => setEndDate(e.target.value),
							className: "w-full rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 font-medium text-foreground outline-none"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-2xl border border-border/70 bg-card p-4 space-y-2 text-[12.5px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
							children: "Pricing & Security Deposit Breakdown"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between py-1 border-b border-border/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Monthly Base Rental Rate:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-foreground tabular-nums",
								children: ["₹", monthlyRate.toLocaleString("en-IN")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between py-1 border-b border-border/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground font-semibold",
									children: "Refundable Security Deposit:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 rounded-full bg-ok/15 px-2 py-0.2 text-[10px] font-bold text-ok",
									children: "REFUNDABLE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10.5px] text-muted-foreground",
									children: "Held in security escrow during rental duration. 100% refunded post-inspection."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-ok tabular-nums",
								children: ["₹", securityDeposit.toLocaleString("en-IN")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between pt-2 text-[14px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground",
								children: "Total Initial Payable Today:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "font-black text-foreground tabular-nums",
								children: ["₹", totalPayable.toLocaleString("en-IN")]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-2xl border border-border/60 bg-muted/20 p-3.5 text-[12px] space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-start gap-2.5 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: agreementChecked,
								onChange: (e) => setAgreementChecked(e.target.checked),
								className: "mt-0.5 h-4 w-4 rounded border-border accent-foreground cursor-pointer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-foreground leading-relaxed",
								children: [
									"I explicitly agree to the Master Equipment Rental Agreement, operator safety regulations, and the",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Refundable Security Deposit Policy" }),
									"."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setShowAgreementDoc(!showAgreementDoc),
							className: "text-[11px] font-bold text-brand hover:underline flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 12 }),
								" ",
								showAgreementDoc ? "Hide" : "Review",
								" Full Agreement Terms"
							]
						}),
						showAgreementDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-white p-3 border border-border text-[11px] text-muted-foreground max-h-32 overflow-y-auto space-y-1 animate-fade-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "1. Deposit Terms:" }), " Security deposit is held as refundable guarantee against major damages or gross negligence."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "2. Fuel & Maintenance:" }), " Return machine with nominal fuel level matching pre-inspection reading."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "3. Inspection Verification:" }), " Pre-checkout condition and check-in inspection reports govern final deposit release within 48h."] })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleBookRental,
					disabled: !agreementChecked || submitting,
					className: "mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-95 disabled:opacity-50 transition-all active:scale-[0.99]",
					children: [submitting ? "Processing Payment & Agreement..." : `Pay ₹${totalPayable.toLocaleString("en-IN")} & Execute Rental`, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
				})
			] })]
		})
	});
}
function CustomerPortal() {
	const { assets, contracts, currentUser } = useFleet();
	const [activeTab, setActiveTab] = (0, import_react.useState)("rentals");
	const [bookingAsset, setBookingAsset] = (0, import_react.useState)(null);
	const myContracts = contracts.filter((c) => c.customerId === currentUser.id);
	const activeRentals = myContracts.filter((c) => c.rentalStatus === "Active Rental" || c.rentalStatus === "Pending Checkout" || c.rentalStatus === "Return Requested");
	const availableAssets = assets.filter((a) => a.status === "Unassigned" || a.status === "Idle");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-border/70 bg-white p-6 shadow-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background font-bold text-lg shadow-apple-sm",
						children: currentUser.name.charAt(0)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold tracking-tight text-foreground",
							children: currentUser.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-ok/15 px-2.5 py-0.5 text-[11px] font-bold text-ok flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 }), " Verified Customer"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[13px] text-muted-foreground mt-0.5",
						children: [
							currentUser.companyName,
							" · Account ID: ",
							currentUser.id
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("browse"),
						className: "flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), " Book Equipment"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1.5 border-b border-border/60 pb-2 overflow-x-auto text-[13px]",
				children: [
					{
						id: "rentals",
						label: `My Active Rentals (${activeRentals.length})`
					},
					{
						id: "browse",
						label: `Available Fleet (${availableAssets.length})`
					},
					{
						id: "deposits",
						label: `Security Deposits & Escrow`
					},
					{
						id: "agreements",
						label: "Rental Agreements & Invoices"
					}
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActiveTab(t.id),
					className: `rounded-full px-4 py-2 font-bold transition-all ${activeTab === t.id ? "bg-foreground text-background shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
					children: t.label
				}, t.id))
			}),
			activeTab === "rentals" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: activeRentals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[28px] border border-border/70 bg-white p-12 text-center text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
							size: 40,
							className: "mx-auto text-muted-foreground mb-3 opacity-60"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-bold text-foreground",
							children: "No active rentals right now"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13px] mt-1",
							children: "Browse our heavy equipment fleet to book excavators, cranes, bulldozers or graders."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveTab("browse"),
							className: "mt-4 rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold text-accent-foreground shadow-xs",
							children: "Browse Available Fleet"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
					children: activeRentals.map((contract) => {
						const asset = assets.find((a) => a.id === contract.equipmentId) || assets[0];
						if (!asset) return null;
						const isReturnPending = contract.rentalStatus === "Return Requested";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-between rounded-[28px] border border-border/70 bg-card p-6 shadow-panel hover:shadow-widget transition-all",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
											children: [
												contract.equipmentType,
												" · Contract #",
												contract.contractNumber
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-bold tracking-tight text-foreground mt-0.5",
											children: contract.equipmentId
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[12.5px] text-muted-foreground mt-0.5",
											children: [
												"Site ",
												contract.siteId,
												" · Operator ",
												contract.operatorId ?? "Unassigned"
											]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-3 py-1 text-[11px] font-bold ${isReturnPending ? "bg-warn/20 text-warn-foreground" : "bg-ok/15 text-ok"}`,
											children: isReturnPending ? "Return Requested" : "Active Rental"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 rounded-2xl border border-border/60 bg-gradient-to-b from-slate-50/70 to-white p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentHero, {
										asset,
										compact: true,
										showTelemetryHUD: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-2xl border border-border/60 bg-muted/20 p-3.5 text-center text-[12px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase font-semibold block",
											children: "Period"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-foreground",
											children: [
												contract.startDate,
												" → ",
												contract.endDate
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase font-semibold block",
											children: "Monthly Rate"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-foreground tabular-nums",
											children: ["₹", contract.monthlyRentalRate.toLocaleString("en-IN")]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase font-semibold block",
											children: "Deposit (Held)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-ok tabular-nums",
											children: ["₹", contract.securityDepositAmount.toLocaleString("en-IN")]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase font-semibold block",
											children: "Condition"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: asset.condition
										})] })
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 pt-4 border-t border-border/50 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11.5px] text-muted-foreground",
									children: "Deposit 100% refundable post-inspection"
								}), isReturnPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[12px] font-semibold text-warn flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 13 }), " Return scheduled with staff"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => requestReturn(contract.id),
									className: "flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[12.5px] font-bold text-background shadow-xs hover:opacity-90 active:scale-95 transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 13 }), " Request Equipment Return"]
								})]
							})]
						}, contract.id);
					})
				})
			}),
			activeTab === "browse" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
				children: availableAssets.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between rounded-[28px] border border-border/70 bg-card p-6 shadow-panel hover:shadow-widget transition-all",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
								children: asset.type
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-ok/15 px-2.5 py-0.5 text-[10.5px] font-bold text-ok",
								children: "Ready for Hire"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold tracking-tight text-foreground mt-1",
							children: asset.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted-foreground",
							children: asset.location
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 rounded-2xl border border-border/60 bg-gradient-to-b from-slate-50/70 to-white p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentHero, {
								asset,
								compact: true,
								showTelemetryHUD: false
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-2xl border border-border/60 bg-muted/20 p-3.5 space-y-1.5 text-[12.5px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Monthly Rental:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-foreground",
									children: [
										"₹",
										asset.monthlyRentalRate.toLocaleString("en-IN"),
										" / mo"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Refundable Deposit:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-ok",
									children: ["₹", Math.round(asset.monthlyRentalRate * asset.securityDepositRatio).toLocaleString("en-IN")]
								})]
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setBookingAsset(asset),
						className: "mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all",
						children: [
							"Configure & Rent ",
							asset.id,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })
						]
					})]
				}, asset.id))
			}),
			activeTab === "deposits" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[24px] border border-border/70 bg-white p-5 shadow-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "Active Security Deposits Held"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-2xl font-black text-foreground mt-1 tabular-nums",
									children: ["₹", myContracts.filter((c) => c.depositStatus === "Held").reduce((s, c) => s + c.securityDepositAmount, 0).toLocaleString("en-IN")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-ok mt-1 block",
									children: "Held in secured escrow"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[24px] border border-border/70 bg-white p-5 shadow-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "Refunds in Processing"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-2xl font-black text-warn mt-1 tabular-nums",
									children: ["₹", myContracts.filter((c) => c.depositStatus === "Refund Pending" || c.depositStatus === "Refund Processing").reduce((s, c) => s + c.refundAmount, 0).toLocaleString("en-IN")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground mt-1 block",
									children: "Awaiting return inspection sign-off"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[24px] border border-border/70 bg-white p-5 shadow-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
									children: "Total Refunded to Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-2xl font-black text-ok mt-1 tabular-nums",
									children: ["₹", myContracts.filter((c) => c.depositStatus === "Refunded" || c.depositStatus === "Partially Deducted").reduce((s, c) => s + c.refundAmount, 0).toLocaleString("en-IN")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-ok mt-1 block",
									children: "100% compliant return history"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[28px] border border-border/70 bg-white overflow-hidden shadow-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-6 py-4 border-b border-border/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-bold text-foreground",
							children: "Security Deposit Ledger"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border/50 text-[13px]",
						children: myContracts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-6 py-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-foreground",
								children: [
									c.equipmentId,
									" (",
									c.equipmentType,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11.5px] text-muted-foreground",
								children: [
									"Contract #",
									c.contractNumber,
									" · Site ",
									c.siteId
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-foreground tabular-nums",
									children: ["₹", c.securityDepositAmount.toLocaleString("en-IN")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[11px] font-semibold text-ok",
									children: c.depositStatus
								})]
							})]
						}, c.id))
					})]
				})]
			}),
			activeTab === "agreements" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[28px] border border-border/70 bg-white p-6 shadow-panel space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-bold text-foreground",
					children: "Executed Rental Agreements"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border/50 text-[13px]",
					children: myContracts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between py-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 18 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "font-bold text-foreground",
								children: ["Agreement #", c.contractNumber]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11.5px] text-muted-foreground",
								children: [
									"Executed ",
									c.agreementAcceptedAt ?? c.createdAt,
									" · ",
									c.equipmentId,
									" to ",
									c.customerCompany
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-full border border-border bg-white px-3.5 py-1.5 text-[11.5px] font-bold text-foreground hover:bg-muted shadow-xs",
							children: "View PDF Copy"
						})]
					}, c.id))
				})]
			}),
			bookingAsset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewRentalModal, {
				asset: bookingAsset,
				isOpen: Boolean(bookingAsset),
				onClose: () => setBookingAsset(null)
			})
		]
	});
}
function InspectionComparisonModal({ contract, isOpen, onClose }) {
	const { currentUser } = useFleet();
	const [damageDeduction, setDamageDeduction] = (0, import_react.useState)(0);
	const [deductionReason, setDeductionReason] = (0, import_react.useState)("");
	const [completed, setCompleted] = (0, import_react.useState)(false);
	if (!isOpen) return null;
	const pre = contract.preInspection;
	const post = contract.postInspection;
	const refundableAmount = Math.max(0, contract.securityDepositAmount - damageDeduction);
	const checklistItems = [
		{
			label: "Engine Runtime & Health",
			pre: "Good",
			post: "Good",
			delta: "Normal Wear"
		},
		{
			label: "Hydraulics & Seals",
			pre: "Good",
			post: "Good",
			delta: "Nominal"
		},
		{
			label: "Body Work & Chassis",
			pre: pre?.body ?? "Good",
			post: post?.body ?? "Needs Attention",
			delta: post?.body === "Needs Attention" ? "New Minor Scratch" : "No Change"
		},
		{
			label: "Tracks / Tires Tread",
			pre: "Good",
			post: "Good",
			delta: "Nominal"
		},
		{
			label: "Cabin & Instrumentation",
			pre: "Good",
			post: "Good",
			delta: "Clean"
		},
		{
			label: "Lighting & Electricals",
			pre: "Good",
			post: "Good",
			delta: "Operational"
		},
		{
			label: "Safety Equipment",
			pre: "Good",
			post: "Good",
			delta: "Passed"
		}
	];
	const handleApproveRefund = () => {
		approveDepositRefund(contract.id, damageDeduction, deductionReason, currentUser.name);
		setCompleted(true);
		setTimeout(() => {
			onClose();
		}, 800);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/25 backdrop-blur-md animate-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-border/80 bg-white p-7 shadow-float animate-scale-in max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Side-by-Side Condition Inspection Audit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-xl font-bold tracking-tight text-foreground",
						children: [
							contract.equipmentId,
							" (",
							contract.equipmentType,
							") — Contract #",
							contract.contractNumber
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[12.5px] text-muted-foreground mt-0.5",
						children: [
							"Customer: ",
							contract.customerCompany,
							" · Site: ",
							contract.siteId
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-2xl border border-border/70 overflow-hidden text-[12.5px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 bg-muted/40 px-4 py-2.5 font-bold text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "col-span-5",
								children: "Inspection Point"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "col-span-2 text-center",
								children: "Pre-Checkout"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "col-span-2 text-center",
								children: "Post-Return"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "col-span-3 text-right",
								children: "Variance"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border/40",
						children: [
							checklistItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-12 px-4 py-2.5 items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "col-span-5 font-semibold text-foreground",
										children: item.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "col-span-2 text-center text-ok font-medium",
										children: item.pre
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `col-span-2 text-center font-medium ${item.post === "Good" ? "text-ok" : "text-warn font-bold"}`,
										children: item.post
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `col-span-3 text-right font-medium ${item.delta.includes("New") ? "text-warn" : "text-muted-foreground"}`,
										children: item.delta
									})
								]
							}, i)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-12 px-4 py-2.5 items-center bg-muted/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "col-span-5 font-semibold text-foreground",
										children: "Fuel Tank Level"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "col-span-2 text-center tabular-nums",
										children: [pre?.fuelPct ?? 95, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "col-span-2 text-center tabular-nums",
										children: [post?.fuelPct ?? 88, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "col-span-3 text-right text-muted-foreground",
										children: "-7% consumed"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-12 px-4 py-2.5 items-center bg-muted/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "col-span-5 font-semibold text-foreground",
										children: "Hour Meter"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "col-span-2 text-center tabular-nums",
										children: [pre?.hourMeter ?? 1240, "h"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "col-span-2 text-center tabular-nums",
										children: [post?.hourMeter ?? 1286, "h"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "col-span-3 text-right text-ok font-bold",
										children: "+46h billable"
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-2xl border border-border/70 bg-card p-4 space-y-3 text-[13px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
							children: "Security Deposit Refund Authorization"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between py-1 border-b border-border/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Original Security Deposit Held:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-foreground tabular-nums",
								children: ["₹", contract.securityDepositAmount.toLocaleString("en-IN")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-1 border-b border-border/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-warn font-semibold",
								children: "Approved Damage / Wear Deduction:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "₹"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: damageDeduction,
									onChange: (e) => setDamageDeduction(Math.max(0, Number(e.target.value))),
									className: "w-24 rounded-lg border border-border bg-muted/30 px-2.5 py-1 text-right font-bold text-foreground outline-none"
								})]
							})]
						}),
						damageDeduction > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "animate-fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-semibold text-muted-foreground mb-1",
								children: "Authorized Deduction Justification"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: deductionReason,
								onChange: (e) => setDeductionReason(e.target.value),
								placeholder: "e.g. Minor body scratch repair as noted in post-inspection...",
								className: "w-full rounded-xl border border-border bg-muted/20 px-3 py-2 text-[12px] text-foreground outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between pt-2 text-[15px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground",
								children: "Final Net Refundable to Customer:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "font-black text-ok tabular-nums",
								children: ["₹", refundableAmount.toLocaleString("en-IN")]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "flex-1 rounded-full border border-border px-4 py-2.5 text-[12.5px] font-semibold text-foreground hover:bg-muted",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleApproveRefund,
						disabled: completed,
						className: "flex-[2] flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all",
						children: completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), " Refund Authorized & Logged!"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { size: 16 }),
							" Authorize ₹",
							refundableAmount.toLocaleString("en-IN"),
							" Deposit Refund"
						] })
					})]
				})
			]
		})
	});
}
function ApprovalCenter() {
	const { contracts, assets, currentUser } = useFleet();
	const [comparingContract, setComparingContract] = (0, import_react.useState)(null);
	const pendingCheckouts = contracts.filter((c) => c.rentalStatus === "Pending Checkout");
	const returnRequests = contracts.filter((c) => c.rentalStatus === "Return Requested" || c.rentalStatus === "Checked In" || c.depositStatus === "Refund Pending");
	const handleQuickApproveCheckout = (contract) => {
		const dummyPreInspection = {
			id: `insp-pre-${Date.now()}`,
			contractId: contract.id,
			equipmentId: contract.equipmentId,
			type: "pre_checkout",
			inspectorName: currentUser.name,
			timestamp: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "),
			engine: "Good",
			hydraulics: "Good",
			body: "Good",
			tracksTires: "Good",
			cabin: "Good",
			lights: "Good",
			safety: "Good",
			fuelPct: 95,
			hourMeter: 1240,
			notes: "Pre-rental dispatch checklist completed. Machine in nominal operating order."
		};
		approveCheckOut(contract.id, dummyPreInspection);
	};
	const handleQuickApproveCheckin = (contract) => {
		const dummyPostInspection = {
			id: `insp-post-${Date.now()}`,
			contractId: contract.id,
			equipmentId: contract.equipmentId,
			type: "post_checkin",
			inspectorName: currentUser.name,
			timestamp: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "),
			engine: "Good",
			hydraulics: "Good",
			body: "Good",
			tracksTires: "Good",
			cabin: "Good",
			lights: "Good",
			safety: "Good",
			fuelPct: 88,
			hourMeter: 1286,
			notes: "Post-rental checkin completed. Normal nominal duty wear."
		};
		approveCheckIn(contract.id, dummyPostInspection);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-bold text-foreground",
					children: "Pending Check-Out Approvals"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] text-muted-foreground",
					children: "Equipment bookings awaiting operational inspection and gate dispatch"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-accent-foreground",
					children: [pendingCheckouts.length, " Pending"]
				})]
			}), pendingCheckouts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-border/60 bg-muted/20 p-6 text-center text-[13px] text-muted-foreground",
				children: "No check-outs currently pending operational approval."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: pendingCheckouts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[24px] border border-border/70 bg-card p-5 shadow-panel space-y-3 text-[12.5px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
									children: ["Contract #", c.contractNumber]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-base font-bold text-foreground mt-0.5",
									children: [
										c.equipmentId,
										" (",
										c.equipmentType,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[12px] text-muted-foreground",
									children: [
										c.customerCompany,
										" · Site ",
										c.siteId
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-ok/15 px-2.5 py-0.5 text-[11px] font-bold text-ok",
								children: [
									"₹",
									c.totalInitialPayable.toLocaleString("en-IN"),
									" Paid"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1 text-[11.5px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Rental Window:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-foreground",
										children: [
											c.startDate,
											" → ",
											c.endDate
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Security Deposit (Held):"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-ok",
										children: ["₹", c.securityDepositAmount.toLocaleString("en-IN")]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Assigned Operator:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: c.operatorId ?? "Unassigned"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleQuickApproveCheckout(c),
							className: "w-full flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-[12.5px] font-bold text-accent-foreground shadow-xs hover:opacity-95 active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), " Approve Pre-Inspection & Check-Out"]
						})
					]
				}, c.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-bold text-foreground",
					children: "Return & Security Deposit Approvals"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] text-muted-foreground",
					children: "Returned assets requiring condition inspection review and deposit refund release"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-ok/15 px-3 py-1 text-[11px] font-bold text-ok",
					children: [returnRequests.length, " Pending Review"]
				})]
			}), returnRequests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-border/60 bg-muted/20 p-6 text-center text-[13px] text-muted-foreground",
				children: "All return inspections and deposit refunds processed."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: returnRequests.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[24px] border border-border/70 bg-card p-5 shadow-panel space-y-3 text-[12.5px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground",
									children: ["Return Contract #", c.contractNumber]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-base font-bold text-foreground mt-0.5",
									children: [
										c.equipmentId,
										" (",
										c.equipmentType,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] text-muted-foreground",
									children: c.customerCompany
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-warn/20 px-2.5 py-0.5 text-[11px] font-bold text-warn-foreground",
								children: [
									"₹",
									c.securityDepositAmount.toLocaleString("en-IN"),
									" Refundable"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1 text-[11.5px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Rental Status:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: c.rentalStatus
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Deposit Status:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-warn",
									children: c.depositStatus
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pt-1",
							children: [c.rentalStatus === "Return Requested" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleQuickApproveCheckin(c),
								className: "flex-1 flex items-center justify-center gap-1 rounded-full bg-foreground px-4 py-2.5 text-[12px] font-bold text-background shadow-xs hover:opacity-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 13 }), " Complete Check-In"]
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setComparingContract(c),
								className: "flex-1 flex items-center justify-center gap-1 rounded-full bg-accent px-4 py-2.5 text-[12px] font-bold text-accent-foreground shadow-xs hover:opacity-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { size: 13 }), " Audit Inspection & Refund"]
							})]
						})
					]
				}, c.id))
			})] }),
			comparingContract && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectionComparisonModal, {
				contract: comparingContract,
				isOpen: Boolean(comparingContract),
				onClose: () => setComparingContract(null)
			})
		]
	});
}
function DepositManager() {
	const { contracts } = useFleet();
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [selectedContract, setSelectedContract] = (0, import_react.useState)(null);
	const filteredContracts = filter === "All" ? contracts : contracts.filter((c) => c.depositStatus === filter);
	const totalHeld = contracts.filter((c) => c.depositStatus === "Held").reduce((s, c) => s + c.securityDepositAmount, 0);
	const totalPendingRefund = contracts.filter((c) => c.depositStatus === "Refund Pending").reduce((s, c) => s + c.refundAmount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border border-border/70 bg-white p-5 shadow-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Total Deposits Held in Escrow"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-2xl font-black text-foreground mt-1 tabular-nums",
								children: ["₹", totalHeld.toLocaleString("en-IN")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-ok mt-1 block",
								children: "Active security collateral"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border border-border/70 bg-white p-5 shadow-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Refunds Awaiting Sign-off"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-2xl font-black text-warn mt-1 tabular-nums",
								children: ["₹", totalPendingRefund.toLocaleString("en-IN")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground mt-1 block",
								children: "Pending post-inspection check"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border border-border/70 bg-white p-5 shadow-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
								children: "Deposit Policy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-black text-foreground mt-1 tabular-nums",
								children: "80% Nominal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground mt-1 block",
								children: "Configurable liability ratio"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1.5 overflow-x-auto pb-1 text-[12px]",
				children: [
					"All",
					"Held",
					"Refund Pending",
					"Refunded",
					"Partially Deducted",
					"Disputed"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(t),
					className: `rounded-full px-3.5 py-1.5 font-bold transition-all ${filter === t ? "bg-foreground text-background shadow-xs" : "bg-muted/70 text-muted-foreground hover:text-foreground"}`,
					children: t
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[28px] border border-border/70 bg-white overflow-hidden shadow-panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-[13px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Equipment & Contract"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3",
									children: "Customer Company"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3 text-right",
									children: "Deposit Held"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3 text-center",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3 text-right",
									children: "Deduction"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3 text-right",
									children: "Net Refund"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3 text-right",
									children: "Action"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/40",
							children: filteredContracts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/30 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-6 py-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-foreground block",
											children: [
												c.equipmentId,
												" (",
												c.equipmentType,
												")"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] text-muted-foreground",
											children: ["Contract #", c.contractNumber]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-6 py-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: c.customerCompany
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-muted-foreground block",
											children: c.customerName
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-6 py-3.5 text-right font-bold text-foreground tabular-nums",
										children: ["₹", c.securityDepositAmount.toLocaleString("en-IN")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-3.5 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${c.depositStatus === "Held" ? "bg-accent/40 text-accent-foreground" : c.depositStatus === "Refund Pending" ? "bg-warn/20 text-warn-foreground" : c.depositStatus === "Refunded" ? "bg-ok/15 text-ok" : "bg-muted text-muted-foreground"}`,
											children: c.depositStatus
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-3.5 text-right tabular-nums text-muted-foreground",
										children: c.damageDeduction > 0 ? `₹${c.damageDeduction.toLocaleString("en-IN")}` : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-6 py-3.5 text-right font-bold text-ok tabular-nums",
										children: ["₹", c.refundAmount.toLocaleString("en-IN")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-3.5 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSelectedContract(c),
											className: "rounded-full bg-muted/80 px-3 py-1 text-[11.5px] font-bold text-foreground hover:bg-foreground hover:text-background transition-colors",
											children: "Audit"
										})
									})
								]
							}, c.id))
						})]
					})
				})
			}),
			selectedContract && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectionComparisonModal, {
				contract: selectedContract,
				isOpen: Boolean(selectedContract),
				onClose: () => setSelectedContract(null)
			})
		]
	});
}
function Table({ columns, rows, selectable = true, selected = [], onToggle, onRowClick, empty = "No records found" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-border/60 bg-muted/20 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
				children: [
					selectable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-4 shrink-0" }),
					columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `min-w-0 flex-1 ${c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : "text-left"}`,
						children: c.label
					}, c.key)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-6 shrink-0" })
				]
			}),
			rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-6 py-12 text-center text-[13px] text-muted-foreground font-medium",
				children: empty
			}),
			rows.map((r) => {
				const isChecked = selected.includes(r.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => onRowClick?.(r.id),
					className: `flex items-center gap-3 border-b border-border/40 px-6 py-3 text-[13px] transition-all last:border-0 ${onRowClick ? "cursor-pointer" : ""} ${r.highlight ? "bg-accent/25 border-accent/40 font-medium" : isChecked ? "bg-muted/40" : "hover:bg-muted/40"}`,
					children: [
						selectable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: isChecked,
							onChange: () => onToggle?.(r.id),
							onClick: (e) => e.stopPropagation(),
							className: "h-4 w-4 shrink-0 rounded border-border text-foreground accent-foreground cursor-pointer"
						}),
						columns.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `flex min-w-0 flex-1 items-center gap-2 truncate ${c.align === "right" ? "justify-end tabular-nums" : c.align === "center" ? "justify-center" : "justify-start"} ${i === 0 ? "font-bold text-foreground" : "text-muted-foreground"}`,
							children: [i === 0 && r.icon, r.cells[c.key]]
						}, c.key)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-6 shrink-0 text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { size: 14 })
						})
					]
				}, r.id);
			})
		]
	});
}
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${{
			Active: "bg-ok/15 text-ok border-ok/30",
			Good: "bg-ok/15 text-ok border-ok/30",
			Idle: "bg-warn/20 text-warn-foreground border-warn/30",
			"Low Utilization": "bg-warn/20 text-warn-foreground border-warn/30",
			Warning: "bg-warn/20 text-warn-foreground border-warn/30",
			"Due Soon": "bg-amber-500/15 text-amber-600 border-amber-500/30",
			Overdue: "bg-danger/15 text-danger border-danger/30",
			Anomaly: "bg-danger/15 text-danger border-danger/30",
			"Needs Attention": "bg-amber-500/15 text-amber-600 border-amber-500/30",
			Damaged: "bg-danger/15 text-danger border-danger/30",
			Unknown: "bg-muted text-muted-foreground border-border",
			Unassigned: "bg-muted text-muted-foreground border-border"
		}[status] ?? "bg-muted text-muted-foreground border-border"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), status]
	});
}
function RentalOperationsCenter() {
	const { contracts, auditLogs, assets } = useFleet();
	const [activeTab, setActiveTab] = (0, import_react.useState)("approvals");
	const activeRentalsCount = contracts.filter((c) => c.rentalStatus === "Active Rental").length;
	const pendingCheckoutCount = contracts.filter((c) => c.rentalStatus === "Pending Checkout").length;
	const returnRequestsCount = contracts.filter((c) => c.rentalStatus === "Return Requested").length;
	const overdueCount = assets.filter((a) => a.status === "Overdue").length;
	const totalDepositsHeld = contracts.filter((c) => c.depositStatus === "Held").reduce((s, c) => s + c.securityDepositAmount, 0);
	const totalRefundsPending = contracts.filter((c) => c.depositStatus === "Refund Pending").reduce((s, c) => s + c.refundAmount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border border-border/70 bg-white p-4 shadow-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block",
								children: "Active Rentals"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-black text-foreground mt-1 tabular-nums",
								children: activeRentalsCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] text-ok font-medium mt-0.5 block",
								children: "Live contracts"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border border-border/70 bg-white p-4 shadow-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block",
								children: "Check-Out Today"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-black text-brand mt-1 tabular-nums",
								children: pendingCheckoutCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] text-muted-foreground font-medium mt-0.5 block",
								children: "Pending gate pass"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border border-border/70 bg-white p-4 shadow-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block",
								children: "Returns Today"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-black text-foreground mt-1 tabular-nums",
								children: returnRequestsCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] text-muted-foreground font-medium mt-0.5 block",
								children: "Inspection pending"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border border-border/70 bg-white p-4 shadow-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block",
								children: "Overdue Returns"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-black text-danger mt-1 tabular-nums",
								children: overdueCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] text-danger font-medium mt-0.5 block",
								children: "Standby lease fee"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border border-border/70 bg-white p-4 shadow-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block",
								children: "Deposits Held"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-2xl font-black text-ok mt-1 tabular-nums",
								children: [
									"₹",
									(totalDepositsHeld / 1e5).toFixed(1),
									"L"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] text-ok font-medium mt-0.5 block",
								children: "Secured in escrow"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] border border-border/70 bg-white p-4 shadow-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground block",
								children: "Refunds Pending"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-2xl font-black text-warn mt-1 tabular-nums",
								children: [
									"₹",
									(totalRefundsPending / 1e5).toFixed(1),
									"L"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] text-warn font-medium mt-0.5 block",
								children: "Awaiting sign-off"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1.5 border-b border-border/60 pb-2 overflow-x-auto text-[13px]",
				children: [
					{
						id: "approvals",
						label: "Operational Approval Queue"
					},
					{
						id: "deposits",
						label: "Deposit Management & Escrow"
					},
					{
						id: "contracts",
						label: `All Active Contracts (${contracts.length})`
					},
					{
						id: "audit",
						label: "Auditable Activity Trail"
					}
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActiveTab(t.id),
					className: `rounded-full px-4 py-2 font-bold transition-all ${activeTab === t.id ? "bg-foreground text-background shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
					children: t.label
				}, t.id))
			}),
			activeTab === "approvals" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalCenter, {}),
			activeTab === "deposits" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepositManager, {}),
			activeTab === "contracts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[28px] border border-border/70 bg-white overflow-hidden shadow-panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					selectable: false,
					columns: [
						{
							key: "contract",
							label: "Contract #"
						},
						{
							key: "asset",
							label: "Equipment"
						},
						{
							key: "customer",
							label: "Customer Company"
						},
						{
							key: "site",
							label: "Site"
						},
						{
							key: "status",
							label: "Rental Status"
						},
						{
							key: "rent",
							label: "Monthly Rent",
							align: "right"
						},
						{
							key: "deposit",
							label: "Deposit (Held)",
							align: "right"
						}
					],
					rows: contracts.map((c) => ({
						id: c.id,
						cells: {
							contract: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: c.contractNumber
							}),
							asset: `${c.equipmentId} (${c.equipmentType})`,
							customer: c.customerCompany,
							site: `Site ${c.siteId}`,
							status: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: c.rentalStatus === "Active Rental" ? "Active" : c.rentalStatus }),
							rent: `₹${c.monthlyRentalRate.toLocaleString("en-IN")}`,
							deposit: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-ok",
								children: ["₹", c.securityDepositAmount.toLocaleString("en-IN")]
							})
						}
					}))
				})
			}),
			activeTab === "audit" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[28px] border border-border/70 bg-white p-6 shadow-panel space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-bold text-foreground",
						children: "Immutable Audit Trail"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] text-muted-foreground",
						children: "Traceable operational log for compliance, check-in, dispatch, and deposit release"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] font-semibold text-ok flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), " Tamper-Proof Event Ledger"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border/40 text-[12.5px]",
					children: auditLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-3 flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground",
								children: log.action
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-md bg-muted px-2 py-0.2 text-[10px] font-semibold text-muted-foreground",
								children: [
									log.entityType,
									": ",
									log.entityId
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted-foreground mt-0.5 leading-relaxed",
							children: log.details
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right text-muted-foreground whitespace-nowrap text-[11.5px] tabular-nums",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground block",
								children: log.userName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: log.timestamp })]
						})]
					}, log.id))
				})]
			})
		]
	});
}
function OptimizationCenter() {
	const { optimizationPlans, assets } = useFleet();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-border/80 bg-accent p-6 shadow-float",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background font-bold shadow-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						size: 22,
						className: "text-accent"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-wider text-accent-foreground/75",
						children: "AI Fleet Optimization Center"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-extrabold tracking-tight text-accent-foreground",
						children: "Fleet-Wide Efficiency & Utilization Copilot"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] text-accent-foreground/85",
						children: "Automated telemetry synthesis identifies unassigned machines, overdue standby units, and regional demand deficits."
					})
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 text-accent-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-white/70 p-3 text-center backdrop-blur-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase font-semibold text-muted-foreground block",
						children: "Potential ROI"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xl font-black text-foreground tabular-nums",
						children: "+$4,350 / mo"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-white/70 p-3 text-center backdrop-blur-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase font-semibold text-muted-foreground block",
						children: "Idle Reduced"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xl font-black text-foreground tabular-nums",
						children: "29.5 hrs / day"
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
			children: optimizationPlans.map((plan) => {
				const isApplied = plan.status === "applied";
				assets.find((a) => a.id === plan.assetId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex flex-col justify-between overflow-hidden rounded-[26px] border bg-card p-6 shadow-panel transition-all hover:shadow-widget ${isApplied ? "border-ok/50 bg-ok/5" : "border-border/80"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `rounded-full px-3 py-1 text-[11px] font-bold ${plan.type === "Redeploy" ? "bg-accent text-accent-foreground" : plan.type === "Return" ? "bg-danger/15 text-danger" : "bg-brand/15 text-brand"}`,
								children: [plan.type, " Proposal"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11.5px] font-semibold text-muted-foreground flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
										size: 13,
										className: "text-ok"
									}),
									" ",
									plan.confidence,
									" Confidence"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-base font-bold text-foreground leading-snug",
							children: plan.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[12.5px] text-muted-foreground leading-relaxed",
							children: plan.why
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-border/60 bg-muted/30 p-3 text-center text-[11.5px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground uppercase font-semibold block",
									children: "Util Delta"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground font-bold",
									children: plan.utilizationDelta
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground uppercase font-semibold block",
									children: "Idle Saved"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-ok font-bold",
									children: plan.idleReduction
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground uppercase font-semibold block",
									children: "Savings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground font-bold",
									children: plan.savings
								})] })
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 pt-4 border-t border-border/50 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => openActionSheet(plan),
							className: "flex-1 rounded-full border border-border bg-white px-3 py-2 text-[12px] font-semibold text-foreground hover:bg-muted shadow-xs transition-colors",
							children: "Inspect Reasoning"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => applyOptimizationPlan(plan.id),
							disabled: isApplied,
							className: `flex-[1.2] flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-bold shadow-xs transition-transform ${isApplied ? "bg-ok text-white cursor-default" : "bg-accent text-accent-foreground hover:opacity-95 active:scale-95"}`,
							children: isApplied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), " Plan Applied"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 14 }), " Apply Plan"] })
						})]
					})]
				}, plan.id);
			})
		})]
	});
}
var cssInjected = false;
function ensureLeafletCSS() {
	if (cssInjected) return;
	cssInjected = true;
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
	document.head.appendChild(link);
}
var STATUS_COLOR = {
	Active: "#22c55e",
	Idle: "#f59e0b",
	"Due Soon": "#f59e0b",
	Unassigned: "#64748b",
	Unknown: "#64748b",
	Overdue: "#ef4444"
};
function LeafletMap({ assets, selectedId, onSelect, onSelectSite, showRecommendationOverlay = true }) {
	const { optimizationPlans } = useFleet();
	const containerRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const markersRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const siteMarkersRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const routePolylineRef = (0, import_react.useRef)(null);
	const [leafletLoaded, setLeafletLoaded] = (0, import_react.useState)(false);
	const [mapLayer, setMapLayer] = (0, import_react.useState)("standard");
	const [showDemandRings, setShowDemandRings] = (0, import_react.useState)(true);
	const [showRoutes, setShowRoutes] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		ensureLeafletCSS();
		import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())).then((L) => {
			delete L.Icon.Default.prototype._getIconUrl;
			L.Icon.Default.mergeOptions({
				iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
				iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
				shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
			});
			if (!containerRef.current || mapRef.current) return;
			const map = L.map(containerRef.current, {
				center: [22.3, 80.8],
				zoom: 5,
				zoomControl: false,
				attributionControl: false
			});
			L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
				maxZoom: 19,
				subdomains: "abcd"
			}).addTo(map);
			mapRef.current = map;
			setLeafletLoaded(true);
		});
		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!leafletLoaded || !mapRef.current) return;
		import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())).then((L) => {
			const map = mapRef.current;
			map.eachLayer((layer) => {
				if (layer instanceof L.TileLayer) map.removeLayer(layer);
			});
			if (mapLayer === "satellite") L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom: 18 }).addTo(map);
			else L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
				maxZoom: 19,
				subdomains: "abcd"
			}).addTo(map);
		});
	}, [mapLayer, leafletLoaded]);
	(0, import_react.useEffect)(() => {
		if (!leafletLoaded || !mapRef.current) return;
		import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())).then((L) => {
			const map = mapRef.current;
			markersRef.current.forEach((m) => m.remove());
			markersRef.current.clear();
			siteMarkersRef.current.forEach((m) => m.remove());
			siteMarkersRef.current.clear();
			if (routePolylineRef.current) {
				routePolylineRef.current.remove();
				routePolylineRef.current = null;
			}
			Object.values(SITES_META).forEach((site) => {
				const hasGap = site.demandForecast.gap > 0;
				const siteIcon = L.divIcon({
					className: "custom-site-marker",
					html: `
            <div style="position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;">
              ${showDemandRings && hasGap ? `<span style="position:absolute;width:44px;height:44px;border-radius:50%;background:rgba(214,255,56,0.35);border:1.5px dashed #a3e635;animation:pulse 2s infinite;"></span>` : ""}
              <div style="position:relative;background:#0f172a;color:#ffffff;padding:4px 9px;border-radius:999px;font-size:11px;font-weight:700;display:flex;align-items:center;gap:4px;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1.5px solid #ffffff;">
                <span>${site.id}</span>
                <span style="font-size:9px;background:#334155;padding:1px 4px;border-radius:4px;color:#94a3b8;">${site.demandForecast.need} req</span>
              </div>
            </div>
          `,
					iconSize: [60, 30],
					iconAnchor: [30, 15]
				});
				const marker = L.marker([site.lat, site.lng], { icon: siteIcon }).addTo(map);
				marker.on("click", () => {
					onSelectSite?.(site.id);
				});
				siteMarkersRef.current.set(site.id, marker);
			});
			assets.forEach((asset) => {
				const color = STATUS_COLOR[asset.status] ?? "#64748b";
				const isSelected = asset.id === selectedId;
				const assetIcon = L.divIcon({
					className: "custom-asset-marker",
					html: `
            <div style="position:relative;display:flex;flex-direction:column;align-items:center;cursor:pointer;transform:${isSelected ? "scale(1.2)" : "scale(1)"};transition:transform 0.2s ease;">
              <div style="background:${isSelected ? "#000" : "#ffffff"};color:${isSelected ? "#d6ff38" : "#0f172a"};padding:3px 8px;border-radius:999px;font-size:11px;font-weight:700;box-shadow:0 6px 16px rgba(0,0,0,0.12);border:2px solid ${color};display:flex;align-items:center;gap:4px;">
                <span style="width:7px;height:7px;border-radius:50%;background:${color};display:inline-block;"></span>
                <span>${asset.id}</span>
              </div>
              <span style="font-size:9.5px;font-weight:600;color:#334155;background:rgba(255,255,255,0.85);padding:1px 5px;border-radius:4px;margin-top:2px;box-shadow:0 1px 3px rgba(0,0,0,0.08);backdrop-filter:blur(4px);white-space:nowrap;">${asset.type}</span>
            </div>
          `,
					iconSize: [80, 44],
					iconAnchor: [40, 22]
				});
				const marker = L.marker([asset.lat, asset.lng], { icon: assetIcon }).addTo(map);
				marker.on("click", () => {
					onSelect?.(asset.id);
				});
				markersRef.current.set(asset.id, marker);
			});
			if (showRoutes) {
				const eqx1007 = assets.find((a) => a.id === "EQX1007");
				const s003 = SITES_META["S003"];
				if (eqx1007 && s003) {
					const latlngs = [
						[eqx1007.lat, eqx1007.lng],
						[23.5, 78.4],
						[s003.lat, s003.lng]
					];
					routePolylineRef.current = L.polyline(latlngs, {
						color: "#0f172a",
						weight: 3,
						dashArray: "6, 8",
						opacity: .85
					}).addTo(map);
				}
			}
		});
	}, [
		assets,
		selectedId,
		showDemandRings,
		showRoutes,
		leafletLoaded,
		onSelect,
		onSelectSite
	]);
	(0, import_react.useEffect)(() => {
		if (!leafletLoaded || !mapRef.current || !selectedId) return;
		const asset = assets.find((a) => a.id === selectedId);
		if (asset) mapRef.current.panTo([asset.lat, asset.lng], {
			animate: true,
			duration: .8
		});
	}, [
		selectedId,
		assets,
		leafletLoaded
	]);
	const zoomIn = () => mapRef.current?.zoomIn();
	const zoomOut = () => mapRef.current?.zoomOut();
	const resetView = () => mapRef.current?.setView([22.3, 80.8], 5, { animate: true });
	const primaryPlan = optimizationPlans[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full min-h-[460px] w-full overflow-hidden rounded-[24px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: containerRef,
				className: "absolute inset-0 z-0 h-full w-full"
			}),
			showRecommendationOverlay && primaryPlan && primaryPlan.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-5 top-5 z-[1001] w-72 sm:w-80 overflow-hidden rounded-[24px] border border-border/80 bg-accent p-4 shadow-float backdrop-blur-md transition-all hover:scale-[1.02]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 13 }), "Optimization Plan"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-semibold text-accent-foreground/75",
							children: ["Confidence: ", primaryPlan.confidence]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[15px] font-bold text-accent-foreground leading-snug",
						children: primaryPlan.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11.5px] text-accent-foreground/80 leading-relaxed",
						children: primaryPlan.why
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between rounded-xl bg-white/70 p-2.5 backdrop-blur-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase font-semibold text-muted-foreground",
							children: "Expected Benefit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15px] font-extrabold text-foreground tabular-nums",
							children: primaryPlan.savings
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground",
							children: primaryPlan.utilizationDelta
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => openActionSheet(primaryPlan),
							className: "flex-1 flex items-center justify-center gap-1 rounded-full bg-foreground px-3.5 py-2 text-[12px] font-bold text-background shadow-xs hover:opacity-95 active:scale-95",
							children: ["Pre-position EQX1007", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 13 })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-4 top-4 z-[1001] flex flex-col gap-1.5 rounded-2xl bg-white/90 p-1.5 shadow-float backdrop-blur-md border border-border/70",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: zoomIn,
						title: "Zoom In",
						className: "flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: zoomOut,
						title: "Zoom Out",
						className: "flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 16 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: resetView,
						title: "Recenter Map",
						className: "flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { size: 16 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-4 left-4 z-[1001] flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 shadow-float backdrop-blur-md border border-border/70 text-[11.5px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setMapLayer(mapLayer === "standard" ? "satellite" : "standard"),
						className: `flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium transition-colors ${mapLayer === "satellite" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { size: 13 }), mapLayer === "satellite" ? "Satellite" : "Map"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowDemandRings(!showDemandRings),
						className: `rounded-full px-2.5 py-1 font-medium transition-colors ${showDemandRings ? "bg-accent text-accent-foreground font-semibold" : "bg-muted text-muted-foreground"}`,
						children: "Demand Rings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowRoutes(!showRoutes),
						className: `rounded-full px-2.5 py-1 font-medium transition-colors ${showRoutes ? "bg-foreground text-background font-semibold" : "bg-muted text-muted-foreground"}`,
						children: "Routes"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-4 right-4 z-[1001] hidden sm:flex items-center gap-3 rounded-2xl bg-white/95 px-3 py-2 shadow-float backdrop-blur-md border border-border/70 text-[11px] text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-ok" }), " Active"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-warn" }), " Idle"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-danger" }), " Overdue"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-slate-500" }), " Unassigned"]
					})
				]
			})
		]
	});
}
var START = (/* @__PURE__ */ new Date("2025-01-01")).getTime();
var SPAN = (/* @__PURE__ */ new Date("2025-05-31")).getTime() - START;
var pct = (d) => Math.max(0, Math.min(100, (new Date(d).getTime() - START) / SPAN * 100));
var MONTHS = [
	"Jan 2025",
	"Feb 2025",
	"Mar 2025",
	"Apr 2025",
	"May 2025"
];
function Gantt({ assets, selectedId, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-6 pb-6 pt-2 select-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center text-[11px] font-semibold text-muted-foreground border-b border-border/60 pb-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-28 shrink-0",
					children: "Asset & Type"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 flex justify-between pr-24",
					children: MONTHS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 text-left",
						children: m
					}, m))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-24 shrink-0 text-right",
					children: "Contract Status"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative space-y-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-0 bottom-0 z-20 w-[1.5px] bg-danger shadow-xs",
				style: { left: `calc(7rem + ${pct(TODAY)}% * 0.77)` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute -top-3 -translate-x-1/2 rounded-full bg-danger px-2 py-0.5 text-[9px] font-bold text-white shadow-xs flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 9 }), " Today (May 10)"]
				})
			}), assets.map((a) => {
				const overdue = new Date(a.checkIn) < TODAY && a.status !== "Idle";
				const left = pct(a.checkOut);
				const width = Math.max(pct(a.checkIn) - left, 3.5);
				const isSelected = a.id === selectedId;
				const barColor = overdue ? "bg-danger" : a.status === "Active" ? "bg-ok" : a.status === "Idle" ? "bg-warn" : "bg-slate-400";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => {
						onSelect?.(a.id);
						selectAsset(a.id);
					},
					className: `flex items-center rounded-xl p-1.5 transition-all cursor-pointer ${isSelected ? "bg-accent/30 border border-accent" : "hover:bg-muted/50 border border-transparent"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-28 shrink-0 flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[12.5px] font-bold text-foreground",
								children: a.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10.5px] text-muted-foreground",
								children: a.type
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative h-6 flex-1 rounded-lg bg-muted/60 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `absolute top-1 bottom-1 rounded-md shadow-xs transition-all flex items-center justify-between px-2 text-[10px] font-semibold text-white ${barColor} ${overdue ? "animate-pulse" : ""}`,
								style: {
									left: `${left}%`,
									width: `${width}%`
								},
								title: `${a.id}: ${a.checkOut} → ${a.checkIn} (${a.status})`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: a.site ? `Site ${a.site}` : "Unassigned"
								}), overdue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									size: 10,
									className: "shrink-0"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-24 shrink-0 text-right pl-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${overdue ? "bg-danger/15 text-danger" : a.status === "Active" ? "bg-ok/15 text-ok" : a.status === "Idle" ? "bg-warn/20 text-warn-foreground" : "bg-muted text-muted-foreground"}`,
								children: overdue ? "Overdue" : a.status
							})
						})
					]
				}, a.id);
			})]
		})]
	});
}
function Panel({ title, subtitle, tabs, activeTab, onTabChange, right, className = "", bodyClassName = "", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `flex min-h-0 flex-col overflow-hidden rounded-[26px] border border-border/70 bg-card shadow-panel transition-all ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-4 border-b border-border/50 px-6 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[15px] font-bold tracking-tight text-foreground",
					children: title
				}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground",
					children: subtitle
				})] }),
				tabs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex items-center gap-1 rounded-full bg-muted/60 p-1",
					children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onTabChange?.(t),
						className: `rounded-full px-3.5 py-1 text-[12px] font-medium transition-all ${t === activeTab ? "bg-white text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"}`,
						children: t
					}, t))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 text-muted-foreground",
					children: [
						right,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarIcon, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 13 }),
							title: "Refresh data"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarIcon, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { size: 13 }),
							title: "Toggle view"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarIcon, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { size: 13 }),
							title: "Preferences"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarIcon, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { size: 13 }),
							title: "Expand panel"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `min-h-0 flex-1 overflow-auto ${bodyClassName}`,
			children
		})]
	});
}
function ToolbarIcon({ icon, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		title,
		className: "flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer",
		children: icon
	});
}
function PlanningWorkspace() {
	const { assets, selectedId } = useFleet();
	const [targetSite, setTargetSite] = (0, import_react.useState)("S003");
	const [planned, setPlanned] = (0, import_react.useState)(false);
	const sel = assets.find((a) => a.id === selectedId) ?? assets[0];
	const site = SITES_META[targetSite];
	if (!sel) return null;
	const handleBuildPlan = () => {
		reassignAsset(sel.id, targetSite, "OP101", "Executed via Planning Workspace Canvas");
		setPlanned(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-border/80 bg-white p-5 shadow-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-accent-foreground font-bold shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold tracking-tight text-foreground",
						children: "Operational Planning Workspace"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12.5px] text-muted-foreground",
						children: "Simulate asset movements, transit routes, and regional site utilization uplifts before execution."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[12px] text-muted-foreground",
						children: "Target Destination:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: targetSite,
						onChange: (e) => setTargetSite(e.target.value),
						className: "rounded-full border border-border/80 bg-muted/40 px-3.5 py-1.5 text-[12.5px] font-bold text-foreground outline-none",
						children: Object.keys(SITES_META).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: s,
							children: [
								"Site ",
								s,
								" — ",
								SITES_META[s]?.name ?? s
							]
						}, s))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Spatial Transit Route & Regional Topology",
						subtitle: `${sel.id} (${sel.type}) → ${site?.name ?? targetSite}`,
						className: "h-[520px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeafletMap, {
							assets,
							selectedId,
							onSelect: selectAsset
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Plan Parameter Inspector",
						subtitle: "Real-time transit and utilization projection",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 space-y-4 text-[13px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-gradient-to-b from-slate-50/70 to-white p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentHero, {
										asset: sel,
										compact: true,
										showTelemetryHUD: false
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
											children: "Selected Mobilization Asset"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "text-base font-bold text-foreground",
											children: [
												sel.id,
												" · ",
												sel.type
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/60 bg-card p-4 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center py-1 border-b border-border/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Origin Location"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: sel.location
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center py-1 border-b border-border/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Destination Site"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: site?.name ?? targetSite
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center py-1 border-b border-border/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Transit Distance"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground tabular-nums",
												children: "142.6 km"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center py-1 border-b border-border/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Estimated Flatbed Transit Time"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground tabular-nums",
												children: "2 hrs 25 mins"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center py-1 border-b border-border/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Expected Utilization Uplift"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-ok font-bold tabular-nums",
												children: "+72% on unit (+18% fleet)"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center py-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Operational Risk Score"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
												className: "text-ok flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), " Low (98% confidence)"]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleBuildPlan,
									disabled: planned,
									className: "w-full flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-bold text-accent-foreground shadow-sm transition-all hover:opacity-95 active:scale-[0.99] disabled:opacity-50",
									children: planned ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), " Plan Mobilized & Dispatched!"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 16 }), " Build & Execute Mobilization Plan"] })
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Regional Operational Schedule & Rental Timeline",
				tabs: ["Gantt"],
				activeTab: "Gantt",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gantt, {
					assets,
					selectedId,
					onSelect: selectAsset
				})
			})
		]
	});
}
var TABS = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/check",
		label: "Check-In/Out",
		icon: ArrowLeftRight
	},
	{
		to: "/usage",
		label: "Usage",
		icon: Gauge
	},
	{
		to: "/alerts",
		label: "Alerts",
		icon: Bell
	},
	{
		to: "/forecast",
		label: "Forecast",
		icon: TrendingUp
	},
	{
		to: "/anomalies",
		label: "Anomalies",
		icon: TriangleAlert
	}
];
function Shell({ crumb, children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { assets, appMode, currentUser, activeActionPlan } = useFleet();
	const s = summary(assets);
	const [paletteOpen, setPaletteOpen] = (0, import_react.useState)(false);
	const [notifOpen, setNotifOpen] = (0, import_react.useState)(false);
	const [aiOpen, setAiOpen] = (0, import_react.useState)(false);
	const [authOpen, setAuthOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground flex flex-col font-sans antialiased",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-black/[0.06] bg-white/90 backdrop-blur-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 w-full max-w-[1600px] items-center gap-3 px-5 sm:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-2.5 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-foreground shadow-apple-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-3 rounded-full bg-accent" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden sm:flex flex-col leading-none min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[13px] font-bold tracking-tight text-foreground",
											children: "RentSense"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-border/80 text-[11px]",
											children: "/"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[12px] font-medium text-foreground/60 truncate",
											children: crumb
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-medium text-muted-foreground/70 tracking-wide",
									children: currentUser.role === "customer" ? "Customer Portal" : "Equipment OS"
								})]
							})]
						}),
						currentUser.role !== "customer" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden lg:flex flex-1 items-center justify-center min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-px rounded-[14px] bg-black/[0.04] p-1 border border-black/[0.06]",
								children: TABS.map((t) => {
									const active = pathname === t.to && appMode === "tower";
									const Icon = t.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: t.to,
										onClick: () => setAppMode("tower"),
										className: `flex items-center gap-1.5 rounded-[10px] px-3 py-1.5 text-[12px] transition-all duration-150 whitespace-nowrap select-none ${active ? "bg-accent text-accent-foreground font-bold shadow-[0_1px_3px_rgba(0,0,0,0.12)]" : "font-medium text-foreground/55 hover:text-foreground hover:bg-white/80"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											size: 12.5,
											strokeWidth: active ? 2.3 : 1.9
										}), t.label]
									}, t.to);
								})
							})
						}),
						currentUser.role === "customer" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-1.5 ml-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setPaletteOpen(true),
									className: "hidden md:flex items-center gap-1.5 rounded-[10px] border border-black/[0.08] bg-black/[0.03] px-2.5 py-1.5 text-[11.5px] font-medium text-foreground/50 hover:text-foreground hover:bg-white hover:border-black/[0.12] transition-all",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
											size: 12,
											strokeWidth: 2
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
											className: "rounded-md bg-white border border-black/[0.08] px-1.5 py-px text-[9.5px] font-mono text-foreground/40 shadow-apple-xs",
											children: "⌘K"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setAiOpen(true),
									className: "flex items-center gap-1.5 rounded-[10px] bg-foreground px-3 py-1.5 text-[12px] font-semibold text-background hover:opacity-80 active:scale-[0.97] transition-all shadow-apple-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
										size: 12,
										className: "text-accent"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "AI Copilot"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setNotifOpen(true),
									className: "relative flex h-8 w-8 items-center justify-center rounded-[10px] border border-black/[0.08] bg-white text-foreground/50 hover:text-foreground hover:bg-muted/40 transition-all shadow-apple-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
										size: 13,
										strokeWidth: 1.9
									}), s.flagged > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-1.5 h-[5px] w-[5px] rounded-full bg-danger" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setAuthOpen(true),
									className: "flex items-center gap-2 rounded-[10px] border border-black/[0.08] bg-white pl-1.5 pr-2.5 py-1.5 hover:border-black/[0.14] hover:bg-muted/20 transition-all shadow-apple-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-foreground text-background font-bold text-[10px]",
										children: currentUser.name.charAt(0)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden md:block text-left leading-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11.5px] font-semibold text-foreground block",
											children: currentUser.name.split(" ")[0]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9.5px] text-foreground/40 uppercase tracking-widest font-medium block mt-px",
											children: currentUser.role === "rental_staff" ? "Staff" : currentUser.role === "supervisor_admin" ? "Supervisor" : "Customer"
										})]
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-14 z-20 border-b border-black/[0.05] bg-white/75 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-8 h-9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full bg-ok/10 border border-ok/20 px-2 py-0.5 font-semibold text-ok",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-ok animate-pulse" }), "Live"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden sm:flex items-center gap-3 text-foreground/50 tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground font-semibold",
									children: s.active
								}), " Active"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-border",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground font-semibold",
									children: s.idle
								}), " Idle"] }),
								s.overdue > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-border",
									children: "·"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-danger font-semibold",
									children: [s.overdue, " Overdue"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-border",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Avg ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-foreground font-semibold",
										children: [s.avg, "%"]
									}),
									" util"
								] })
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-px rounded-[10px] bg-black/[0.04] p-0.5 border border-black/[0.06] text-[11px]",
						children: currentUser.role === "rental_staff" || currentUser.role === "supervisor_admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setAppMode("tower"),
							className: `rounded-[8px] px-3 py-1 font-semibold transition-all ${appMode === "tower" ? "bg-white text-foreground shadow-apple-xs" : "text-foreground/45 hover:text-foreground"}`,
							children: "Control Tower"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setAppMode("rental_ops"),
							className: `flex items-center gap-1 rounded-[8px] px-3 py-1 font-semibold transition-all ${appMode === "rental_ops" ? "bg-foreground text-background shadow-apple-xs" : "text-foreground/45 hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 10.5 }), "Rental Ops"]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setAppMode("customer_portal"),
								className: `flex items-center gap-1 rounded-[8px] px-3 py-1 font-semibold transition-all ${appMode === "customer_portal" ? "bg-accent text-accent-foreground shadow-apple-xs" : "text-foreground/45 hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 10.5 }), "My Portal"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setAppMode("optimizer"),
								className: `flex items-center gap-1 rounded-[8px] px-3 py-1 font-semibold transition-all ${appMode === "optimizer" ? "bg-white text-foreground shadow-apple-xs" : "text-foreground/45 hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 10.5 }), "Optimizer"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setAppMode("planning"),
								className: `rounded-[8px] px-3 py-1 font-semibold transition-all ${appMode === "planning" ? "bg-white text-foreground shadow-apple-xs" : "text-foreground/45 hover:text-foreground"}`,
								children: "Planning"
							})
						] })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 px-5 sm:px-8 py-6 max-w-[1600px] w-full mx-auto animate-fade-in",
				children: appMode === "customer_portal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerPortal, {}) : appMode === "rental_ops" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RentalOperationsCenter, {}) : appMode === "optimizer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptimizationCenter, {}) : appMode === "planning" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanningWorkspace, {}) : children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {
				isOpen: paletteOpen,
				onClose: () => setPaletteOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationCenter, {
				isOpen: notifOpen,
				onClose: () => setNotifOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIAssistantModal, {
				isOpen: aiOpen,
				onClose: () => setAiOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionSheet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
				isOpen: authOpen,
				onClose: () => setAuthOpen(false)
			})
		]
	});
}
//#endregion
export { useFleet as C, summary as S, reassignAsset as _, LeafletMap as a, selectSite as b, PlanningWorkspace as c, StatusPill as d, TODAY as f, openActionSheet as g, approveCheckOut as h, InspectionComparisonModal as i, SITES_META as l, approveCheckIn as m, EquipmentHero as n, OptimizationCenter as o, Table as p, Gantt as r, Panel as s, EQUIPMENT_PHOTOS as t, Shell as u, resolveAlert as v, snoozeAlert as x, selectAsset as y };
