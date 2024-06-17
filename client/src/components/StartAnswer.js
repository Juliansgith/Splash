import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../css/StartAnswer.css";

function AnswerStart() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Retrieve the questionnaire ID from the URL
  const [questionnaire, setQuestionnaire] = useState(null); // Store the questionnaire details
  const { questionnaires = [] } = location.state || {};
  const totalLength = questionnaires.length;
  const token = localStorage.getItem("token");
  const userId = token ? jwt_decode(token).userId : null;
  const totalPoints = questionnaires.reduce(
    (sum, questionnaire) => sum + questionnaire.qpoints,
    0
  );

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/answers2/${id}`) // Fetch the specific questionnaire details
        .then((response) => {
          setQuestionnaire(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  return (
    <>
      <div className="returndiv">
        <img
          src="../assets/cross.svg"
          className="return"
          alt="Return back to home"
          onClick={() => navigate("/home")}
        />
      </div>
      {questionnaire && questionnaire.Questions ? (
        <>
          <p className="custommargin">Expected time to complete: 1 minute.</p>
          <div className="centerquestionicon">
            <img
              src="../assets/questionIcon.svg"
              className="questionIconsvg"
              alt="Question icon"
            />
          </div>
          <h1 className="bold">
            Up next {questionnaire.Questions.length} questions.
          </h1>
          <p className="custommarginv2">You will earn {totalPoints} points!</p>{" "}
          <button onClick={() => navigate(`/questionnaire/${id}`)}>
            {" "}
            {/* Use the ID from the URL */}
            Continue
          </button>
        </>
      ) : (
        <p className="custommargin">Loading questionnaire...</p>
      )}
    </>
  );
}

export default AnswerStart;
