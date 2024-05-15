import React, { useState } from "react";
import "../css/PointsButton.css"; // Import your CSS file

function PointsButton() {
  const [expanded, setExpanded] = useState(true);

  const handleButtonClick = () => {
    setExpanded(!expanded);
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`pointsbtn ${expanded ? "expanded" : ""}`}
      id="pointsbtn"
    >
      <img src="assets/Droplet.svg" className="Dropletsvg" alt="Droplet logo" />
      {expanded && (
        <div className="expandedContent">
          <p>200</p>
        </div>
      )}
    </button>
  );
}

export default PointsButton;
