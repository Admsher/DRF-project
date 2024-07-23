import React from 'react'

function Button({children,type,classValues}) {
  return (
    <div className='p-10 pt-11 flex justify-center items-center'>
          <button className=' p-2 bg-btnblue w-36 rounded-2xl text-xl' type={type}>{children}</button>
    </div>
  )
}

export default Button