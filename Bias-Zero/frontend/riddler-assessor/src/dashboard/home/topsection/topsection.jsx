import React from 'react'
import Notification from './components/notification.jsx'
import CandidateReport from './components/candidatereport.jsx'
import UploadDoc from './components/uploaddoc.jsx'

function Topsection({files,setFiles}) {
  return (
    /* *Top Section box */
    <div className='text-white'>
        {/* Section */}
        <div className='bg-dkblue h-48 rounded-md text-center flex items-center'>
            {/* Notification */}
            <Notification/>
            {/* Candidate Report */}
            <CandidateReport/>
            {/* Upload Document */}
            <UploadDoc files={files} setFiles={setFiles}/>
        </div>
    </div>
  )
}

export default Topsection