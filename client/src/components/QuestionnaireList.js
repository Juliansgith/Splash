// Importing necessary modules and hooks from React, react-router-dom, axios, and jwt-decode
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';

// Defining a functional component named QuestionnaireList
function QuestionnaireList() {
  // useNavigate is a hook from react-router-dom to programmatically navigate
  const navigate = useNavigate();
  // useState hook to manage the state of questionnaires, initially an empty array
  const [questionnaires, setQuestionnaires] = useState([]);
  // Retrieving a token from local storage, which could be null if not present
  const token = localStorage.getItem('token');
  // Decoding the token to get the userId, if token is not null; else userId is null
  const userId = token ? jwt_decode(token).userId : null;

  // useEffect hook to perform a side effect (data fetching) in the component
  useEffect(() => {
    // Using axios to make a GET request to fetch all questionnaires for the given userId
    axios.get(`http://localhost:5000/all?userId=${userId}`)
      .then(response => {
        // Setting the fetched questionnaires to state if the request is successful
        setQuestionnaires(response.data);
      })
      .catch(error => console.log(error)); // Logging error to the console if the request fails
  }, []); // Empty dependency array means this effect runs once after the initial render
  
  // Rendering the component
  return (
    <div className="questionnaire-container">
      <h2>Open questionnaires</h2> {/* Displaying the header */}
      <div className="questionnaire-list">
        { // Mapping over the questionnaires state to display each questionnaire
          questionnaires.map((questionnaire) => (
            <div key={questionnaire._id} className="questionnaire-item">
              <h3 className="questionnaire-title">{questionnaire.title}</h3>
              {/* Button to navigate to a questionnaire detail page, using the navigate function */}
              <button onClick={() => navigate(`/questionnaire/${questionnaire._id}`)} className="open-button">Open</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// Exporting the QuestionnaireList component to be used elsewhere in the application
export default QuestionnaireList;
