import React, { useState, useEffect } from 'react';
import './FullscreenOverlay.css';

const FullscreenOverlay = ({ isEntered }) => {
  const [isFullscreen, setIsFullscreen] = useState(true); // default true to avoid flash
  const [isMobileAndSupported, setIsMobileAndSupported] = useState(false);

  useEffect(() => {
    const checkMobileAndSupport = () => {
      // Strict mobile check based on user agent (ignore desktop window resizes)
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      // iPhone Safari does not support the Fullscreen API. We must check for support
      // otherwise iOS users will be permanently trapped in this overlay.
      const fullscreenSupported = !!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen);
      
      setIsMobileAndSupported(mobile && fullscreenSupported);
    };
    
    checkMobileAndSupport();
    window.addEventListener('resize', checkMobileAndSupport);

    const handleFullscreenChange = () => {
      const inFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
      setIsFullscreen(inFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    // Initial check
    handleFullscreenChange();

    return () => {
      window.removeEventListener('resize', checkMobileAndSupport);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const requestFullscreen = async () => {
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) { /* Safari */
        await docEl.webkitRequestFullscreen();
      }
      
      // Re-lock orientation if possible
      if (window.screen.orientation && window.screen.orientation.lock) {
        await window.screen.orientation.lock('landscape');
      }
    } catch (err) {
      console.warn("Fullscreen or orientation lock failed:", err);
    }
  };

  if (!isEntered || !isMobileAndSupported || isFullscreen) return null;

  return (
    <div className="fullscreen-overlay">
      <div className="fullscreen-overlay-content">
        <svg 
          className="fullscreen-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
        <h2>Fullscreen Required</h2>
        <p>This immersive experience is designed to be viewed in fullscreen mode without distractions.</p>
        <button className="btn btn-primary enter-btn" onClick={requestFullscreen}>
          Return to Fullscreen
        </button>
      </div>
    </div>
  );
};

export default FullscreenOverlay;
