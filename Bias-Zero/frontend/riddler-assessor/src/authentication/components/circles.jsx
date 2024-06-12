import React from 'react'

function Circles() {
  return (
    <div>
        <div className=' absolute right-[-8%] top-10 transform -translate-x-1/2'>
            <div className=' h-40 w-40 bg-crcl2-grad rounded-full'></div>
        </div>

        <div className=' absolute left-[81%] ml-14 top-[22%] mt-5'>
            <div className=' h-32 w-32 bg-crcl-grad rounded-full'></div>
        </div>
        
        <div className=' absolute right-[-34%] top-[40%] transform -translate-x-1/2'>
            <div className=' h-520 w-520 bg-crcl3-grad rounded-full'></div>
        </div>
        
        <div className='absolute left-[60%] top-[83%]'>
            <div className=" h-20 w-20 bg-crcl-grad rounded-full"></div>
        </div>

        <div className=' absolute left-[68%] top-[90%]'>
            <div className=' h-32 w-32 bg-crcl2-grad rounded-full'></div>
        </div>
    </div>
  )
}

export default Circles