import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

Modal.setAppElement('#root');

function LoginRegisterPopup({ setUserRole }) {
  const [modalIsOpen, setIsOpen] = useState(false);
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

  const navigate = useNavigate(); // Get the navigate function

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function toggleForm() {
    setIsLogin(!isLogin);
  }

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
    const apiUrl = 'http://localhost:5000'; // Adjust as necessary

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
            navigate('/'); // Redirect to the homepage
          } else {
            console.log('Login successful, no token received.');
          }
        } else {
          alert('Registration successful!');
          setIsLogin(true);
        }
        closeModal();
      })
      .catch(error => {
        alert(`Error: ${error.response ? error.response.data.message : 'Something went wrong'}`);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserRole(null);
    window.location.reload();
  };

  return (
    <div className="container">
      {localStorage.getItem('token') ? (
        <button onClick={handleLogout} className="logout-button">Logout</button>
      ) : (
        <button onClick={openModal} className="form-button">{isLogin ? 'Login/Register' : 'Register/Login'}</button>
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal-content">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required={!isLogin} className="form-input" />
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required={!isLogin} className="form-input" />
              <input type="text" name="postcode" placeholder="Postcode" value={formData.postcode} onChange={handleChange} required={!isLogin} className="form-input" />
            </>
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="form-input" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="form-input" />
          {!isLogin && (
            <>
              <input type="password" name="passwordConfirmation" placeholder="Confirm Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required={!isLogin} className={`form-input ${!passwordsMatch ? 'input-error' : ''}`} />
              {!passwordsMatch && <p className="error-message">Passwords do not match.</p>}
            </>
          )}
          <button type="submit" className="form-button">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        {isLogin ? (
          <p className="toggle-form-text" onClick={toggleForm}>No account? Create one here</p>
        ) : (
          <p className="toggle-form-text" onClick={toggleForm}>Already have an account? Log in here</p>
        )}
      </Modal>
    </div>
  );
}

export default LoginRegisterPopup;
