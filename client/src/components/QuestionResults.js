import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PointsButton from "./PointsButton";
import "../css/Question.css";

function QuestionResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { questionnaires, currentIndex, nextQuestionnaireId } =
    location.state || {};

  const [question, setQuestion] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${id}`)
      .then((response) => {
        setQuestion(response.data);
        // console.log(response.data.questions[currentIndex]);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [id, currentIndex]);

  const handleNext = () => {
    if (nextQuestionnaireId) {
      navigate(`/questionnaire/${nextQuestionnaireId}`, {
        state: { questionnaires },
      });
    } else {
      navigate("/home");
    }
  };

  if (!question) return <div>Loading...</div>;

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
          <p className="opacity">
            {currentIndex + 1}/{questionnaires.length}
          </p>
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

        {question.questions.map((q, index) => (
          <div className="form">
            <h2>{q.questionText}</h2>
            <div className="results-form-title">
              <p>Results:</p>
              <p>12345 votes</p>
            </div>

            <div key="index" className="options">
              {q.options.map((option, oIndex) => (
                <div key={oIndex} className={`option-item-results`}>
                  {option.text}
                  <span className="option-input"></span>
                  <img
                    className="check"
                    src="/assets/checkmark.svg"
                    alt="Check"
                  />
                  <div>
                    <p>10%</p>
                  </div>
                </div>
              ))}
            </div>

            <div key="index" className="company-info">
              <p>Question by:</p>
              <div className="Company">
                <img
                  src="/assets/AHcompany.svg"
                  className="Imgcompany"
                  alt="Company Logo"
                />
                <p>{question.company}</p>
              </div>
            </div>
            <div className="button-container">
              <button onClick={handleNext}>Next Question</button>
              <button className="bd-black bg-white">Share Results</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default QuestionResults;
