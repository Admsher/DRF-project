import React, { useContext } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { CalendarContext } from "../../../context/CalendarContext";
import { useDarkMode } from "../../../context/DarkModeContext";

const Calendar = () => {
  const { currentDate, setCurrentDate } = useContext(CalendarContext);
  const { isDarkMode } = useDarkMode();

  const textDarkModeClass = isDarkMode ? "text-white" : "text-black";

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const onDateClick = (day) => setCurrentDate(day);

  let days = [];
  let day = startDate;
  let formattedDate = "";

  let rowCount = 0;

  while (day <= endDate && rowCount < 5) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <div
          className={`p-2 sm:py-4 cursor-pointer text-center border-b border-black border-solid ${
            !isSameMonth(day, monthStart)
              ? "text-gray-400"
              : isSameDay(day, currentDate)
              ? "bg-blue-500 text-white"
              : `${textDarkModeClass}`
          }`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          {formattedDate}
        </div>
      );
      day = addDays(day, 1);
    }
    rowCount++;
  }

  const borderClassDark = isDarkMode ? "" : "border-black";

  return (
    <div
      className={`max-w-full max-md:w-full  lg:max-w-4xl  border-2 border-solid ${borderClassDark}`}
    >
      <div className="grid grid-cols-7 text-center font-semibold">
        {daysOfWeek.map((day) => (
          <div
            key={Math.random() * 10}
            className={`p-1 sm:p-2 border-b-2 border-solid ${borderClassDark}`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">{days}</div>
    </div>
  );
};

export default Calendar;
