import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../components/logo";
import Cardlayout from "../components/cardlayout";
import Circles from "../components/circles";
import Heading from "../components/heading";
import Button from "../components/button";
import eyeopen from "../components/eyeopen.png";
import eyeclose from "../components/eyeclose.png";
import eyeopen2 from "../components/eyeopen.png";
import eyeclose2 from "../components/eyeclose.png";

function Resetpassword() {
  const currentuser = JSON.parse(localStorage.getItem("currentuser"));
  const navigate = useNavigate();
  const [newpwd, setNewpwd] = useState("");
  const [confirmpwd, setConfpwd] = useState("");
  const [error, setError] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (newpwd === confirmpwd) {
      setError("");
      if (passwordRegex.test(newpwd)) {
        // Update password on the server
        axios.post('http://127.0.0.1:8000/forgetpassword/resetpassword/', {
          username: currentuser.username,
          new_password: newpwd
        })
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem("userDataset", JSON.stringify(
              JSON.parse(localStorage.getItem("userDataset")).map(user =>
                user.username === currentuser.username
                  ? { ...user, password: newpwd }
                  : user
              )
            ));
            navigate("/");
          }
        })
        .catch(error => {
          setError("Failed to update the password. Please try again.");
        });
      } else {
        setError("Password must be at least 8 characters long, with at least one capital letter and one digit.");
      }
    } else {
      setError("The passwords do not match. Please try again.");
    }
  }

  function handleNewpwd(e) {
    setNewpwd(e.target.value);
  }

  function handleConfirmpwd(e) {
    setConfpwd(e.target.value);
  }

  function handleVisibility1(e) {
    e.preventDefault();
    setVisible1(!visible1);
  }

  function handleVisibility2(e) {
    e.preventDefault();
    setVisible2(!visible2);
  }

  return (
    <div className="w-screen h-screen bg-dkblue overflow-hidden">
      <Logo />
      <Cardlayout>
        <Heading>Reset Password</Heading>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-5 pt-2 items-center justify-center space-y-5 text-black">
            <div className="relative w-full flex items-center justify-center">
              <input
                type={visible1 ? "text" : "password"}
                placeholder="Enter new password"
                className="w-11/12 p-3 rounded-2xl focus:outline-none bg-otpinpbg font-normal"
                value={newpwd}
                onChange={handleNewpwd}
                required
              />
              <button
                className="absolute right-14 p-1 rounded-full text-white cursor-pointer"
                onClick={handleVisibility1}
                type="button"
              >
                {visible1 ? (
                  <img src={eyeopen} alt="Show password" className="h-8" />
                ) : (
                  <img src={eyeclose} alt="Hide password" className="h-8" />
                )}
              </button>
            </div>

            <div className="relative w-full flex items-center justify-center">
              <input
                type={visible2 ? "text" : "password"}
                placeholder="Confirm password"
                className="w-11/12 p-3 rounded-2xl focus:outline-none bg-otpinpbg font-normal"
                value={confirmpwd}
                onChange={handleConfirmpwd}
                required
              />
              <button
                className="absolute right-14 p-1 rounded-full text-white cursor-pointer"
                onClick={handleVisibility2}
                type="button"
              >
                {visible2 ? (
                  <img src={eyeopen2} alt="Show password" className="h-8" />
                ) : (
                  <img src={eyeclose2} alt="Hide password" className="h-8" />
                )}
              </button>
            </div>
          </div>
          <div className="h-2 w-full text-center p-3 pb-0">
            {error && <p className="text-red-600 font-bold">{error}</p>}
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Cardlayout>
      <Circles />
    </div>
  );
}

export default Resetpassword;
