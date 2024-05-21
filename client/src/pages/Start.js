import LoginPopup from '../components/LoginPopup';
import { Link, useNavigate } from 'react-router-dom';
import "../css/Auth.css"

function Start() {
  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; 
  };

  return (
    <div className="page-container">
      <div className="start-logo">
        <img src="/assets/splashLogo.png"></img>
        <h1 className="logo">Splash</h1>
      </div>

      <p className="txt regular quote">Splash: Your Opinion Matters of Splash: Opinions that Reward, Insights that Transform.</p>

      <div className="start-buttons">
        <Link to="/login" className=""><button>Log in</button></Link>
        <Link to="/register" className=""><button className="bg-white">Sign-up</button></Link>
      </div>
      
    </div>
  );
}


export default Start;
