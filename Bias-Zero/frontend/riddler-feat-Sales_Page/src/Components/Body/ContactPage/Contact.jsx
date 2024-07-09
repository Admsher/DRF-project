import React, { useState } from "react";

import Calendar from "./calendar";
import ContactForm from "./ContactForm";
import InvestorsCard from "./InvestorsCard";

import { useDarkMode } from "../../../context/DarkModeContext";
import LazyLoad from "react-lazyload";
import {
  clientData,
  investorsData,
  socialMediaData,
  socialMediaDataDark,
} from "./assets/data";
import ClientCard from "./ClientCard";

const Contact = () => {
  const [showMore, setShowMore] = useState(false);
  const { isDarkMode } = useDarkMode();

  const backgroundClass = isDarkMode ? "bg-dark-mode-navy text-white" : "";
  const imagesClassDarkMode = isDarkMode && "";
  const investorButtonClass = isDarkMode ? "" : "border-black";
  const bgClass = isDarkMode ? "bg-[#193b76]" : "bg-main-blue";

  const socialDarkModeIcons = isDarkMode
    ? socialMediaDataDark
    : socialMediaData;

  return (
    <section className={`${backgroundClass}`}>
      <div
        className={`max-w-screen-4xl flex flex-col gap-2 m-auto duration-500 py-4 xl:py-8 wrapper-l`}
        id="contact"
      >
        <h1 className="font-bold text-4xl">Know Us Better</h1>
        <p className="mb-2">Connect to let us know the best time to talk!</p>
        <div
          className={`flex lg:gap-20 gap-6 max-md:flex-col justify-center ${bgClass} max-md:px-2 max-md:py-4 px-8 py-10 rounded-xl shadow-xl`}
        >
          <div
            className={`max-lg:w-full lg:w-6/12 xl:w-2/5 flex flex-col gap-2 ${
              !isDarkMode ? "bg-white" : "bg-[#0B2045] text-white"
            } rounded-2xl shadow-md`}
          >
            <Calendar />
          </div>
          <ContactForm />
        </div>
        <div className="max-w-screen-4xl mx-auto mt-10 grid grid-cols-2 lg:grid-cols-3 max-sm:flex max-sm:flex-col">
          <div className="flex flex-col col-span-2">
            <h2 className="text-2xl font-bold mb-4">Social media</h2>
            <div className="flex flex-wrap gap-4">
              {socialDarkModeIcons.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center link-hover-underline cursor-pointer pb-1 gap-2 lg:mr-20"
                >
                  <i>
                    <LazyLoad>
                      <img src={item.icon} className={`w-4 h-4`} alt="" />
                    </LazyLoad>
                  </i>
                  <p className="text-md">{item.email}</p>
                </div>
              ))}
              {socialDarkModeIcons.slice(3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center link-hover-underline cursor-pointer pb-1 gap-2 lg:mr-20"
                >
                  <i>
                    <LazyLoad>
                      <img
                        src={item.icon}
                        className={`w-4 h-4 ${imagesClassDarkMode}`}
                        alt=""
                      />
                    </LazyLoad>
                  </i>
                  <p className="text-md">{item.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <h2 className="text-4xl font-bold mb-4">Investors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:mx-5">
          {investorsData.slice(0, 3).map((item) => {
            return <InvestorsCard key={item.id} />;
          })}
        </div>
        {showMore && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:mx-5">
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
        )} */}
        <div className="">
          <h1 className="text-3xl my-4 text-center">Our Clientele</h1>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {clientData.map((item) => (
              <ClientCard key={item.id} title={item.text} img={item.img} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
