import AboutResumeLM from "../assets/images/AboutImages/about-resume-LM.png";
import AboutResumeDM from "../assets/images/AboutImages/about-resume-DM.png";
import { useDarkMode } from "./../../../context/DarkModeContext";
export default function AboutResume() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className='wrapper resume-content flex medium-large:flex-row-reverse flex-col justify-center medium-large:justify-between'>
      <div className='resume-content__text text-left leading-8 py-5 medium-large:py-0 max-w-full md:max-w-[565px] self-center'>
        <h3
          className={`md:text-[34px] text-[22px] font-bold mb-6 leading-10 ${
            isDarkMode ? "text-dark-mode-mint" : "text-second-blue"
          }`}
        >
          Why Bias-Zero is Unique
        </h3>
        <ul
          className={`md:text-[28px] flex flex-col gap-y-4 list-disc text-[18px] md:leading-8 ultra-small:leading-6 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          <li>
            Unbiased Evaluations - Eliminates human biases for fair, consistent
            assessments, promoting diversity and inclusion.
          </li>
          <li>
            Comprehensive Insights - Uses multiple tools for detailed
            evaluations and real-time feedback, enhancing efficiency.
          </li>
          <li>
            Efficient and Scalable - Automates initial interviews, saving time
            and handling high volumes, ideal for large-scale recruitment.
          </li>
        </ul>
      </div>
      <div className='resume-content__image flex self-center'>
        <img
          className='block max-w-full max-h-full'
          src={isDarkMode ? AboutResumeDM : AboutResumeLM}
          alt='resume-interview'
        />
      </div>
    </div>
  );
}
