import React from "react";
import arrow from "./components/arrow.png";
import funnel from "./components/funnel.png";
import view from "./components/viewprofile.png";

const DefaultBox = () => {
  return (
    <div className="border border-white rounded-2xl bg-blue-500 text-white flex flex-col items-center justify-center p-4 w-full h-full">
      <h3 className="text-xl mb-4">Getting Started</h3>
      <p className="mb-6">
        Navigate the candidate list on the left to review profiles
      </p>
      <div className="flex items-center mb-4">
        <span className="mr-2">
          <div className="w-16 h-16 border border-white rounded-full bg-white flex items-center justify-center p-1">
            <img src={arrow} alt="" className="w-10 h-10 object-contain" />
          </div>
        </span>
        <span>Click on a candidate to see more details</span>
      </div>
      <div className="flex items-center mb-4">
        <span className="mr-2">
          <div className="w-16 h-16 border border-white rounded-full bg-white flex items-center justify-center p-1">
            <img src={funnel} alt="" className="w-10 h-10 object-contain" />
          </div>
        </span>
        <span>Click on a candidate to see more details</span>
      </div>
      <div className="flex items-center">
        <span className="mr-2">
          <div className="w-16 h-16 border border-white rounded-full bg-white flex items-center justify-center p-1">
            <img src={view} alt="" className="w-10 h-10 object-contain" />
          </div>
        </span>
        <span>Click on a candidate to see more details</span>
      </div>
    </div>
  );
};

export default DefaultBox;
