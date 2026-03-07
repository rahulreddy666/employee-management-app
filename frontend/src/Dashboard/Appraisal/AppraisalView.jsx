import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AppraisalView.css";

export default function AppraisalView() {

  const { id } = useParams();
  const navigate = useNavigate();

  /* ROLE BASE PATH */
  const loggedUser =
    JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const base =
    loggedUser?.role?.toUpperCase() === "ADMIN"
      ? "/admin-dashboard"
      : "/employee-dashboard";

  const appraisals =
    JSON.parse(localStorage.getItem("appraisals")) || [];

  const appraisal =
    appraisals.find(a => String(a.id) === String(id));

  if (!appraisal) {
    return (
      <div className="appraisal-view-wrapper">
        <div className="appraisal-view-page">

          <h2>Appraisal Not Found</h2>

          <button
            className="back-btn"
            onClick={() => navigate(`${base}/appraisal`)}
          >
            Go Back
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="appraisal-view-wrapper">
      <div className="appraisal-view-page">

        <h2>View Appraisal</h2>

        <div className="appraisal-card">

          <div className="row">
            <span>Employee</span>
            <strong>{appraisal.employeeName}</strong>
          </div>

          <div className="row">
            <span>Department</span>
            <strong>{appraisal.department}</strong>
          </div>

          <div className="row">
            <span>Review Period</span>
            <strong>{appraisal.period}</strong>
          </div>

          <div className="row">
            <span>Rating</span>
            <strong>{appraisal.rating}</strong>
          </div>

          <div className="row">
            <span>Status</span>
            <strong>{appraisal.status}</strong>
          </div>

        </div>

        <button
          className="back-btn"
          onClick={() => navigate(`${base}/appraisal`)}
        >
          Back
        </button>

      </div>
    </div>
  );
}
