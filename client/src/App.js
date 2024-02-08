import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionnaireList from './components/QuestionnaireList';
import CreateQuestionnaire from './components/CreateQuestionnaire';
import QuestionnaireDetail from './components/QuestionnaireDetail'; 

import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Questionnaire Application</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/create">Create New Questionnaire</Link>
        </nav>
        <Routes>
          <Route path="/" element={<QuestionnaireList />} />
          <Route path="/create" element={<CreateQuestionnaire />} />
          <Route path="/questionnaire/:id" element={<QuestionnaireDetail />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
