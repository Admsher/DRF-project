import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useDarkMode } from "./../../../context/DarkModeContext";
import FunnelAnimationLightMode from "../assets/videos/funnel-animation.webm";
import FunnelAnimationDarkMode from "../assets/videos/funnel-animation-dark-mode.webm";
export default function Animation() {
  const [expandedBoxId, setExpandedBoxId] = useState(null);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const videoRef = useRef(null);
  const toggleTextExpand = (id) => {
    setExpandedBoxId(expandedBoxId === id ? null : id);
  };
  const { isDarkMode } = useDarkMode();
  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.pause();
      videoElement.setAttribute(
        "src",
        isDarkMode ? FunnelAnimationDarkMode : FunnelAnimationLightMode
      );
      videoElement.load();
    }
  }, [isDarkMode]);
  const animationTextBoxes = [
    {
      id: 0,
      title: "1. Equal Opportunity Allocation",
      paragraph:
        "AI system shortlists resumes from various global job portals.",
    },
    {
      id: 1,
      title: "2. AI-Driven Interview System",
      paragraph:
        "Customized, bias-free interview system and uses AI to monitor various behavioural aspects.",
    },
    {
      id: 2,
      title: "3. Interview Evaluation Final",
      paragraph:
        "Candidates passing first two stages proceed to final face to face interview with company.",
    },
  ];
  return (
    <figure className='animation-video__wrapper flex relative mx-auto'>
      <video
        className='animation-video h-auto w-full'
        loop
        autoPlay
        muted
        ref={videoRef}
      >
        <source
          src={isDarkMode ? FunnelAnimationDarkMode : FunnelAnimationLightMode}
          type='video/mp4'
        />
        Your browser does not support the video tag.
      </video>
      <figcaption className='animation-text__boxes absolute top-0 left-0 z-10 w-full h-full flex flex-col justify-between very-large:pl-[26%] very-large:pr-[25%] medium-large:pl-[20%] small-large:pl-[16%] custom-between:pl-[12%] md:pl-[0%] md:py-[33%] small-large:pr-[14%] very-small:py-[35%] ultra-small:py-[0%]'>
        {animationTextBoxes.map(({ id, title, paragraph }) => (
          <button
            type='button'
            onMouseEnter={() => !isTabletOrMobile && toggleTextExpand(id)}
            onMouseLeave={() => !isTabletOrMobile && toggleTextExpand(null)}
            key={id}
            className={`animation-text__boxes max-w-min overflow-hidden text-left md:py-4 md:px-6 ultra-small:px-3 ultra-small:py-2 rounded border border-solid border-black ultra-small:text-wrap ${
              isDarkMode
                ? "bg-dark-mode-blue text-white"
                : "bg-white text-gray-700"
            } ${id === 1 ? "self-end" : "self-start"}`}
          >
            <ol className='text-2xl'>
              <li>
                <h3 className='md:text-2xl very-small:text-l ultra-small:text-sm very-small:text-nowrap ultra-small:text-wrap'>
                  {title}
                  <FontAwesomeIcon
                    className='px-2 md:inline-block hidden'
                    icon={expandedBoxId === id ? faChevronUp : faChevronDown}
                  />
                </h3>
              </li>
            </ol>
            <ul
              className={`list-disc hidden md:block h-auto max-h-0 opacity-0 transition-all duration-1000 ease-in-out ${
                expandedBoxId === id &&
                "max-h-animation-max-height opacity-100 mt-6"
              }`}
              style={{ transitionDelay: expandedBoxId === id ? "0.2s" : "0s" }}
            >
              <li>
                <p className='ultra-small:text-lg small-large:text-list-font'>
                  {paragraph}
                </p>
              </li>
            </ul>
          </button>
        ))}
      </figcaption>
    </figure>
  );
}
