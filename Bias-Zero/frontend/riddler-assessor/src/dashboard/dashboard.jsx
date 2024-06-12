import React, { useState } from 'react' 
import { Outlet, useSearchParams } from 'react-router-dom'
import Header from './components/header/header'
import Sidebar from './components/sidebar'



function Dashboard() {
  const currentuser = JSON.parse(localStorage.getItem('currentuser'))
  const [files,setFiles] = useState([])
  return (
    <div className='flex items-center bg-mdblue p-2 w-screen h-screen'>
      {/*  //* Sidebar navigation bar contains  */}
      <div className=' flex items-center'>
        <Sidebar/> 
      </div>
      <div className='pr-16 pl-16 pt-8 pb-6 ml-7 bg-ltgray text-black rounded-xl w-full h-full overflow-auto'>
        {/* //* Header component stays same for all pages */}
        <div className='h-10 mb-4'>
          <Header currentuser={currentuser}/>
        </div>
        {/* //* Outlet displays all the children of Dashboard instead of rendering to new page.
        //* Pages will be rendered insid the div */}
        <div>
          <Outlet files={files} setFiles={setFiles}/>
        </div>
      </div> 
    </div>
  )
}

export default Dashboard