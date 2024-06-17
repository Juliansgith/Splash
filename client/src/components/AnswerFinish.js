import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";
import "../css/AnswerFinish.css";

function AnswerFinish() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = token ? jwt_decode(token).userId : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000); // 3-second delay before redirecting to home

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigate]);

  return (
    <div className="answer-finish-container">
      <h1>Thank you for answering the questions!</h1>
      <p>Your points have been allocated.</p>
    </div>
  );
}

export default AnswerFinish;
