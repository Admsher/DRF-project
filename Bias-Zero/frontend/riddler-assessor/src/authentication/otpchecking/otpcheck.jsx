import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cardlayout from "../components/cardlayout";
import Logo from "../components/logo";
import Circles from "../components/circles";
import Heading from "../components/heading";
import Button from "../components/button";
import axios from "axios";
import Cookies from 'js-cookie';

function Otpcheck() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [OTP, setOTP] = useState(""); // This should be managed by the server in a real-world app
  const inputRefs = useRef([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateOtp();
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  function generateOtp() {
    // This is a placeholder; ideally, the OTP should be fetched from the server
    const randomotp = Math.floor(100000 + Math.random() * 900000);
    setOTP(randomotp.toString());
    console.log("OTP: " + randomotp);
  }

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const fields = otp.map((value, index) => {
    return (
      <input
        key={index}
        type="text"
        ref={(input) => (inputRefs.current[index] = input)}
        value={value}
        onChange={(e) => handleChange(index, e)}
        onClick={() => handleClick(index)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        className="text-xl text-center font-bold h-10 w-12 my-2 flex items-center justify-center rounded-md px-4 text-white bg-[#487CE2] focus:outline-none"
      />
    );
  });

  const resendOtp = async () => {
    const userEmail = Cookies.get('userEmail');
   
    try {
      setLoading(true);
      await axios.post(
        'http://127.0.0.1:8000/forgetpassword/otp/forgot-password/', // Your resend OTP endpoint
        { email: userEmail }, // Provide the email if needed
        { headers: { 'Content-Type': 'application/json' } }
      );
      setOtp(new Array(6).fill(""));
      generateOtp();
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    const email = Cookies.get('userEmail');
    console.log(email)
    e.preventDefault();
    const c = otp.join("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/forgetpassword/otp/verify-otp/', // Your verify OTP endpoint
        { email: email, otp: c },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        navigate("/resetpassword");
      }
    } catch (error) {
      setError("Invalid OTP or OTP has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-dkblue overflow-hidden">
      <Logo />
      <Cardlayout>
        <Heading>Forgot Password</Heading>
        <div className="ml-14 text-white font-semibold text-xs">
          <p>Enter the OTP that has been sent to your email.</p>
        </div>
        {/* OTP Form */}
        <form onSubmit={handleSubmit}>
          {/* OTP input */}
          <div className="m-5 mb-1 mx-14">
            <div className="w-full rounded-md bg-[#E8EFFF] flex items-center justify-center space-x-2 h-14">
              {fields}
            </div>
          </div>
          <div className="w-full text-center">
            <button
              type="button"
              onClick={resendOtp}
              className="text-xs hover:underline cursor-pointer"
              disabled={loading}
            >
              {loading ? "Resending..." : "Resend OTP?"}
            </button>
          </div>
          <div className="h-2 w-full text-center">
            {error && (
              <p className="text-red-600 font-bold">{error}</p>
            )}
          </div>
          <div className="mt-12">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Cardlayout>
      <Circles />
    </div>
  );
}

export default Otpcheck;
