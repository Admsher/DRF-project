import React, { useState } from "react";
import DefaultBox from "./Default.jsx";
import CandidateReport from "./CandidateReport.jsx";
import profile from "./components/candidateImage.png";
import SearchIcon from "../../dashboard/notification/components/search.png";
import { useSelector } from "react-redux";

function Assessment() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const candidates = useSelector((state) => state.candidate);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = candidates?.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mt-10">
        <h3 className="text-xl font-bold">Interview Candidate List</h3>
        <div className="relative">
          <input
            type="text"
            className="bg-[#121F39] text-white px-8 py-1 rounded-2xl border border-solid border-black placeholder:text-white"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchInput}
          />
          <img
            src={SearchIcon}
            alt="Search"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row bg-blue-900 p-4 rounded-md mt-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 bg-blue-500 rounded-lg p-4 flex flex-col">
          <p className="text-white mb-4">Candidate List</p>
          <div className="overflow-y-scroll max-h-96 pr-4">
            {filteredData?.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-blue-700 text-white p-4 rounded-lg mb-2 cursor-pointer"
                onClick={() => setSelectedCandidate(candidate)}
              >
                <div className="flex bg-ltblue rounded-md h-14 justify-between">
                  <div className="flex">
                    <div className="w-[17%] flex items-center justify-center m-2 ml-2">
                      <img
                        src={candidate.profileImg || profile}
                        alt=""
                        className="h-11"
                      />
                    </div>
                    <div className="flex flex-col justify-center mr-20">
                      {candidate.username.charAt(0).toUpperCase() +
                        candidate.username.slice(1).toLowerCase()}
                      <div className="text-xs text-nowrap">
                        {candidate.age} | {candidate.gender} | {candidate.city}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3" key={candidate.email}>
                    <div className="relative size-12 flex items-center h-full">
                      <svg
                        className="size-full"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-current text-white dark:text-white"
                          strokeWidth="2"
                        ></circle>
                        <g className="origin-center -rotate-90 transform">
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            className="stroke-current text-ltblue dark:text-mdblue"
                            strokeWidth="3"
                            strokeDasharray="100"
                            strokeDashoffset={100 - candidate.percentage}
                          ></circle>
                        </g>
                      </svg>
                      <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <span className="text-center text-sm font-bold text-gray-800 dark:text-white">
                          {candidate.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="bg-dkblue rounded-tr-md rounded-br-md w-5 flex items-center justify-center">
                      <p>{">"}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 rounded-lg p-4 flex justify-center bg-blue-500">
          {selectedCandidate ? (
            <CandidateReport
              candidate={selectedCandidate}
              skills={selectedCandidate.skills}
            />
          ) : (
            <DefaultBox />
          )}
        </div>
      </div>
    </div>
  );
}

export default Assessment;
