import React, { useState } from "react";
import Todayslist from "./components/todayslist";
import List from "./components/list1";
import Filelist from "./components/filelist";
import { useSelector } from "react-redux";

function Candidatelist({ files, setFiles }) {
  const [view, setView] = useState(false);
  const candidate = useSelector((state) => state.candidate);
  return (
    <div className="text-white overflow-hidden rounded-md h-[67%]">
      {view && <List view={view} setView={setView} candidates={candidate} />}

      <div className="bg-dkblue mt-5 rounded-md h-full">
        {/* Heading */}
        {/* list container */}
        <div className="flex h-full pt-4 flex-col md:flex-row overflow-auto">
          {/* Today's list */}
          <div className="bg-mdblue  m-6 mt-3 mr-3 rounded-md px-4 py-2 md:w-1/2 h-[89%]">
            <h2 className="flex justify-between">
              Candidate's List: <h3>Date: 01/06/2024</h3>
            </h2>
            <Todayslist candidates={candidate} view={view} setView={setView} />
          </div>

          {/* recent Documents */}
          <div className="bg-rylblue m-6 mt-3 mr-3 rounded-md px-4 py-2 md:w-1/2 h-[89%] overflow-hidden">
            <h2 className="flex justify-between">Recent Documents</h2>
            <div className="pb-6 h-full overflow-y-scroll ">
              <Filelist files={files} setFiles={setFiles} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Candidatelist;
