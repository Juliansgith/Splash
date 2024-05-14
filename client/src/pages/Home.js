import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../css/Home.css";
import { Pagination } from "swiper/modules";
import NavBar from '../components/NavBar'; 

function Home() {
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
      <header className="top-container">
        <div className="logo-container">
          <h2 className="bold">Splash</h2>
        </div>
      </header>

      <div className="questionnaire-container">
        <div className="questionnaire-list">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={25}
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
                      <p className="txt medium">{questionnaire.company}</p>
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
      <NavBar />
    </>
  );
}

export default Home;
