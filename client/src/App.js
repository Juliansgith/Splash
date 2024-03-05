import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import QuestionnaireList from './components/QuestionnaireList';
import QuestionnaireDetails from './components/QuestionnaireDetails'
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
        <h1>Splash</h1>
        <nav>
          <LoginRegisterPopup setUserRole={setUserRole} />
          <Link to="/">Home</Link>
          {userRole === 'admin' && <span> | <Link to="/create">Create New Questionnaire</Link></span>} 
          {userRole === 'admin' && <span> | <Link to="/answers">Answers</Link></span>} 
        </nav>
        <Routes>
          <Route path="/answers" element={<Answers />} />
          {userRole === 'admin' && <Route path="/create" element={<CreateQuestionnaire />} />} 
          <Route path="/questionnaire/:id" element={<QuestionnaireDetail />} />
          <Route path="/answers/:id" element={<QuestionnaireDetails />} /> {/* Use QuestionnaireDetail component to display questionnaire details */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
