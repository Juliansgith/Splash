import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import "../css/Stellingbox.css"; // Ensure this file contains the above styles

function QuestionnaireList() {
  const navigate = useNavigate();
  const [questionnaires, setQuestionnaires] = useState([]);
  const token = localStorage.getItem('token');
  const userId = token ? jwt_decode(token).userId : null;

  useEffect(() => {
    axios.get(`http://localhost:5000/all?userId=${userId}`)
      .then(response => {
        setQuestionnaires(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="questionnaire-container">
      <h1 className="title">Open Questionnaires</h1>
      <div className="questionnaire-list">
        {questionnaires.map(questionnaire => (
          <div key={questionnaire._id} className="questionnaire-card">
            <div className="questionnaire-content">
              <h2>{questionnaire.title}</h2>
              <button onClick={() => navigate(`/questionnaire/${questionnaire._id}`)}>Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionnaireList;
