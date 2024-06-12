import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cardlayout from '../components/cardlayout';
import Logo from '../components/logo';
import Button from '../components/button';
import Circles from '../components/circles';
import Heading from '../components/heading';




function Forgotpassword() {
    const navigate = useNavigate()
    const[email,Setemail] = useState("");
    const[error,setError] = useState(false);
    const userDataSet = JSON.parse(localStorage.getItem('userDataset'))
   

    function handleSubmit(e){
        e.preventDefault();
        const user = userDataSet.find(user=>user.email===email)

        if(user)
        {
            localStorage.setItem('currentuser',JSON.stringify(user));
            console.log(user);
            navigate('/otpcheck');
        }
        else
        setError("Email not found");
    }   

    

  return (
    <div className='w-screen h-screen bg-drkblue overflow-hidden text-white'>
        <Logo/>
        <Cardlayout>
            <Heading>Forgot Password</Heading>
           {/* Inputs */}
           <form onSubmit={handleSubmit}>
                <div className=' p-8 px-14 pb-2'>
                    <input 
                        type="email" 
                        placeholder='Enter Email' 
                        className='p-3 w-full text-white focus:outline-none rounded-md'
                        value={email}
                        onChange={e=>Setemail(e.target.value)}
                        required
                    />
                </div>
                <div className=' ml-14 text-black text-xs'>
                    <p>The instructions to reset your password will be sent to your email.</p>
                </div>
                <div className='h-2 w-full text-center p-3 pb-0'>
                    {error&&<p className='text-red-600 font-bold'>{error}</p>}
                </div>
                <div className=' mt-11'>
                    <Button type={"submit"}>Submit</Button>
                </div>
           </form>
        </Cardlayout>
        <Circles/>
    </div>
  )
}

export default Forgotpassword

/*  h-16 flex items-end justify-center font-medium text-xl text-black 
    p-8 text-xl text-black font-medium text-center
*/