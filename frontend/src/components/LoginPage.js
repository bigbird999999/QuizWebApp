import React,{ useState } from 'react';
import HomePage from './HomePage';
import AdminDashboard from './AdminDashboard';
import '../App.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [homeScreen,setHomeScreen]=useState('Form'); //For rendering the loginpage and can be changed to go to home screen
  const [dashboard,setDashboard]=useState(false); //For displaying admin dashboard on successful login
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const data = {
        username,password 
    };
    const url = "http://127.0.0.1:5000/login" //Fetching the username and password for admin login
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options)
    
    if (response.status !== 401) { //if response is not 401(Unauthorized)
        const data = await response.json()
        console.log('Login Successful',response.status)
        setDashboard(true);
        
    }
    else{
        setError('Invalid User or Password');
    }
    
  };
  const handleBackToHomescreen = () => {
    setHomeScreen('homePage');
    // Reset current view to go back to homepage
  };
  return (
    <>
  {!dashboard ? (
    <>

      {homeScreen === 'Form' && (
        <div className="login">
          <h1>Admin Login. Please enter your credentials.</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
          </div>
          <button onClick={handleBackToHomescreen}>Back to Home Screen</button>
        </div>
      )}
      
      {homeScreen === 'homePage' && <HomePage />}
    </>
  ) : (
    <AdminDashboard />
  )}
</>

   
  );
}

export default LoginPage;