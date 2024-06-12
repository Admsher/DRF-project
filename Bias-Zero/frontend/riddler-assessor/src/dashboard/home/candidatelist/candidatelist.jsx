import React, { useState } from 'react'
import Todayslist from './components/todayslist'
import List from './components/list1';
import Filelist from './components/filelist';

function Candidatelist({candidates,files,setFiles}) {
  const [view,setView] = useState(false);
  return (
    <div className='text-white h-full'>
      {
        view && 
        <List view={view} setView={setView} candidates={candidates}/>
      }
      
        <div className='bg-dkblue mt-5 rounded-md h-full'>
          {/* Heading */}
          {/* Candidate list container */}
          <div className='flex h-[90%] pt-4'>
            {/* Color for list royal blue */}
            {/* Today's list */}
            <div className='bg-mdblue h-full w-1/2 m-6 mt-3 mr-3 rounded-md px-4 py-2'>
              <h2 className='flex justify-between'>Candidate's List: <div>Date: 01/06/2024</div></h2>
              <div>
                <Todayslist candidates={candidates} view={view} setView={setView}/>
              </div>
            </div>
            {/* recent Documents */}
            <div className='bg-rylblue h-full w-1/2 m-6 mt-3 mr-3 rounded-md px-4 py-2'>
              <h2 className='flex justify-between'>Recent Documents</h2>
              <div className='overflow-y-scroll h-[90%] pb-6'>
                <Filelist files={files} setFiles={setFiles}/>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Candidatelist