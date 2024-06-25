import React, { useRef, useState } from 'react';
import axios from 'axios';
import { jwtDecode as jwt_decode } from "jwt-decode";
import "../css/Settings.css";

const SettingsEditProfile = ({ isSettingOpen, onSettingClose }) => {
    const settingRef = useRef(null);
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const token = localStorage.getItem("token");
    const userId = token ? jwt_decode(token).userId : null;

    const handleClose = () => {
        onSettingClose();
    };

    const handleEmailChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/update-email`, {
                userId,
                newEmail
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error updating email.');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/update-password`, {
                userId,
                currentPassword,
                newPassword
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error updating password.');
        }
    };

    const handleNameChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/update-name`, {
                userId,
                newName
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error updating name.');
        }
    };

    return (
        <div className={`settingoverlay ${isSettingOpen ? 'openedsetting' : ''}`}>
            <div className="settingdata" ref={settingRef}>
                <div className="settings-item">
                    <img className="set-icon" src="/assets/editprofile.svg" alt="Edit profile" />
                    <p className="txt regular nomargin">Edit profile</p>
                    <img className="set-cross" src="/assets/cross.svg" alt="Close" onClick={handleClose} />
                </div>

                <hr />

                <form onSubmit={handleNameChange}>
                    <div className="form-group">
                        <label htmlFor="newName">New Name:</label>
                        <input
                            type="text"
                            id="newName"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Change Name</button>
                </form>

                <form onSubmit={handleEmailChange}>
                    <div className="form-group">
                        <label htmlFor="newEmail">New Email:</label>
                        <input
                            type="email"
                            id="newEmail"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Change Email</button>
                </form>

                <form onSubmit={handlePasswordChange}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Change Password</button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default SettingsEditProfile;
