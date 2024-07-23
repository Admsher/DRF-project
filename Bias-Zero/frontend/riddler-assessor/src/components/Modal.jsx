import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Modal = ({ children, onClose }) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75"
      onClick={handleOverlayClick}
    >
      <div className="relative rounded-2xl border-2 border-solid max-h-full w-full md:w-[760px] border-black bg-[#487CE2] py-4 px-8">
        <button
          type="button"
          className="cursor-pointer absolute top-3 right-4"
          onClick={onClose}
        >
          <FontAwesomeIcon
            className="block m-0 p-0 text-white text-3xl"
            icon={faXmark}
          />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
