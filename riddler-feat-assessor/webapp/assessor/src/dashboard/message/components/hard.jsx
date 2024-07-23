import React, { useState } from "react";
import del from "./delete.png";

function Hard({ setTotalQuestions, totalQuestions, hard, setHard }) {
  const [view, setView] = useState(false);
  const [removedQuestions, setRemovedQuestions] = useState([]);

  const removeQuestion = (question, index) => {
    const newQuestion = hard.filter((item, delindex) => {
      return delindex !== index;
    });
    setHard(newQuestion);
    setRemovedQuestions([question, ...removedQuestions]);
  };

  const handleDone = () => {
    console.log(removedQuestions);
    setTotalQuestions([...removedQuestions, ...totalQuestions]);
    setRemovedQuestions([]);
    setView(!view);
  };

  return (
    <div className="bg-ltblue w-1/5 h-[90%] rounded-md">
      <div className="w-full flex items-center justify-center text-white p-1">
        <p className="px-2 rounded-md">Hard</p>
      </div>
      <div className="m-2 mt-4 text-[#FF9800] rounded-md p-1 bg-white">
        No of Questions: {hard.length}
      </div>
      <div className="mt-8 text-white flex items-center justify-center">
        <button
          className="bg-mdblue rounded-md rounded-tr-none rounded-tl-none w-full h-[68px]"
          onClick={() => setView(!view)}
        >
          Edit Questions
        </button>
      </div>

      {view && (
        <div className="text-black absolute bg-mdblue w-3/5 h-5/6 p-2 rounded-lg top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 border-4 border-dkblue">
          {/* Heading */}
          <div className="flex w-[98%] mt-4 justify-center">
            <h2 className="text-white font-semibold text-lg">Hard Questions</h2>
          </div>
          {/* Questions list */}
          <div className="h-[82%] overflow-y-scroll m-4">
            {hard.map((question, index) => (
              <div
                key={index}
                className="bg-ltblue text-dkblue h-10 flex items-center justify-between px-3 m-2 rounded-md"
              >
                <div>
                  {index + 1}. {question.question}
                </div>
                <button onClick={() => removeQuestion(question, index)}>
                  <img src={del} alt="hard" width={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="px-3 bg-white text-drkblue rounded-md text-lg"
              onClick={handleDone}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hard;
