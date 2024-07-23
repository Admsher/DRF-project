import React, { useState } from "react";
import { useDarkMode } from "../../../context/DarkModeContext";
import ai from "../assets/image 36.png";
import wm from "../assets/image 37.png";
import LazyLoad from "react-lazyload";

const WhyBiasZero = () => {
  const [view, setView] = useState(false);
  const features = [
    {
      heading: "Comprehensive Behavioral Monitoring",
      info: "Our AI bot uses advanced techniques to holistically evaluate each candidate",
      types: [
        {
          heading: "Motion Sensor",
          info: "Tracks body movements to assess comfort and body language.",
        },
        {
          heading: "Nervousness Meter",
          info: "Analyzes physiological indicators to detect nervousness, offering insights into stress handling.",
        },
        {
          heading: "Confidence Meter",
          info: "Measures confidence through speech patterns and body language, providing a deeper understanding of self-assurance",
        },
      ],
    },
    {
      heading: "Sophisticated Behavioral Analysis",
      info: "Bias-Zero uses advanced tools to analyze candidates non-verbal cues",
      types: [
        {
          heading: "Eyeball Tracking",
          info: "Monitors eye movements to gauge focus and honesty, providing insights into engagement and integrity",
        },
        {
          heading: "Face Detector",
          info: "Analyzes facial expressions to understand emotions and reactions, enhancing the evaluation process",
        },
        {
          heading: "Advanced Linguistic Analysis",
          info: "Our AI bot meticulously analyzes candidates verbal responses",
        },
        {
          heading: "Keyword Matching",
          info: "Ensures responses align with job requirements for relevance",
        },
        {
          heading: "Answer Analyzer",
          info: "Evaluates answers based on context, coherence, and relevance to identify the best candidates",
        },
      ],
    },
    {
      heading: "Human-like Interaction with Deep Fake Avatar",
      info: "Our deep fake technology generates a realistic interviewer, improving candidate comfort and ensuring consistent interviews.",
    },
  ];
  const [content, setContent] = useState(features[0]);
  const [typeContent, setTypeContent] = useState(null);
  const { isDarkMode } = useDarkMode();

  return (
    <div id="whyBiasZero">
      <div className={`p-4 px-[2%] ${isDarkMode && "bg-[#0A2351] text-white"}`}>
        {/* section 1 */}
        {/* <div className="flex justify-center items-center">
          <LazyLoad>
            <img src={ai} alt="" />
          </LazyLoad>
        </div> */}
        <div className="flex items-center flex-col my-16 space-y-5">
          <h2 className="text-xl font-bold">
            Why Choose Bias-Zero: Revolutionizing Fair Recruitment with AI
          </h2>
          <p className="text-sm">
            In the modern hiring landscape, a fair and unbiased recruitment
            process is crucial. Bias-Zero, an AI-driven interview bot, ensures
            all candidates have an equal opportunity to showcase their skills,
            free from human biases. Here's why Bias-Zero stands out and why your
            organization should choose our solution.
          </p>
        </div>
        {/* section 2 */}
        <div
          className={`bg-[#1A73E8] rounded-md p-3 flex flex-col text-base flex-wrap gap-2 gap-x-4 ${
            isDarkMode && "bg-[#2A52BE]"
          }`}
        >
          <div className="gap-2 flex flex-wrap">
            {features.map((feature, index) => {
              return (
                <div
                  key={index}
                  className={`bg-[#5293fc] text-white flex rounded-md p-1 flex-wrap gap-2 w-fit ${
                    isDarkMode && "bg-[#2A52BE]"
                  }`}
                >
                  <button
                    className={`p-1 rounded-md`}
                    key={index}
                    onClick={() => {
                      setContent(feature);
                      setView(false);
                    }}
                  >
                    {feature.heading}
                  </button>
                </div>
              );
            })}
          </div>

          {content && (
            <div
              className={`bg-[#5293fc] p-1 rounded-md space-y-1 h-full ${
                    isDarkMode && "bg-blue-400"
                  }`}
            >
              <div className="flex p-1 flex-col sm:flex-col lg:flex-row">
                <div>
                  <LazyLoad>
                    <img src={wm} alt="" />
                  </LazyLoad>
                </div>
                <div className=" p-3 w-full space-y-2 gap-2">
                  <h2 className="font-bold text-xl rounded-md">
                    {content.heading}:
                  </h2>
                  {content.info}
                  {content.types && <p className="font-semibold">Features:</p>}
                  {content.types &&
                    content.types.map((type, index) => (
                      <button
                        className={`px-1 rounded-md bg-[#1A73E8] text-white mx-1 ${
                            isDarkMode && " bg-blue-800"
                          }`}
                        key={index}
                        onClick={() => {
                          setTypeContent(type);
                          setView(true);
                        }}
                      >
                        {type.heading}
                      </button>
                    ))}
                  <div className="w-full h-fit border-2 border-black">
                    {view && typeContent && (
                      <div className={`bg-[#1A73E8] p-2 rounded-md ${
                      isDarkMode && 'bg-blue-800'}`}>
                        <h2
                          className={`font-bold w-fit rounded-md`}>
                          {typeContent.heading}
                        </h2>
                        <p>{typeContent.info}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* section 3 */}
        <div className="my-20 space-y-5 p-3">
          <h2 className="text-center font-bold text-xl">
            Why Bias-Zero is Unique
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="font-semibold">
              Unbiased and Consistent Evaluations:
            </div>
            <div>
              Bias-Zero's AI system eliminates human biases, ensuring fair and
              consistent candidate assessments, thus promoting diversity and
              inclusion
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="font-semibold">In-Depth Candidate Insights:</div>
            <div>
              By integrating various monitoring tools, Bias-Zero provides
              comprehensive candidate evaluations and real-time feedback,
              enhancing recruitment efficiency.
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="font-semibold">Efficiency and Scalability:</div>
            <div>
              Automating initial interview stages, Bias-Zero saves HR time and
              can handle high volumes of interviews, ideal for large-scale
              recruitment.
            </div>
          </div>
        </div>
        {/* section 4 */}
        {/*  */}
        <div
          className={`p-5 bg-[#1A73E8] text-white w-full ${
            isDarkMode && "bg-[#2A52BE]"
          }`}
        >
          <h2 className="font-bold text-center text-lg sm:text-xl mb-5">
            How Bias-Zero Differentiates from Competitors
          </h2>
          <ol className="space-y-5">
            <li className="flex flex-col text-sm sm:text-base sm:flex-row sm:gap-5 ">
              <strong>Cutting-Edge AI Technology:</strong> Unlike basic AI
              products, Bias-Zero uses advanced technologies like deep fake
              avatars, motion sensors, and eyeball tracking for thorough
              candidate evaluation.
            </li>
            <li className="flex flex-col text-sm sm:text-base sm:flex-row sm:gap-5">
              <strong>Multifaceted Behavioral Analysis:</strong> Bias-Zero
              integrates various behavioral analysis tools, providing a
              comprehensive candidate assessment beyond speech and basic cues
            </li>
            <li className="flex flex-col text-sm sm:text-base sm:flex-row sm:gap-5">
              <strong>Ethical AI Implementation:</strong> Bias-Zero is committed
              to ethical practices, ensuring responsible data use, candidate
              privacy, and transparent evaluation processes.
            </li>
          </ol>
        </div>
        {/* section 4 */}
        <div className="my-8 px-5">
          Choosing Bias-Zero means embracing a fair, efficient, and advanced
          approach to recruitment. Our solution not only enhances the hiring
          process but also upholds the principles of diversity and inclusion.
          With Bias-Zero, you can be confident that every candidate is evaluated
          purely on their merits, helping you build a stronger and more diverse
          workforce. Invest in Bias-Zero today and take a significant step
          towards a fairer and more effective recruitment process.
        </div>
      </div>
    </div>
  );
};

export default WhyBiasZero;
