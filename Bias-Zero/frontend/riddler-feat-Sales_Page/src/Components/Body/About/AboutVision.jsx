import AboutVisionLM from "../assets/images/AboutImages/about-vision-LM.png";
import AboutVisionDM from "../assets/images/AboutImages/about-vision-DM.png";
import { useDarkMode } from "./../../../context/DarkModeContext";
export default function AboutVision() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className='wrapper vision-content flex medium-large:flex-row flex-col justify-center medium-large:justify-between'>
      <div className='vision-content__text text-left leading-8 py-5 medium-large:py-0 max-w-full md:max-w-[565px] self-center'>
        <h3
          className={`md:text-[32px] text-[22px] font-bold mb-6 leading-10 ${
            isDarkMode ? "text-dark-mode-mint" : "text-second-blue"
          }`}
        >
          Our Vision
        </h3>
        <h4
          className={`md:text-[26px] text-[18px] md:leading-8 ultra-small:leading-6 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Bias Zero leads in tech-driven recruitment, setting standards for
          fairness and efficiency. Our AI avatars enable unbiased interviews
          across industries, helping build diverse teams. We aim to give
          everyone the chance to showcase their abilities and achieve career
          goals.
        </h4>
      </div>
      <div className='vision-content__image flex self-center'>
        <img
          className='block max-w-full w-full h-auto'
          src={isDarkMode ? AboutVisionDM : AboutVisionLM}
          alt='vision-interview'
        />
      </div>
    </div>
  );
}
