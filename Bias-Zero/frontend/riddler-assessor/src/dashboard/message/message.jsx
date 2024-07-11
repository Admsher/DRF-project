import React, { useState, useEffect } from 'react';
import Easy from './components/easy';
import Medium from './components/medium';
import Hard from './components/hard';
import VeryHard from './components/veryhard';
import Questions from './components/questions';
import axios from 'axios';

function Message() {
  const [easy, setEasy] = useState([]);
  const [medium, setMedium] = useState([]);
  const [hard, setHard] = useState([]);
  const [veryhard, setVeryHard] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/assessor/get-qa/');
        const questions = response.data;

        const formattedQuestions = Object.keys(questions).map(key => ({
          question: questions[key].question,
          answer: questions[key].answer,
          difficulty: questions[key].difficulty
        }));

        setTotalQuestions(formattedQuestions);

        // Sort questions based on difficulty
        setEasy(formattedQuestions.filter(q => q.difficulty.toLowerCase() === 'easy'));
        setMedium(formattedQuestions.filter(q => q.difficulty.toLowerCase() === 'medium'));
        setHard(formattedQuestions.filter(q => q.difficulty.toLowerCase() === 'hard'));
        setVeryHard(formattedQuestions.filter(q => q.difficulty.toLowerCase() === 'very hard'));
      } catch (error) {
        console.error('There was an error fetching the questions!', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      {/* Question categories */}
      <div className='bg-dkblue my-6 mb-2 h-[200px] flex items-center px-5 justify-between'>
        <Easy easy={easy} setEasy={setEasy} />
        <Medium medium={medium} setMedium={setMedium} />
        <Hard hard={hard} setHard={setHard} />
        <VeryHard veryhard={veryhard} setVeryHard={setVeryHard} />
      </div>
      {/* Question selection */}
      <h2 className='font-bold ml-4 text-dkblue'>Select Questions</h2>
      <Questions totalQuestions={totalQuestions} setTotalQuestions={setTotalQuestions} setEasy={setEasy} setMedium={setMedium} setHard={setHard} setVeryHard={setVeryHard} />
    </div>
  );
}

export default Message;