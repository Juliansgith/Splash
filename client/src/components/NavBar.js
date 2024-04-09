// In NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      {isLoggedIn() && <>
        <span> | </span><Link to="/create" className="nav-link">Create New Questionnaire</Link>
        <span> | </span><Link to="/answers" className="nav-link">Answers</Link>
        <span> | </span><Link to="/account" className="nav-link">Account</Link>
        <span> | </span><button onClick={handleLogout} className="logoutbutton">Logout</button>
      </>}
      {!isLoggedIn() && <Link to="/login" className="nav-link">Login</Link>}
    </nav>
  );
}

export default NavBar;
