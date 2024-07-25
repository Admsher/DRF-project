import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cardlayout from "../components/cardlayout";
import Logo from "../components/logo";
import Button from "../components/button";
import Circles from "../components/circles";
import Heading from "../components/heading";
import axios from "axios";
import Cookies from 'js-cookie';
function Forgotpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the request
  
    
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/forgetpassword/otp/forgot-password/', // Your API endpoint
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(email)
     Cookies.set('userEmail', email, { expires: 1 });
      // If successful, navigate to OTP check page
      navigate("/otpcheck");
    } catch (error) {
      setError("Email not found or error occurred."); // Error message if the request fails
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="w-screen h-screen bg-dkblue overflow-hidden">
      <Logo />
      <Cardlayout>
        <Heading>Forgot Password</Heading>
        {/* Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="p-8 px-14 pb-2">
            <input
              type="email"
              placeholder="Enter Email"
              className="p-3 w-full text-black bg-white focus:outline-none rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="ml-14 text-black text-xs">
            <p>
              The instructions to reset your password will be sent to your
              email.
            </p>
          </div>
          <div className="h-2 w-full text-center p-3 pb-0">
            {error && <p className="text-red-600 font-bold">{error}</p>}
          </div>
          <div className="mt-11">
            <Button type={"submit"} disabled={loading}> {/* Disable button while loading */}
              {loading ? "Sending..." : "Submit"}
            </Button>
          </div>
        </form>
      </Cardlayout>
      <Circles />
    </div>
  );
}

export default Forgotpassword;
