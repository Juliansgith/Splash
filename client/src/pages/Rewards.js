import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode as jwt_decode } from "jwt-decode";
import NavBar from '../components/NavBar'; 
import Coupon from '../components/Coupon';
import "../css/Reward.css"

const RewardsManager = () => {
  const [points, setPoints] = useState(0);
  const [pointsToRedeem, setPointsToRedeem] = useState('');

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
        const response = await axios.get(`http://localhost:5000/points-balance?userId=${userId}`);
        setPoints(response.data.points);
      } catch (error) {
        console.error('Error fetching points:', error);
        alert('Failed to fetch points');
      }
    };

    if (userId) {
      fetchPoints();
    }
  }, [userId]);

  const handleRedeem = async () => {
    if (pointsToRedeem > points) {
      alert("You don't have enough points to redeem this amount.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/redeem-rewards', {
        userId,
        pointsToRedeem: parseInt(pointsToRedeem, 10)
      });
      alert(response.data.message);
      setPoints(response.data.newPointsBalance); 
      setPointsToRedeem(''); 
    } catch (error) {
      console.error('Error redeeming points:', error);
      alert('Failed to redeem points');
    }
  };

  return (
    <>
      <div className="app-container">
        <header className="top-container">
          <div className="logo-container">
            <h2 className="bold" style={{ margin: 7 }}>Splash</h2>
          </div>

          <div className="point-counter">
            <div className="number-container">
              <img src="/assets/PointBg1.svg" className="pbg"></img>
              <div className="point-container">
                <h2 className="point">1</h2>
              </div>
            </div>
            <div className="number-container">
              <img src="/assets/PointBg2.svg" className="pbg"></img>
              <div className="point-container">
                <h2 className="point">2</h2>
              </div>
            </div>
            <div className="number-container">
              <img src="/assets/PointBg3.svg" className="pbg"></img>
              <div className="point-container">
                <h2 className="point">3</h2>
              </div>
            </div>
            <div className="number-container">
              <img src="/assets/PointBg4.svg" className="pbg"></img>
              <div className="point-container">
                <img src="/assets/droplet.svg" className="spoint"></img>
              </div>
            </div>
          </div>
        </header>

        {/* <div className="rewards-manager">
          <h2>Manage Your Rewards</h2>
          <div className="points-display">
            <p>Your Points: {points}</p>
          </div>
          <div className="redeem-rewards">
            <input
              type="number"
              value={pointsToRedeem}
              onChange={e => setPointsToRedeem(e.target.value)}
              placeholder="Enter points to redeem"
              className="redeem-input"
            />
            <button onClick={handleRedeem} className="redeem-button">Redeem Points</button>
          </div>
        </div> */}

        <div className="reward-container">
          <div><Coupon pointsNeeded={200} pointsCollected={150} /></div>
          <div><Coupon pointsNeeded={200} pointsCollected={150} /></div>
          <div><Coupon pointsNeeded={200} pointsCollected={150} /></div>
          <div><Coupon pointsNeeded={200} pointsCollected={150} /></div>
          <div><Coupon pointsNeeded={200} pointsCollected={150} /></div>
          <div><Coupon pointsNeeded={200} pointsCollected={150} /></div>
        </div>
        

        
        <NavBar />
      </div>
    </>
  );
};

export default RewardsManager;
