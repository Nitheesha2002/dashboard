import React, { useEffect, useState } from "react";
import { getMetrics } from "../services/api";
import WidgetRenderer from "../widgets/WidgetRenderer";
import KpiCard from "../components/KpiCard";
import {
  bladePitchKpis,
  bladePitchWidgets
} from "../config/bladePitchConfig";
import { Maximize2 } from "lucide-react";

/** Fixed chart order per wireframe: bar + line side by side, then heatsink full width */
const CHART_IDS = ["bar-thermal", "line-spike", "multiline-heatsink"];

export default function Dashboard() {
  const [data, setData] = useState({});
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("live");

  const widgetsById = Object.fromEntries(
    bladePitchWidgets.map((w) => [w.id, w])
  );
  const chartWidgets = CHART_IDS
    .map((id) => widgetsById[id])
    .filter(Boolean);

  /* ================= LIVE DATA ================= */

  useEffect(() => {

    const interval = setInterval(() => {

      getMetrics().then(res => {

        const metrics = res.data;
        setData(metrics);

        setHistory(prev => [
          ...prev.slice(-25),
          {
            time: new Date().toLocaleTimeString(),
            value: metrics.gearbox_temp
          }
        ]);

      });

    }, 2000);

    return () => clearInterval(interval);

  }, []);

  const renderChartBox = (widget) => (
    <div key={widget.id} className="widget-box widget-box--fixed">
      <div className="widget-header">
        <span className="widget-title">{widget.title || "Widget"}</span>
        <div className="widget-header-actions">
          <button
            type="button"
            className="widget-icon-btn"
            aria-label="Fullscreen"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
      <WidgetRenderer
        widget={widget}
        data={data}
        history={history}
      />
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* SUB-HEADER: Tabs + Breadcrumbs */}
      <div className="dashboard-subheader">
        <div className="dashboard-tabs">
          <button
            type="button"
            className={`dashboard-tab ${activeTab === "live" ? "active" : ""}`}
            onClick={() => setActiveTab("live")}
          >
            LIVE STATUS
          </button>
          <button
            type="button"
            className={`dashboard-tab ${activeTab === "3d" ? "active" : ""}`}
            onClick={() => setActiveTab("3d")}
          >
            3D MODEL
          </button>
        </div>
        <div className="dashboard-breadcrumb">
          Farm &gt; T-81 &gt; Blade-pitch system
        </div>
      </div>

      {/* KPI ROW */}
      <div className="kpi-row">
        {bladePitchKpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            unit={kpi.unit}
            statusText={kpi.statusText}
            statusSeverity={kpi.statusSeverity}
            icon={kpi.icon}
          />
        ))}
      </div>

      {/* CHARTS: fixed layout per wireframe */}
      <div className="dashboard-grid-wrap">
        {activeTab === "live" && (
          <div className="dashboard-charts">
            <div className="charts-row charts-row--two">
              {chartWidgets[0] && renderChartBox(chartWidgets[0])}
              {chartWidgets[1] && renderChartBox(chartWidgets[1])}
            </div>
            <div className="charts-row charts-row--full">
              {chartWidgets[2] && renderChartBox(chartWidgets[2])}
            </div>
          </div>
        )}

        {activeTab === "3d" && (
          <div className="dashboard-placeholder">
            3D Model view
          </div>
        )}
      </div>
    </div>
  );
}