import React, { useContext, useRef, useState } from "react";
import { CalendarContext } from "../../../context/CalendarContext";
import { format } from "date-fns";
import { useDarkMode } from "../../../context/DarkModeContext";
const ContactForm = () => {
  const { isDarkMode } = useDarkMode();
  const { currentDate } = useContext(CalendarContext);

  const [errors, setErros] = useState({ email: "", connected: "" });
  const emailRef = useRef();

  const validationForm = () => {
    const email = emailRef.current.value || "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErros((prevErrors) => ({
        ...prevErrors,
        email: "Please add an email",
      }));
    } else {
      setErros({ email: "", connected: "" });
    }
  };

  const inputDarkModeClass = isDarkMode
    ? "bg-[#0B2045] text-white"
    : "bg-main-grey";

  const buttonDarkModeClass = isDarkMode ? "bg-btn-blue" : "bg-main-blue";
  const borderClassDark = isDarkMode ? "" : "border-black";

  return (
    <div
      className={`flex flex-col border-2 border-solid ${borderClassDark} p-3 max-w-full lg:max-w-4xl max-lg:w-full`}
    >
      <div className={`p-2 border border-solid ${borderClassDark}`}>
        <h1 className="text-lg text-center leading-6 md:text-3xl">
          Select Your Time Slot
        </h1>
      </div>
      <div>
        <div className="flex flex-wrap gap-4 mb-8 mt-3">
          <div className="flex flex-col max-lg:w-full">
            <label htmlFor="">
              Email<span className="text-[#FF0000]">*</span>:
            </label>
            <input
              type="text"
              className={`border border-solid ${borderClassDark} ${inputDarkModeClass} max-lg:w-full`}
              ref={emailRef}
            />
            <p className="text-[#FF0000] text-sm">{errors.email}</p>
          </div>
          <div className="flex flex-col max-lg:w-full">
            <label htmlFor="">
              Selected Date<span className="text-[#FF0000]">*</span>:
            </label>
            <input
              type="text"
              className={`border border-solid ${borderClassDark} ${inputDarkModeClass} max-lg:w-full`}
              value={format(currentDate, "dd MMMM yyyy")}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap mb-8">
        <div className="flex flex-col max-lg:w-full">
          <label htmlFor="">
            Connect Through<span className="text-[#FF0000]">*</span>:
          </label>
          <input
            type="text"
            className={`border border-solid ${borderClassDark} ${inputDarkModeClass} max-lg:w-full`}
          />
        </div>
        <div className="flex flex-col max-lg:w-full">
          <label htmlFor="">
            Select Time<span className="text-[#FF0000]">*</span>:
          </label>
          <input
            type="text"
            className={`border border-solid ${borderClassDark} ${inputDarkModeClass} max-lg:w-full`}
            value={format(currentDate, "hh:mm a")}
          />
        </div>
      </div>
      <div className="flex justify-center m-2">
        <button
          onClick={validationForm}
          className={`rounded-full ${buttonDarkModeClass} text-white px-10 py-2 shadow-xl`}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
