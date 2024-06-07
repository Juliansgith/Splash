import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/Settings.css";
import SettingsEditProfile from './SettingsEditProfile';
import SettingsHelpDesk from './SettingsHelpDesk';
import SettingsInterests from './SettingsInterests';
import SettingsNotifications from './SettingsNotifications';
import SettingsPrivacy from './SettingsPrivacy';
import SettingsAccessibility from './SettingsAccessibility';

const SettingsPopup = ({ isOpen, onClose }) => {
    const popupRef = useRef(null);
    const [startY, setStartY] = useState(null);
    const navigate = useNavigate();

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose();
            closeAllSettings();
        }
    };

    const handleTouchStart = (event) => {
        setStartY(event.touches[0].clientY);
    };

    const handleTouchMove = (event) => {
        if (!startY) return;

        const currentY = event.touches[0].clientY;
        const diffY = currentY - startY;

        if (diffY > 200) { // Adjust the threshold as needed
            onClose();
            closeAllSettings();
        }
    };

    const closeAllSettings = () => {
        setIsEditOpen(false);
        setIsHelpOpen(false);
        setIsInterestOpen(false);
        setIsNotifOpen(false);
        setIsPrivacyOpen(false);
        setIsAccessOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleTouchStart);
            document.addEventListener('touchmove', handleTouchMove);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isOpen]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); 
        window.location.reload();
    };

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isInterestOpen, setIsInterestOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
    const [isAccessOpen, setIsAccessOpen] = useState(false);

    const toggleSetting = (settingType) => {
        closeAllSettings();
        switch (settingType) {
            case "edit":
                setIsEditOpen(!isEditOpen);
                break;
            case "help":
                setIsHelpOpen(!isHelpOpen);
                break;
            case "interest":
                setIsInterestOpen(!isInterestOpen);
                break;
            case "notif":
                setIsNotifOpen(!isNotifOpen);
                break;
            case "privacy":
                setIsPrivacyOpen(!isPrivacyOpen);
                break;
            case "access":
                setIsAccessOpen(!isAccessOpen);
                break;
            default:
                break;
        }
    };

    return (
        <div className={`overlay ${isOpen ? 'open' : ''}`}>
            <div className="settingspopup" ref={popupRef}>
                <div className="settings-item" onClick={() => toggleSetting("edit")}>
                    <img className="set-icon" src="/assets/editprofile.svg" alt="Edit profile"/>
                    <p className="txt regular nomargin">Edit profile</p>
                    <img className="set-arrow" src="/assets/setarrow.svg" alt="Arrow"/>
                </div>
                <div className="settings-item" onClick={() => toggleSetting("help")}>
                    <img className="set-icon" src="/assets/helpdesk.svg" alt="Help desk"/>
                    <p className="txt regular nomargin">Help desk</p>
                    <img className="set-arrow" src="/assets/setarrow.svg" alt="Arrow"/>
                </div>
                <div className="settings-item" onClick={() => toggleSetting("interest")}>
                    <img className="set-icon" src="/assets/interests.svg" alt="Interests"/>
                    <p className="txt regular nomargin">Interests</p>
                    <img className="set-arrow" src="/assets/setarrow.svg" alt="Arrow"/>
                </div>
                <div className="settings-item" onClick={() => toggleSetting("notif")}>
                    <img className="set-icon" src="/assets/notifications.svg" alt="Notifications"/>
                    <p className="txt regular nomargin">Notifications</p>
                    <img className="set-arrow" src="/assets/setarrow.svg" alt="Arrow"/>
                </div>
                <div className="settings-item" onClick={() => toggleSetting("privacy")}>
                    <img className="set-icon" src="/assets/privacy.svg" alt="Privacy"/>
                    <p className="txt regular nomargin">Privacy</p>
                    <img className="set-arrow" src="/assets/setarrow.svg" alt="Arrow"/>
                </div>
                <div className="settings-item" onClick={() => toggleSetting("access")}>
                    <img className="set-icon" src="/assets/accessibility.svg" alt="Accessibility"/>
                    <p className="txt regular nomargin">Accessibility</p>
                    <img className="set-arrow" src="/assets/setarrow.svg" alt="Arrow"/>
                </div>
                <div className="settings-item" onClick={handleLogout}>
                    <img className="set-icon" src="/assets/logout.svg" alt="Log out"/>
                    <p className="txt regular nomargin">Log out</p>
                    <img className="set-arrow" src="/assets/setarrow.svg" alt="Arrow"/>
                </div>
                <SettingsEditProfile isSettingOpen={isEditOpen} onSettingClose={() => setIsEditOpen(false)} />
                <SettingsHelpDesk isSettingOpen={isHelpOpen} onSettingClose={() => setIsHelpOpen(false)} />
                <SettingsInterests isSettingOpen={isInterestOpen} onSettingClose={() => setIsInterestOpen(false)} />
                <SettingsNotifications isSettingOpen={isNotifOpen} onSettingClose={() => setIsNotifOpen(false)} />
                <SettingsPrivacy isSettingOpen={isPrivacyOpen} onSettingClose={() => setIsPrivacyOpen(false)} />
                <SettingsAccessibility isSettingOpen={isAccessOpen} onSettingClose={() => setIsAccessOpen(false)} />
            </div>
        </div>
    );
};

export default SettingsPopup;
