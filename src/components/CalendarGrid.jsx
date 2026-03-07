import React from "react";
import "./CalendarGrid.css";

const CalendarGrid = ({
  currentDate = new Date(),   // ✅ SAFE DEFAULT
  view = "month",             // ✅ SAFE DEFAULT
  events = [],
}) => {
  // -----------------------------------
  // Common helpers
  // -----------------------------------
  const today = new Date();

  const isSameDay = (d1, d2) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  // -----------------------------------
  // MONTH VIEW LOGIC
  // -----------------------------------
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];

    // Empty cells before 1st
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="cell empty" />);
    }

    // Month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);

      cells.push(
        <div
          key={day}
          className={`cell ${
            isSameDay(date, today) ? "today" : ""
          }`}
        >
          <div className="date-number">{day}</div>
        </div>
      );
    }

    return <div className="calendar-grid">{cells}</div>;
  };

  // -----------------------------------
  // WEEK VIEW LOGIC
  // -----------------------------------
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(
      currentDate.getDate() - currentDate.getDay()
    );

    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      days.push(
        <div
          key={i}
          className={`cell ${
            isSameDay(date, today) ? "today" : ""
          }`}
        >
          <div className="date-number">{date.getDate()}</div>
        </div>
      );
    }

    return <div className="calendar-grid week">{days}</div>;
  };

  // -----------------------------------
  // Render
  // -----------------------------------
  return (
    <div className="calendar-body">
      {/* Day Headers */}
      <div className="days-row">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {view === "month" ? renderMonthView() : renderWeekView()}
    </div>
  );
};

export default CalendarGrid;
