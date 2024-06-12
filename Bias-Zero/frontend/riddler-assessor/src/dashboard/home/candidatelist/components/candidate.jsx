import React from 'react'
import profile from './profile.png'
function Candidate({Candidate,percentage}) {

    /* For percentage used "daisyui" 
        npm i -D daisyui@latest AND 
        plugins: [
        require('daisyui'),
        ],
    */
   const val = percentage;
  return (
    <div className='flex bg-ltblue rounded-md h-14 justify-between'>
        <div className='flex'>
            <div className='w-[17%] flex items-center justify-center m-2 ml-2'>
                <img src={profile} alt="" className='h-11'/>
            </div>
            <div className='flex flex-col justify-center mr-20'>
                {Candidate.username.charAt(0).toUpperCase()+Candidate.username.slice(1).toLowerCase()}
                <div className='text-xs'>
                    {Candidate.age} | {Candidate.gender} | {Candidate.city}
                </div>
            </div>
        </div>
        <div className='flex space-x-3'>
            <div className='h-10 flex items-center justify-center mt-2'>
                <div className="radial-progress h-10 w-10 text-sm" style={{"--value":val, "--size": "2rem"}} role="progressbar">{percentage}%</div>
            </div>
            <div className=' bg-dkblue rounded-tr-md rounded-br-md w-5 flex items-center justify-center'>
                <p>{'>'}</p>
            </div>
        </div>
    </div>
  )
}

export default Candidate