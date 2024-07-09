import React, { useState } from "react";
import DashboardImageMain from "../assets/images/HeroImages/Generate questions_HS_LM.jpg";
import DashboardImageMainDM from "../assets/images/HeroImages/Generate questions_HS_DM.jpg";
import DashboardImageLM from "../assets/images/HeroImages/Dashboard_HS_og.jpg";
import DashboardImageDM from "../assets/images/HeroImages/Dashboard_HS_DM.jpg";
import WhiteManImage from "../assets/images/HeroImages/man-suit-white-modified.jpg";
import AsianWomanImage from "../assets/images/HeroImages/woman-suit-asian-modified.jpg";
import LatinoManImage from "../assets/images/HeroImages/man-suit-latino-modified.jpg";
import BlackWomanImage from "../assets/images/HeroImages/woman-suit-black-modified.jpg";
import IndianManImage from "../assets/images/HeroImages/man-suit-indian-modified.jpg";
import HeroLinesLM from "../assets/images/HeroImages/hero-lines-LM.png";
import HeroLinesDM from "../assets/images/HeroImages/hero-lines-DM.png";
import { useDarkMode } from "./../../../context/DarkModeContext";
export default function Hero() {
  const { isDarkMode } = useDarkMode();
  const [isAvatarSelected, setIsAvatarSelected] = useState(false);
  const toggleSelectedAvatar = (id) => {
    setIsAvatarSelected(id);
  };
  const avatarImages = [
    { id: 0, src: LatinoManImage, alt: "latino-man-older" },
    { id: 1, src: AsianWomanImage, alt: "asian-woman" },
    { id: 2, src: WhiteManImage, alt: "white-man" },
    { id: 3, src: BlackWomanImage, alt: "black-woman" },
    { id: 4, src: IndianManImage, alt: "indian-man" },
  ];
  return (
    <section
      className={`hero-container relative min-h-dvh pt-14 pb-24 flex md:flex-row ultra-small:flex-col-reverse ${
        isDarkMode ? "bg-dark-mode-navy text-white" : "bg-off-white"
      }`}
    >
      <div className='wrapper-l'>
        <div className='hero-content md:gap-x-36 ultra-small:gap-x-0 flex md:flex-row ultra-small:flex-col-reverse'>
          <div className='hero-dashboard h-full flex gap-y-12 flex-col ga max-w-custom-max-width text-center md:pt-24 ultra-small:pt-6'>
            <div className='dashboard-content w-full flex justify-center'>
              <div className='relative z-20 animate-dashSlideIn'>
                <img
                  src={isDarkMode ? DashboardImageMainDM : DashboardImageMain}
                  alt='dashboard'
                  className='cursor pointer dashboard-img block md:max-w-[429px] ultra-small:max-w-full h-auto'
                />
              </div>
            </div>
            <div className='dahboard-text animate-fadeIn flex flex-col gap-y-8 relative z-20'>
              <p
                className={`heading text-3xl font-bold text-center max-w-full md:max-w-[533px] ${
                  isDarkMode ? "text-white" : "text-gray-600"
                }`}
              >
                Experience the future of hiring today.
              </p>
              <p className='text-2xl leading-7 text-midnightblue text-center max-w-full md:max-w-[533px]'>
                Revolutionizes hiring with AI delivering unbiased interviews,
                saving time and ensuring a fair, efficient recruitment process.
              </p>
              <a
                href='/'
                target='_blank'
                rel='noopener'
                className={`block w-max mx-auto try-demo-btn ${
                  isDarkMode ? "bg-dark-mode-mint" : "bg-btn-blue"
                } text-white z-20 py-2 px-12 border rounded-3xl font-bold text-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#051229]`}
              >
                Try Demo
              </a>
            </div>
          </div>
          <div className='hero-bubble content-start relative small-large:block hidden md:p-6 p-0'>
            <div className='avatars mt-[40%] z-20 absolute w-full flex flex-wrap gap-4 md:justify-center medium-large:justify-normal'>
              {avatarImages.map(({ src, alt, id }) => (
                <img
                  src={src}
                  alt={alt}
                  key={id}
                  onClick={() => toggleSelectedAvatar(id)}
                  className={`${
                    isAvatarSelected === id ? "mt-[80px]" : ""
                  } max-w-28 border-2 border-solid cursor-pointer hover:scale-[1.3] transition-all duration-300 ease-in-out hover:border-dark-mode-mint ${
                    isDarkMode ? "border-dark-mode-blue" : "border-off-white"
                  } rounded-full shadow-smokey`}
                />
              ))}
            </div>
            <img
              src={isDarkMode ? DashboardImageDM : DashboardImageLM}
              alt='dashboard-sm'
              className='relative md:block w-full h-auto max-w-[540px]'
            />
          </div>
          <div className='hero-lines__container absolute bottom-[10%] left-0 w-full h-auto'>
            <img
              className='hero-lines w-full h-auto'
              alt='hero-lines'
              src={isDarkMode ? HeroLinesDM : HeroLinesLM}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
