import React from 'react'
import home from './icons/home.png'
import task from './icons/assignment.png'
import upload from './icons/upload.png'
import bell from './icons/notification.png'
import msg from './icons/send.png'
import exit from './icons/logout.png'
import Link1 from './link1'

function Sidebar() {
  return (
    <div className=' bg-mdblue text-black flex flex-col items-center justify-center space-y-8 w-fit z-10 absolute h-2/3 rounded-full'>
            <div className='p-1 flex flex-col justify-around h-full m-[5px] bg-ltgray rounded-full items-center'>
              <Link1 to='/home' image={home} ch='H'/>
              <Link1 to='/assessment' image={task} ch='A'/>
              <Link1 to='/upload' image={upload} ch='A'/>
              <Link1 to='/notification' image={bell} ch='H'/>
              <Link1 to='/message' image={msg} ch='A'/>
              <Link1 to='/login' image={exit} ch='A'/>
            </div>
    </div>
  )
}

export default Sidebar