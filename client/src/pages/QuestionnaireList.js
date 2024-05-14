import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../css/QuestionnaireList.css";
import { Pagination } from "swiper/modules";

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
        console.log(questionnaires);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="questionnaire-container">
        <h1 className="title">Open Questionnaires</h1>
        <div className="questionnaire-list">
          <Swiper
            slidesPerView={1.1}
            spaceBetween={0}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {questionnaires.map((questionnaire, index) => (
              <SwiperSlide>
                <div key={questionnaire._id} className="Stellingcontainer">
                  <div
                    className={questionnaire.tag === "" && "test2" + "test"}
                  />
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default QuestionnaireList;
