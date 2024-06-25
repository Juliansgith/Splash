import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function QuestionnaireDetails() {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);

  useEffect(() => {
    fetchQuestionnaire(id);
  }, [id]);

  const fetchQuestionnaire = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/answers2/${id}`);
      setQuestionnaire(response.data);
    } catch (error) {
      console.error('Error fetching questionnaire:', error);
    }
  };

  return (
    <div>
      {questionnaire ? (
        <div className="details-container">
          <h2>{questionnaire.title}</h2>
          <h3>Questions:</h3>
          {questionnaire.questions.map((question, index) => (
            <div key={index} className="question">
              <p className="question-text">{question.questionText}</p>
              <ul className="option-list">
                {question.options.map((option, index) => (
                  <li key={index} className="option-item">
                    {option.text}: {option.count}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>No questionnaire selected.</h2>
        </div>
      )}
    </div>
  );
}

export default QuestionnaireDetails;
