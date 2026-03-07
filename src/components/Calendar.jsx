import React, { useState } from "react";
import "./Calendar.css";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ---- HOLIDAYS 2026 (CORRECT) ---- */
const HOLIDAYS_2026 = [
  { date: "2026-01-01", title: "New Year Day", type: "holiday" },
  { date: "2026-01-15", title: "Sankranti / Pongal", type: "holiday" },
  { date: "2026-01-26", title: "Republic Day", type: "holiday" },

  { date: "2026-02-15", title: "Maha Shivaratri", type: "holiday" },

  { date: "2026-03-19", title: "Ugadi", type: "holiday" },
  { date: "2026-03-20", title: "Eid Ul Fitr", type: "holiday" },

  { date: "2026-08-15", title: "Independence Day", type: "holiday" },

  { date: "2026-09-14", title: "Vinayaka Chavithi", type: "holiday" },

  { date: "2026-10-02", title: "Gandhi Jayanti", type: "holiday" },
  { date: "2026-10-20", title: "Dussehra", type: "holiday" },

  { date: "2026-11-09", title: "Diwali", type: "holiday" },

  { date: "2026-12-25", title: "Christmas", type: "holiday" }
];

/* ---- SAMPLE LEAVES + BIRTHDAYS (UNCHANGED) ---- */
const SAMPLE_EVENTS = [
  { date: "2025-01-10", title: "Casual Leave", type: "leave" },
  { date: "2025-01-05", title: "Friend Birthday", type: "birthday" },
  { date: "2025-02-12", title: "Casual Leave", type: "leave" },
  { date: "2025-02-07", title: "Friend Birthday", type: "birthday" },
  { date: "2025-03-15", title: "Casual Leave", type: "leave" },
  { date: "2025-03-09", title: "Friend Birthday", type: "birthday" },
  { date: "2025-04-16", title: "Casual Leave", type: "leave" },
  { date: "2025-04-11", title: "Friend Birthday", type: "birthday" },
  { date: "2025-05-14", title: "Casual Leave", type: "leave" },
  { date: "2025-05-06", title: "Friend Birthday", type: "birthday" },
  { date: "2025-06-18", title: "Casual Leave", type: "leave" },
  { date: "2025-06-08", title: "Friend Birthday", type: "birthday" },
  { date: "2025-07-19", title: "Casual Leave", type: "leave" },
  { date: "2025-07-04", title: "Friend Birthday", type: "birthday" },
  { date: "2025-08-22", title: "Casual Leave", type: "leave" },
  { date: "2025-08-06", title: "Friend Birthday", type: "birthday" },
  { date: "2025-09-17", title: "Casual Leave", type: "leave" },
  { date: "2025-09-05", title: "Friend Birthday", type: "birthday" },
  { date: "2025-10-10", title: "Casual Leave", type: "leave" },
  { date: "2025-10-03", title: "Friend Birthday", type: "birthday" },
  { date: "2025-11-14", title: "Casual Leave", type: "leave" },
  { date: "2025-11-07", title: "Friend Birthday", type: "birthday" },
  { date: "2025-12-10", title: "Casual Leave", type: "leave" },
  { date: "2025-12-05", title: "Friend Birthday", type: "birthday" }
];

/* ---- ALL EVENTS ---- */
const ALL_EVENTS = [...HOLIDAYS_2026, ...SAMPLE_EVENTS];

export default function Calendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [view, setView] = useState("month");

  const [filters, setFilters] = useState({
    holiday: true,
    leave: true,
    birthday: true
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const isToday = (d) =>
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();

  /* ✅ FIXED DATE MATCHING (NO TIMEZONE SHIFT) */
  const getEventsForDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const key = `${yyyy}-${mm}-${dd}`;

    return ALL_EVENTS.filter((e) => e.date === key);
  };

  const buildMonthDays = () => {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  };

  const buildWeekDays = () => {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const daysToRender = view === "month" ? buildMonthDays() : buildWeekDays();

  return (
    <div className="calendar-wrapper">
      {/* Filters */}
      <div className="calendar-filters">
        <h3>Filters</h3>

        <label>
          <input
            type="checkbox"
            checked={filters.holiday}
            onChange={() =>
              setFilters({ ...filters, holiday: !filters.holiday })
            }
          />
          Holidays (Green)
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.leave}
            onChange={() =>
              setFilters({ ...filters, leave: !filters.leave })
            }
          />
          Leaves (Yellow)
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.birthday}
            onChange={() =>
              setFilters({ ...filters, birthday: !filters.birthday })
            }
          />
          Birthdays (Blue)
        </label>
      </div>

      {/* Calendar */}
      <div className="calendar-main">
        <div className="calendar-header">
          <button className="btn" onClick={() => setView("month")}>
            Month
          </button>

          <div className="nav">
            <button
              className="btn"
              onClick={() =>
                setCurrentDate(new Date(year, month - 1, 1))
              }
            >
              Prev
            </button>

            <strong>
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric"
              })}
            </strong>

            <button
              className="btn"
              onClick={() =>
                setCurrentDate(new Date(year, month + 1, 1))
              }
            >
              Next
            </button>
          </div>

          <button className="btn" onClick={() => setView("week")}>
            Week
          </button>
        </div>

        <div className="calendar-grid">
          {WEEK_DAYS.map((d) => (
            <div key={d} className="day-name">
              {d}
            </div>
          ))}

          {daysToRender.map((date, i) => (
            <div
              key={i}
              className={`day-cell ${date && isToday(date) ? "today" : ""}`}
            >
              {date && (
                <>
                  <span className="date-number">{date.getDate()}</span>

                  {getEventsForDate(date)
                    .filter((e) => filters[e.type])
                    .map((e, idx) => (
                      <div key={idx} className={`event ${e.type}`}>
                        {e.title}
                      </div>
                    ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
