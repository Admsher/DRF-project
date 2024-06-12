import React from 'react'
import Candidate from './candidate'

function List({view,setView,candidates}) {
  const toggle=()=>{
    setView(!view)
  }
  return (
    <div className='text-black absolute bg-dkblue w-3/5 h-5/6 p-2 rounded-lg top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10'>
        <div className='bg-mdblue rounded-md h-full w-full'>
          {/* Header*/}
          <div className='flex p-3 text-white'>
            <h2 className='w-[98%] text-center text-lg'>Candidates List</h2>
            <button
             className='text-end'
             onClick={toggle}
             >X</button>
          </div>
          {/* Candidates List */}
          <div className='text-white px-20 mt-10 space-y-6 h-4/5 m-20 overflow-y-auto'>
            {
              candidates.map((candidate,index)=>(
                <Candidate key={index} Candidate={candidate} percentage={parseInt(candidate.age, 10)+40}/>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default List