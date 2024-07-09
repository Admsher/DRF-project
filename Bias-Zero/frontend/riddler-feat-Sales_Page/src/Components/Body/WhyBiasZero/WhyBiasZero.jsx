import { useState, useEffect } from "react";
import { useDarkMode } from "../../../context/DarkModeContext";
import MotionSensorImg from "../assets/images/WhyBiasImages/motion-sensor-image.png";
import NervousnessMeterImg from "../assets/images/WhyBiasImages/nervousness-meter-image.jpeg";
import ConfidenceMeterImg from "../assets/images/WhyBiasImages/confidence-meter-image.jpeg";
import EyeballTrackingImg from "../assets/images/WhyBiasImages/eyeball-tracking-image.png";
import FaceDetectorImg from "../assets/images/WhyBiasImages/face-detector-image.png";
import KeywordMatchingImg from "../assets/images/WhyBiasImages/keyword-matching-image.jpeg";
import AnswerAnalyzerImg from "../assets/images/WhyBiasImages/answer-analyzer-image.png";
import LazyLoad from "react-lazyload";

export default function WhyBiasZero() {
  const whyBiasImages = [
    { id: 0, src: MotionSensorImg, alt: "motion-sensor" },
    { id: 1, src: NervousnessMeterImg, alt: "nervousness-meter" },
    { id: 2, src: ConfidenceMeterImg, alt: "confidence-meter" },
    { id: 3, src: EyeballTrackingImg, alt: "eyeball-tracking" },
    { id: 4, src: FaceDetectorImg, alt: "face-detector" },
    { id: 5, src: KeywordMatchingImg, alt: "keyword-matching" },
    { id: 6, src: AnswerAnalyzerImg, alt: "answer-analyzer" },
  ];

  const features = [
    {
      heading: "Motion Sensor",
      info: "Assess candidate comfort and body language through precise movement tracking.",
      id: 0,
    },
    {
      heading: "Nervousness Meter",
      info: "Detects stress levels with sophisticated physiological analysis.",
      id: 1,
    },
    {
      heading: "Confidence Meter",
      info: "Measure confidence via speech patterns and body language.",
      id: 2,
    },
    {
      heading: "Eyeball Tracking",
      info: "Gauge focus and honesty by monitoring eye movements.",
      id: 3,
    },
    {
      heading: "Face Detector",
      info: "Understand emotions and reactions through facial expression analysis.",
      id: 4,
    },
    {
      heading: "Keyword Matching",
      info: "Ensure candidate responses align perfectly with job requirements.",
      id: 5,
    },
    {
      heading: "Answer Analyzer",
      info: "Evaluate the quality of answers based on context, coherence, and relevance.",
      id: 6,
    },
  ];

  const [content, setContent] = useState(features[0]);
  const [active, setActive] = useState(features[0].id);
  const [fadeText, setFadeText] = useState(true);
  const { isDarkMode } = useDarkMode();

  const handleClick = (feature) => {
    setFadeText(false);
    setTimeout(() => {
      setContent(feature);
      setActive(feature.id);
      setFadeText(true);
    }, 300);
  };

  useEffect(() => {
    setFadeText(true);
  }, []);

  const currentImage = whyBiasImages.find((img) => img.id === content.id);

  return (
    <section
      id='whyBiasZero'
      className={`py-12 ${isDarkMode && "bg-[#0A2351] text-white"}`}
    >
      <div className='wrapper-l'>
        <h2
          className={`md:text-[44px] ultra-small:text-[34px] font-bold text-center mb-12 ${
            isDarkMode ? "text-dark-mode-mint" : "text-[#1A73E8]"
          }`}
        >
          Why Choose Bias-Zero?
        </h2>
        <div className=''>
          <div
            className={`flex flex-col text-black ${
              isDarkMode && "bg-dark-mode-navy text-white"
            }`}
          >
            <div className='grid medium-large:grid-cols-7 md:grid-cols-4 ultra-small:grid-cols-2 mb-4 w-full text-center'>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${isDarkMode && "bg-dark-mode-navy"}`}
                >
                  <button
                    className={`px-[6px] w-min py-[14px] md:text-[24px] ultra-small:text-[20px] max-md:text-xl transition-all duration-300 ease-in-out hover:text-[#1A73E8] ${
                      isDarkMode && "hover:text-dark-mode-mint"
                    } ${
                      active === feature.id
                        ? isDarkMode
                          ? "border-b-4 border-solid border-dark-mode-mint"
                          : "border-[#1A73E8] border-b-4 border-solid"
                        : ""
                    }`}
                    onClick={() => handleClick(feature)}
                  >
                    {feature.heading}
                  </button>
                </div>
              ))}
            </div>
            <div className={`${isDarkMode && "bg-dark-mode-navy"} `}>
              <div
                className={`flex small-large:justify-center gap-0 md:gap-20 items-center max-md:flex-col md:py-[60px] md:px-[20px] ${
                  content.id === 2 || content.id === 5 ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`text-wrapper md:text-left text-center transition-opacity duration-300 ease-in-out ${
                    fadeText ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h2
                    className={`font-bold max-md:text-3xl ultra-small:[26px] text-[#1A73E8] text-[44px] mb-6 ${
                      isDarkMode && "text-dark-mode-mint"
                    }`}
                  >
                    {content.heading}
                  </h2>
                  <p className='text-[26px] max-md:text-xl md:max-w-[541px] ultra-small:text-[20px] ultra-small:max-w-full'>
                    {content.info}
                  </p>
                </div>
                <LazyLoad>
                  <img
                    className={`block rounded-2xl h-auto w-full max-w-[500px] shadow-2xl shadow-gray-600 ${
                      isDarkMode && "shadow-gray-800"
                    }`}
                    src={currentImage.src}
                    alt={currentImage.alt}
                  />
                </LazyLoad>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
