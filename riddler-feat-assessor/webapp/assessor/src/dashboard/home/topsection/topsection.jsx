import React from "react";
import Notification from "./components/notification.jsx";
import CandidateReport from "./components/candidatereport.jsx";
import UploadDoc from "./components/uploaddoc.jsx";
function Topsection({
  files,
  setFiles,
  setGeneratedQuestions,
  generatedQuestions,
}) {
  return (
    <div className="flex justify-between md:h-[35%] md:flex-row flex-col h-full w-full gap-3 bg-dkblue p-4 rounded-md">
      <CandidateReport />
      <Notification />
      <UploadDoc
        files={files}
        setFiles={setFiles}
        setGeneratedQuestions={setGeneratedQuestions}
        generatedQuestions={generatedQuestions}
      />
    </div>
  );
}
export default Topsection;
