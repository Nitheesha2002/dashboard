import { useState } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import "./layout.css";

export default function Layout({ children }) {

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="layout">

      {/* TOP NAVBAR */}
      <TopNavbar
        onMenuClick={() => setMobileOpen(!mobileOpen)}
      />

      {/* MAIN AREA */}
      <div className="main">

        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* PAGE CONTENT */}
        <div className="content">
          {children}
        </div>

      </div>

    </div>
  );
}