import React, { useState } from 'react'
import Logo from '../components/logo'
import Cardlayout from '../components/cardlayout'
import Circles from '../components/circles'
import Heading from '../components/heading'
import Button from '../components/button'
import eyeopen from '../components/eyeopen.png'
import eyeclose from '../components/eyeclose.png'
import eyeopen2 from '../components/eyeopen.png'
import eyeclose2 from '../components/eyeclose.png'
import { useNavigate } from 'react-router-dom'

function Resetpassword() {

  const currentuser = JSON.parse(localStorage.getItem('currentuser'))
  const userDataSet = JSON.parse(localStorage.getItem('userDataset'))
  const navigate = useNavigate();
  const[newpwd,setNewpwd] = useState("");
  const[confirmpwd,setConfpwd] = useState("");
  const[error,setError] = useState("");
  const[visible1,setVisible1] = useState(false);
  const[visible2,setVisible2] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(newpwd===confirmpwd)
    {
      setError("");
      console.log("Comparision--------------------------")
      if(!(/^(?=.*[A-Z])/.test(newpwd)))
      {
        console.log("[A-Z]");
      }
      if(!(/^(?=.*\d)/.test(newpwd)))
      {
        console.log("[0-9]");
      }
      if(newpwd.length<8)
      {
        console.log("len<8")
      }
      if(passwordRegex.test(newpwd))
      {
        console.log("successful");
        console.log(currentuser);
        //update password
        const userIndex = userDataSet.findIndex(user => user.username === currentuser.username);
        userDataSet[userIndex].password =newpwd;
        localStorage.setItem('userDataset', JSON.stringify(userDataSet));
        console.log(userDataSet)
        navigate("/");
      }
      
    }
    else{
      setError("The passwords do not match. Please try again.")
    }
  }
  function handleNewpwd(e){
    setNewpwd(e.target.value)
  }

  function handleConfirmpwd(e){
    setConfpwd(e.target.value)
  }
  function handleVisibility1(e){
    if(!visible1)
    setVisible1(!visible1);
    else
    setVisible1(!visible1);
  }
  function handleVisibility2(e){
    if(!visible2)
    setVisible2(!visible2);
    else
    setVisible2(!visible2);
  }

  return (
    <div className='w-screen h-screen bg-drkblue overflow-hidden'>
        <Logo/>
        <Cardlayout>
            <Heading>Reset Password</Heading>
            <form onSubmit={handleSubmit}>
            <div className='flex flex-col p-5 pt-2 items-center justify-center space-y-5 text-black '>

            <div className='w-full flex items-center justify-center'>
                <input type={visible1?"text":"password"} 
                  placeholder='Enter new password' 
                  className=' w-11/12 p-3 rounded-2xl focus:outline-none bg-otpinpbg font-normal'
                  value={newpwd}
                  onChange={handleNewpwd}
                  required
                />
                <button className='absolute right-14 p-1 rounded-full text-white cursor-pointer '
                    onClick={handleVisibility1} type="button">
                 {visible1?(
                    <img src={eyeopen} alt='@' className='h-8'/>
                  ):(
                    <img src={eyeclose} alt='@' className='h-8'/>
                  )}
                 </button>
            </div>

            <div className='w-full flex items-center justify-center'>
                <input
                 type={visible2?"text":"password"}
                 placeholder='Confirm password' 
                 className='w-11/12 p-3 rounded-2xl focus:outline-none bg-otpinpbg font-normal'
                 value={confirmpwd}
                 onChange={handleConfirmpwd}
                 required
                />
                <button className='absolute right-14 p-1 rounded-full text-white cursor-pointer '
                    onClick={handleVisibility2} type="button">
                   {visible2?(
                      <img src={eyeopen2} alt='@' className='h-8'/>
                    ):(
                      <img src={eyeclose2} alt='@' className='h-8'/>
                    )}   
                </button>
                </div>
            </div>
            <div className='h-2 w-full text-center p-3 pb-0'>
                    {error&&<p className='text-red-600 font-bold'>{error}</p>}
                </div>
            <div>
                <Button>Submit</Button>
            </div>
            </form>
        </Cardlayout>
        <Circles/>
    </div>
  )
}

export default Resetpassword;