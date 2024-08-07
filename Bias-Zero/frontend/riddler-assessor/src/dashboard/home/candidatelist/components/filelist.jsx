import React from 'react'
import { useState } from 'react';
import pdficon from "./pdficon.png"
import docxicon from './docxicon.png'
function Filelist({files,setFiles}) {
  const [recentFiles, setRecentFiles] = useState(() => {
    const savedFiles = localStorage.getItem('recentFiles');
    try {
      return JSON.parse(savedFiles) || [];
    } catch (error) {
      return [];
    }
  });
  return (
    /* Files container */
    <div className='mt-3 space-y-4'>
      {/* Single file info */}
      {
        recentFiles.map((file)=>{
          return(
            <div className='w-full bg-ltblue h-12 rounded-md flex justify-between'>
              <div className='flex w-[80%]'>
                {/* File icon */}
                <div className='p-2 flex items-center w-fit'>
                  {
                    file.type==="application/pdf" && 
                    <img src={pdficon} alt='pdf' className='w-6'/>
                  }
                  {
                    file.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document" && 
                    <img src={docxicon} alt='docx' className='w-6'/>
                  }
                </div>
                {/* File Name and size */}
                <div className='w-[90%] text-xs sm:text-base overflow-hidden pt-1 flex flex-col'>
                  <p className='overflow-hidden h-[80%]'>{file.name}</p>
                  <p className='text-xs'>{file.size} KB</p>
                </div>
              </div>
              {/* Date and Time */}
              <div className='text-xs flex flex-col justify-center px-3'>
                <p>{file.date}</p>
                <p >{file.time}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Filelist