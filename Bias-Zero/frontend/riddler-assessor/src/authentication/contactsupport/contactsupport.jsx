import React from 'react'
import Logo from '../components/logo'
import Cardlayout from '../components/cardlayout'
import Circles from '../components/circles'
import Heading from '../components/heading'
import Button from '../components/button'
import { useState } from 'react'

function Contactsupport() {

    const [selectedOption, setSelectedOption] = useState('');
    const [issueText, setIssueText] = useState('');
    const [isother,setOther] = useState(false);

    const handleOptionChange = (e) => {
        if(e.target.value==="Other Login Issues")
        {
            setOther(true);
        }
        else{
            setOther(false);
        }
        setSelectedOption(e.target.value);
    };

    const handleTextareaChange = (e) => {
        setIssueText(e.target.value);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(selectedOption);
        console.log(issueText);
    }

  return (
    <div className='w-screen h-screen bg-drkblue overflow-hidden'>
        <Logo/>
        <Cardlayout>
            <Heading>Raise Ticket</Heading>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col p-5 pt-2 items-center justify-center space-y-5 text-black'>
                    <select
                     className='w-10/12 p-3 rounded-2xl focus:outline-none bg-otpinpbg font-normal'
                     onChange={handleOptionChange}
                     value={selectedOption}
                    >
                        <option disabled value="">Choose your Issue</option>
                        <option>UserName not Recognized</option>
                        <option>Unable to Receive Verification Email</option>
                        <option>Other Login Issues</option>
                    </select>
                </div>
                <div className='flex flex-col p-5 pt-2 items-center justify-center space-y-5 text-black'>
                    <textarea className='w-10/12 p-3 rounded-2xl focus:outline-none bg-otpinpbg font-normal' 
                    placeholder='Describe your Issue'
                    rows={4}
                    value={issueText}
                    onChange={handleTextareaChange}
                    required={isother}
                    />
                </div>
                <Button className="mt-1">Submit</Button>
            </form>
        </Cardlayout>
        <Circles/>
    </div>
  )
}

export default Contactsupport