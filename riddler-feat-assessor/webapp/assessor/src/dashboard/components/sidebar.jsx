import React from "react";
import home from "./icons/home.png";
import task from "./icons/assignment.png";
import upload from "./icons/upload.png";
import bell from "./icons/notification.png";
import msg from "./icons/send.png";
import exit from "./icons/logout.png";
import Link1 from "./link1";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className=" bg-mdblue text-black flex flex-col items-center justify-center space-y-8 w-fit z-10 absolute h-2/3 rounded-full">
      <div className="p-1 flex flex-col justify-around h-full m-[5px] bg-ltgray rounded-full items-center">
        <Link1 to="/home" image={home} ch="H" title="Home" />
        <Link1 to="/assessment" image={task} ch="A" title="Candidate Report" />
        <Link1 to="/notification" image={bell} ch="H" title="Notifications" />
        <Link1 to="/message" image={msg} ch="A" title="Questions" />
        <button
          onClick={logout}
          image={exit}
          ch="A"
          title="Exit"
          className="p-1 rounded-full h-9 w-9 flex flex-col items-center justify-center hover:bg-dkgray"
        >
          <img src={exit} alt={"exit"} />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
