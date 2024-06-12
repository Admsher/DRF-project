import React from "react"

function Cardlayout({ children }) {
  return (
    <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-10'>
        <div className='flex text-white w-520 h-440 bg-card-grad rounded-2xl flex-col'>
            {children}
        </div>
    </div>
    
  )
}

export default Cardlayout