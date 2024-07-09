import React, { useEffect, useState } from "react";

import { useDarkMode } from "../../../context/DarkModeContext";
import { pricingData } from "../ContactPage/assets/data";
import PriceCard from "./PriceCard";
import ExtendCard from "./ExtendCard";

function Options2() {
  const { isDarkMode } = useDarkMode();
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState(pricingData);

  const handleClick = (id) => {
    const updateData = data.map((item) =>
      item.id === id ? { ...item, visibility: true } : item
    );
    setData(updateData);
  };

  const handleCloseClick = () => {
    const updateData = data.map((item) => ({ ...item, visibility: false }));
    setData(updateData);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const findDataExtend = data?.find((item) => item.visibility);

  const backgroundClass = isDarkMode ? "bg-dark-mode-navy" : "";
  const bgClass = isDarkMode ? "bg-[#0B2045]" : "bg-[#4285F4]";

  return (
    <section className={`${backgroundClass}  py-10`} id="pricing">
      <h1
        className={`text-center my-10 text-4xl ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Plans & Pricing
      </h1>
      <div className="wrapper-l">
        <div
          className={`${bgClass} grid items-center max-lg:gap-6   ${
            findDataExtend ? "grid-cols-1" : "lg:grid-cols-3"
          } lg:p-8 py-4 rounded-xl`}
        >
          {findDataExtend ? (
            <div className="wrapper w-full animate-expandEnter">
              <ExtendCard
                data={findDataExtend}
                handleClick={handleCloseClick}
                isMobile={isMobile}
              />
            </div>
          ) : (
            pricingData?.map((item) => (
              <div className="px-1.5 w-full" key={item.id}>
                <PriceCard data={item} handleClick={handleClick} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Options2;
