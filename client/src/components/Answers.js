import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Answers() {
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/inactivequestionnaires');
        setQuestionnaires(response.data);
      } catch (error) {
        console.error('There was an error fetching the inactive questionnaires:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {questionnaires.map((questionnaire, index) => (
        <div key={index}>
          <h3>{questionnaire.title}</h3>
          {questionnaire.questions.map((question, qIndex) => (
            <div key={qIndex}>
              <p>{question.text}</p>
              {question.answers.map((answer, aIndex) => (
                <p key={aIndex}>{answer.text}: {answer.selectedTimes}</p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Answers;
