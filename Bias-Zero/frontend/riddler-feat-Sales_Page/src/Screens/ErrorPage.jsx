import React from "react";
import Header from "../Components/Header/Header";
import arrowRight from "../Components/Body/assets/images/PricingImages/arrowRight.png";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
const ErrorPage = () => {
  const { isDarkMode } = useDarkMode();

  const isDarkModeClass = isDarkMode
    ? "bg-dark-mode-navy text-white"
    : "bg-white";

  const isDarkModeImage = isDarkMode ? "invert" : "";

  return (
    <>
      <Header />
      <div className={`${isDarkModeClass}`}>
        <div
          className={`wrapper grid sm:grid-cols-2 grid-cols-1 items-center justify-center min-h-screen`}
        >
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl">Accept our appologies!</h1>
            <p className="text-lg">
              The page you were looking for doesn't exist. You may have
              misstyped the address or the page may have moved.
            </p>
            <Link to="/" className="flex items-center gap-2">
              <img
                src={arrowRight}
                alt=""
                className={`max-w-6 ${isDarkModeImage}`}
              />
              <p className="text-lg font-semibold">Go to Home Page</p>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <h1 className="text-[200px]">404</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
