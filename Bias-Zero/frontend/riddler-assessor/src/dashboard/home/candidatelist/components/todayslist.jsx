import React from 'react'
import Candidate from './candidate'

function Todayslist({candidates,view,setView}) {
  const toggle=()=>{
    setView(!view);
  }
  return (
    <div className='mt-2 space-y-4 relative'>
        <Candidate Candidate={candidates[0]} percentage={74}/>
        <Candidate Candidate={candidates[1]} percentage={44}/>
        <Candidate Candidate={candidates[2]} percentage={84}/>
        <Candidate Candidate={candidates[3]} percentage={77}/>
        <button 
          className='absolute bg-black -bottom-0 rounded-bl-md rounded-br-md w-full h-20 bg-opacity-70 font-bold flex items-center justify-center'
          onClick={toggle}
        >
          View All
        </button>
    </div>
  )
}

export default Todayslist