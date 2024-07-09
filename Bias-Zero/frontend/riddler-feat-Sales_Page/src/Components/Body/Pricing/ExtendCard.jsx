import React, { useEffect, useRef } from "react";
import check from "../assets/images/PricingImages/check.png";
import checkDark from "../assets/images/PricingImages/checkDark.png";
import arrowD from "../assets/images/PricingImages/leftArrow.png";
import { useDarkMode } from "../../../context/DarkModeContext";
import popularImage from "../assets/images/PricingImages/Frame 18.png";
import darkModePopular from "../assets/images/PricingImages/darkModePopular.png";
import PriceCard from "./PriceCard";

const ExtendCard = ({ data, handleClick, isMobile }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isMobile) {
      cardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isMobile]);

  const closeClick = (id) => {
    handleClick(id);
  };

  const { isDarkMode } = useDarkMode();
  const bgClass = isDarkMode ? "bg-[#45649A] text-white" : "bg-white";
  const bgClassButton = isDarkMode ? "bg-[#4AA08D]" : "bg-[#1E3A8A]";

  const checkImage = isDarkMode ? checkDark : check;
  const mostPopularImage = isDarkMode ? darkModePopular : popularImage;

  return (
    <>
      {isMobile ? (
        <div ref={cardRef}>
          <PriceCard
            isMobile={isMobile}
            data={data}
            handleClick={handleClick}
          />
        </div>
      ) : (
        <div
          className={`flex gap-[70px] justify-around ${bgClass} duration-500 rounded-xl shadow-md border border-solid border-black`}
        >
          <div className="flex items-center border-r border-solid border-gray-300 px-5">
            <p
              className=" font-semibold text-[22px] rotate-180"
              style={{ writingMode: "vertical-lr" }}
            >
              {data.title}
            </p>
          </div>

          <div className="flex items-center flex-col justify-center">
            <div className="relative flex flex-col">
              <span className="absolute -top-10 -left-5 text-[40px] text-gray-400">
                $
              </span>
              <h1 className="text-[70px] leading-none">{data.price}</h1>
              <span className=" block text-[20px] font-semibold">/Monthly</span>
            </div>
            {data.id === 2 && (
              <div className="pt-5 ">
                <img
                  src={mostPopularImage}
                  alt="Popular"
                  className="max-w-36"
                />
              </div>
            )}
          </div>
          <div>
            <div className="flex my-10 text-xl">
              <p>Plan includes:</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {data.features?.map((item, index) => {
                const [firstWord, ...rest] = item.split(" ");
                const remainingText = rest.join(" ");

                return (
                  <div className="flex items-center gap-2" key={index}>
                    <img
                      src={checkImage}
                      alt="check"
                      className="text-[#1A73E8]"
                    />
                    <div className="text-[20px] flex items-center gap-2">
                      <span className="font-semibold">{firstWord}</span>
                      <p>{remainingText}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center py-10">
              <button
                className={`shadow-lg rounded-md text-white text-lg ${bgClassButton} w-1/2 py-3`}
              >
                Get Now
              </button>
            </div>
          </div>
          <div
            onClick={() => closeClick()}
            className="py-3 cursor-pointer flex items-center justify-center"
          >
            <img src={arrowD} alt="arrow" className="max-w-4" />
          </div>
        </div>
      )}
    </>
  );
};

export default ExtendCard;
