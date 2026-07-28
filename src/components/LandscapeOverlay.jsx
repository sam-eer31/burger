import React from 'react';
import './LandscapeOverlay.css';

const LandscapeOverlay = () => {
  return (
    <div className="landscape-overlay">
      <div className="landscape-overlay-content">
        <div className="phone-animation">
          <div className="phone-device"></div>
        </div>
        <h2>Please Rotate Your Device</h2>
        <p>This experience is specifically designed for landscape viewing.</p>
      </div>
    </div>
  );
};

export default LandscapeOverlay;
