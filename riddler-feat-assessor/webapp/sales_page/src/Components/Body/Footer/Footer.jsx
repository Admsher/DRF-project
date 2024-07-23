import React from "react";
import zlogo from "../assets/zlogo.png";
import BZLogoFooterLight from "../assets/images/header/bias-zero-logo-light.png";
import BZLogoFooterDark from "../assets/images/header/bias-zero-logo-dark.png";
import { useDarkMode } from "../../../context/DarkModeContext";
import LazyLoad from "react-lazyload";
export default function Footer() {
  const { isDarkMode } = useDarkMode();
  const lists = [
    {
      title: "About Us",
      items: [
        { label: "How it Works", link: "#features" },
        { label: "Team", link: "#contact" },
        { label: "Contact Us", link: "#contact" },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "Avatars", link: "#hero" },
        { label: "Options", link: "#pricing" },
        { label: "Questions", link: "#whyBiasZero" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Terms of Use", link: "#" },
        { label: "Privacy Policy", link: "#" },
      ],
    },
  ];
  const backgroundDarkMode = isDarkMode
    ? "bg-dark-mode-navy text-white duration-500"
    : "bg-blue-300";
  const textDarkModeClass = isDarkMode ? "text-white" : "text-gray-900";
  const textListDarkMode = isDarkMode ? "text-white" : "text-gray-700";
  const hoverDarkModeClass = isDarkMode
    ? "hover:text-slate-500"
    : "hover:text-black";
  return (
    <div className={` ${backgroundDarkMode}`}>
      <div className='wrapper wrapper--footer'>
        <div className='flex flex-col lg:flex-row'>
          <div className='py-10 lg:w-1/3'>
            <LazyLoad>
              <a href='#' className='block'>
                <img
                  src={isDarkMode ? BZLogoFooterDark : BZLogoFooterLight}
                  alt='bias-zero-logo'
                  className='block max-w-[300px] h-auto'
                />
              </a>
            </LazyLoad>
          </div>
          <div className='p-10 lg:w-2/3 grid md:grid-cols-4 gap-7'>
            {lists.map((list, index) => (
              <div
                key={index}
                className='bg-transparent p-4 rounded-lg flex flex-col items-center shadow-md'
              >
                <h2 className={`text-lg mb-3  font-bold ${textDarkModeClass}`}>
                  {list.title}
                </h2>
                <ul
                  className={`${textListDarkMode} font-medium text-base space-y-2`}
                >
                  {list.items.map((item, index) => (
                    <li key={index} className={`${hoverDarkModeClass}`}>
                      <a href={item.link}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <span className='flex flex-col items-center mb-4 lg:mb-0 '>
            <LazyLoad>
              <img
                src={zlogo}
                alt='Zummit Info Labs'
                className='rounded-xl shadow-md max-w-[200px]'
              />
            </LazyLoad>
            <span className={`font-bold mt-2 ${textListDarkMode}`}>
              A product by ZUMMIT INFOLABS
            </span>
          </span>
          <p
            className={`m-4 text-sm lg:text-base text-center ${textListDarkMode}`}
          >
            ©2025 BiasZero Ltd. All rights reserved. BiasZero ® is a registered
            trademark in India.
          </p>
        </div>
      </div>
    </div>
  );
}
