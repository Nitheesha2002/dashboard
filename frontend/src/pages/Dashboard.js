import React, { useEffect, useState } from "react";
import { getMetrics } from "../services/api";
import WidgetRenderer from "../widgets/WidgetRenderer";
import { widgetLibrary } from "../config/widgetLibrary";

import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function Dashboard() {

  const [data, setData] = useState({});
  const [history, setHistory] = useState([]);

  const [widgets, setWidgets] = useState(
    JSON.parse(localStorage.getItem("dashboardWidgets")) || []
  );

  const [layout, setLayout] = useState(
    JSON.parse(localStorage.getItem("dashboardLayout")) || []
  );

  const [showDropdown, setShowDropdown] = useState(false);

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

  /* ================= UI ================= */

  return (
    <div className="dashboard-container">

      {/* ADD BUTTON */}
      <div style={{ position: "relative" }}>

        <button
          className="add-widget-btn"
          onClick={() =>
            setShowDropdown(!showDropdown)
          }
        >
          + Add Widget ▼
        </button>

        {showDropdown && (
          <div className="widget-dropdown">

            {widgetLibrary.map(w => (
              <div
                key={w.type}
                className="dropdown-item"
                onClick={() =>
                  addWidget(w.type)
                }
              >
                {w.label}
              </div>
            ))}

          </div>
        )}

      </div>

      {/* ================= GRID ================= */}

      <GridLayout
  className="layout"
  layout={layout}
  cols={12}
  rowHeight={80}
  width={1200}
  isDraggable={true}
  isResizable={true}
  resizeHandles={["se", "sw", "ne", "nw"]}   
>

        {widgets.map(widget => (

          <div
            key={widget.id}
            className="widget-box"
          >

            {/* HEADER */}
            

           <div className="widget-header">

  <span className="widget-title">
    {widget.title || "Widget"}
  </span>

  <button
    className="remove-btn"
    onClick={() => removeWidget(widget.id)}
  >
    ✕
  </button>

</div>

            <WidgetRenderer
              widget={widget}
              data={data}
              history={history}
            />

          </div>

        ))}

      </GridLayout>

    </div>
  );
}