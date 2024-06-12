import React, { useRef, useState } from 'react'
import profileimg from './components/profile.png'

function Header({ currentuser }) {

  const [viewmenu,setViewMenu] = useState(false);
  console.log(currentuser)
  return (
    <div className='flex flex-row items-center justify-between'>
      <div className=' text-2xl font-bold text-dkblue'>
        Welcome {currentuser.username.charAt(0).toUpperCase()+currentuser.username.slice(1).toLowerCase()}
      </div>

      <div className='relative  cursor-pointer'>
        <img
         src={profileimg}
         alt="image" 
         onClick={()=>setViewMenu(!viewmenu)} 
        />
        {viewmenu &&( 
          <div
            className='absolute bg-dkblue -left-20 rounded-md mt-1 shadow-sm shadow-black w-fit text-sm'
          >
            <ul className='m-1 text-white space-y-1'>
              <li className='rounded-md hover:bg-ltblue p-1'>Edit profile</li>
              <li className='rounded-md hover:bg-ltblue p-1'>Change password</li>
              <li className='rounded-md hover:bg-ltblue p-1'>Logout</li>
            </ul>
          </div>
          )
        }
        
      </div>
    </div>
  )
}

export default Header