import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import "../css/Question.css";

function QuestionnaireDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Add state for button disabled
  const { questionnaires = [] } = location.state || {}; // Ensures questionnaires is an array even if location.state is undefined or empty

  const totalLength = questionnaires.length;
  const currentIndex = questionnaires.findIndex((q) => q._id === id);
  const nextQuestionnaireId = questionnaires[currentIndex + 1]?._id;
  const prevQuestionnaireId = questionnaires[currentIndex - 1]?._id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/answers2/${id}`)
      .then((response) => {
        setQuestionnaire(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    // Enable the button after the animation is complete (e.g., 5 seconds)
    const timer = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000); // Duration of your animation

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const answers = {};
    for (let [key, value] of formData.entries()) {
      const questionIndex = key.split("-")[1];
      answers[questionIndex] = value;
    }

    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      await axios.post(`http://localhost:5000/answer/${id}`, {
        answers,
        userId,
      });
      alert("Answers submitted successfully");
      if (nextQuestionnaireId) {
        navigate(`/questionnaire/${nextQuestionnaireId}`, {
          state: { questionnaires },
        });
      } else {
        navigate("/answerfinish");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit answers");
    }
  };

  if (!questionnaire) return <div>Loading...</div>;

  return (
    <div className="question-container">
      <p>
        {currentIndex} out of {totalLength} questions answered
      </p>

      <div className="tag green">
        <img src="/assets/tag.svg" alt="Tag" />
        <p>Gezondheid</p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        {questionnaire.Questions &&
          questionnaire.Questions.map((q, index) => (
            <div key={index}>
              <h2>{q.questionText}</h2>
              <p>Maak een keuze:</p>
              <div className="options">
                {q.Options &&
                  q.Options.map((option, oIndex) => (
                    <label key={oIndex} className="option-item">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option.text}
                      />{" "}
                      {option.text}
                      <span className="option-input"></span>
                      <img
                        className="check"
                        src="/assets/checkmark.svg"
                        alt="Checkmark"
                      />
                    </label>
                  ))}
              </div>
            </div>
          ))}
        <button
          type="submit"
          className="enable-anim"
          disabled={isButtonDisabled}
        >
          Submit Answers
        </button>
      </form>
    </div>
  );
}

export default QuestionnaireDetail;
