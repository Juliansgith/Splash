import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Profile.css"; // Import the CSS file for the progress bar styles
import { jwtDecode as jwt_decode } from 'jwt-decode';

function ProgressBar({ token }) {
  const [score, setScore] = useState(0);
  let userId;

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      userId = decodedToken.userId;
      console.log("Decoded userId:", userId);
    } catch (error) {
      console.error("Invalid token specified:", error);
    }
  }

  useEffect(() => {
    if (userId) {
      console.log("Making request to backend with userId:", userId);
      axios
        .get(`http://localhost:5000/getinformation?userId=${userId}`)
        .then((response) => {
          console.log("Response data:", response.data); 
          setScore(Math.min(response.data.score, 10));
        })
        .catch((error) => console.log("Error fetching data:", error));
    }
  }, [userId]);

  return (
    <div className="progressbar">
      <div className="progress" style={{ width: `${(score / 10) * 100}%` }}></div>
      <div className="droplet">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="30"
          viewBox="0 0 26 30"
          fill="#456EFF"
        >
          <path d="M13 30C9.28958 30 6.19531 28.7949 3.71719 26.3846C1.23906 23.9744 0 20.9744 0 17.3846C0 15.7949 0.379167 14.2051 1.1375 12.6154C1.89583 11.0256 2.84375 9.5 3.98125 8.03846C5.11875 6.57692 6.35104 5.20513 7.67812 3.92308C9.00521 2.64103 10.2375 1.52564 11.375 0.576923C11.5917 0.371795 11.8422 0.224359 12.1266 0.134615C12.4109 0.0448718 12.7021 0 13 0C13.2979 0 13.5891 0.0448718 13.8734 0.134615C14.1578 0.224359 14.4083 0.371795 14.625 0.576923C15.7625 1.52564 16.9948 2.64103 18.3219 3.92308C19.649 5.20513 20.8813 6.57692 22.0187 8.03846C23.1562 9.5 24.1042 11.0256 24.8625 12.6154C25.6208 14.2051 26 15.7949 26 17.3846C26 20.9744 24.7609 23.9744 22.2828 26.3846C19.8047 28.7949 16.7104 30 13 30Z" />
        </svg>
        <span className="scoreText">{score}</span>
      </div>
      <div className={`dropletgoal ${score === 10 ? 'goal-reached' : ''}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="30"
          viewBox="0 0 26 30"
          fill={score === 10 ? "#456EFF" : "#f5f3ef"}
        >
          <path d="M13 30C9.28958 30 6.19531 28.7949 3.71719 26.3846C1.23906 23.9744 0 20.9744 0 17.3846C0 15.7949 0.379167 14.2051 1.1375 12.6154C1.89583 11.0256 2.84375 9.5 3.98125 8.03846C5.11875 6.57692 6.35104 5.20513 7.67812 3.92308C9.00521 2.64103 10.2375 1.52564 11.375 0.576923C11.5917 0.371795 11.8422 0.224359 12.1266 0.134615C12.4109 0.0448718 12.7021 0 13 0C13.2979 0 13.5891 0.0448718 13.8734 0.134615C14.1578 0.224359 14.4083 0.371795 14.625 0.576923C15.7625 1.52564 16.9948 2.64103 18.3219 3.92308C19.649 5.20513 20.8813 6.57692 22.0187 8.03846C23.1562 9.5 24.1042 11.0256 24.8625 12.6154C25.6208 14.2051 26 15.7949 26 17.3846C26 20.9744 24.7609 23.9744 22.2828 26.3846C19.8047 28.7949 16.7104 30 13 30Z" />
        </svg>
        <span className="scoreText">10</span>
      </div>
    </div>
  );
}

export default ProgressBar;