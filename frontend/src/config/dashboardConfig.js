import React from "react";
import GridLayout from "react-grid-layout";
import dashboardConfig from "../config/dashboardConfig";
import WidgetRenderer from "../widgets/WidgetRenderer";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Dashboard = () => {
  const layout = dashboardConfig.widgets.map(widget => ({
    i: widget.id,
    ...widget.layout
  }));

  return (
    <div style={{ padding: 20 }}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={80}
        width={1200}
      >
        {dashboardConfig.widgets.map(widget => (
          <div key={widget.id}>
            <WidgetRenderer widget={widget} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Dashboard;