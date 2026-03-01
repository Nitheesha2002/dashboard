import { FaWind } from "react-icons/fa";
import { Bell, FileText, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./layout.css";

export default function TopNavbar({ onMenuClick }) {

  const navigate = useNavigate();

  return (
    <div className="top-navbar">

      {/* LEFT SECTION */}
      <div className="nav-left">

        {/* Hamburger ONLY for mobile */}
        <div className="mobile-menu" onClick={onMenuClick}>
          <Menu size={20} />
        </div>

        {/* Logo always visible */}
        <div
          className="logo-wrapper"
          onClick={() => navigate("/monitor")}
        >
          <FaWind className="logo-icon" />
          <span className="logo-text">TwinARC</span>
        </div>

      </div>

      {/* CENTER MENU (Desktop only) */}
      <div className="nav-center">
        <span onClick={() => navigate("/monitor")}>Monitor</span>
        <span onClick={() => navigate("/forecast")}>Forecast</span>
        <span>Visibility</span>
        <span>RCA</span>
        <span>Cases</span>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        <div className="nav-action">
        </div>

        <Bell size={20} />

        <div className="profile-circle">G</div>
      </div>

    </div>
  );
}