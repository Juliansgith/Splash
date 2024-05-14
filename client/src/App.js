import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";
import NavBar from './components/NavBar'; 
import Home from './pages/Home';
import QuestionnaireDetails from './components/QuestionnaireDetails';
import CreateQuestionnaire from './pages/CreateQuestionnaire';
import QuestionnaireDetail from './components/Questionnaire'; 
import LoginPopup from './components/LoginPopup';
import RegisterPopup from "./components/RegisterPopup";
import Answers from './pages/Answers';
import Account from './pages/Profile';
import Start from './pages/Start';
import RewardsPage from './pages/Rewards';

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      setUserRole(decoded.role);
    }
  }, []);

  return (
    <Router>
      {/* <div className="App"> */}
        {/* <div className="main-content"> */}
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/home" element={<Home />} />
            <Route path="/answers" element={<Answers />} />
            <Route path="/account" element={<Account />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/login" element={<LoginPopup setUserRole={setUserRole} />} />
            <Route path="/register" element={<RegisterPopup setUserRole={setUserRole} />} />
            {userRole === 'admin' && <Route path="/create" element={<CreateQuestionnaire />} />}
            <Route path="/questionnaire/:id" element={<QuestionnaireDetail />} />
            <Route path="/answers/:id" element={<QuestionnaireDetails />} />
            
          </Routes>
        {/* </div> */}
      {/* </div> */}
    </Router>
  );
}

export default App;