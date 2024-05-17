import React, { useRef, useEffect } from 'react';
import "../css/Reward.css";


const RewardPopup = ({ isOpen, onClose, children }) => {
    const popupRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

  
    return (
        <div className="overlay">
            <div className="rewardpopup" ref={popupRef}>
                <h2 className="bold">Weet je zeker dat je jouw punten voor deze beloning wilt inwisselen?</h2>
                <div className="rewardpopup-content">
                    {children}
                </div>
                <div className="btn-wrap">
                    <button className="bg-white pop-no">Nee</button>
                    <button className="pop-yes">Ja, activeren</button>
                </div>
                
            </div>
        </div>
    );
  };

export default RewardPopup;