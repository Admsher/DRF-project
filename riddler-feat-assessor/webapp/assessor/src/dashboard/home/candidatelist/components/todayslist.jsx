import React from 'react'
import Candidate from './candidate'

function Todayslist({candidates,view,setView}) {
  const toggle=()=>{
    setView(!view);
  }
  return (  
    <div className='mt-2 space-y-4 relative h-[89%] overflow-hidden rounded-md'>
        {
          candidates.map((candidate,index)=>{
            return(
              <Candidate Candidate={candidate} percentage={100-candidate.age} />
            )
          })
        }
        <button 
          className='absolute bg-black -bottom-0 rounded-bl-md rounded-br-md w-full h-20 bg-opacity-70 font-bold flex items-center justify-center'
          onClick={toggle}>
          View All
        </button>
    </div>
  )
}

export default Todayslist