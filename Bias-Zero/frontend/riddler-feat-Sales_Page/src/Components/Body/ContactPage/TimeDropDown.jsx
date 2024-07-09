import React, { useState } from "react";
import { useDarkMode } from "../../../context/DarkModeContext";
import { timeData } from "./assets/data";

const TimeDropdown = ({ onChange }) => {
  const [selectedTime, setSelectedTime] = useState("");
  const { isDarkMode } = useDarkMode();
  const inputDarkModeClass = isDarkMode
    ? "bg-[#0B2045] text-white placeholder:text-white"
    : "";

  const handleChange = (e) => {
    setSelectedTime(e.target.value);
    onChange(e.target.value);
  };

  return (
    <select
      id='time'
      className={`border border-solid max-lg:w-full px-2 py-[0.4rem] rounded-lg ${inputDarkModeClass}`}
      value={selectedTime}
      onChange={handleChange}
    >
      <option value=''>Select Time</option>
      {timeData.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
};

export default TimeDropdown;
