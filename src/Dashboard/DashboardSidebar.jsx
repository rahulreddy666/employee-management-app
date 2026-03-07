import React from "react";
import { NavLink } from "react-router-dom";
import "./DashboardSidebar.css";
import { getLoggedInUser } from "./auth";

const DashboardSidebar = () => {

  const user = getLoggedInUser();
  const role = user?.role?.toUpperCase();

  /* =====================================================
     Determine correct base route
  ===================================================== */
  const base =
    role === "ADMIN"
      ? "/admin-dashboard"
      : "/employee-dashboard";

  const isAdmin = role === "ADMIN";

  return (
    <div className="dashboard-sidebar">

      {/* ================= DASHBOARD ================= */}
      <NavLink to={base} end className="sidebar-title">
        Dashboard
      </NavLink>


      {/* ================= EMPLOYEES ================= */}
      <NavLink to={`${base}/employee-details`}>
        Employees
      </NavLink>


      {/* ================= ADMIN MENU ================= */}
      {isAdmin && (
        <>
          {/* ❌ Domains removed completely */}

          <NavLink to={`${base}/appraisal`}>
            Appraisal
          </NavLink>

          <NavLink to={`${base}/employee-details/leaves`}>
            Leave Requests
          </NavLink>

          <NavLink to={`${base}/recruitment`}>
            Recruitment
          </NavLink>

          <NavLink to={`${base}/view-applicants`}>
            View Job Applications
          </NavLink>
        </>
      )}


      {/* ================= EMPLOYEE MENU ================= */}
      {!isAdmin && (
        <>
          <NavLink to={`${base}/employee-jobs`}>
            Job Openings
          </NavLink>

          <NavLink to={`${base}/my-applications`}>
            My Applications
          </NavLink>

          <NavLink to={`${base}/my-offers`}>
            My Offers
          </NavLink>

          <NavLink to={`${base}/leave-history`}>
            Leave History
          </NavLink>
        </>
      )}


      {/* ================= COMMON ================= */}
      <NavLink to={`${base}/timesheet`}>
        Timesheet
      </NavLink>

      <NavLink to={`${base}/timesheet/history`}>
        Timesheet History
      </NavLink>

      <NavLink to={`${base}/calendar`}>
        Calendar
      </NavLink>

    </div>
  );
};

export default DashboardSidebar;