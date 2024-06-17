import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import "../css/Question.css";
import PointsButton from "./PointsButton";

function QuestionnaireDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { questionnaires = [] } = location.state || {};

  const totalLength = questionnaires.length;
  const currentIndex = questionnaires.findIndex(q => q._id === id);
  const nextQuestionnaireId = questionnaires[currentIndex + 1]?._id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/answers2/${id}`)
      .then((response) => {
        setQuestionnaire(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
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
      
      navigate(`/questionnaire/${nextQuestionnaireId}`, {
        state: { questionnaires, currentIndex }
      });
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit answers");
    }
  };

  const handleSkip = () => {
    if (nextQuestionnaireId) {
      navigate(`/questionnaire/${nextQuestionnaireId}`, {
        state: { questionnaires },
      });
    } else {
      navigate("/answerfinish");

    }
  };

  if (!questionnaire) return <div>Loading...</div>;

  return (

    <>
      <header className="question-header">
        <div className="question-header-items">
          <img
            src="../assets/cross.svg"
            className="return"
            alt="Return back to home"
            onClick={() => navigate("/home")}
          />
          <p>questions</p>
          <p className="opacity">{currentIndex + 1}/{totalLength}</p>
          <div className="points-button-wrapper">
            <PointsButton />
          </div>
        </div>
      </header>


      <div className="question-container">
        <div className="tag green">
          <img src="/assets/tag.svg" alt="Tag" />
          <p>Health</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          {questionnaire.Questions && questionnaire.Questions.map((q, index) => (
            <div key={index}>
              <h2>{q.questionText}</h2>
              <p>Make a choice:</p>
              <div className="options">
                {q.Options && q.Options.map((option, oIndex) => (
                  <label key={oIndex} className="option-item">
                    <input type="radio" name={`question-${index}`} value={option.text} />
                    {option.text}
                    <span className="option-input"></span>
                    <img className="check" src="/assets/checkmark.svg" alt="Checkmark" />
                  </label>
                ))}
              </div>
              <div className="company-info">
                <p>Question by:</p>
                <div className="Company">
                  {/* <img 
                    src="../public/assets/companyLogo.svg"
                    className="Imgcompany"
                    alt="Company Logo"
                  /> */}
                  <p>{questionnaire.company}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="button-container">
            <button type="submit" className="enable-anim" disabled={isButtonDisabled}>
              Submit Answers
            </button>
            <button onClick={handleSkip} className="bd-none bg-white">
              Skip
            </button>
          </div>
        </form>
      </div>
    </>

  );
}

export default QuestionnaireDetail;
