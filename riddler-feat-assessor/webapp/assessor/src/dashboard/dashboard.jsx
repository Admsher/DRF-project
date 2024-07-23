import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header/header";
function Dashboard() {
  const [files, setFiles] = useState([]);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  return (
    <div className="flex items-center bg-mdblue p-2 w-screen h-screen">
      <div className="flex items-center">
        <Sidebar />
      </div>
      <div className="px-5 pt-2 pb-6 pl-16 ml-7 bg-ltgray text-black rounded-xl w-full h-full overflow-auto">
        <Header />
        <Outlet
          files={files}
          setFiles={setFiles}
          generatedQuestions={generatedQuestions}
          setGeneratedQuestions={setGeneratedQuestions}
        />
      </div>
    </div>
  );
}
export default Dashboard;
