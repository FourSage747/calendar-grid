import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { publicHolidays, year, loading } = useSelector(
    (state: RootState) => state
  );

  useEffect(() => {
    generateCalendar(currentMonth);
  }, [currentMonth]);

  const generateCalendar = (date: Date) => {
    const yearFromState = year || date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(yearFromState, month, 1);
    const lastDay = new Date(yearFromState, month + 1, 0);
    const days: Date[] = [];

    for (let i = 0; i < firstDay.getDay(); i += 1) {
      days.push(new Date(yearFromState, month, -(firstDay.getDay() - 1) + i));
    }

    for (let i = 1; i <= lastDay.getDate(); i += 1) {
      days.push(new Date(yearFromState, month, i));
    }

    while (days.length % 7 !== 0) {
      days.push(
        new Date(yearFromState, month + 1, days.length - firstDay.getDay() + 1)
      );
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };

  const calendarDays = generateCalendar(currentMonth);

  const getHolidayForDate = (date: Date) => {
    const dateStr = date.toLocaleDateString("en-CA"); // Формат "YYYY-MM-DD"
    return (
      publicHolidays.find((holiday) => holiday.date === dateStr)?.name || null
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="calendar">
      <div className="top">
        <button onClick={prevMonth}>← Prev</button>
        <h2>
          {currentMonth.toLocaleString("en-US", {
            month: "long",
          }) +
            " " +
            (year || currentMonth.getFullYear())}
        </h2>
        <button onClick={nextMonth}>Next →</button>
      </div>
      <div className="grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => {
          const holidayName = getHolidayForDate(day);
          return (
            <div
              key={index}
              className={`day ${
                day.getMonth() === currentMonth.getMonth()
                  ? "current-month"
                  : "other-month"
              }`}
            >
              <span>{day.getDate()}</span>
              {holidayName && <div className="holiday">{holidayName}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
