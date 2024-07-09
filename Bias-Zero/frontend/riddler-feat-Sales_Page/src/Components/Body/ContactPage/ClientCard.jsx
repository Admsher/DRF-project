import React from "react";
import { useDarkMode } from "../../../context/DarkModeContext";
import LazyLoad from "react-lazyload";

const ClientCard = ({ img, title }) => {
  const { isDarkMode } = useDarkMode();

  const isDarkModeClass = isDarkMode ? "text-white" : "text-black";

  return (
    <div
      className={`p-4 border rounded flex flex-col items-center justify-center gap-4 ${isDarkModeClass}`}
    >
      <LazyLoad>
        <img src={img} alt='Logo 1' className='max-w-32' />
      </LazyLoad>
      <p>{title}</p>
    </div>
  );
};

export default ClientCard;
