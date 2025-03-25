import React from 'react';
import '../App.css';
const Question = ({ question, options, onSelect }) => {
  return (<div className="Questions">
    <h1>Quiz Questions</h1>
    <div>
      <h3>{question}</h3>
      <ul>
      {options.map((option, index) => (
          <li key={index}>
            <button onClick={() => onSelect(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  </div>);
};

export default Question;
