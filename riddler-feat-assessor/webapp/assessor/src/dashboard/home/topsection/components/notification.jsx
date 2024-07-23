import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Notification() {
  const notifications = useSelector((state) => state.notification);

  return (
    <div className="bg-ltblue text-white w-full h-full rounded-md flex overflow-hidden">
      {/* Info */}
      <div className="w-full h-full">
        <h2 className="w-full text-start text-xl p-5 pb-2 pt-3">
          Notifications{" "}
          {/* <p className='w-7 h-7 mx-1 bg-white rounded-full text-red-400'>+2</p> */}
        </h2>
        {/* Recent Notifications*/}
        <div className="px-3 space-y-3">
          {/* Notifications */}
          {notifications?.slice(0, 2)?.map((item) => {
            return (
              <div className=" bg-white text-dkblue rounded-md text-start text-sm px-3 py-3">
                <h2>{item.message}</h2>
              </div>
            );
          })}
        </div>
      </div>
      {/* Side button */}
      <Link
        to="/notification"
        className="flex items-center justify-center p-5 bg-mdblue rounded-tr-md rounded-br-md h-full"
      >
        {">"}
      </Link>
    </div>
  );
}

export default Notification;
