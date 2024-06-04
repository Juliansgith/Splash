import React, { useRef } from 'react';
import "../css/Settings.css";

const SettingsInterests = ({ isSettingOpen, onSettingClose }) => {
    const settingRef = useRef(null);

    const handleClose = () => {
        onSettingClose();
    };

    return (
        <div className={`settingoverlay ${isSettingOpen ? 'openedsetting' : ''}`}>
            <div className="settingdata" ref={settingRef}>
                <div className="settings-item">
                    <img className="set-icon" src="/assets/interests.svg"></img>
                    <p className="txt regular nomargin">Interests</p>
                    <img className="set-cross" src="/assets/cross.svg" onClick={handleClose}></img>
                </div>

                <hr />

                <form className="interestsform">
                    
                    <label className="setting-option-item">
                        <input type="checkbox" id="societytag" name="society_tag" value="society"/>
                        <div className="tag red">
                            <img src="/assets/tag.svg"></img>
                            <p>Society</p>
                        </div>
                        <span className="setting-option-input"></span>
                        <img className="check" src="/assets/checkmark.svg"></img>
                    </label>
                    
                    <label className="setting-option-item">
                        <input type="checkbox" id="healthtag" name="health_tag" value="health"/>
                        <div className="tag green">
                            <img src="/assets/tag.svg"></img>
                            <p>Health</p>
                        </div>
                        <span className="setting-option-input"></span>
                        <img className="check" src="/assets/checkmark.svg"></img>
                    </label>
                    
                    <label className="setting-option-item">
                        <input type="checkbox" id="worktag" name="work_tag" value="work"/>
                        <div className="tag blue">
                            <img src="/assets/tag.svg"></img>
                            <p>Work</p>
                        </div>
                        <span className="setting-option-input"></span>
                        <img className="check" src="/assets/checkmark.svg"></img>
                    </label>
                    
                    <label className="setting-option-item">
                        <input type="checkbox" id="educationtag" name="education_tag" value="education"/>
                        <div className="tag purple">
                            <img src="/assets/tag.svg"></img>
                            <p>Education</p>
                        </div>
                        <span className="setting-option-input"></span>
                        <img className="check" src="/assets/checkmark.svg"></img>
                    </label>
                    
                    <label className="setting-option-item">
                        <input type="checkbox" id="hobbiestag" name="hobbies_tag" value="hobbies"/>
                        <div className="tag orange">
                            <img src="/assets/tag.svg"></img>
                            <p>hobbies</p>
                        </div>
                        <span className="setting-option-input"></span>
                        <img className="check" src="/assets/checkmark.svg"></img>
                    </label>
                    <button className="apply-interests-btn">Apply</button>
                </form>
            </div>
        </div>
    );
};

export default SettingsInterests;