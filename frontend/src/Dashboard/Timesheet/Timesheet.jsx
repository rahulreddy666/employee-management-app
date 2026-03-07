import React, { useState, useEffect } from "react";
import "./Timesheet.css";

const projects = [
  "Website Redesign",
  "Mobile App Development",
  "Internal Systems",
  "Client Meetings",
];

const Timesheet = () => {

  /* --------------------
        WEEK HANDLING
  ----------------------*/
  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - (day === 0 ? 6 : day - 1);
    return new Date(d.setDate(diff));
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(
    getStartOfWeek(new Date())
  );

  const generateWeek = (startDate) => {
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    return days.map((day, i) => {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);

      return {
        day,
        dateText: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        key: d.toISOString().split("T")[0],
        project: "",
        hours: 0,
        description: ""
      };
    });
  };

  /* --------------------
        STATE
  ----------------------*/
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState("DRAFT");


  /* ------------------------------
      LOAD PAGE — Which Week?
  ------------------------------*/
  useEffect(() => {
    const selected = localStorage.getItem("selected-week");

    if (selected) {
      setCurrentWeekStart(new Date(selected));
      localStorage.removeItem("selected-week");
    } else {
      setCurrentWeekStart(getStartOfWeek(new Date()));
    }
  }, []);


  /* ------------------------------
      LOAD WEEK DATA
  ------------------------------*/
  useEffect(() => {

    // ✅ FINAL FIX → STABLE WEEK KEY
    const weekKey = currentWeekStart.toISOString().split("T")[0];

    const savedWeek = localStorage.getItem(weekKey);

    if (savedWeek) {
      const parsed = JSON.parse(savedWeek);
      setEntries(parsed.entries || generateWeek(currentWeekStart));
      setStatus(parsed.status || "DRAFT");
    } else {
      setEntries(generateWeek(currentWeekStart));
      setStatus("DRAFT");
    }

  }, [currentWeekStart]);


  /* ------------------------------
      AUTO SAVE WEEK
  ------------------------------*/
  useEffect(() => {
    if (entries.length === 0) return;

    const weekKey = currentWeekStart.toISOString().split("T")[0];

    const existing = JSON.parse(localStorage.getItem(weekKey)) || {};

    localStorage.setItem(
      weekKey,
      JSON.stringify({
        entries,
        status,
        activityLog: existing.activityLog || []
      })
    );

  }, [entries, status, currentWeekStart]);


  /* --------------------
        NAVIGATION
  ----------------------*/
  const changeWeek = (days) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + days);
    setCurrentWeekStart(getStartOfWeek(newDate));
  };


  /* --------------------
        FIELD HANDLING
  ----------------------*/
  const handleChange = (index, field, value) => {
    if (status === "SUBMITTED") return;

    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const removeEntry = (index) => {
    if (status === "SUBMITTED") return;
    setEntries(entries.filter((_, i) => i !== index));
  };

  const addEntry = () => {
    if (status === "SUBMITTED") return;

    setEntries(prev => [
      ...prev,
      {
        day: "Extra Entry",
        dateText: "",
        key: "extra-" + Date.now(),
        project: "",
        hours: 0,
        description: ""
      }
    ]);
  };


  /* --------------------
        HOURS
  ----------------------*/
  const totalHours = entries.reduce(
    (sum, item) => sum + Number(item.hours || 0),
    0
  );

  const overtime = totalHours > 40 ? totalHours - 40 : 0;


  /* ------------------------------
     SAVE HISTORY (NO DUPLICATES)
  ------------------------------*/
  const saveHistory = (newStatus) => {

    setStatus(newStatus);

    const weekKey = currentWeekStart.toISOString().split("T")[0];

    const history = JSON.parse(localStorage.getItem("timesheet-history")) || [];

    const existingIndex = history.findIndex(h => h.key === weekKey);

    const record = {
      key: weekKey,
      weekRange: `${entries[0].dateText} - ${entries[6].dateText}`,
      totalHours,
      status: newStatus,
      timestamp: Date.now()
    };

    if (existingIndex !== -1) {
      history[existingIndex] = record;
    } else {
      history.push(record);
    }

    localStorage.setItem("timesheet-history", JSON.stringify(history));

    /* -------- Activity Log -------- */
    const weekData = JSON.parse(localStorage.getItem(weekKey));
    const log = weekData.activityLog || [];

    log.push({
      action: newStatus === "SUBMITTED" ? "WEEK SUBMITTED" : "DRAFT SAVED",
      hours: totalHours,
      time: new Date().toLocaleString()
    });

    weekData.activityLog = log;
    localStorage.setItem(weekKey, JSON.stringify(weekData));
  };


  /* --------------------
        UI
  ----------------------*/
  return (
    <div className="timesheet-container">

      <div className="summary">
        <div className="summary-box">
          <h4>Weekly Total</h4>
          <p>{totalHours} hours</p>
        </div>

        <div className="summary-box">
          <h4>Overtime</h4>
          <p>{overtime} hours</p>
        </div>

        <div className="summary-box">
          <h4>Status</h4>
          <p style={{ color: status === "SUBMITTED" ? "green" : "#2563eb" }}>
            {status}
          </p>
        </div>
      </div>


      <div className="week-header">
        <button onClick={() => changeWeek(-7)}>{"< Previous"}</button>

        <span className="week-display">
  {entries.length > 0 &&
    `${entries[0].dateText}  -  ${entries[6].dateText}`
  }
</span>


        <button onClick={() => changeWeek(7)}>{"Next >"}</button>

        <button
          className="today-btn"
          onClick={() => setCurrentWeekStart(getStartOfWeek(new Date()))}
        >
          Today
        </button>
      </div>


      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Project</th>
            <th>Hours</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((row, index) => (
            <tr key={row.key}>
              <td>{row.day}</td>
              <td>{row.dateText}</td>

              <td>
                <select
                  disabled={status === "SUBMITTED"}
                  value={row.project}
                  onChange={(e) => handleChange(index, "project", e.target.value)}
                >
                  <option value="">Select Project</option>

                  {projects.map((proj, i) => (
                    <option key={i} value={proj}>{proj}</option>
                  ))}
                </select>
              </td>

              <td>
                <input
                  disabled={status === "SUBMITTED"}
                  type="number"
                  min="0"
                  max="24"
                  value={row.hours}
                  onChange={(e) =>
                    handleChange(index, "hours", e.target.value)
                  }
                />
              </td>

              <td>
                <textarea
                  disabled={status === "SUBMITTED"}
                  value={row.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
              </td>

              <td>
                <button
                  disabled={status === "SUBMITTED"}
                  className="remove-btn"
                  onClick={() => removeEntry(index)}
                >
                  Remove
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>


      <div className="footer-section">
        <h3>Total Hours: {totalHours}</h3>

        <button
          disabled={status === "SUBMITTED"}
          className="add-btn"
          onClick={addEntry}
        >
          + Add Time Entry
        </button>

        <div className="action-buttons">
          <button
            disabled={status === "SUBMITTED"}
            onClick={() => saveHistory("DRAFT")}
          >
            Save as Draft
          </button>

          <button
            disabled={status === "SUBMITTED"}
            className="submit-btn"
            onClick={() => saveHistory("SUBMITTED")}
          >
            Submit Timesheet
          </button>
        </div>
      </div>

    </div>
  );
};

export default Timesheet;
