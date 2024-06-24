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
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`127.0.0.1:8000/assessor/save-qa/`, {
        method: 'GET',
        credentials: 'same-origin', // include cookies (including CSRF tokens) from the same origin
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'), // Include CSRF token from cookie
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const questions = await response.json();

      // Categorize questions by difficulty
      const easyQuestions = questions.filter(q => q.difficulty === 'easy');
      const mediumQuestions = questions.filter(q => q.difficulty === 'medium');
      const hardQuestions = questions.filter(q => q.difficulty === 'hard');
      const veryHardQuestions = questions.filter(q => q.difficulty === 'very hard');

      // Update state with categorized questions
      setEasy(easyQuestions);
      setMedium(mediumQuestions);
      setHard(hardQuestions);
      setVeryHard(veryHardQuestions);
      setTotalQuestions(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Handle error state or logging as needed
    }
  };

  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

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
      <Questions
        totalQuestions={totalQuestions}
        setTotalQuestions={setTotalQuestions}
        setEasy={setEasy}
        setMedium={setMedium}
        setHard={setHard}
        setVeryHard={setVeryHard}
      />
    </div>
  );
}

export default Message;
