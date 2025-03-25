import React,{ useState }from 'react';

import AddQuestion from './AddQuestion';
import ShowQuestions from './ShowQuestions';
import UpdateQuestion from './UpdateQuestion';
import DeleteQuestion from './DeleteQuestion';
import LoginPage from './LoginPage';
import '../App.css';
function AdminDashboard() {
  const [currentView, setCurrentView] = useState(null); //React hook for displaying the result of correct CRUD operation
  const [crudButtonDisappear, setCrudButtonDisappear]=useState(true); //React hook for implementing the logout functionality
  const handleButtonClick = (buttonNumber) => {
  
    setCurrentView(null);

    // Set the state for the clicked button
    switch (buttonNumber) {
      case 1:
        setCurrentView('addQuestions');
        break;
      case 2:
        setCurrentView('deleteQuestions');
        break;
      case 3:
        setCurrentView('updateQuestions');
        break;
      case 4:
        setCurrentView('showQuestions');
        break;
      case 5:
        setCurrentView('loginPage');
        setCrudButtonDisappear(false);
        break;
      default:
        setCurrentView(null);
        break;
    }
  };



  return (
    <div>
      <div className="adminMenu">
      {crudButtonDisappear && (<button onClick={() => handleButtonClick(1)}>Add Questions</button>)}
      {crudButtonDisappear && (<button onClick={() => handleButtonClick(2)}>Delete Questions</button>)}
      {crudButtonDisappear && (<button onClick={() => handleButtonClick(3)}>Update Questions</button>)}
      {crudButtonDisappear && (<button onClick={() => handleButtonClick(4)}>Show Questions</button>)}
      {crudButtonDisappear && (<button onClick={()=>handleButtonClick(5)}>Logout</button>)}
      </div>
      {currentView === 'addQuestions' && <AddQuestion />}
      {currentView === 'deleteQuestions' && <DeleteQuestion />}
      {currentView === 'updateQuestions' && <UpdateQuestion />}
      {currentView === 'showQuestions' && <ShowQuestions />}
      {currentView === 'loginPage' && <LoginPage />}
     
    </div>
  );
}

export default AdminDashboard;
