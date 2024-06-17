import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";

function AnswerFinish() {
  const [questionnaires, setQuestionnaires] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = token ? jwt_decode(token).userId : null;

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/all?userId=${userId}`)
        .then((response) => {
          setQuestionnaires(response.data);
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
      <div className=""></div>
    </>
  );
}

export default AnswerFinish;
