import React, { useState, useEffect } from 'react';
import "../css/Reward.css";
import RewardPopup from './RewardPopup';
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";

function Coupon({ pointsNeeded, pointsCollected }) {
    const [points, setPoints] = useState(0);
    const [pointsToRedeem, setPointsToRedeem] = useState("");
    const percentComplete = (pointsCollected / pointsNeeded) * 100;

    useEffect(() => {
        setPointsToRedeem(pointsNeeded.parseInt);
    }, [pointsNeeded]);

    const getUserIdFromJWT = () => {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwt_decode(token);
          return decoded.userId;
        }
        return null;
    };

    const userId = getUserIdFromJWT();

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleActivate = async () => {
        console.log('Beloning geactiveerd!');
        if (pointsToRedeem > points) {
            alert("You don't have enough points to redeem this amount.");
            return;
        }
      
        try {
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/redeem-rewards`,
              {
                userId,
                pointsToRedeem: parseInt(pointsToRedeem, 10),
              }
            );
            alert(response.data.message);
            setPoints(response.data.newPointsBalance);
            setPointsToRedeem("");
        } catch (error) {
            console.error("Error redeeming points:", error);
            alert("Failed to redeem points");
        }
    };

    return (
        <div className="coupon-container">
            <div className="banner">
                <img src="/assets/AHlogo.svg" className="logo" alt="logo"></img>
            </div>
            
            <div className="point coupon">
                <p className="txt medium white">{pointsNeeded}</p>
                <img src="/assets/droplet.svg" className="pointlogo" alt="pointlogo"></img>
            </div>

            <h2 className="bold">5% korting op biologische producten</h2>
            <p className="txt medium">Albert Heijn</p>
            <button className="redeem-btn bg-white txt semibold" disabled={pointsCollected < pointsNeeded} onClick={togglePopup}>
                <div style={{ zIndex: 1 }}>{pointsCollected < pointsNeeded ? `Nog ${pointsNeeded - pointsCollected} punten nodig` : "Activeren"}</div>
                <div className="progress-bar" style={{ width: `${percentComplete}%` }}></div>
            </button>
            <RewardPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onActivate={handleActivate}>
                <div className="wrap-1">
                    <img src="/assets/AHcompany.svg" alt="company"></img>
                    <h2 className="bold">5% korting op biologische producten</h2>
                </div>
                <div className="wrap-2">
                    <p className="txt regular">Bij Albert Heijn</p>
                    <div className="point">
                        <p className="txt medium white">{pointsNeeded}</p>
                        <img src="/assets/droplet.svg" className="pointlogo" alt="pointlogo"></img>
                    </div>
                </div>
            </RewardPopup>
        </div>
    );
}

export default Coupon;
