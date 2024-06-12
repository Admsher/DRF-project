import React from 'react'
import { Link } from 'react-router-dom'

function Notification() {
  return (
    <div className=' bg-ltblue m-4 h-[90%] w-1/3 rounded-md flex'>
        {/* Info */}
        <div className='w-[90%] p-5 pt-3'>
            <h2 className="w-full text-start text-xl">Notifications</h2>        
        </div>
        {/* Side button */}
        <div className='h-full flex item-center w-[10%] text-4xl justify-center'>
            <Link to='/notification' className='w-full h-full bg-mdblue rounded-tr-md rounded-br-md flex items-center justify-center'>{">"}</Link>
        </div>
    </div>
  )
}

export default Notification