import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logo() {
  const navigate = useNavigate();
  function handle(){
    navigate("/login");
  }
  return (
    <span className='p-10 w-fit inline-block'>
      <div className='text-black text-2xl w-36 h-11 bg-white text-center inline-block cursor-pointer' type="button" onClick={handle}>
         Logo
      </div>
    </span>
  )
}

export default Logo;