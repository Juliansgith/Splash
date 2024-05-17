import React, { useState, useEffect } from 'react';
import "../css/Reward.css";
import RewardPopup from './RewardPopup';


function Coupon({ pointsNeeded, pointsCollected}) {
    const percentComplete = (pointsCollected / pointsNeeded) * 100;

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div className="coupon-container">
            <div className="banner">
                <img src="/assets/AHlogo.svg" className="logo"></img>
            </div>
            
            <div className="point coupon">
                <p className="txt medium white">{pointsNeeded}</p>
                <img src="/assets/droplet.svg" className="pointlogo"></img>
            </div>

            <h2 className="bold">5% korting op biologische producten</h2>
            <p className="txt medium">Albert Heijn</p>
            <button className="redeem-btn bg-white txt semibold" disabled={pointsCollected < pointsNeeded} onClick={togglePopup}>
                <div style={{ zIndex: 1 }}>{ pointsCollected<pointsNeeded ? `Nog ${pointsNeeded-pointsCollected} punten nodig` : "Activeren"}</div>
                <div className="progress-bar" style={{ width: `${percentComplete}%` }}></div>
                <RewardPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                    <div className="wrap-1">
                        <img src="/assets/AHcompany.svg"></img>
                        <h2 className="bold">5% korting op biologische producten</h2>
                    </div>
                    <div className="wrap-2">
                        <p className="txt regular">Bij Albert Heijn</p>
                        <div className="point">
                            <p className="txt medium white">{pointsNeeded}</p>
                            <img src="/assets/droplet.svg" className="pointlogo"></img>
                        </div>
                    </div>
                </RewardPopup>
            </button>
        </div>
    );
}

export default Coupon;