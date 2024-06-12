import React from 'react'

function Easy({selectedQuestions,easy,setEasy}) {
  return (
    <div className="bg-ltblue w-1/5 h-[90%] rounded-md">
      <div className='w-full flex items-center justify-center text-white p-1'>
        <p className='px-2 rounded-md'>Easy</p>
      </div>
      <div className='m-2 mt-4 text-[#39cb3e] rounded-md p-1 bg-white'>
        No of Questions: {easy.length}
      </div>
      <div className='m-2 mt-8 text-[#39cb3e] flex items-center justify-center'>
        <button className='bg-white rounded-md p-1'>View Questions</button>
      </div>
    </div>
  )
}

export default Easy