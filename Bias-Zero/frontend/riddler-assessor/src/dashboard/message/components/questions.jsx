import React, { useState } from 'react'

function Questions({totalQuestions,setTotalQuestions,setEasy,setMedium,setHard,setVeryHard}) {
    
    
                           
    const [view,setView] = useState(Array.from({ length: totalQuestions.length }, () => false));
    const [selectedQuestions,setSelectedQuestions] = useState([])
    /*
    * This will add the selcted questions
    * When checked checked the question function will called because of onChange
    * and when it clicked again to be not checked again it will function because of onChange
    * removing tick is also considered as change
    * When first checked it calls function where it is not present is selected question so it added to selques
    * But when checkbox unchecked it calls again so if question is already present in selectedQuestions we need to remove it
    */
    const handleChange=(question)=>{
        const isSelcted = selectedQuestions.some(q => q.id === question.id);
        if(isSelcted)
        {
            setSelectedQuestions(selectedQuestions.filter(q => q.id !== question.id))
        }
        else
        {
            setSelectedQuestions([...selectedQuestions,question])
        }
    }
    /* This will update the totalquestions by removing the selected questions */
    const handleFinalize=()=>{
        const remainingQuestions = totalQuestions.filter(q => !selectedQuestions.some(sq => sq.id === q.id));
        setTotalQuestions(remainingQuestions)
        setEasy(
            selectedQuestions.filter(question=> question.difficulty==="easy")
        )
        setMedium(
            selectedQuestions.filter(question=> question.difficulty==="medium")
        )
        setHard(
            selectedQuestions.filter(question=> question.difficulty==="hard")
        )
        setVeryHard(
            selectedQuestions.filter(question=> question.difficulty==="veryhard")
        )
    }

    const handleView=(index)=>{
        const newarr = [...view]
        newarr[index] = !newarr[index]
        setView(newarr);
    }

  return (
    <div className='h-[360px] bg-ltblue rounded-md border-2 border-dkblue'>
        <div className='text-white font-bold text-xl ml-4'>Questions</div>
        {/* Single Question */}
        <div className='p-4 h-[80%] overflow-hidden overflow-y-scroll rounded-md'>
                {
                    totalQuestions.map((question,index)=>(
                    <div>
                        {/* Question box */}
                        {/* Check how the border changes for the belwo based on view boolean value */}
                        <div key={question.id} className={`bg-mdblue text-white h-10 flex items-center px-3 mt-2 justify-between ${ view[index] ? 'rounded-bl-none rounded-br-none rounded-md' : 'rounded-md'}`}>                            {/* Check box and question */}
                            <div className='flex items-center'>
                                <input
                                 type="checkbox"
                                 value={question.id}
                                 /* If the question is not is selectedquestion intially it will not checked we can click and make it checked */
                                 checked={selectedQuestions.some(q=>q.id===question.id)}
                                 className='text-white h-4 w-4'
                                 id={question.id}
                                  /* When checked and after finialized all the checked question will be passed to handlechange function to be added to selected questions */
                                  onChange={()=>handleChange(question)}/>
                                <div className='pl-3'>
                                    {index+1}. {question.question}
                                </div>
                            </div>
                            {/* Difficulty and view answer button */}
                            <div className='flex space-x-5 w-[210px] justify-between'>
                                <button 
                                 className='bg-white text-dkblue rounded-md px-2'
                                 onClick={()=>handleView(index)}
                                 key={question.id}
                                 >View Answer</button>
                                {
                                    question.difficulty=="easy" &&
                                    <div className='bg-[#39cb3e]  rounded-md px-1'>
                                        Easy
                                    </div>
                                }
                                {
                                    question.difficulty=="medium" &&
                                    <div className='bg-[#d653f4]  rounded-md px-1'>
                                        Medium
                                    </div>
                                }
                                {
                                    question.difficulty=="hard" &&
                                    <div className='bg-[#FF9800]  rounded-md px-1'>
                                        Hard
                                    </div>
                                }
                                {
                                    question.difficulty=="veryhard" &&
                                    <div className='bg-[#F44336]  rounded-md px-1'>
                                        Very Hard
                                    </div>
                                }
                            </div>
                        </div>
                        {/* Answer Box */}
                        {
                            view[index] && 
                            <div className='px-4 text-mdblue bg-white rounded-md rounded-tr-none rounded-tl-none'>
                                <p className='text-[15px]'>{question.answer}</p>
                            </div>
                        }
                    </div>
                    ))
                }
        </div>
        <div className='ml-4 w-[97%] flex justify-between mt-3'>
            <input type="text" className='bg-mdblue text-white w-72 px-1 rounded-md' placeholder='Enter prompt to Generate Questions'/>
            <button className=' bg-white rounded-md px-2' onClick={handleFinalize}>Select Questions</button>
        </div>
        
        {/* Genrate questions input*/}
    </div>
  )
}

export default Questions