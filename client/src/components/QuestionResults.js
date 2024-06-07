import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function QuestionResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionnaires, nextQuestionnaireId } = location.state || {};

  const handleNext = () => {
    if (nextQuestionnaireId) {
      navigate(`/questionnaire/${nextQuestionnaireId}`, {
        state: { questionnaires },
      });
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="results-container">
      <h2>Results Page</h2>
      <button onClick={handleNext}>Next Question</button>
    </div>
  );
}

export default QuestionResults;
