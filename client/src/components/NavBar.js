// In NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // Checks if the token exists
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirects to the home page after logout
    // Optionally, force reload to clear user state
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      {isLoggedIn() && <>
        <span> | </span><Link to="/create" className="nav-link">Create New Questionnaire</Link>
        <span> | </span><Link to="/answers" className="nav-link">Answers</Link>
        <span> | </span><button onClick={handleLogout} className="nav-link">Logout</button>
      </>}
      {!isLoggedIn() && <Link to="/login" className="nav-link">Login</Link>}
    </nav>
  );
}

export default NavBar;
