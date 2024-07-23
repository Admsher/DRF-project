import React, { useState } from "react";

import logo from "../assets/follow.png";
import Calendar from "./calendar";
import ContactForm from "./ContactForm";
import InvestorsCard from "./InvestorsCard";
import fb from "../assets/image 38.png";
import mail from "../assets/image 42.png";
import twiiter from "../assets/image 40.png";
import instagram from "../assets/image 39.png";
import emoji from "../assets/image 41.png";
import { useDarkMode } from "../../../context/DarkModeContext";
import LazyLoad from "react-lazyload";

const socialMediaData = [
  {
    icon: mail,
    email: "Zummitinfolabs@gmail.com",
    id: 1,
  },
  {
    icon: fb,
    email: "Zummitinfolabs@gmail.com",
    id: 2,
  },
  {
    icon: emoji,
    email: "Zummitinfolabs@gmail.com",
    id: 3,
  },
  {
    icon: instagram,
    email: "Zummitinfolabs@gmail.com",
    id: 4,
  },
  {
    icon: twiiter,
    email: "Zummitinfolabs@gmail.com",
    id: 5,
  },
];

const investorsData = [
  {
    id: 1,
    img: "",
    text: "",
  },
  {
    id: 2,
    img: "",
    text: "",
  },
  {
    id: 3,
    img: "",
    text: "",
  },
  {
    id: 4,
    img: "",
    text: "",
  },
  {
    id: 5,
    img: "",
    text: "",
  },
  {
    id: 5,
    img: "",
    text: "",
  },
];

const Contact = () => {
  const [showMore, setShowMore] = useState(false);
  const { isDarkMode } = useDarkMode();

  const backgroundClass = isDarkMode ? "bg-dark-mode-navy text-white" : "";
  const imagesClassDarkMode = isDarkMode && "invert";
  const investorButtonClass = isDarkMode ? "" : "border-black";

  return (
    <div
      className={`max-w-screen-4xl flex flex-col gap-2 m-auto duration-500 py-4 px-4 xl:py-8 xl:px-16 ${backgroundClass}`}
      id="contact"
    >
      <h1 className="font-bold text-4xl">Meet Us</h1>
      <p>Connect with us with just a click</p>
      <div className="flex gap-4 flex-wrap">
        <div className="max-lg:w-full lg:w-6/12 xl:w-7/12 flex flex-col gap-2">
          <Calendar />
        </div>
        <ContactForm />
      </div>
      <div className="max-w-screen-4xl mx-auto mt-10 grid grid-cols-2 lg:grid-cols-3 max-sm:flex max-sm:flex-col">
        <div className="flex flex-col col-span-2">
          <h2 className="text-2xl font-bold mb-4">Social media</h2>
          <div className="flex flex-wrap gap-4">
            {socialMediaData.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-2 lg:mr-20">
                <i>
                  <LazyLoad>
                    <img
                      src={item.icon}
                      className={`w-4 h-4 ${imagesClassDarkMode}`}
                      alt=""
                    />
                  </LazyLoad>
                </i>
                <p className="text-md underline">{item.email}</p>
              </div>
            ))}
            {socialMediaData.slice(3).map((item) => (
              <div key={item.id} className="flex items-center gap-2 lg:mr-20">
                <i>
                  <LazyLoad>
                    <img
                      src={item.icon}
                      className={`w-4 h-4 ${imagesClassDarkMode}`}
                      alt=""
                    />
                  </LazyLoad>
                </i>
                <p className="text-md underline">{item.email}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex col-span-1 max-md:justify-center">
          <LazyLoad>
            <img
              src={logo}
              className="w-56 h-auto max-w-sm max-sm:w-48"
              alt=""
            />
          </LazyLoad>
        </div>
      </div>
      <h2 className="text-4xl font-bold mb-4">Investors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-5">
        {investorsData.slice(0, 3).map((item) => {
          return <InvestorsCard key={item.id} />;
        })}
      </div>
      {showMore && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-5">
          {investorsData.slice(3).map((item) => {
            return <InvestorsCard key={item.id} />;
          })}
        </div>
      )}
      {!showMore ? (
        <div className="flex justify-center">
          <button
            className={`border-2 ${investorButtonClass} border-solid rounded-3xl px-14 py-1 font-bold`}
            onClick={() => setShowMore(!showMore)}
          >
            See More
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            className={`border-2 ${investorButtonClass} border-solid rounded-3xl px-14 py-1 font-bold`}
            onClick={() => setShowMore(!showMore)}
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;
