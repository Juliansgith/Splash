// Answers component with applied CSS classes for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../css/Answers.css"

function Answers() {
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    fetchQuestionnaires();
  }, []);

  const fetchQuestionnaires = async () => {
    try {
      const response = await axios.get('http://localhost:5000/answers');
      setQuestionnaires(response.data);
    } catch (error) {
      console.error('Error fetching questionnaires:', error);
    }
  };

  return (
    <div className="answers-container">
      <h2>Answers:</h2>
      {questionnaires.map((questionnaire) => (
        <div key={questionnaire._id} className="questionnaire-item">
          <h3 className="questionnaire-title">{questionnaire.title}</h3>
          <Link to={`/answers/${questionnaire._id}`} className="open-link">
            <button className="open-button">Open</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Answers;
