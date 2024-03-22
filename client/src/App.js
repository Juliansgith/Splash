import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import NavBar from './components/NavBar'; 
import QuestionnaireList from './components/QuestionnaireList';
import QuestionnaireDetails from './components/QuestionnaireDetails';
import CreateQuestionnaire from './components/CreateQuestionnaire';
import QuestionnaireDetail from './components/QuestionnaireDetail'; 
import LoginRegisterPopup from './components/LoginRegisterPopup';
import Answers from './components/Answers';

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setUserRole(decoded.role);
    }
  }, []);
  
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Splash</h1>
          <NavBar userRole={userRole} />
        </header>
        <div className="main-content">
        <Routes>
          <Route path="/" element={<QuestionnaireList />} />
          <Route path="/answers" element={<Answers />} />
          {userRole === 'admin' && <Route path="/create" element={<CreateQuestionnaire />} />}
          <Route path="/questionnaire/:id" element={<QuestionnaireDetail />} />
          <Route path="/answers/:id" element={<QuestionnaireDetails />} />
          <Route path="/login" element={<LoginRegisterPopup setUserRole={setUserRole} />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
