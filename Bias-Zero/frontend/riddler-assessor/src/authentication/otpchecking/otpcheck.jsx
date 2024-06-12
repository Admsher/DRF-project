import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cardlayout from '../components/cardlayout'
import Logo from '../components/logo'
import Circles from '../components/circles'
import Heading from '../components/heading'
import Button from '../components/button'



function Otpcheck() {
    
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [check,setCheck] = useState("");
    const[OTP,setOTP] = useState("")
    const inputRefs = useRef([]);
    const [error, setError] = useState(false);

    useEffect(() => {
      generateOtp();
      if(inputRefs.current[0]){
        inputRefs.current[0].focus();
      }
    }, [])

    function generateOtp(){
        const randomotp = Math.floor(Math.random()*999999)+1;
        setOTP(randomotp);
        console.log("OTP: "+randomotp);
    }

    

    const handleChange=(index,e)=>{
        const value = e.target.value;
        if(isNaN(value))
            return;
        
        const newOtp = [...otp];
        //allow only input in each box by keeping only last element from string
        newOtp[index] = value.substring(value.length-1);
        setOtp(newOtp);
        /* 
           Here we use newOtp to get the combined top bcz
           The setOtp is Asynchronous function it will not be updated 
           until function is exited
           so we use newOtp to get combinedOtp
        */
        const combinedOtp = newOtp.join("");
        //submit trigger
        /* if(combinedOtp.length===6)
            onOtpSubmit(combinedOtp) */

        //Move to next input current input is filled
        if(value && index<5 && inputRefs.current[index+1])
        {
            inputRefs.current[index+1].focus();
        }
        //Move back if input field is empty and we have another method
        //handelKeyDown clears previous value when current field is empty
        //and the following will move focus to previous when current field is empty
        //handelKeyDown confused wheter to keep handelKeyDown or not but combining both is overcoming eachothers cons
       /*  if(!value && index>0 && inputRefs.current[index-1])
        {
            inputRefs.current[index-1].focus();
        } */
    }

    /* const onOtpSubmit=(combinedOtp)=>{
        console.log(combinedOtp)
    } */
    const handelClick=(index)=>{
        //Make sure the blinker stays right of the text 
        //when entered new text at left it doesnt update unless blinker is at right
        inputRefs.current[index].setSelectionRange(1,1);
    }

    const handelKeyDown=(index,e)=>{
        if(e.key==="Backspace" && !otp[index] && index>0 && inputRefs.current[index-1])
        {
            inputRefs.current[index-1].focus();
        }
    }

    const fields = otp.map((value,index)=>{
        return(
            <input
                key={index}
                type='text'
                ref={(input)=>(inputRefs.current[index]=input)}
                value={value}
                onChange={(e)=>handleChange(index,e)}
                onClick={()=>handelClick(index)}
                onKeyDown={(e)=>handelKeyDown(index,e)}
                className='text-xl text-center font-bold  h-10 w-12 my-2 flex items-center justify-center rounded-md px-4 text-white bg-otpnnum focus:outline-none'
            />
        )
    })

    function resendOtp(){
        setOtp(new Array(6).fill(""));
        generateOtp();
    }
    function handleSubmit(e){
        e.preventDefault()
        const c = otp.join("");
        setCheck(c);
        if(c==OTP)
        {
            setError(!error);
            navigate('/resetpassword')
        }
        else{
            setError(!error);
        }
    }
  return (
    <div className='w-screen h-screen bg-drkblue overflow-hidden'>
        <Logo/>
        <Cardlayout>
            <Heading>Forgot Password</Heading>
            <div className=' ml-14 text-black text-xs'>
                <p>Enter your Otp that has been sent to your email.</p>
            </div>
            {/* Otp Form */}
            <form onSubmit={handleSubmit}>
                {/* Otp input */}
                <div className="m-5 mb-1 mx-14 ">
                    <div className='w-full rounded-md bg-otpinpbg flex items-center justify-center space-x-2 h-14'>
                        {fields}
                    </div>
                </div>

                <div className='w-full text-center'>
                    <button type="button" onClick={resendOtp} className='text-xs hover:underline cursor-pointer'>Resend OTP?</button>
                </div>
                <div className='h-2 w-full text-center'>
                    {error&&<p className='font-bold'>Please verify the OTP and try again</p>}
                </div>
                <div className='mt-12'>
                    <Button type={"submit"}>Submit</Button>
                </div>
            </form>
            
        </Cardlayout>
        <Circles/>
    </div>
  )
}

export default Otpcheck;



/* <input className=' text-xl font-bold  h-10 w-12 my-2 flex items-center justify-center rounded-md px-4 text-white bg-otpnnum no-spin focus:outline-none'/> */