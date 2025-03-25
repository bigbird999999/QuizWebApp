import React, { useEffect, useState } from 'react';

const ShowQuestions = () => {
    const [questions,setQuestions]=useState([]); //Hook for storing the questions from the database after it is fetched
     useEffect(()=>{
      
     const fetchQuestions = async() => {
       const response = await fetch("http://127.0.0.1:5000/questions") //Fetching the questions
       const data = await response.json()
       console.log("Fetched Questions: ",data.questions);
       setQuestions(data.questions)
      
   
     }
     fetchQuestions();
   },[]); 
  return (
    <div className="showQuestions">
      <h2>Quiz Questions</h2>
      {questions.map((question) => (
        <div key={question.id} style={{ marginBottom: '20px' }}>
          <h3>Question ID: {question.id}</h3>
          <h4>{question.question}</h4>
          <ul>
            <li>{question.option1}</li>
            <li>{question.option2}</li>
            <li>{question.option3}</li>
            <li>{question.option4}</li>
          </ul>
          <p>Correct Answer: {question.answerOption}</p>
        </div>
      ))}
    </div>
  );
};



export default ShowQuestions;