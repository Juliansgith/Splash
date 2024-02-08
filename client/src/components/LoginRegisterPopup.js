import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

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
      alert('Please enter a valid Dutch postcode.');
      return;
    }
  
    axios.post(`${apiUrl}${endpoint}`, data)
      .then(response => {
        if (isLogin) {
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            window.location.reload();
            console.log('Login successful, token saved.');
          } else {
            console.log('Login successful, no token received.');
          }
        } else {
          alert('Registration successful!');
          setIsLogin(true); // Optionally switch to login form
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
    <div>
      {localStorage.getItem('token') ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={openModal}>{isLogin ? 'Login/Register' : 'Register/Login'}</button>
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required={!isLogin} />
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required={!isLogin} />
              <input type="text" name="postcode" placeholder="Postcode" value={formData.postcode} onChange={handleChange} required={!isLogin} />
            </>
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        {isLogin ? (
          <p style={{color: 'blue', cursor: 'pointer'}} onClick={toggleForm}>Nog geen account? Registreer hier</p>
        ) : (
          <p style={{color: 'blue', cursor: 'pointer'}} onClick={toggleForm}>Already have an account? Login here</p>
        )}
      </Modal>
    </div>
  );
        }  

export default LoginRegisterPopup;
