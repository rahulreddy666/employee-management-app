import React from "react";
import { Outlet } from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import Header from "./Header";

import "./Dashboard.css";

function Dashboard() {

  // Debug visibility (helps confirm render)
  console.log("Dashboard Layout Loaded");

  return (
    <div className="dashboard-container">

      {/* ================= SIDEBAR ================= */}
      <DashboardSidebar />

      {/* ================= MAIN AREA ================= */}
      <div className="dashboard-main">

        {/* Top Navigation Header */}
        <Header />

        {/* ================= PAGE CONTENT ================= */}
        <div className="dashboard-content">

          {/* 
            Outlet is CRITICAL:
            It renders all nested pages like:
            - employee-details
            - appraisal
            - recruitment
            - timesheet
          */}
          <Outlet />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
