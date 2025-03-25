import React, { useState } from 'react';
import LoginPage from './LoginPage';
import AttemptQuiz from './AttemptQuiz';
import '../App.css';
const HomePage = () => {
  const [currentView, setCurrentView] = useState(null); //For rendering the correct page
  const [nextScreen, setNextScreen] = useState(false); //Hook for rendering quiz or admin login page as per users choice

  const handleButtonClick = (buttonNumber) => {
    // Reset all states to false first
    setCurrentView(null);
    setNextScreen(true);

    // Set the state for the clicked button
    switch (buttonNumber) {
      case 1:
        setCurrentView('adminLogin');
        break;
      case 2:
        setCurrentView('playQuiz');
        break;
      default:
        setCurrentView(null);
        break;
    }
  };

  return (
    <div>
      
      {nextScreen ? (
        <>
          
          {currentView === 'adminLogin' && <LoginPage />}
          {currentView === 'playQuiz' && <AttemptQuiz />}
        
        </>
      ) : (
        <>
        <div className="homepage">
          <h1>Quiz App</h1>
          <div className="buttonContainer">
          <button onClick={() => handleButtonClick(1)}>Admin Login</button>
          <button onClick={() => handleButtonClick(2)}>Play Quiz</button>
          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
