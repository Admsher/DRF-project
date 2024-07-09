import React from "react";
import { useDarkMode } from "../../../context/DarkModeContext";

const InvestorsCard = () => {
  const { isDarkMode } = useDarkMode();

  const isDarkModeClass = isDarkMode ? "bg-[#0B2045CC]" : "bg-[#D9D9D9]";

  return (
    <div
      className={`${isDarkModeClass} rounded-2xl flex flex-col md:p-4 gap-2 mb-5`}
    >
      <div className=' bg-white rounded-xl shadow-lg h-60'></div>
      <div className='flex flex-col gap-1'>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  );
};

export default InvestorsCard;
