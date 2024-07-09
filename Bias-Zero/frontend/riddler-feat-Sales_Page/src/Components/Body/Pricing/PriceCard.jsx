import React from "react";
import arrowD from "../assets/images/PricingImages/downArrow.png";
import arrowUp from "../assets/images/PricingImages/arrowUp.png";
import check from "../assets/images/PricingImages/check.png";
import { useDarkMode } from "../../../context/DarkModeContext";
import checkDark from "../assets/images/PricingImages/checkDark.png";
import popularImage from "../assets/images/PricingImages/Frame 18.png";
import darkModePopular from "../assets/images/PricingImages/darkModePopular.png";

const PriceCard = ({ data, handleClick, isMobile }) => {
  const { isDarkMode } = useDarkMode();
  const bgClass = isDarkMode ? "bg-[#45649A] text-white" : "bg-white";
  const bgClassButton = isDarkMode ? "bg-[#4AA08D]" : "bg-[#1E3A8A]";

  const checkImage = isDarkMode ? checkDark : check;
  const mostPopularImage = isDarkMode ? darkModePopular : popularImage;

  const borderClass =
    data.id === 2 ? "border-[#2A52BE] border-[10px]" : "border-black";

  const arrow = isMobile ? arrowUp : arrowD;

  return (
    <div
      className={`border-2 border-solid duration-500  rounded-3xl shadow-xl flex flex-col ${borderClass} ${bgClass}`}
    >
      {data.id === 2 && (
        <div className="flex justify-end">
          <img src={mostPopularImage} alt="Popular" className="max-w-36" />
        </div>
      )}
      <div className="py-6 px-8 flex flex-col gap-4">
        <h1 className="text-xl font-semibold">{data.title}</h1>
        <h1 className="text-[45px]">
          <span className="text-gray-400">$</span>
          {data.price}
          <span className="text-sm">/Monthly</span>
        </h1>
        <div className="flex items-center justify-center">
          <button
            className={`shadow-lg rounded-md text-white ${bgClassButton} w-full px-6 py-3 text-lg`}
          >
            Get Now
          </button>
        </div>
        <p className="font-semibold mt-6">Plan includes:</p>
        <div className="flex flex-col gap-8">
          {(isMobile ? data.features : data.features.slice(0, 6))?.map(
            (item, index) => {
              const [firstWord, ...rest] = item.split(" ");
              const remainingText = rest.join(" ");

              return (
                <div className="flex items-center gap-2" key={index}>
                  <img
                    src={checkImage}
                    alt="check"
                    className="text-[#1A73E8]"
                  />
                  <div className="text-[16px] md:text-[20px] flex items-center gap-2">
                    <span className="font-semibold">{firstWord}</span>
                    <p>{remainingText}</p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div
        onClick={() => handleClick(data.id)}
        className="py-3 cursor-pointer flex items-center justify-center border-t border-solid border-gray-500"
      >
        <img src={arrow} alt="arrow" className="max-w-6" />
      </div>
    </div>
  );
};

export default PriceCard;
