import React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { select } from "../../store/selectionSlice";

const SelectionPage = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleSelection = (option) => {
    dispatch(select(option));
    navigate("/");
  };

  return (
    <div className="h-screen w-screen bg-dkblue overflow-hidden flex items-center justify-center flex-col">
      <h1 className="text-2xl text-white pb-8">Select an Option</h1>
      <div className="flex gap-4">
        <button
          className="flex px-4 py-2 border border-solid rounded-md text-white"
          onClick={() => handleSelection("Create job")}
        >
          Create job
        </button>
        <button
          className="flex px-4 py-2 border border-solid rounded-md text-white"
          onClick={() => handleSelection("Create Questions")}
        >
          Create Questions
        </button>
        <button
          className="flex px-4 py-2 border border-solid rounded-md text-white"
          onClick={() => handleSelection("Neither")}
        >
          Neither
        </button>
      </div>
    </div>
  );
};

export default SelectionPage;
