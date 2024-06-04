import React, { useRef } from 'react';
import "../css/Settings.css";

const SettingsEditProfile = ({ isSettingOpen, onSettingClose }) => {
    const settingRef = useRef(null);

    const handleClose = () => {
        onSettingClose();
    };

    return (
        <div className={`settingoverlay ${isSettingOpen ? 'openedsetting' : ''}`}>
            <div className="settingdata" ref={settingRef}>
                <div className="settings-item">
                    <img className="set-icon" src="/assets/editprofile.svg"></img>
                    <p className="txt regular nomargin">Edit profile</p>
                    <img className="set-cross" src="/assets/cross.svg" onClick={handleClose}></img>
                </div>

                <hr />
                
            </div>
        </div>
    );
};

export default SettingsEditProfile;