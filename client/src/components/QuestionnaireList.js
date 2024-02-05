import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function QuestionnaireList() {
  const navigate = useNavigate();
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/all') 
      .then(response => {
        setQuestionnaires(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>In te vullen Questionnaires</h2>
      {questionnaires.map((questionnaire) => (
        <div key={questionnaire._id}>
          <h3>{questionnaire.title}</h3>
          <button onClick={() => navigate(`/questionnaire/${questionnaire._id}`)}>Open</button>
        </div>
      ))}
    </div>
  );
}

export default QuestionnaireList;
