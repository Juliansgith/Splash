import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';

function QuestionnaireDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/user/${id}`)
      .then(response => {
        setQuestionnaire(response.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const answers = {};
    for (let [key, value] of formData.entries()) {
      const questionIndex = key.split('-')[1];
      answers[questionIndex] = value;
    }
  
    try {
      const token = localStorage.getItem('token'); 
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      await axios.post(`http://localhost:5000/answer/${id}`, { answers, userId });
      alert('Answers submitted successfully');
      navigate('/'); 
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Failed to submit answers');
    }
  };

  if (!questionnaire) return <div>Loading...</div>;

  return (
    <div className="questionnaire-detail-container">
      <h2>{questionnaire.title}</h2>
      <form onSubmit={handleSubmit} className="questionnaire-detail-form">
        {questionnaire.questions.map((q, index) => (
          <div key={index} className="question-item">
            <h3 className="question-text">{q.questionText}</h3>
            {q.options.map((option, oIndex) => (
              <label key={oIndex} className="option-label">
                <input type="radio" name={`question-${index}`} value={option.text} className="option-input" /> {option.text}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-button">Submit Answers</button>
      </form>
    </div>
  );
}

export default QuestionnaireDetail;
