import React, { useState, useEffect } from "react";
import "../css/PointsButton.css";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";

function PointsButton() {
  const [expanded, setExpanded] = useState(true);

  const handleButtonClick = () => {
    setExpanded(!expanded);
  };

  const [points, setPoints] = useState(0);

  const getUserIdFromJWT = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      return decoded.userId;
    }
    return null;
  };

  const userId = getUserIdFromJWT();

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/points-balance?userId=${userId}`
        );
        setPoints(response.data.points);
      } catch (error) {
        console.error("Error fetching points:", error);
        alert("Failed to fetch points");
      }
    };

    if (userId) {
      fetchPoints();
    }
  }, [userId]);

  return (
    <button
      onClick={handleButtonClick}
      className={`pointsbtn ${expanded ? "expanded" : ""}`}
      id="pointsbtn"
    >
      <img
        src="/assets/droplet.svg"
        className="Dropletsvg"
        alt="Droplet logo"
      />
      {expanded && (
        <div className="expandedContent">
          <p className="txt medium">{points}</p>
        </div>
      )}
    </button>
  );
}

export default PointsButton;
