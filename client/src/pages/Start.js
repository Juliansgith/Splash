import LoginPopup from '../components/LoginPopup';
import { Link, useNavigate } from 'react-router-dom';

function Start() {
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; 
  };

  return (
    <>
      <h1>Splash</h1>

      {/* {!isLoggedIn() && <Link to="/login" className="nav-link">Log in</Link>}
      {!isLoggedIn() && <Link to="/register" className="nav-link">Sign-up</Link>} */}

      <Link to="/login" className="nav-link">Log in</Link>
      <Link to="/register" className="nav-link">Sign-up</Link>
    </>
  );
}


export default Start;
