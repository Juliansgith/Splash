// In NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/navbar.css"

function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
    window.location.reload();
  };

  const currentPath = window.location.pathname;
  const selectedItem = currentPath === '/rewards' ? 'rewards' :
                       currentPath === '/account' ? 'account' : 'home';

  return (
    
    <nav className="navbar">

      <Link to="/" className="nav-link">
        <div className="img-containter">
          <img src="assets/home.svg" className={`nav-icon ${selectedItem === 'home' ? 'selected' : ''}`} />
        </div>
        <span className={`nav-text ${selectedItem === 'home' ? 'selected' : ''}`}>Home</span>
      </Link>

      <Link to="/rewards" className="nav-link">
        <div className="img-containter">
          <img src="assets/reward.svg" className={`nav-icon ${selectedItem === 'rewards' ? 'selected' : ''}`} />
        </div>
        <span className={`nav-text ${selectedItem === 'rewards' ? 'selected' : ''}`}>Rewards</span>
      </Link>

      <Link to="/account" className="nav-link">
        <div className="img-containter">
          <img src="assets/profile.svg" className={`nav-icon ${selectedItem === 'account' ? 'selected' : ''}`} />
        </div>
        <span className={`nav-text ${selectedItem === 'account' ? 'selected' : ''}`}>Profile</span>
      </Link>

      {/* Code for login and logout buttons + link to create and see answers */}
      
      {/* <button onClick={handleLogout} className="logoutbutton">Logout</button> */}
      {/* <Link to="/create" className="nav-link">Create New Questionnaire</Link> */}
      {/* <Link to="/answers" className="nav-link">Answers</Link> */}
      {/* {!isLoggedIn() && <Link to="/login" className="nav-link">Login</Link>} */}

    </nav>
  );
}

export default NavBar;
