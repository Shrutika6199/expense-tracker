import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addMonths,
  setDate,
} from "date-fns";
import enIN from "date-fns/locale/en-IN";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css"; // Custom CSS for responsiveness

const locales = {
  "en-IN": enIN,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Generate calendar events from expenses
const generateEvents = (expenses) => {
  const events = [];

  expenses.forEach((exp) => {
    const dueDate = new Date(exp.dueDate);

    if (exp.isFixed) {
      for (let i = 0; i < 12; i++) {
        const monthDue = addMonths(dueDate, i);
        const eventDate = setDate(monthDue, dueDate.getDate());

        events.push({
          title: `⏰ ${exp.description} – ₹${exp.amount}`,
          start: eventDate,
          end: eventDate,
          allDay: true,
          isFixed: true,
          isPaid: exp.isPaid,
        });
      }
    } else {
      events.push({
        title: `${exp.description} – ₹${exp.amount}`,
        start: dueDate,
        end: dueDate,
        allDay: true,
        isFixed: false,
        isPaid: exp.isPaid,
      });
    }
  });

  return events;
};

const CalendarPage = ({ expenses }) => {
  const [view, setView] = useState("month"); // 🟡 Track current view
  const [date, setDate] = useState(new Date()); // 🟡 Track current date

  if (!Array.isArray(expenses)) {
    return <div>Error loading calendar.</div>;
  }

  const events = generateEvents(expenses);

  return (
    <div className="container-fluid calendar-container mt-4">
      <h3 className="text-center mb-3">📅 Monthly Expense Deadlines</h3>

      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={["month", "agenda"]} // 🟡 Enable month and agenda views
          view={view}
          onView={(v) => setView(v)} // 🟡 Allow switching views
          date={date}
          onNavigate={(newDate) => setDate(newDate)} // 🟡 Allow month navigation
          popup
          style={{ height: "100%", width: "100%" }}
          eventPropGetter={(event) => {
            let bg = "#ffd3b6"; // one-time
            if (event.isFixed) bg = "#fce38a";
            if (event.isPaid) bg = "#a8e6cf";

            return {
              style: {
                backgroundColor: bg,
                color: "#333",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontWeight: "500",
                padding: "2px 4px",
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
