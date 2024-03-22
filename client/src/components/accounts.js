import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';

function Account() {
  const [userDetails, setUserDetails] = useState({});
  const token = localStorage.getItem('token');
  const userId = token ? jwt_decode(token).userId : null;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;

      try {
        const { data } = await axios.get(`http://localhost:5000/userdetails/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div>
      <h2>Account Details</h2>
      <p>Email: {userDetails.email}</p>
      <p>Points: {userDetails.points}</p>
    </div>
  );
}

export default Account;
