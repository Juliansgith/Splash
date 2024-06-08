// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function QuestionResults() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { questionnaires, nextQuestionnaireId } = location.state || {};

//   const handleNext = () => {
//     if (nextQuestionnaireId) {
//       navigate(`/questionnaire/${nextQuestionnaireId}`, {
//         state: { questionnaires },
//       });
//     } else {
//       navigate("/home");
//     }
//   };

//   return (
//     <div className="results-container">
//       <h2>Results Page</h2>
//       <button onClick={handleNext}>Next Question</button>
//     </div>
//   );
// }

// export default QuestionResults;

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
        setQuestion(response.data.questions[currentIndex]);
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
          <p>Gezondheid</p>
        </div>

        <div className="form">
          <h2>{question.questionText}</h2>
          <div className="results-form-title">
            <p>Results:</p>
            <p>12345 votes</p>
          </div>

          <div className="options">
            {question.options.map((option, index) => (
              <div key={index} className={`option-item-results`}>
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
          <div className="button-container">
            <button onClick={handleNext}>Next Question</button>
            <button className="bd-black bg-white">Share Results</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionResults;
