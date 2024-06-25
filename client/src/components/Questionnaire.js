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
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const { questionnaires = [] } = location.state || {};

  useEffect(() => {
    console.log("Location state: ", location.state); // Debugging output
    console.log("Questionnaires: ", questionnaires); // Debugging output

    axios
      .get(`${process.env.REACT_APP_API_URL}/answers2/${id}`)
      .then((response) => {
        console.log("Fetched questionnaire: ", response.data); // Debugging output
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

  const calculateResults = (questions) => {
    return questions.map((q) => {
      const totalVotes = q.Options.reduce((sum, option) => sum + option.count, 0);
      return q.Options.map((option) => ({
        text: option.text,
        percentage: totalVotes ? (option.count / totalVotes) * 100 : 0,
      }));
    });
  };

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
  
      await axios.post(`${process.env.REACT_APP_API_URL}/answer/${id}`, {
        answers,
        userId,
      });
      alert("Answers submitted successfully");

      const updatedQuestionnaire = await axios.get(`${process.env.REACT_APP_API_URL}/answers2/${id}`);
      setResults(calculateResults(updatedQuestionnaire.data.Questions));
      setShowResults(true);

      setTimeout(() => {
        const isLastQuestion = currentIndex === questionnaires.length - 1;
        if (isLastQuestion) {
          navigate(`/answerfinish/${id}`);
        } else {
          navigate(`/questionnaire/${nextQuestionnaireId}`, {
            state: { questionnaires, currentIndex }
          });
        }
      }, 8000); // Delay before navigating to the finish page
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit answers");
    }
  };

  const handleSkip = () => {
    const isLastQuestion = currentIndex === questionnaires.length - 1;
    if (isLastQuestion) {
      navigate(`/answerfinish/${id}`);
    } else {
      navigate(`/questionnaire/${nextQuestionnaireId}`, {
        state: { questionnaires },
      });
    }
  };

  if (!questionnaire) return <div>Loading...</div>;

  const questionsCount = questionnaire.Questions ? questionnaire.Questions.length : 0;

  // Calculate the current index and total length based on the questionnaire state
  const currentIndex = questionnaires.findIndex(q => q.id === parseInt(id));
  const nextQuestionnaireId = questionnaires[currentIndex + 1]?._id;

  // Debugging output
  console.log("Current Index: ", currentIndex);
  console.log("Questions Count: ", questionsCount);

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
          <p className="opacity">{currentIndex + 1}/{questionsCount}</p>
          <div className="points-button-wrapper">
          </div>
        </div>
      </header>

      <div className="question-container">
        {showResults ? (
          <div>
            {results.map((result, qIndex) => (
              <div key={qIndex}>
                <h2>Question {qIndex + 1} Results:</h2>
                {result.map((option, oIndex) => (
                  <div key={oIndex} className="option-item-results">
                    <span>{option.text}</span>
                    <div className="option-bar" style={{ width: `${option.percentage}%` }} />
                    <span>{option.percentage.toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
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
                    <p>{questionnaire.company}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="button-container">
              <button type="submit" className="enable-anim" disabled={isButtonDisabled}>
                Submit Answers
              </button>
              <button type="button" onClick={handleSkip} className="bd-none bg-white">
                Skip
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default QuestionnaireDetail;
