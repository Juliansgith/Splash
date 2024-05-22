import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/StartAnswer.css";

function AnswerStart() {
  const navigate = useNavigate();
  const [questionnaires, setQuestionnaires] = useState([]);

  const token = localStorage.getItem("token");
  const userId = token ? jwt_decode(token).userId : null;

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/all?userId=${userId}`)
        .then((response) => {
          setQuestionnaires(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [userId]);

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
      <p className="custommargin">Expected time to complete: 1 minute.</p>
      <div className="centerquestionicon">
        <img
          src="../assets/questionIcon.svg"
          className="questionIconsvg"
          alt="Question icon"
        />
      </div>
      <h1 className="bold">Up next 2 questions.</h1>
      <p className="custommarginv2">You will earn 20 points!</p>
      <button
      //  onClick={() => navigate(`/questionnaire/${questionnaire._id}`)}
      >
        Continue
      </button>
    </>
  );
}

export default AnswerStart;
