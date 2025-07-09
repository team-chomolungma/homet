import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../zoom.css';

function Zoom() {
    const navigate = useNavigate();

    const handleAnimationEnd = () => {
        navigate('/home');
    };

    return (
        <div className="love-container">
            <img
                src="/home homeranian.png"
                alt="love"
                className="love-image"
                onAnimationEnd={handleAnimationEnd}
            />
        </div>
    );
}

export default Zoom;
