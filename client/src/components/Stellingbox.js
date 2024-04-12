import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Stellingbox.css";

function StellingKaart(props) {
  const goToGoogle = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div className="Stellingcontainer">
      <h1 className="Title">{props.title}</h1>
      <h2 className="Tag">{props.tag}</h2>
      <div className="CompanyRedirect">
        <div className="Company">
          <img src={props.imgcompany} className="Imgcompany" />
          <h2 className="Companytxt">{props.company}</h2>
        </div>
        <img
          src="assets/Arrowright.svg"
          className="Arrowimg"
          onClick={goToGoogle}
        />
      </div>
    </div>
  );
}

export default StellingKaart;
