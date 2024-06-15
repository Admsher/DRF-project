import React, { useState, useEffect } from 'react';
import Easy from './components/easy';
import Medium from './components/medium';
import Hard from './components/hard';
import VeryHard from './components/veryhard';
import Questions from './components/questions';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Message() {
  const [easy, setEasy] = useState([]);
  const [medium, setMedium] = useState([]);
  const [hard, setHard] = useState([]);
  const [veryhard, setVeryHard] = useState([]);

  const [totalQuestions, setTotalQuestions] = useState([]);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `127.0.0.1:8000/assessor/save-qa/`, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const questions = JSON.parse(xhr.responseText);
          setTotalQuestions(questions);

          // Sort questions based on difficulty
          setEasy(questions.filter(q => q.difficulty === 'easy'));
          setMedium(questions.filter(q => q.difficulty === 'medium'));
          setHard(questions.filter(q => q.difficulty === 'hard'));
          setVeryHard(questions.filter(q => q.difficulty === 'very hard'));
        } else {
          console.error('There was an error fetching the questions!', xhr.statusText);
        }
      }
    };
    xhr.send();
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

