/**
 * Blade-pitch system dashboard config matching TwinARC monitor layout.
 * Used for Navigator tree, Alerts, KPIs, and chart widget definitions.
 */

export const navigatorTree = {
  id: "t-81",
  label: "T-81",
  icon: "asset",
  children: [
    { id: "gearbox", label: "Gear box", status: "critical" },
    { id: "blade-pitch", label: "Blade-pitch system", status: "warning", selected: true },
    { id: "nacelle", label: "Nacelle", status: "critical" },
    { id: "generator", label: "Generator", status: "critical" }
  ]
};

export const alerts = [
  { id: "1", title: "T-80 Bearing Overheating", desc: "Gear box failure predicted", time: "2025-11-23 09:32:12", severity: "critical", icon: "temp" },
  { id: "2", title: "T-81 Generator Overload", desc: "Load surpassing rated capacity", time: "2025-11-23 09:32:12", severity: "critical", icon: "power" },
  { id: "3", title: "T-83 Nacelle Failure", desc: "Structural anomaly detected", time: "2025-11-23 09:30:45", severity: "critical", icon: "alert" },
  { id: "4", title: "T-84 Oil Pressure Low", desc: "Lubrication system warning", time: "2025-11-23 09:28:00", severity: "warning", icon: "oil" },
  { id: "5", title: "T-82 Bearing Overheating", desc: "Temperature threshold exceeded", time: "2025-11-23 09:25:33", severity: "critical", icon: "temp" },
  { id: "6", title: "T-85 Oil Pressure Low", desc: "Check lubrication circuit", time: "2025-11-23 09:22:11", severity: "warning", icon: "oil" }
];

export const bladePitchKpis = [
  { id: "k1", title: "MAX CURRENT (BLADE 1)", value: "688", unit: "A", statusText: "Immediate Overload / Mechanical Binding!", statusSeverity: "critical", icon: "lightning" },
  { id: "k2", title: "HEATSINK TEMP (MAX)", value: "66", unit: "°C", statusText: "Cooling System Failure", statusSeverity: "warning", icon: "thermometer" },
  { id: "k3", title: "CURRENT FLUCTUATION (STD DEV)", value: "12.5", unit: "A", statusText: "Electrical Noise / Early Wear", statusSeverity: "warning", icon: "sine" },
  { id: "k4", title: "POWER SUPPLY TEMP (AVG)", value: "45", unit: "°C", statusText: "Electrical Noise / Early Wear", statusSeverity: "warning", icon: "circuit" },
  { id: "k5", title: "PITCH DRIVE VOLTAGE (MIN)", value: "389", unit: "V", statusText: "Power Quality Issue (Sag)", statusSeverity: "critical", icon: "battery" }
];

/** Bar chart: Blade-to-blade thermal variance (Mean CV) */
export const barChartData = [
  { name: "Blade 1", value: 0.0012 },
  { name: "Blade 2", value: 0.0011 },
  { name: "Blade 3", value: 0.0007 }
];

/** Line chart: Blade 1 current spike severity - time series */
export const currentSpikeLineData = [
  { time: "Sat 21 12:30", value: 0.02 },
  { time: "01 AM", value: -0.04 },
  { time: "01:30", value: 0.03 },
  { time: "02 AM", value: -0.02 },
  { time: "02:30", value: 0.05 },
  { time: "03 AM", value: -0.01 },
  { time: "03:30", value: 0.04 }
];

/** Multi-line: Heatsink temperature trends (Blade 1, 2, 3) */
export const heatsinkMultiLineData = [
  { time: "12:00", blade1: 33.2, blade2: 32.8, blade3: 32.1 },
  { time: "12:30", blade1: 33.4, blade2: 32.9, blade3: 32.2 },
  { time: "01:00", blade1: 33.5, blade2: 33.0, blade3: 32.3 },
  { time: "01:30", blade1: 33.3, blade2: 32.7, blade3: 32.0 },
  { time: "02:00", blade1: 33.6, blade2: 33.1, blade3: 32.4 },
  { time: "02:30", blade1: 33.4, blade2: 32.9, blade3: 32.2 },
  { time: "03:00", blade1: 33.2, blade2: 32.6, blade3: 31.9 }
];

/** Multi-line series config for heatsink chart */
export const heatsinkSeries = [
  { dataKey: "blade1", name: "Blade 1 Heatsink", stroke: "#38bdf8" },
  { dataKey: "blade2", name: "Blade 2 Heatsink", stroke: "#f97316" },
  { dataKey: "blade3", name: "Blade 3 Heatsink", stroke: "#22c55e" }
];

/** Default widgets and layout for Blade-pitch dashboard */
export const bladePitchWidgets = [
  {
    id: "bar-thermal",
    type: "bar",
    title: "DATA ANALYST: BLADE-TO-BLADE THERMAL VARIANCE CONSISTENCY (MEAN CV)",
    data: barChartData,
    layout: { x: 0, y: 2, w: 4, h: 5 }
  },
  {
    id: "line-spike",
    type: "line",
    title: "MAINT TECH: BLADE 1 CURRENT SPIKE SEVERITY (IMMEDIATE FAULT INDICATION)",
    data: currentSpikeLineData,
    yAxisLabel: "PDU Temp Gradient (Deg C/min)",
    layout: { x: 4, y: 2, w: 4, h: 5 }
  },
  {
    id: "multiline-heatsink",
    type: "multiline",
    title: "HEATSINK TEMPERATURE TRENDS (CM 5: CRITICAL COMPONENT HEALTH)",
    data: heatsinkMultiLineData,
    series: heatsinkSeries,
    layout: { x: 0, y: 7, w: 8, h: 5 }
  }
];

export const bladePitchLayout = bladePitchWidgets.map(w => ({ i: w.id, ...w.layout }));
