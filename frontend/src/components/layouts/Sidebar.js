import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import navigationConfig from "../../config/navigationConfig";

export default function Sidebar({ collapsed, setCollapsed }) {

  const location = useLocation();

  const module =
    location.pathname.includes("forecast")
      ? "forecast"
      : "monitor";

  const data = navigationConfig[module];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* TOP NAVIGATOR */}
      <div className="sidebar-top">

        <div className="sidebar-header">
          {!collapsed && <span>{data.title}</span>}

          <div
            className="collapse-icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </div>
        </div>

        {/* MENU ITEMS */}
        {data.items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index} className="nav-item">
              <Icon />
              {!collapsed && <span>{item.label}</span>}
            </div>
          );
        })}
      </div>

      {/* BOTTOM ALERT SECTION */}
      {!collapsed && (
  <div className="sidebar-bottom">

    <div className="activity-header">
      <span>ALERTS (3)</span>
      
    </div>

    <div className="activity-list">

      <div className="activity-card high">
        <div className="activity-dot"></div>

        <div>
          <div className="activity-title">
            T-80 Bearing Overheating
          </div>
          <div className="activity-desc">
            Gear box failure predicted
          </div>
          <div className="activity-time">
            2025-11-23 09:32
          </div>
        </div>
      </div>

      <div className="activity-card medium">
        <div className="activity-dot"></div>

        <div>
          <div className="activity-title">
            Generator Overload
          </div>
          <div className="activity-desc">
            Load surpassing rated capacity
          </div>
          <div className="activity-time">
            2025-11-23 09:32
          </div>
        </div>
      </div>

      <div className="activity-card low">
        <div className="activity-dot"></div>

        <div>
          <div className="activity-title">
            Oil Pressure Stable
          </div>
          <div className="activity-desc">
            System operating normally
          </div>
          <div className="activity-time">
            2025-11-23 09:15
          </div>
        </div>
      </div>

    </div>

  </div>
)}
    </div>
  );
}