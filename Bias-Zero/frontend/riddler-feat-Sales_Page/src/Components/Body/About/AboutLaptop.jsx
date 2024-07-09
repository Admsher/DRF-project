import LaptopImageLM from "../assets/images/AboutImages/about-laptop-LM.png";
import LaptopImageDM from "../assets/images/AboutImages/about-laptop-DM.png";
import { useDarkMode } from "../../../context/DarkModeContext";
export default function Aboutlaptop() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className='laptop'>
      <div className='wrapper laptop-content flex medium-large:flex-row flex-col justify-center medium-large:justify-between'>
        <div className='laptop-content__text md:text-left text-center py-5 medium-large:py-0 max-w-full md:max-w-[565px] self-center'>
          <h3
            className={`md:text-[32px] text-[22px] font-bold mb-6 leading-10 ${
              isDarkMode ? "text-dark-mode-mint" : "text-second-blue"
            }`}
          >
            Revolutionizing Recruitment
          </h3>
          <h4
            className={`md:text-[26px] leading-6 text-left text-[18px] ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Bias Zero uses AI avatars to eliminate bias and streamline hiring.
            Our platform focuses on skills, ensuring fair recruitment and
            diverse teams. Committed to fairness and efficiency, we continually
            improve to meet workforce demands and promote equal opportunities.
          </h4>
        </div>
        <div className='laptop-content__image flex self-center'>
          <img
            className='block max-w-full max-h-full'
            src={isDarkMode ? LaptopImageDM : LaptopImageLM}
            alt='laptop-interview'
          />
        </div>
      </div>
    </div>
  );
}
