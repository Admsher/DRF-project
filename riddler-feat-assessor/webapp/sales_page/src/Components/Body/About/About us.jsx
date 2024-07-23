import React from "react";
import missionImg from "../assets/Mission.png";
import visionImg from "../assets/Vision.png";
import { useDarkMode } from "../../../context/DarkModeContext";
export default function About() {
  const { isDarkMode } = useDarkMode();
  const backgroundDarkMode = isDarkMode
    ? "bg-dark-mode-navy text-white duration-500"
    : "bg-blue-300";
  const textDarkMode = isDarkMode ? "text-white" : "text-black";
  return (
    <div
      id='aboutUs'
      className={`flex flex-col py-10 items-center justify-center text-center ${backgroundDarkMode}`}
    >
      <div className='wrapper-l flex flex-col gap-y-4'>
        <h1 className={`text-4xl mb-12 font-bold ${textDarkMode}`}>About Us</h1>
        <div
          className={`flex flex-col mx-auto md:p-8 ultra-small:p-0 rounded-xl shadow-md gap-y-4 ${textDarkMode} ${
            isDarkMode ? "bg-dark-mode-gray" : "bg-white"
          }`}
        >
          <p className='text-lg leading-7 text-left'>
            Bias Zero is at the forefront of transforming the hiring landscape
            with innovative technology designed to eliminate bias and streamline
            the recruitment process. Our platform utilizes a diverse range of
            sophisticated deep fake avatars to conduct interviews, significantly
            reducing the time, cost, and resources traditionally involved in
            hiring.
          </p>
          <p className='text-lg leading-7 text-left'>
            By harnessing the power of artificial intelligence and advanced
            machine learning algorithms, Bias Zero ensures that every candidate
            is evaluated based on their skills and qualifications rather than
            subjective human judgement. This pioneering approach not only
            promotes a fair and inclusive hiring process but also enables
            companies to build diverse and talented teams that drive innovation
            and success.
          </p>
          <p className='text-lg leading-7 text-left'>
            Founded on the principles of unbiasedness, efficiency, and
            technological excellence, Bias Zero is dedicated to reshaping the
            future of recruitment. Our commitment to continuous improvement and
            our focus on customer needs allow us to deliver unparalleled
            solutions that meet the evolving demands of the modern workforce.
            Join us in our mission to create a world where every candidate has
            an equal opportunity to succeed, and organizations can thrive with
            the best talent, free from bias.
          </p>
        </div>
        <div
          className={`md:p-4 ultra-small:p-0 ${
            isDarkMode ? "bg-dark-mode-gray" : "bg-gray-300"
          } rounded-xl shadow-md`}
        >
          <div className='flex flex-col lg:flex-row items-center mx-auto'>
            <img
              src={missionImg}
              className='md:max-w-[50%] ultra-small:max-w-full w-full h-auto rounded-md shadow-md transition-all duration-500 ease-in-out hover:scale-105 ultra-small:mb-8 md:mb-0'
              alt='mission'
            />
            <div className='w-full lg:w-1/2 px-4 lg:pl-16 text-left'>
              <h3
                className={`md:text-2xl ultra-small:text-3xl mb-4 font-bold md:text-left ultra-small:text-center ${textDarkMode}`}
              >
                Our Mission:
              </h3>
              <p className='text-lg leading-7 text-left'>
                At Bias Zero our mission is to ease the hiring process by
                leveraging technology to create a fair, efficient and unbiased
                recruitment experience. We aim to streamline the interview
                process through the use of advanced deep fake avatars, ensuring
                every candidate is evaluated on their true potential while
                significantly reducing the resources and time involved for
                organizations. Our commitment is to foster diversity,
                inclusivity, and innovation in the workforce by providing equal
                opportunities for all candidates, free from unconscious bias.
              </p>
            </div>
          </div>
        </div>
        <div
          className={`rounded-xl ${
            isDarkMode ? "bg-dark-mode-gray" : "bg-white"
          } shadow-md`}
        >
          <div className='flex flex-col lg:flex-row-reverse items-center mx-auto md:p-4 ultra-small:p-0'>
            <img
              className='block w-full md:max-w-[50%] ultra-small:max-w-full rounded-md transition-all duration-500 ease-in-out hover:scale-105 ultra-small:mb-8 md:mb-0'
              src={visionImg}
              alt='vision'
            />
            <div className='w-full lg:w-1/2 px-4 lg:pr-16 text-left'>
              <h3
                className={`md:text-2xl ultra-small:text-3xl mb-4 font-bold md:text-left ultra-small:text-center ${textDarkMode}`}
              >
                Our Vision:
              </h3>
              <p className='text-lg leading-7 text-left'>
                Our vision at Bias Zero is to become the global leader in
                technology-driven recruitment solutions, setting new standards
                for fairness and efficiency in hiring practices. We envision a
                future where our advanced AI avatars facilitate seamless,
                unbiased interviews across all industries, helping organizations
                build diverse and talented teams. By continually advancing our
                technology and expanding our reach, we strive to make a lasting
                impact on the world of recruitment, ensuring every individual
                has an equal opportunity to showcase their abilities and achieve
                their career aspirations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
