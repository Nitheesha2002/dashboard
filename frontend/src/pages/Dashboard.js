import React, { useEffect, useState } from "react";
import { getMetrics } from "../services/api";
import WidgetRenderer from "../widgets/WidgetRenderer";
import KpiCard from "../components/KpiCard";
import { widgetLibrary } from "../config/widgetLibrary";
import {
  bladePitchKpis,
  bladePitchWidgets,
  bladePitchLayout
} from "../config/bladePitchConfig";
import { Maximize2 } from "lucide-react";

import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const getStoredWidgets = () => {
  try {
    const stored = localStorage.getItem("dashboardWidgets");
    if (!stored) return bladePitchWidgets;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : bladePitchWidgets;
  } catch {
    return bladePitchWidgets;
  }
};

const getStoredLayout = () => {
  try {
    const stored = localStorage.getItem("dashboardLayout");
    if (!stored) return bladePitchLayout;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : bladePitchLayout;
  } catch {
    return bladePitchLayout;
  }
};

export default function Dashboard() {
  const [data, setData] = useState({});
  const [history, setHistory] = useState([]);
  const [widgets, setWidgets] = useState(getStoredWidgets);
  const [layout, setLayout] = useState(getStoredLayout);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("live");

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

  /* ================= SAVE LAYOUT ================= */

  useEffect(() => {
    localStorage.setItem(
      "dashboardWidgets",
      JSON.stringify(widgets)
    );

    localStorage.setItem(
      "dashboardLayout",
      JSON.stringify(layout)
    );
  }, [widgets, layout]);

  /* ================= ADD WIDGET ================= */

  const addWidget = (type) => {

    let metric = "gearbox_temp";

    if (type === "kpi" || type === "gauge") {
      metric = prompt("Enter Metric Name");
      if (!metric) return;
    }

    const id = Date.now().toString();

    const newWidget = {
      id,
      type,
      metric,
      title: metric,
      data: [
        { name: "A", value: 40 },
        { name: "B", value: 60 }
      ]
    };

    setWidgets(prev => [...prev, newWidget]);

    setLayout(prev => [
      ...prev,
      {
        i: id,
        x: 0,
        y: Infinity,
        w: 4,
        h: 4
      }
    ]);

    setShowDropdown(false);
  };

  /* ================= REMOVE ================= */

  const removeWidget = (id) => {

    setWidgets(prev =>
      prev.filter(w => w.id !== id)
    );

    setLayout(prev =>
      prev.filter(l => l.i !== id)
    );
  };

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
            icon={kpi.icon}
          />
        ))}
      </div>

      {/* ADD WIDGET + GRID */}
      <div className="dashboard-grid-wrap">
        <div className="dashboard-toolbar">
          <div style={{ position: "relative" }}>
            <button
              type="button"
              className="add-widget-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              + Add Widget ▼
            </button>
            {showDropdown && (
              <div className="widget-dropdown">
                {widgetLibrary.map((w) => (
                  <div
                    key={w.type}
                    className="dropdown-item"
                    onClick={() => addWidget(w.type)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && addWidget(w.type)}
                  >
                    {w.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {activeTab === "live" && (
          <GridLayout
            className="layout dashboard-grid-layout"
            layout={layout}
            onLayoutChange={setLayout}
            cols={12}
            rowHeight={80}
            width={1200}
            isDraggable
            isResizable
            resizeHandles={["se", "sw", "ne", "nw"]}
          >
            {widgets.map((widget) => (
              <div key={widget.id} className="widget-box">
                <div className="widget-header">
                  <span className="widget-title">
                    {widget.title || "Widget"}
                  </span>
                  <div className="widget-header-actions">
                    <button
                      type="button"
                      className="widget-icon-btn"
                      aria-label="Fullscreen"
                    >
                      <Maximize2 size={16} />
                    </button>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeWidget(widget.id)}
                      aria-label="Remove widget"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <WidgetRenderer
                  widget={widget}
                  data={data}
                  history={history}
                />
              </div>
            ))}
          </GridLayout>
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