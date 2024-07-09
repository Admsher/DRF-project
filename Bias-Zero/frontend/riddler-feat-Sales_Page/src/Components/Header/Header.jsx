import { useRef, useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import dark from "../Body/assets/images/header/dark.png";
import light from "../Body/assets/images/header/light.png";
import BZLogoLight from "../Body/assets/images/header/bias-zero-logo-light.png";
import BZLogoDark from "../Body/assets/images/header/bias-zero-logo-dark.png";
import { Link } from "react-router-dom";
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
  const handleLinkClick = (id) => {
    if (scrollToSection) {
      scrollToSection(id);
    } else {
      console.log("Scroll to section is not defined!");
    }
    setShowMenu(false);
  };
  const backgroundClass = isDarkMode
    ? "bg-dark-mode-navy text-white"
    : "bg-off-white";
  const textDarkModeClass = isDarkMode
    ? "text-white hover:text-slate-400"
    : "text-indigo-900";
  // const loginDarkModeClass = isDarkMode
  //   ? "bg-btn-blue text-white px-10"
  //   : "bg-off-white text-black px-4";
  return (
    <header>
      <nav
        className={`fixed shadow-md top-0 l-0 w-full navbar-container duration-500 py-4 z-50 ${backgroundClass}`}
      >
        <div className='wrapper'>
          <div className='navigation-content flex justify-between'>
            <div className='logo flex items-center'>
              <Link
                to='/'
                className={`block text-2xl ${textDarkModeClass} transition duration-500`}
              >
                <img
                  className='block md:max-w-[240px] ultra-small:max-w-[180px] h-auto'
                  src={isDarkMode ? BZLogoDark : BZLogoLight}
                  alt='logo'
                />
              </Link>
            </div>
            <ul
              className={`links lg:flex items-center lg:justify-center gap-x-8 sm:hidden text-center self-center max-md:hidden ${
                showMenu ? "hidden lg:block" : "flex"
              }`}
            >
              {headerData.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`${textDarkModeClass} animate-fadeIn font-bold text-lg link-hover-underline`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className='button-container flex items-center gap-x-4'>
              <div className='flex max-w-8 cursor-pointer'>
                {isDarkMode ? (
                  <i>
                    <img
                      onClick={toggleDarkMode}
                      src={dark}
                      alt='color-scheme-switch'
                      className='invert'
                    />
                  </i>
                ) : (
                  <i>
                    <img onClick={toggleDarkMode} src={light} alt='' />
                  </i>
                )}
              </div>
              {/* <a
                href='#'
                className={`login-btn border border-solid rounded-3xl px-[28px] py-[6px] ${
                  isDarkMode ? "border-transparent" : "border-black"
                } md:block ultra-small:hidden ${loginDarkModeClass} font-bold transition-all duration-300 ease-in-out hover:bg-[#051229] hover:text-white`}
              >
                Login
              </a> */}
              <button
                type='button'
                id='toggle-menu'
                onClick={toggleMenu}
                className={`burger-menu lg:hidden cursor-pointer flex flex-col justify-around w-6 h-6`}
              >
                <span
                  className={`block w-full h-0.5 bg-black dark:bg-white transform transition-transform duration-300 ease-in-out ${
                    showMenu ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block w-full h-0.5  bg-black dark:bg-white transition-opacity duration-300 ease-in-out ${
                    showMenu ? "opacity-0 -mr-40" : "-mr-0"
                  }`}
                ></span>
                <span
                  className={`block w-full h-0.5 bg-black dark:bg-white transform transition-transform duration-300 ease-in-out ${
                    showMenu ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </button>
            </div>
            {showMenu && (
              <div
                ref={menuRef}
                className='navbar-menu-container absolute z-50 top-[64px] left-1/2 transform -translate-x-1/2 bg-blue-900 bg-opacity-80 backdrop-blur-lg text-white cursor-pointer w-full h-screen'
              >
                <ul className='mt-28 links flex flex-col items-center text-2xl h-full gap-y-4'>
                  {headerData.map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => handleLinkClick(link.id)}
                        className='block text-3xl link-hover-underline'
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
