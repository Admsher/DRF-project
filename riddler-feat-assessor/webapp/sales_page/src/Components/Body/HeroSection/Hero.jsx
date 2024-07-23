import React, { useEffect, useState } from "react";
import OrangeBlobTop from "../assets/images/mini-blob-orange-top.png";
import OrangeBlobBot from "../assets/images/mini-blob-orange-bot.png";
import CompleteDashBoardImage from "../assets/images/dashboard-image.png";
import DashboardImage from "../assets/images/dashboard-component-images/background.png";
import DashbordRectangle from "../assets/images/dashboard-component-images/big_purple_square.png";
import DashboardSidebarImage from "../assets/images/dashboard-component-images/sidebar.png";
import DashboardSquareA from "../assets/images/dashboard-component-images/square_a.png";
import DashboardSquareB from "../assets/images/dashboard-component-images/square_a.png";
import DashboardSquareC from "../assets/images/dashboard-component-images/square_a.png";
import DashboardSquareD from "../assets/images/dashboard-component-images/square_a.png";
import DashboardImageSM from "../assets/images/dashboard-image-sm.png";
import WhiteManImage from "../assets/images/man-suit-white-modified.png";
import BlackWomanImage from "../assets/images/woman-suit-black-modified.png";
import IndianManImage from "../assets/images/man-suit-indian-modified.png";
import AsianWomanImage from "../assets/images/woman-suit-asian-modified.png";
import WhiteHappyMan from "../assets/images/man-cheering-happy-modified.png";
import axios from "axios";
import { useDarkMode } from "./../../../context/DarkModeContext";
export default function Hero() {
  const [image, setImage] = useState(null);
  const { isDarkMode } = useDarkMode();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
  const avatarImages = [
    { id: 0, src: WhiteManImage, alt: "white-man" },
    { id: 1, src: AsianWomanImage, alt: "asian-woman" },
    { id: 2, src: IndianManImage, alt: "indian-man" },
    { id: 3, src: BlackWomanImage, alt: "black-woman" },
  ];
  const germanyAvatar = [
    { id: 0, src: WhiteManImage, alt: "white-man" },
    { id: 1, src: WhiteManImage, alt: "white-man" },
    { id: 2, src: WhiteManImage, alt: "white-man" },
    { id: 3, src: WhiteManImage, alt: "white-man" },
  ];
  const dashboardSquareImages = [
    { id: 0, src: DashboardSquareA, alt: "dashborad-square-1" },
    { id: 1, src: DashboardSquareB, alt: "dashborad-square-2" },
    { id: 2, src: DashboardSquareC, alt: "dashborad-square-3" },
    { id: 3, src: DashboardSquareD, alt: "dashborad-square-4" },
  ];
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const fetchLocation = async () => {
      if (window.innerWidth < 1024) return;
      try {
        const response = await axios.get(
          "https://ipinfo.io/json?token=56fa59146b2335"
        );
        const data = response.data;
        if (data.country === "DE") {
          setImage(germanyAvatar);
        } else {
          setImage(avatarImages);
        }
      } catch (error) {
        console.error(error);
        setImage(avatarImages);
      }
    };

    fetchLocation();
  }, []);
  return (
    <section
      className={`hero-container pt-14 pb-16 flex md:flex-row ultra-small:flex-col-reverse ${
        isDarkMode
          ? "bg-dark-mode-navy text-white"
          : "bg-gradient-to-r from-blue-500 to-white"
      }`}
    >
      <div className='wrapper'>
        <div className='hero-content md:gap-x-36 ultra-small:gap-x-0 flex md:flex-row ultra-small:flex-col-reverse pt-4 pb-8'>
          <div className='hero-dashboard max-w-custom-max-width text-center md:pt-48 ultra-small:pt-6'>
            <div className='dashboard-content w-full'>
              <img
                className='block ml-auto pb-2'
                src={OrangeBlobTop}
                alt='orange-blow-top'
              />
              <div className='relative animate-dashSlideIn'>
                <img
                  src={isLargeScreen ? DashboardImage : CompleteDashBoardImage}
                  alt='dashboard'
                  className='cursor pointer dashboard-img block md:max-w-[429px] ultra-small:max-w-full h-auto'
                />
                <div className='absolute hidden md:flex z-10 medium-large:pr-8 gap-x-2 top-[13%] left-2/4 -translate-x-2/4 animate-dashboardSlideDown'>
                  {dashboardSquareImages.map(({ src, id, alt }) => (
                    <img
                      className='hidden md:block max-w-[80px] cursor-pointer h-auto hover:scale-[1.8] transition-all ease-in-out duration-400'
                      src={src}
                      key={id}
                      alt={alt}
                    />
                  ))}
                </div>
                <div className='absolute hidden md:block top-[38%] left-2/4 -translate-x-2/4 medium-large:pr-5 pr-0 z-20'>
                  <img
                    className='max-w-[340px] cursor-pointer h-auto hover:scale-[1.2] transition-all ease-in-out duration-400'
                    src={DashbordRectangle}
                    alt='dashboard-rectangle'
                  />
                </div>
                <div className='absolute hidden md:block top-2/4 -translate-y-2/4 pl-[2px]'>
                  <img
                    className='max-w-[20px] cursor-pointer h-auto hover:scale-[1.8] transition-all ease-in-out duration-400'
                    src={DashboardSidebarImage}
                    alt='dashboard-sidebar'
                  />
                </div>
              </div>
              <img
                className='block pt-2'
                src={OrangeBlobBot}
                alt='orange-blow-bottom'
              />
            </div>
            <div className='dahboard-text flex flex-col gap-y-6'>
              <p className='text-lg font-bold text-midnightblue text-center max-w-custom-max-width'>
                Revolutionizes hiring with AI delivering unbiased interviews,
                saving time and ensuring a fair, efficient recruitment process.
              </p>
              <p
                className={`heading text-lg font-bold text-center ${
                  isDarkMode ? "text-white" : "text-gray-600"
                }`}
              >
                Experience the future of hiring today.
              </p>
              <a
                href='/'
                target='_blank'
                rel='noopener'
                className='block w-max mx-auto try-demo-btn bg-btn-blue text-white py-2 px-8 border border-blue-400 rounded-2xl font-bold text-lg cursor-pointer transition-all ease-in-out duration-400 hover:scale-105'
              >
                Try Demo
              </a>
            </div>
          </div>
          <div className='hero-bubble content-center relative small-large:block hidden p-6'>
            <div className='curved-avatars flex flex-wrap gap-8 animate-imgSlideIn md:justify-center medium-large:justify-normal'>
              {image?.map(({ src, alt, id }) => (
                <img
                  src={src}
                  alt={alt}
                  key={id}
                  className='max-w-24 border-2 border-solid border-white rounded-full cursor-pointer shadow-smokey transition-all ease-in-out duration-400 hover:scale-[1.2]'
                />
              ))}
            </div>
            <img
              src={DashboardImageSM}
              alt='dashboard-sm'
              className='md:block w-full h-auto max-w-[340px] mx-auto mt-8'
            />
            <img
              src={WhiteHappyMan}
              alt='happy-man'
              className='w-full h-auto absolute -bottom-6 -left-6 right-0 max-w-[380px]'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
