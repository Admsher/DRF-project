import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import candidateprofileImage from "./components/candidateImage.png";

const CandidateReport = ({ candidate, skills }) => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchStatistics = () => {
      setTimeout(() => {
        setStatistics(skills);
      }, 100);
    };

    fetchStatistics();
  }, [skills]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl text-white font-bold mb-4">Candidate Report</h3>
      <div className="lg:max-w-[650px] md:max-w-[200px] rounded-lg p-6 bg-blue-500 text-white shadow-lg z-50">
        <div className="flex flex-col md:flex-row items-center mb-4 justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={candidateprofileImage}
              alt="Candidate Profile"
              className="w-20 h-20 rounded-full border border-gray-300 mr-4"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{candidate.username}</p>
              <p className="text-sm">
                {`${candidate.age} | ${candidate.gender} | ${candidate.city}`}
              </p>
            </div>
          </div>
          {candidate.percentage !== null && (
            <div className="relative flex items-center">
              <svg
                className="size-full"
                width="50"
                height="50"
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
                />
                <g className="origin-center transform">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="indigo"
                    className="stroke-current text-ltblue dark:text-mdblue"
                    strokeWidth="3"
                    strokeDasharray="100"
                    strokeDashoffset={100 - (candidate.percentage || 0)}
                  />
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#ffffff"
                    className="font-bold p-12"
                  >
                    {candidate.percentage}%
                  </text>
                </g>
              </svg>
            </div>
          )}
        </div>
        <div className="flex mt-2 items-start space-x-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
            Select
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">
            Reject
          </button>
        </div>
        <div className="px-4">
          <p className="text-lg font-semibold mb-4 text-center">
            Candidate Statistics
          </p>
          <Slider {...settings}>
            {statistics.map((statistic, index) => (
              <div
                key={index}
                className="bg-blue-700 p-6 rounded-lg shadow-xl text-center z-50"
              >
                <p className="font-semibold text-gray-100 text-xl mb-2">
                  {statistic.title}
                </p>
                <p className="text-gray-100 text-lg">{statistic.value}</p>
                <p className="mt-4 text-gray-100 font-bold">
                  {statistic.report}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CandidateReport;
