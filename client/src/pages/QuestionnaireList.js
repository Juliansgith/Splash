import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import "../css/QuestionnaireList.css"; // Ensure this file contains the above styles

function QuestionnaireList() {
  const navigate = useNavigate();
  const [questionnaires, setQuestionnaires] = useState([]);

  const token = localStorage.getItem("token");
  const userId = token ? jwt_decode(token).userId : null;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/all?userId=${userId}`)
      .then((response) => {
        setQuestionnaires(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="questionnaire-container">
      <h1 className="title">Open Questionnaires</h1>
      <div className="questionnaire-list">
        {questionnaires.map((questionnaire, index) => (
          <div key={questionnaire._id} className="questionnaire-card">
            <div className="Stellingcontainer">
              <h2 className="Title">{questionnaire.title}</h2>
              <h3 className="Tag">{questionnaire.tag}</h3>
              <div className="CompanyRedirect">
                <div className="Company">
                  <img
                    src="assets/AHcompany.svg"
                    className="Imgcompany"
                    alt="Company Logo"
                  />
                  <h3 className="Companytxt">{questionnaire.company}</h3>
                </div>
                <img
                  src="assets/Arrowright.svg"
                  className="Arrowimg"
                  alt="Navigate to Questionnaire"
                  onClick={() =>
                    navigate(`/questionnaire/${questionnaire._id}`)
                  }
                />
              </div>
            </div>
            <div className="carousel-nav">
              <span>
                {index + 1} of {questionnaires.length}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionnaireList;
