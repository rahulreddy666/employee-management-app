import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   // ⭐ ADDED
import "./Timesheet.css";

const TimesheetHistory = () => {

  const [history, setHistory] = useState([]);
  const navigate = useNavigate();   // ⭐ ADDED

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("timesheet-history")) || [];

    setHistory(data.sort((a, b) => b.timestamp - a.timestamp));
  }, []);

  const handleView = (item) => {
    // Save selected week
    localStorage.setItem("selected-week", item.key);

    // ⭐ FIXED NAVIGATION (Admin dashboard path)
    navigate("/admin-dashboard/timesheet");
  };

  return (
    <div className="timesheet-container">
      <h2>Timesheet History</h2>

      {history.length === 0 ? (
        <p style={{ marginTop: "10px" }}>
          No previous timesheets found.
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Week</th>
              <th>Total Hours</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item, i) => (
              <tr key={i}>
                <td>{item.weekRange}</td>
                <td>{item.totalHours}</td>

                <td>
                  <span className={`status-badge ${item.status}`}>
                    {item.status}
                  </span>
                </td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleView(item)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimesheetHistory;
