import React, { useEffect, useRef, useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import dark from "../Body/assets/dark.png";
import light from "../Body/assets/light.png";
import BZLogoLight from "../Body/assets/images/header/bias-zero-logo-light.png";
import BZLogoDark from "../Body/assets/images/header/bias-zero-logo-dark.png";
import Search from "./Search";

const headerData = [
  { name: "Features", id: "features" },
  { name: "About us", id: "aboutUs" },
  { name: "Pricing", id: "pricing" },
  { name: "Why Bias Zero", id: "whyBiasZero" },
  { name: "Contact us", id: "contact" },
];

export default function Header({ scrollToSection }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target.id !== "toggle-menu"
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (showMenu) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  const backgroundClass = isDarkMode
    ? "bg-dark-mode-navy text-white"
    : "bg-white";
  const textDarkModeClass = isDarkMode
    ? "text-white hover:text-slate-400"
    : "text-indigo-900";
  const loginDarkModeClass = isDarkMode
    ? "bg-btn-blue text-white px-10"
    : "bg-white text-black px-4";

  return (
    <header>
      <nav
        className={`fixed shadow-md top-0 l-0 w-full navbar-container duration-500 py-4 z-50 ${backgroundClass}`}
      >
        <div className='wrapper'>
          <div className='navigation-content flex justify-between'>
            <div className='logo flex items-center'>
              <a
                href='/'
                className={`block text-2xl ${textDarkModeClass} transition duration-500`}
              >
                <img
                  className='block md:max-w-[240px] ultra-small:max-w-[180px] h-auto'
                  src={isDarkMode ? BZLogoDark : BZLogoLight}
                  alt='logo'
                />
              </a>
            </div>
            <ul
              className={`links lg:flex items-center space-x-4 lg:space-x-8 sm:hidden max-md:hidden ${
                showMenu ? "hidden lg:block" : "flex"
              }`}
            >
              {headerData.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`${textDarkModeClass} hover:font-bold hover:underline transition duration-200`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>

            <div className='button-container flex items-center space-x-4'>
              <div className='flex max-w-8 cursor-pointer'>
                {isDarkMode ? (
                  <i>
                    <img
                      onClick={toggleDarkMode}
                      src={dark}
                      alt=''
                      className='invert'
                    />
                  </i>
                ) : (
                  <i>
                    <img onClick={toggleDarkMode} src={light} alt='' />
                  </i>
                )}
              </div>
              <a
                href='#'
                className={`login-btn border px-[28px] py-[6px] border-black border-solid rounded-3xl md:block ultra-small:hidden ${loginDarkModeClass} font-bold hover:scale-105 transition duration-300`}
              >
                Login
              </a>
              <Search
                headerData={headerData}
                scrollToSection={scrollToSection}
              />
              <div
                id='toggle-btn'
                onClick={toggleMenu}
                className='lg:hidden cursor-pointer'
              >
                {showMenu ? (
                  <i className='fas fa-times text-3xl' id='toggle-menu'></i>
                ) : (
                  <i className='fas fa-bars text-3xl'></i>
                )}
              </div>
            </div>
            {showMenu && (
              <div
                ref={menuRef}
                className='navbar-menu-container absolute z-50 top-[68px] left-1/2 transform -translate-x-1/2 bg-blue-900 bg-opacity-80 backdrop-blur-lg text-white cursor-pointer w-full h-screen'
              >
                <ul className='links flex flex-col p-4 items-center justify-center text-2xl h-full'>
                  {headerData.map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => {
                          scrollToSection(link.id);
                          setShowMenu(!showMenu);
                        }}
                        className='block py-2 px-4 text-white hover:text-indigo-900 hover:font-bold hover:underline transition duration-200'
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
