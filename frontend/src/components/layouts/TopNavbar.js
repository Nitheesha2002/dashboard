import { FaWind } from "react-icons/fa";
import { Bell, Menu, Mail, Download, Save } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./layout.css";

const NAV_ITEMS = [
  { path: "/monitor", label: "Monitor" },
  { path: "/visibility", label: "Visibility" },
  { path: "/forecast", label: "Forecast" },
  { path: "/rca", label: "RCA" },
  { path: "/cases", label: "Cases" },
  { path: "/knowledge", label: "Knowledge" },
  { path: "/governance", label: "Governance" },
  { path: "/support", label: "Support" },
  { path: "/settings", label: "Settings" }
];

function isMonitorActive(pathname, path) {
  if (path === "/monitor") {
    return pathname === "/" || pathname === "/monitor";
  }
  return pathname === path;
}

export default function TopNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="top-navbar" role="banner">
      <div className="nav-left">
        <div className="mobile-menu" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={20} />
        </div>
        <div
          className="logo-wrapper"
          onClick={() => navigate("/monitor")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/monitor")}
          role="button"
          tabIndex={0}
          aria-label="TwinARC home"
        >
          <FaWind className="logo-icon" aria-hidden />
          <span className="logo-text">TwinARC</span>
        </div>
      </div>

      <nav className="nav-center" aria-label="Main navigation">
        {NAV_ITEMS.map(({ path, label }) => {
          const active = isMonitorActive(location.pathname, path);
          return (
            <span
              key={path}
              className={`nav-link ${active ? "nav-item-active" : ""}`}
              onClick={() => navigate(path)}
              onKeyDown={(e) => e.key === "Enter" && navigate(path)}
              role="button"
              tabIndex={0}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </span>
          );
        })}
      </nav>

      <div className="nav-right">
        <button type="button" className="nav-action-btn" aria-label="Save Report">
          <Save size={16} aria-hidden />
          <span>Save Report</span>
        </button>
        <button type="button" className="nav-action-btn" aria-label="Export to PDF">
          <Download size={16} aria-hidden />
          <span>Export to PDF</span>
        </button>
        <button type="button" className="nav-action-btn" aria-label="Send to Email">
          <Mail size={16} aria-hidden />
          <span>Send to Email</span>
        </button>
        <span className="nav-version" aria-label="Version">V2.00 017/08</span>
        <button type="button" className="nav-icon-btn" aria-label="Notifications">
          <Bell size={20} />
        </button>
        <div className="profile-circle" title="User" aria-hidden>G</div>
      </div>
    </header>
  );
}