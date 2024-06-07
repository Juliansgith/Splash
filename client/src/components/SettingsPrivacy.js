import React, { useRef } from 'react';
import "../css/Settings.css";

const SettingsPrivacy = ({ isSettingOpen, onSettingClose }) => {
    const settingRef = useRef(null);

    const handleClose = () => {
        onSettingClose();
    };

    return (
        <div className={`settingoverlay ${isSettingOpen ? 'openedsetting' : ''}`}>
            <div className="settingdata" ref={settingRef}>
                <div className="settings-item">
                    <img className="set-icon" src="/assets/privacy.svg"></img>
                    <p className="txt regular nomargin">Privacy</p>
                    <img className="set-cross" src="/assets/cross.svg" onClick={handleClose}></img>
                </div>

                <hr />

                <div className="setting-option-item">
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider"></span>
                    </label>
                    <p className="txt medium">This is totally a setting</p>
                </div>
                <div className="setting-option-item">
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider"></span>
                    </label>
                    <p className="txt medium">This is totally a setting</p>
                </div>

            </div>
        </div>
    );
};

export default SettingsPrivacy;