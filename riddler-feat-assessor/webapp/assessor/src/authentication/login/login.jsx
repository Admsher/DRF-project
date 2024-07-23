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
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username: initialUsername, password: initialPassword } = useSelector(
    (state) => state.profile
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleVisibilityToggle = () => {
    setVisible(!visible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username === initialUsername && password === initialPassword) {
        localStorage.setItem("token", "dummy-token");
        dispatch(setProfile({ username, password }));
        navigate("/selection");
        toast.success("Login Successful");
      } else {
        setError("Invalid credentials");
        toast.error("Invalid credentials");
      }
    } catch (error) {
      setError("Invalid credentials");
      toast.error("Invalid credentials");
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
              onChange={handleUsernameChange}
              required
            />
            <div className="w-full flex items-center justify-center">
              <input
                minLength={4}
                type={visible ? "text" : "password"}
                placeholder="Enter password"
                className="w-11/12 p-3 rounded-2xl focus:outline-none bg-otpinpbg font-normal"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button
                className="absolute right-14 p-1 pr-0 rounded-full text-white cursor-pointer text-sm"
                onClick={handleVisibilityToggle}
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
