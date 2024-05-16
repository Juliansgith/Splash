import React from 'react';
import "../css/Reward.css";


function Coupon({ pointsNeeded, pointsCollected}) {
    const percentComplete = (pointsCollected / pointsNeeded) * 100;

    return (
        <div className="coupon-container">
            <div className="banner">
                <img src="/assets/AHlogo.svg" className="logo"></img>
            </div>
            
            <h2 className="bold">5% korting op biologische producten</h2>
            <p className="txt medium">Albert Heijn</p>
            <button className="redeem-btn bg-white txt semibold" disabled={pointsCollected < pointsNeeded}>
                <div style={{ zIndex: 1 }}>{ !pointsCollected<pointsNeeded ? `Nog ${pointsNeeded-pointsCollected} punten nodig` : "Activeren"}</div>
                <div className="progress-bar" style={{ width: `${percentComplete}%` }}></div>
            </button>
        </div>
    );
}

export default Coupon;