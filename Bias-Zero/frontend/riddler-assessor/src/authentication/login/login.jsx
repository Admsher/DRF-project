import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../../store/profileSlice";
import Logo from "../components/logo";
import Cardlayout from "../components/cardlayout";
import Heading from "../components/heading";
import Button from "../components/button";
import eyeopen from "../components/eyeopen.png";
import eyeclose from "../components/eyeclose.png";
import toast from "react-hot-toast";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  function handleUser(e) {
    setUserName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleVisibility(e) {
    setVisible(!visible);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/login/',
        {
          email: username,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Assuming the token is returned in response.data.token
      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Redirect to home or another page
      navigate('/home');
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials. Try Again!!!");
    }
  };


  return (
    <div className="h-screen w-screen bg-dkblue overflow-hidden">
      <Logo />
      <Cardlayout>
        <Heading>Sign in</Heading>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-5 pt-2 pb-0 items-center justify-center space-y-5 text-black">
            <input
              minLength={4}
              type="text"
              placeholder="Enter username"
              className="w-11/12 p-3 rounded-2xl focus:outline-none bg-otpinpbg font-normal"
              value={username}
              onChange={handleUser}
              required
            />
            <div className="w-full flex items-center justify-center">
              <input
                minLength={4}
                type={visible ? "text" : "password"}
                placeholder="Enter password"
                className="w-11/12 p-3 rounded-2xl focus:outline-none bg-otpinpbg font-normal"
                value={password}
                onChange={handlePassword}
                required
              />
              <button
                className="absolute right-14 p-1 pr-0 rounded-full text-white cursor-pointer text-sm"
                onClick={handleVisibility}
                type="button"
              >
                {visible ? (
                  <img src={eyeopen} alt="@" className="h-8" />
                ) : (
                  <img src={eyeclose} alt="@" className="h-8" />
                )}
              </button>
            </div>
            <div className="w-11/12 justify-between flex ml-3 text-sm">
              <Link to="/forgotpassword">
                <p className="text-white hover:underline">Forgot Password?</p>
              </Link>
              <Link to="/contactsupport">
                <p className="hover:underline text-white">Contact Support</p>
              </Link>
            </div>
            <div className="h-2">
              {error && <p className="text-red-600 font-bold">{error}</p>}
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Cardlayout>
    </div>
  );
};

export default Login;
