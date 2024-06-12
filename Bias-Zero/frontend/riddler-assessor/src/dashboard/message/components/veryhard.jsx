import React from 'react'

function VeryHard({veryhard,setVeryHard}){
  return (
    <div className="bg-ltblue w-1/5 h-[90%] rounded-md">
      <div className='w-full flex items-center justify-center text-white p-1'>
        <p className='px-2 rounded-md'>Very Hard</p>
      </div>
      <div className='m-2 mt-4 text-[#F44336] rounded-md p-1 bg-white'>
        No of Questions: {veryhard.length}
      </div>
      <div className='m-2 mt-8 text-[#F44336] flex items-center justify-center'>
        <button className='bg-white rounded-md p-1'>View Questions</button>
      </div>
    </div>
  )
}

export default VeryHard