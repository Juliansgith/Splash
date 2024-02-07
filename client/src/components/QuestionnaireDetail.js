import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';

function QuestionnaireDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/${id}`)
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

  if (!questionnaire) return <div>Aan het laden...</div>;

  return (
    <div>
      <h2>{questionnaire.title}</h2>
      <form onSubmit={handleSubmit}>
        {questionnaire.questions.map((q, index) => (
          <div key={index}>
            <h3>{q.questionText}</h3>
            {q.options.map((option, oIndex) => (
              <div key={oIndex}>
                <label>
                  <input type="radio" name={`question-${index}`} value={option.text} /> {option.text}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit Answers</button>
      </form>
    </div>
  );
}

export default QuestionnaireDetail;
