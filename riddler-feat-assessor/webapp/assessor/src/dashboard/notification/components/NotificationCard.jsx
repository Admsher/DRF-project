import React, { useState } from "react";
import SearchIcon from "./search.png";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../../components/Modal";
import { closeModal, openModal } from "../../../store/modalSlice";

const NotificationCard = () => {
  const notificationsData = useSelector((state) => state.notification);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = notificationsData?.filter((item) =>
    item.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const handleOpenModal = (id) => {
    console.log(id);
    dispatch(openModal({ id }));
  };

  const handleCloseModal = (id) => {
    dispatch(closeModal({ id }));
  };
  console.log(isModalOpen);
  return (
    <>
      <div className="flex justify-end items-center mb-3">
        <div className="relative">
          <input
            type="text"
            className="bg-[#121F39] text-white px-8 py-1 rounded-2xl border border-solid border-black placeholder:text-white"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchInput}
          />
          <img
            src={SearchIcon}
            alt="Search"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4"
          />
        </div>
      </div>

      <div className="flex flex-col text-white h-full gap-7">
        <div className="bg-[#487CE2] border rounded-2xl flex flex-col  h-3/5 px-5">
          <p className="text-lg py-4">Notifications</p>
          <div className="flex flex-col gap-5 pb-3 overflow-y-auto mr-5 mb-4">
            {filteredData?.map((item) => (
              <div key={item.id} className="flex items-center gap-5 ">
                <div className="w-8 h-8 rounded-full bg-white"></div>
                <p>{item.message}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border rounded-md flex gap-3 ">
          <div className="bg-[#487CE2] w-full rounded-xl py-2 flex flex-col gap-3 relative overflow-y-scroll">
            <p className="text-xl px-2">Internal Mails</p>
            {notificationsData?.slice(0, 5)?.map((item) => (
              <p className="text-lg px-2" key={item.id}>
                {item.message}
              </p>
            ))}
            <button
              onClick={() => handleOpenModal(1)}
              className="absolute bg-black -bottom-0 rounded-bl-md rounded-br-md w-full h-20 bg-opacity-70 font-bold flex items-center justify-center"
            >
              View All
            </button>
          </div>
          <div className="bg-[#487CE2] w-full rounded-xl py-2 flex flex-col gap-3 relative">
            <p className="text-xl px-2">External Mails</p>
            {notificationsData?.slice(0, 5)?.map((item) => (
              <p className="text-lg px-2" key={item.id}>
                {item.message}
              </p>
            ))}
            <button
              onClick={() => handleOpenModal(2)}
              className="absolute bg-black -bottom-0 rounded-bl-md rounded-br-md w-full h-20 bg-opacity-70 font-bold flex items-center justify-center"
            >
              View All
            </button>
          </div>
        </div>
      </div>
      {isModalOpen[1] && (
        <Modal onClose={() => handleCloseModal(1)}>
          {notificationsData?.map((item) => (
            <p className="text-lg text-white px-2" key={item.id}>
              {item.message}
            </p>
          ))}
        </Modal>
      )}
      {isModalOpen[2] && (
        <Modal onClose={() => handleCloseModal(2)}>
          {notificationsData?.map((item) => (
            <p className="text-lg text-white px-2" key={item.id}>
              {item.message}
            </p>
          ))}
        </Modal>
      )}
    </>
  );
};

export default NotificationCard;
