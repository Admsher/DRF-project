import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/logo';
import Circles from '../components/circles'
import Cardlayout from '../components/cardlayout';
import Heading from '../components/heading';
import Button from '../components/button';
import eyeopen from '../components/eyeopen.png'
import eyeclose from '../components/eyeclose.png'



function Login() {
  const navigate = useNavigate();
  const[username,setUserName] = useState("");
  const[password,setPassword] = useState("");
  const[visible,setVisible] = useState(false);
  const [error, setError] = useState('');
  const userDataset = JSON.parse(localStorage.getItem('userDataset'));
  const [currentuser,setCurrentUser] = useState({});

  function handleUser(e){
    setUserName(e.target.value)
  }
  function handlePassword(e){
    setPassword(e.target.value)
  }
  function handleVisibility(e){
    if(!visible)
    setVisible(!visible);
    else
    setVisible(!visible);
  }

  function handleSubmit(e){
    e.preventDefault();
    const user = userDataset.find((user)=> user.username === username )
    if(user)
      {
        if(user.password===password){
          setError("");
          setCurrentUser(user);
          localStorage.setItem('currentuser',JSON.stringify(user));
          navigate('/');
        }
        else{
          setError("Invalid Password. Try Again!!!")
        }
      }
    else{
      setError("User Not Found!")
    }
  }



  return (
    <div className='h-screen w-screen bg-drkblue overflow-hidden'>
      <Logo/>
      <Cardlayout>
        <Heading>Sign in</Heading>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col p-5 pt-2 pb-0 items-center justify-center space-y-5 text-black'>
            <input type="text" 
              placeholder='Enter username' 
              className=' w-11/12 p-3 rounded-2xl focus:outline-none bg-otpinpbg font-normal'
              value={username}
              onChange={handleUser}
              required
            />
            <div className='w-full flex items-center justify-center'>
              <input
                type={visible?"text":"password"} 
                placeholder='Enter password' 
                className='w-11/12 p-3 rounded-2xl focus:outline-none bg-otpinpbg font-normal'
                value={password}
                onChange={handlePassword}
                required
              />
              <button className='absolute right-14 p-1 pr-0 rounded-full text-white cursor-pointer text-sm'
              onClick={handleVisibility} type="button"
                >{visible?(
                  <img src={eyeopen} alt='@' className='h-8'/>
                ):(
                  <img src={eyeclose} alt='@' className='h-8'/>
                )}
              </button>
            </div>
            <div className='w-11/12 justify-between flex ml-3 text-sm'>
              <Link to="/forgotpassword"><p className=' text-red-600 hover:underline'>Forgot Password?</p></Link>
              <Link to="/contactsupport"><p className=' hover:underline text-white'>Contact Support</p></Link>
            </div>
            <div className='h-2'>
              {error&&<p className='text-red-600 font-bold'>{error}</p>}
            </div>
          </div>
          <Button>Submit</Button>
        </form>
      </Cardlayout>
      <Circles/>
    </div>
  )
}

export default Login;
