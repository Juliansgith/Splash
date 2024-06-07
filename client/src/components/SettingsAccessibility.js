import React, { useRef, useState, useEffect } from 'react';
import "../css/Settings.css";

const useTheme = () => {
    const [theme, setTheme] = useState(() => {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    });
  
    const [highContrast, setHighContrast] = useState(() => {
      return localStorage.getItem('high-contrast') === 'true';
    });
  
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      if (highContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      localStorage.setItem('theme', theme);
      localStorage.setItem('high-contrast', highContrast);
    }, [theme, highContrast]);
  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
  
    const toggleHighContrast = () => {
      setHighContrast((prevHighContrast) => !prevHighContrast);
    };
  
    return [theme, highContrast, toggleTheme, toggleHighContrast];
  };

const SettingsAccessibility = ({ isSettingOpen, onSettingClose }) => {
    const settingRef = useRef(null);
    const [theme, highContrast, toggleTheme, toggleHighContrast] = useTheme();

    const handleClose = () => {
        onSettingClose();
    };

    return (
        <div className={`settingoverlay ${isSettingOpen ? 'openedsetting' : ''}`}>
            <div className="settingdata" ref={settingRef}>
                <div className="settings-item">
                    <img className="set-icon" src="/assets/accessibility.svg"></img>
                    <p className="txt regular nomargin">Accessibility</p>
                    <img className="set-cross" src="/assets/cross.svg" onClick={handleClose}></img>
                </div>

                <hr />

                <div className="setting-option-item">
                    <label class="switch">
                        <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                        <span class="slider"></span>
                    </label>
                    <p className="txt medium">Dark mode</p>
                </div>
                <div className="setting-option-item">
                    <label class="switch">
                        <input type="checkbox" checked={highContrast} onChange={toggleHighContrast} />
                        <span class="slider"></span>
                    </label>
                    <p className="txt medium">High contrast mode</p>
                </div>

            </div>
        </div>
    );
};

export default SettingsAccessibility;