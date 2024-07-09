import React, { useContext, useRef, useState } from "react";
import { CalendarContext } from "../../../context/CalendarContext";
import { format } from "date-fns";
import { useDarkMode } from "../../../context/DarkModeContext";
import TimeDropdown from "./TimeDropDown";
import axios from "axios";

const ContactForm = () => {
  const { isDarkMode } = useDarkMode();
  const { currentDate } = useContext(CalendarContext);

  const [errors, setErrors] = useState({
    email: "",
    selectTime: "",
    mobile: "",
  });

  const [selectTime, setSelectTime] = useState("");
  const emailRef = useRef();
  const mobileRef = useRef();

  const validationForm = () => {
    const email = emailRef.current.value || "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const IndNum = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/;

    let isValid = true;

    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please add a valid email",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }

    if (!IndNum.test(mobileRef.current.value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobile: "Please add a correct mobile",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobile: "",
      }));
    }

    if (selectTime === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        selectTime: "Please select time",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, selectTime: "" }));
    }

    if (isValid) {
      submitForm();
    }
  };

  const submitForm = () => {
    const formData = {
      email: emailRef.current.value,
      mobile: mobileRef.current.value,
      select_time: selectTime,
      selected_day: format(currentDate, "yyyy-MM-dd"),
    };

    axios.post('http://127.0.0.1:8000/home/contact/', formData)
      .then(response => {
        console.log(response.data);
        // Handle successful submission
      })
      .catch(error => {
        console.error(error);
        // Handle submission error
      });
  };

  const handleTimeChange = (time) => {
    setSelectTime(time);
  };

  const inputDarkModeClass = isDarkMode
    ? "bg-[#0B2045] text-white placeholder:text-white"
    : "";

  const buttonDarkModeClass = isDarkMode ? "bg-btn-blue" : "bg-main-blue";
  const textClassDark = isDarkMode ? "text-black" : "";

  return (
    <div
      className={`flex flex-col p-3 xl:px-8 max-w-full max-lg:w-full ${
        !isDarkMode ? "bg-white" : "bg-[#0B2045] text-white"
      } ${textClassDark} rounded-2xl shadow-md w-2/5`}
    >
      <div className={`p-2`}>
        <h1 className='text-lg text-center leading-6 md:text-3xl'>
          Select Your Time Slot
        </h1>
      </div>
      <div>
        <div className='flex max-md:flex-col gap-4 mt-3 text-xl'>
          <div className='flex flex-col max-lg:w-full w-full'>
            <label htmlFor='' className='font-semibold text-xl'>
              Selected Day<span className='text-[#FF0000]'>*</span>:
            </label>
            <input
              type='text'
              className={`border border-solid lg:w-full max-lg:w-full px-2 py-1 rounded-lg ${inputDarkModeClass}`}
              placeholder='DD/MM/YYYY'
              value={format(currentDate, "dd MMMM yyyy")}
              readOnly
            />
          </div>
          <div className='flex flex-col max-lg:w-full w-full'>
            <label htmlFor='' className='font-semibold'>
              Select Time<span className='text-[#FF0000]'>*</span>:
            </label>
            <TimeDropdown onChange={handleTimeChange} />
            <div className='min-h-[15px]'>
              <p className='text-[#FF0000] text-sm max-h-[15px] overflow-hidden text-ellipsis whitespace-nowrap'>
                {errors.selectTime}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-4 flex-wrap flex-col text-xl'>
        <div className='flex flex-col max-lg:w-full'>
          <label htmlFor='' className='font-semibold'>
            Email<span className='text-[#FF0000]'>*</span>:
          </label>
          <input
            type='text'
            className={`border border-solid rounded-lg ${inputDarkModeClass} px-2 py-1 max-lg:w-full`}
            placeholder='example.com@gmail.com'
            ref={emailRef}
          />
          <div className='min-h-[15px]'>
            <p className='text-[#FF0000] text-sm max-h-[15px] overflow-hidden text-ellipsis whitespace-nowrap'>
              {errors.email}
            </p>
          </div>
        </div>
        <div className='flex flex-col max-lg:w-full'>
          <label htmlFor='' className='font-semibold'>
            Mobile<span className='text-[#FF0000]'>*</span>:
          </label>
          <input
            type='number'
            className={`border border-solid rounded-lg ${inputDarkModeClass} px-2 py-1 max-lg:w-full`}
            placeholder='+91 1234567890'
            ref={mobileRef}
          />
          <div className='min-h-[15px]'>
            <p className='text-[#FF0000] text-sm max-h-[15px] overflow-hidden text-ellipsis whitespace-nowrap'>
              {errors.mobile}
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-center m-2'>
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
