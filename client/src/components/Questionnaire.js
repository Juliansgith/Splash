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
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Add state for button disabled
  const { questionnaires } = location.state || { questionnaire: null };

  const totalLength = questionnaires.length;
  const currentIndex = questionnaires.findIndex((q) => q._id === id);
  const nextQuestionnaireId = questionnaires[currentIndex + 1]?._id;
  const prevQuestionnaireId = questionnaires[currentIndex - 1]?._id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${id}`)
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

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const answers = {};
  //   for (let [key, value] of formData.entries()) {
  //     const questionIndex = key.split("-")[1];
  //     answers[questionIndex] = value;
  //   }

  //   try {
  //     const token = localStorage.getItem("token");
  //     const decodedToken = jwt_decode(token);
  //     const userId = decodedToken.userId;

  //     await axios.post(`http://localhost:5000/answer/${id}`, {
  //       answers,
  //       userId,
  //     });
  //     alert("Answers submitted successfully");
  //     if (nextQuestionnaireId) {
  //       navigate(`/questionnaire/${nextQuestionnaireId}`, {
  //         state: { questionnaires },
  //       });
  //     } else {
  //       navigate("/home");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting answers:", error);
  //     alert("Failed to submit answers");
  //   }
  // };

  const handleNext = () => {
    if (nextQuestionnaireId) {
      navigate(`/questionnaire/${nextQuestionnaireId}`, {
        state: { questionnaires },
      });
    } else {
      navigate("/home");
    }
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

      await axios.post(`http://localhost:5000/answer/${id}`, {
        answers,
        userId,
      });
      alert("Answers submitted successfully");
      navigate(`/results/${id}`, {
        state: { questionnaires, currentIndex, nextQuestionnaireId },
      });
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit answers");
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
          <p className="opacity">
            {currentIndex + 1}/{totalLength}
          </p>
          <div className="points-button-wrapper">
            <PointsButton />
          </div>
        </div>
      </header>

      <div className="question-container">
        <div className="tag green">
          <img src="/assets/tag.svg"></img>
          <p>Gezondheid</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          {questionnaire.questions.map((q, index) => (
            <div key={index}>
              <h2>{q.questionText}</h2>
              <p>Maak een keuze:</p>
              <div className="options">
                {q.options.map((option, oIndex) => (
                  <label key={oIndex} className="option-item">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.text}
                    />{" "}
                    {option.text}
                    <span className="option-input"></span>
                    <img className="check" src="/assets/checkmark.svg"></img>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="button-container">
            <button
              type="submit"
              className="enable-anim"
              disabled={isButtonDisabled}
            >
              Submit Answers
            </button>
            <button onClick={handleNext} className="bd-none bg-white">
              Skip
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default QuestionnaireDetail;
