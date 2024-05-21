import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../css/Auth.css"

function RegisterPopup({ setUserRole }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    postcode: '',
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    setPasswordsMatch(formData.password === passwordConfirmation);
  }, [formData.password, passwordConfirmation]);

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function validateDutchPostcode(postcode) {
    return /^[0-9]{4}[a-zA-Z]{2}$/.test(postcode);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const apiUrl = 'http://localhost:5000';
    const endpoint = isLogin ? '/login' : '/register';
    const data = isLogin ? {
      email: formData.email,
      password: formData.password,
    } : {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      city: formData.city,
      postcode: formData.postcode,
    };

    if (!isLogin && !validateDutchPostcode(formData.postcode)) {
      alert('Please fill in a valid postal code');
      return;
    }

    axios.post(`${apiUrl}${endpoint}`, data)
      .then(response => {
        if (isLogin) {
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            console.log('Login successful, token saved.');
            navigate('/home'); // Navigate to home on successful login
          } else {
            console.log('Login successful, no token received.');
          }
        } else {
          alert('Registration successful!');
          setIsLogin(true);
        }
      })
      .catch(error => {
        alert(`Error: ${error.response ? error.response.data.message : 'Something went wrong'}`);
      });
  }

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="bold authtitle">Create account</h1>
        <p className="txt regular space">To use Splash, you must first create an account.</p>
        <form onSubmit={handleSubmit}>
          <p className="txt large medium nomargin">Name</p>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="form-input" />
          {/* <p className="txt large medium nomargin">City</p>
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="form-input" />
          <p className="txt large medium nomargin">Postal code</p>
          <input type="text" name="postcode" placeholder="Postcode" value={formData.postcode} onChange={handleChange} required className="form-input" /> */}
          <p className="txt large medium nomargin">Email</p>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="form-input" />
          <p className="txt large medium nomargin">Password</p>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="form-input" />
          <p className="txt large medium nomargin">Confirm password</p>
          <input type="password" name="passwordConfirmation" placeholder="Confirm Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required={!isLogin} className={`form-input ${!passwordsMatch ? 'input-error' : ''}`} />

          {!passwordsMatch && <p className="error-message">Passwords do not match.</p>}

          <div className="submit-container">
            <button type="submit" className="submit">Sign up</button>
            <Link to="/login" className="toggle-form-text">Already have an account? Log in here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPopup;
