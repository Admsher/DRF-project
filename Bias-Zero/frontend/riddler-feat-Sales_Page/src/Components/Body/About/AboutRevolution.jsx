import AboutRevolutionLM from "../assets/images/AboutImages/about-revolution-LM.png";
import AboutRevolutionDM from "../assets/images/AboutImages/about-revolution-DM.png";
import { useDarkMode } from "../../../context/DarkModeContext";
export default function AboutRevolution() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className='wrapper revolution-content flex medium-large:flex-row flex-col justify-center medium-large:justify-around'>
      <div className='revolution-content__text text-left leading-8 py-5 medium-large:py-0 max-w-full md:max-w-[565px] self-center'>
        <h3
          className={`md:text-[32px] text-[22px] font-bold mb-6 ${
            isDarkMode ? "text-dark-mode-mint" : "text-second-blue"
          }`}
        >
          Experience the future of hiring
        </h3>
        <h4
          className={`md:text-[26px] text-[18px] md:leading-8 ultra-small:leading-6 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Revolutionises hiring with AI delivering unbiased interviews, saving
          time and ensuring a fair, efficient recruitment process.
        </h4>
      </div>
      <div className='revolution-content__image flex self-center'>
        <img
          className='block max-w-full max-h-full'
          src={isDarkMode ? AboutRevolutionDM : AboutRevolutionLM}
          alt='revolution-interview'
        />
      </div>
    </div>
  );
}
