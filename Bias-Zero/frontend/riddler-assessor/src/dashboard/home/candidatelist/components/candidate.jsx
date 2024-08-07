import React from "react";
import profile from "./profile.png";
function Candidate({ Candidate, percentage }) {
  /* For percentage used "daisyui" 
        npm i -D daisyui@latest AND 
        plugins: [
        require('daisyui'),
        ],
    */
  const val = percentage;
  return (
    <div className="flex bg-ltblue rounded-md h-14 justify-between">
      <div className="flex">
        <div className="w-[17%] flex items-center justify-center m-2 ml-2">
          <img src={profile} alt="" className="h-11" />
        </div>
        <div className="flex flex-col justify-center mr-20">
          {Candidate.username.charAt(0).toUpperCase() +
            Candidate.username.slice(1).toLowerCase()}
          <div className="text-xs text-nowrap">
            {Candidate.age} | {Candidate.gender} | {Candidate.city}
          </div>
        </div>
      </div>
      <div className="flex gap-3" key={Candidate.email}>
        <div class="relative size-12 flex items-center h-full">
          <svg
            class="size-full"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <!-- Background Circle --> */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              class="stroke-current text-white dark:text-white"
              stroke-width="2"
            ></circle>
            {/* <!-- Progress Circle inside a group with rotation --> */}
            <g class="origin-center -rotate-90 transform">
              {/* To progress bar to show 72%, we need to write 100-72 in stroke-dashoffset, if 0-it displays 100% progress
               *It means we need to write the remaining from to total to show how much it occupied.
               */}
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                class="stroke-current text-ltblue dark:text-mdblue"
                stroke-width="3"
                strokeDasharray="100"
                strokeDashoffset={100 - val}
              ></circle>
            </g>
          </svg>
          {/* <!-- Percentage Text --> */}
          <div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <span class="text-center text-sm font-bold text-gray-800 dark:text-white">
              {val}%
            </span>
          </div>
        </div>
        <div className=" bg-dkblue rounded-tr-md rounded-br-md w-5 flex items-center justify-center">
          <p>{">"}</p>
        </div>
      </div>
    </div>
  );
}
export default Candidate;
