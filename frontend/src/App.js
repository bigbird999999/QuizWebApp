import React from "react";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import AttemptQuiz from "./components/AttemptQuiz";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route path="/loginpage" element={<LoginPage />}></Route>
        <Route path="/playquiz" element={<AttemptQuiz />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
