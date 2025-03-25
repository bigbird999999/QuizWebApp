import React from 'react';
import { useState } from 'react';
import '../App.css';
const AddQuestion = () => {
    const [question,setQuestion]=useState("");
    const [option1,setOption1]=useState("");
    const [option2,setOption2]=useState("");
    const [option3,setOption3]=useState("");
    const [option4,setOption4]=useState("");
    const [answerOption,setAnswerOption]=useState("");
    const [isSubmitted, setIsSubmitted] = useState(false); // State to track if form is submitted successfully
    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            question,option1,option2,option3,option4,answerOption
        };
     
      
        const url = "http://127.0.0.1:5000/create_question"; //Fetching the request
        

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if(response.status===201 && response.status===200){
            setIsSubmitted(true);
        }
        setIsSubmitted(true);
        if (response.status !== 201 && response.status !== 200) { //if response is 200 (OK) or 201 (Created)
            const data = await response.json()
            alert(data.message)
            setIsSubmitted(false);
        }
    };
    const renderSuccessMessage = () =>(
        <div>
             <p>Question successfully added!</p>
        </div>
    )
  return (
    <div className="AddQuestions">
      <h2>Add Question</h2>
     {!isSubmitted? (<form onSubmit={onSubmit}>
            <div>
                <label htmlFor="question">Add Question:</label>
                <input
                    type="text"
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="option1">Option 1:</label>
                <input
                    type="text"
                    id="option1"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="option2">Option 2:</label>
                <input
                    type="text"
                    id="option2"
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="option3">Option 3:</label>
                <input
                    type="text"
                    id="option3"
                    value={option3}
                    onChange={(e) => setOption3(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="option4">Option 4:</label>
                <input
                    type="text"
                    id="option4"
                    value={option4}
                    onChange={(e) => setOption4(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="answerOption">Answer Option:</label>
                <input
                    type="text"
                    id="answerOption"
                    value={answerOption}
                    onChange={(e) => setAnswerOption(e.target.value)}
                />
            </div>
            <button type="submit">Add Question</button>
        </form>):(renderSuccessMessage())
}
    </div>
  );
};

export default AddQuestion;
