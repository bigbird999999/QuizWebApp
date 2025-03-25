import React from 'react';
import { useState, useEffect } from 'react';
import Question from './Question';
import Result from './Result';
const AttemptQuiz = () => {
 const [questions,setQuestions]=useState([]);

  useEffect(()=>{
   
  const fetchQuestions = async() => {
    const response = await fetch("http://127.0.0.1:5000/questions")
    const data = await response.json()
    console.log("Fetched Questions: ",data.questions);
    setQuestions(data.questions)


  }
  fetchQuestions();
},[]); 


  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

const handleAnswerClick = (selectedOption) => {
    const correctAnswer=questions[currentQuestion].answerOption;
    //console.log(correctAnswer)
    if(selectedOption===correctAnswer){
      setScore(score+1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };
  
    if (questions.length === 0 || !questions[currentQuestion]) {
      return <p>Loading...</p>; // Placeholder for loading state
    }
   
  return(
    !showResult ? (
    <Question
      question={questions[currentQuestion].question}
      options={[questions[currentQuestion].option1,questions[currentQuestion].option2,questions[currentQuestion].option3,questions[currentQuestion].option4]}
      onSelect={handleAnswerClick}
    />
  ) : (
    <Result score={score} totalQuestions={questions.length} onRestart={restartQuiz} />
  ));
};
export default AttemptQuiz;
