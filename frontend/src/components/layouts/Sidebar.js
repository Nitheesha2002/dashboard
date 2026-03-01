import { ChevronLeft, ChevronRight, Search, Plane } from "lucide-react";
import { navigatorTree, alerts } from "../../config/bladePitchConfig";

export default function Sidebar({ collapsed, setCollapsed, mobileOpen }) {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-header">
          {!collapsed && (
            <>
              <span>NAVIGATOR</span>
              <button type="button" className="sidebar-search" aria-label="Search">
                <Search size={14} />
              </button>
            </>
          )}
          <button
            type="button"
            className="collapse-icon"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {!collapsed && (
          <div className="navigator-tree">
            <div className="navigator-asset">
              <Plane size={16} className="navigator-asset-icon" />
              <span>{navigatorTree.label}</span>
            </div>
            {navigatorTree.children.map((child) => (
              <div
                key={child.id}
                className={`navigator-item ${child.selected ? "selected" : ""} status-${child.status}`}
              >
                <span className="navigator-dot" />
                <span>{child.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="sidebar-bottom">
          <div className="activity-header">
            <span>ALERTS ({alerts.length})</span>
            <button type="button" className="view-all">VIEW ALL</button>
          </div>
          <div className="activity-list">
            {alerts.map((alert) => (
              <div key={alert.id} className={`activity-card ${alert.severity === "critical" ? "high" : "medium"}`}>
                <span className="activity-dot" />
                <div>
                  <div className="activity-title">{alert.title}</div>
                  <div className="activity-desc">{alert.desc}</div>
                  <div className="activity-time">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}