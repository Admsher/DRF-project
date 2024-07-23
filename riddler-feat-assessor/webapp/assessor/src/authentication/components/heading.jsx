import React from 'react'

function Heading({children}) {
  return (
    <div className='m-8 flex items-center justify-center'>
        <h2 className='text-xl w-fit text-white font-medium text-center'>{children}</h2>
    </div>
  )
}

export default Heading