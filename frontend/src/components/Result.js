import React, { useState } from 'react';
import HomePage from './HomePage';
import '../App.css';
const Result = ({ score, totalQuestions, onRestart }) => { 
  const [homepage,setHomepage]=useState(false); //Hook for going back to home screen
  return (
    !homepage?(<div className="result">
      <h2>Quiz Result</h2>
      <p>Your score is {score} out of {totalQuestions}.</p>
      <button onClick={onRestart}>Restart Quiz</button>
      <button onClick={()=>setHomepage(true)}>Back to Home Screen</button>
    </div>):(<HomePage />)
    
    
  );
};

export default Result;
