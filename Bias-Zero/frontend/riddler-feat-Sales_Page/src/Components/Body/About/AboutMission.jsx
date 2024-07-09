import AboutMissionLM from "../assets/images/AboutImages/about-mission-LM.png";
import AboutMissionDM from "../assets/images/AboutImages/about-mission-DM.png";
import { useDarkMode } from "./../../../context/DarkModeContext";
export default function AboutMission() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className='wrapper mission-content flex md:gap-x-16 gap-0 medium-large:flex-row-reverse flex-col justify-center medium-large:justify-between'>
      <div className='mission-content__text text-left leading-8 py-5 medium-large:py-0 max-w-full md:max-w-[565px] self-center'>
        <h3
          className={`md:text-[32px] text-[22px] font-bold mb-6 leading-10 ${
            isDarkMode ? "text-dark-mode-mint" : "text-second-blue"
          }`}
        >
          Our Mission
        </h3>
        <h4
          className={`md:text-[26px] leading-6 text-[18px] md:leading-8 ultra-small:leading-6 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          At Bias Zero, our mission is to simplify hiring by leveraging
          technology for a fair, efficient, and unbiased recruitment experience.
          Using advanced deep fake avatars, we streamline the interview process,
          evaluate candidates on their true potential, and save organizations
          time and resources. We are dedicated to fostering diversity,
          inclusivity, and innovation in the workforce.
        </h4>
      </div>
      <div className='mission-content__image flex self-center'>
        <img
          className='block max-w-full max-h-full'
          src={isDarkMode ? AboutMissionDM : AboutMissionLM}
          alt='mission-interview'
        />
      </div>
    </div>
  );
}
