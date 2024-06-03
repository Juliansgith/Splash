import React from "react";
import ProgressBar from "./ProgressBar";

const ChallengeBox = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <div className="challengebox">
        <div className="challengerow">
          <svg
            className="iconcalendar"
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.75 2C6.75 1.17157 6.07842 0.5 5.25 0.5C4.42158 0.5 3.75 1.17157 3.75 2V3.5H2.25C1.00736 3.5 0 4.50736 0 5.75V8H21V5.75C21 4.50736 19.9926 3.5 18.75 3.5H17.2501V2C17.2501 1.17157 16.5786 0.5 15.7502 0.5C14.9217 0.5 14.2501 1.17157 14.2501 2V3.5H6.75V2ZM21 9.875H0V19.25C0 20.4926 1.00736 21.5 2.25 21.5H18.75C19.9926 21.5 21 20.4926 21 19.25V9.875Z"
              fill="#456EFF"
            />
          </svg>
          <div className="challengecolumn">
            <h2 className="nomargin">Weekly goals</h2>
            <p className="nomargin">Answer 10 questions this week</p>
          </div>
        </div>

        <ProgressBar token={token} />

        <div className="challengerow">
          <p className="nomargin opacity">This challenge ends in two days</p>
          <div className="points">
            <p>+100</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="16"
              viewBox="0 0 12 16"
              fill="none"
            >
              <path
                d="M6 16C4.2875 16 2.85938 15.3573 1.71563 14.0718C0.571875 12.7863 0 11.1863 0 9.27179C0 8.42393 0.175 7.57607 0.525 6.7282C0.875 5.88034 1.3125 5.06667 1.8375 4.28718C2.3625 3.50769 2.93125 2.77607 3.54375 2.09231C4.15625 1.40855 4.725 0.813675 5.25 0.307692C5.35 0.198291 5.46563 0.119658 5.59688 0.0717949C5.72813 0.0239316 5.8625 0 6 0C6.1375 0 6.27188 0.0239316 6.40313 0.0717949C6.53438 0.119658 6.65 0.198291 6.75 0.307692C7.275 0.813675 7.84375 1.40855 8.45625 2.09231C9.06875 2.77607 9.6375 3.50769 10.1625 4.28718C10.6875 5.06667 11.125 5.88034 11.475 6.7282C11.825 7.57607 12 8.42393 12 9.27179C12 11.1863 11.4281 12.7863 10.2844 14.0718C9.14062 15.3573 7.7125 16 6 16Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChallengeBox;
