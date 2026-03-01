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

export default function TopNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="top-navbar">
      <div className="nav-left">
        <div className="mobile-menu" onClick={onMenuClick} aria-label="Menu">
          <Menu size={20} />
        </div>
        <div
          className="logo-wrapper"
          onClick={() => navigate("/monitor")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/monitor")}
          role="button"
          tabIndex={0}
        >
          <FaWind className="logo-icon" />
          <span className="logo-text">TwinARC</span>
        </div>
      </div>

      <nav className="nav-center" aria-label="Main navigation">
        {NAV_ITEMS.map(({ path, label }) => (
          <span
            key={path}
            className={location.pathname === path || (path === "/monitor" && (location.pathname === "/" || location.pathname === "/monitor")) ? "nav-item-active" : ""}
            onClick={() => navigate(path)}
            onKeyDown={(e) => e.key === "Enter" && navigate(path)}
            role="button"
            tabIndex={0}
          >
            {label}
          </span>
        ))}
      </nav>

      <div className="nav-right">
        <button type="button" className="nav-action-btn">
          <Save size={16} />
          <span>Save Report</span>
        </button>
        <button type="button" className="nav-action-btn">
          <Download size={16} />
          <span>Export to PDF</span>
        </button>
        <button type="button" className="nav-action-btn">
          <Mail size={16} />
          <span>Send to Email</span>
        </button>
        <span className="nav-version">V2.00 017/08</span>
        <Bell size={20} className="nav-icon" aria-hidden />
        <div className="profile-circle" title="User">G</div>
      </div>
    </div>
  );
}