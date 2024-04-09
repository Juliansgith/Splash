import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";
import NavBar from './components/NavBar'; 
import QuestionnaireList from './components/QuestionnaireList';
import QuestionnaireDetails from './components/QuestionnaireDetails';
import CreateQuestionnaire from './components/CreateQuestionnaire';
import QuestionnaireDetail from './components/QuestionnaireDetail'; 
import LoginRegisterPopup from './components/LoginRegisterPopup';
import Answers from './components/Answers';
import Account from './components/accounts';
import StellingKaart from "./components/Stellingbox";

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
      <div className="App">
//         <h1>Questionnaire Application</h1>
//         <nav>
//           <LoginRegisterPopup setUserRole={setUserRole} />
//           <Link to="/">Home</Link>
//           {userRole === "admin" && (
//             <span>
//               {" "}
//               | <Link to="/create">Create New Questionnaire</Link>
//             </span>
//           )}
//           <Link to="/stellingkaart">Stelling Component</Link>
//         </nav>
//         <Routes>
//           <Route path="/" element={<QuestionnaireList />} />
//           {userRole === "admin" && (
//             <Route path="/create" element={<CreateQuestionnaire />} />
//           )}
//           <Route path="/questionnaire/:id" element={<QuestionnaireDetail />} />
//           <Route path="/stellingkaart" element={<StellingKaart />} />
//         </Routes>
//         <StellingKaart
//           title="Mensen vanaf 65 jaar moeten gratis met trein, tram en bus kunnen reizen."
//           tag="Gezondheid"
//           company="Albert Heijn"
//           imgcompany="assets/AHcompany.svg"
//         />
        <header className="header">
          <h1>Splash</h1>
          <NavBar userRole={userRole} />
        </header>
        <div className="main-content">
        <Routes>
          <Route path="/" element={<QuestionnaireList />} />
          <Route path="/answers" element={<Answers />} />
          <Route path="/account" element={<Account />} />
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
