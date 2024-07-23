import React, { useState } from "react";
import checkIcon from "../assets/check-mark-blue.png";
import arrowD from "../assets/down-arrow.jpg";
import { useDarkMode } from "../../../context/DarkModeContext";

const pricingData = [
  {
    title: "Entry Level Plan",
    price: "£XX",
    description: "Basic plan for small teams",
    features: [
      "5 Questions Asked",
      "5 Job Vacancies",
      "1 User Only",
      "$90 per user/month",
      "Limited AI Video Interviews",
      "3 Avatars",
    ],
  },
  {
    title: "Mid-Tier Plan",
    price: "£XX",
    description: "Intermediate plan for growing teams",
    features: [
      "10 Questions Asked",
      "10 Job Vacancies",
      "3 User Only",
      "$50 per user/month",
      "Limited AI Video Interviews",
      "5 Avatars",
    ],
  },
  {
    title: "High-End Plan",
    price: "£XX",
    description: "Advanced plan for large teams",
    features: [
      "20 Questions Asked",
      "25 Job Vacancies",
      "5 User Only",
      "$20 per user/month",
      "Limited AI Video Interviews",
      "10 Avatars",
    ],
  },
];

function Options() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const { isDarkMode } = useDarkMode();

  const toggleCollapse = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div
      className={` py-8 ${
        isDarkMode
          ? "bg-dark-mode-navy text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="wrapper px-8 py-8 sm:px-6 lg:px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:max-w-7xl xl:mx-auto bg-blue-400 rounded-xl p-12">
          {pricingData.map((pricing, index) => (
            <div
              key={index}
              className={`border border-gray-200 divide-y divide-gray-200 rounded-lg shadow-xl transition-all duration-500 ${
                expandedIndex === index ? "col-span-3" : "col-span-1"
              } ${
                isDarkMode ? "bg-white" : "bg-white"
              } ${expandedIndex !== -1 && expandedIndex !== index ? "hidden" : "block"}`}
            >
              <div className="p-6 transform-gpu">
                <h2
                  className={`text-xl font-semibold leading-6 ${
                    isDarkMode ? "text-gray-900" : "text-gray-700"
                  } hover:text-indigo-900 transition-colors duration-300`}
                >
                  {pricing.title}
                </h2>
                <p
                  className={`mt-4 text-sm ${
                    isDarkMode ? "text-gray-800" : "text-gray-500"
                  } hover:text-gray-700 transition-colors duration-300`}
                >
                  {pricing.description}
                </p>
                <p className="mt-8">
                  <span
                    className={`text-4xl font-extrabold ${
                      isDarkMode ? "text-gray-700" : "text-gray-900"
                    } hover:text-blue-600 transition-colors duration-300`}
                  >
                    {pricing.price}
                  </span>
                  <span
                    className={`text-base font-medium ${
                      isDarkMode ? "text-gray-700" : "text-gray-500"
                    }`}
                  >
                    /Monthly
                  </span>
                </p>
                <a
                  href="#"
                  className={`block w-full py-2 mt-8 text-sm font-semibold text-center ${
                    isDarkMode
                      ? "bg-green-700 hover:bg-green-800"
                      : "bg-indigo-900 hover:bg-blue-600"
                  } text-white border border-gray-800 rounded-md shadow-2xl transition-all duration-300`}
                >
                  Get Now
                </a>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-xs font-bold tracking-wide text-gray-900 uppercase">
                  Plan Includes:
                </h3>
                <div
                  className={`px-4 py-2 divide-y divide-gray-200 ${
                    expandedIndex === index ? "grid grid-cols-2 gap-4" : ""
                  } transition-all duration-500`}
                >
                  {pricing.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className={`flex items-center text-gray-500 ${
                        expandedIndex !== index ? "block" : "hidden"
                      }`}
                    >
                      <img
                        src={checkIcon}
                        alt="blue tick"
                        className="h-4 w-4 mr-2"
                      />
                      <p className="cursor-pointer font-semibold hover:scale-105 hover:text-blue-400 transition-all duration-300">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="px-4 py-2 flex items-center justify-center cursor-pointer"
                  onClick={() => toggleCollapse(index)}
                >
                  <img
                    src={arrowD}
                    alt="down-arrow"
                    className={`h-4 w-4 bg-blue-500 rounded-full transform transition-transform duration-300 ease-in-out ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    expandedIndex === index ? "max-w-full" : "max-w-0"
                  }`}
                >
                  <div className="px-4 py-2 divide-y divide-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      {pricing.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className={`flex items-center text-gray-900 ${
                            expandedIndex === index ? "block" : "hidden"
                          }`}
                        >
                          <img
                            src={checkIcon}
                            alt="blue tick"
                            className="h-4 w-4 mr-2"
                          />
                          <p className="cursor-pointer font-semibold hover:scale-105 hover:text-blue-400 transition-all duration-300">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Options;
