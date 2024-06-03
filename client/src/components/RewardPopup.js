import React, { useRef, useEffect, useState } from 'react';
import "../css/Reward.css";

const RewardPopup = ({ isOpen, onClose, onActivate, children }) => {
    const popupRef = useRef(null);
    const [message, setMessage] = useState("Weet je zeker dat je jouw punten voor deze beloning wilt inwisselen?");
    const [buttonsVisible, setButtonsVisible] = useState(true);

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

    const handleClose = () => {
        onClose();
    };

    const handleActivate = () => {
        setMessage("Gefeliciteerd met je beloning! ");
        setButtonsVisible(false);
        onActivate();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="rewardpopup" ref={popupRef}>
                <h2 className="bold">{message}</h2>
                {buttonsVisible ? (
                    <p></p>
                ) : (
                    <p className="txt medium">Er is een email naar je verstuurd met de kortingscode</p>
                )}
                <div className="rewardpopup-content">
                    {children}
                </div>
                <div className="btn-wrap">
                    {buttonsVisible ? (
                        <>
                            <button className="bg-white pop-no" onClick={handleClose}>Nee</button>
                            <button className="pop-yes" onClick={handleActivate}>Ja, activeren</button>
                        </>
                    ) : (
                        <button onClick={handleClose}>Close</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RewardPopup;
