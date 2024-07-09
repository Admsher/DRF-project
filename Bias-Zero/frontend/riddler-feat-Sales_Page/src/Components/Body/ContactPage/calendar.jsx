import React, { useContext, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  isSameMonth,
  getDay,
} from "date-fns";
import { CalendarContext } from "../../../context/CalendarContext";
import { useDarkMode } from "../../../context/DarkModeContext";

const Calendar = () => {
  const { currentDate, setCurrentDate } = useContext(CalendarContext);
  const { isDarkMode } = useDarkMode();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const textDarkModeClass = isDarkMode ? "text-white" : "text-black";

  const daysOfWeek = [
    {
      day: "Sunday",
      id: 1,
    },
    {
      day: "Monday",
      id: 2,
    },
    {
      day: "Tuesday",
      id: 3,
    },
    {
      day: "Wednesday",
      id: 4,
    },
    {
      day: "Thursday",
      id: 5,
    },
    {
      day: "Friday",
      id: 6,
    },
    {
      day: "Saturday",
      id: 7,
    },
  ];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const onDateClick = (day) => setCurrentDate(day);
  const startDate = startOfWeek(monthStart);
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= monthEnd) {
    formattedDate = format(day, "d");
    const cloneDay = day;
    const isSunday = format(day, "EEEE") === "Sunday";
    days.push(
      <div
        className="flex items-center justify-center"
        key={Math.random() * 20}
      >
        <button
          className={`p-4 sm:py-3 text-center font-semibold flex items-center justify-center h-8 w-8 md:h-12 md:w-12  ${
            isSameDay(day, currentDate)
              ? "bg-main-blue text-white rounded-full shadow-xl"
              : !isSameMonth(day, currentMonth)
              ? "opacity-0 cursor-auto"
              : isSunday
              ? "text-gray-400 cursor-not-allowed"
              : `${textDarkModeClass}`
          }`}
          disabled={isSunday || !isSameMonth(day, currentMonth)}
          key={Math.random() * 10}
          onClick={() => onDateClick(cloneDay)}
        >
          {formattedDate}
        </button>
      </div>
    );
    day = addDays(day, 1);
  }

  const borderClassDark = isDarkMode ? "" : "border-black";
  const currentDayOfWeek = getDay(currentDate);

  return (
    <div
      className={`max-w-full max-md:w-full  lg:max-w-4xl ${textDarkModeClass}  ${borderClassDark}`}
    >
      <div className="flex justify-between max-sm:px-4 px-8 py-4">
        <button onClick={prevMonth}>&lt;</button>
        <span className="text-lg font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 text-center font-semibold">
        {daysOfWeek.map((day, index) => (
          <div
            key={day.id}
            className={`p-1 sm:p-2  ${borderClassDark} ${
              index === currentDayOfWeek ? "text-main-blue" : ""
            }`}
          >
            {day.day[0]}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">{days}</div>
    </div>
  );
};

export default Calendar;
