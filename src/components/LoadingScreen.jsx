import React, { useEffect, useState } from 'react';
import { assetLoader } from '../utils/assetLoader';
import './LoadingScreen.css';

const LoadingScreen = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = assetLoader.subscribe((newProgress) => {
      setProgress(newProgress);
    });
    return () => unsubscribe();
  }, []);

  const getLoadingText = () => {
    if (progress < 20) return 'Heating up the grill...';
    if (progress < 40) return 'Sourcing farm-fresh veggies...';
    if (progress < 60) return 'Grilling the 100% grass-fed patty...';
    if (progress < 80) return 'Melting the artisan cheese...';
    if (progress < 100) return 'Toasting the perfect bun...';
    return 'Order is ready!';
  };

  const handleEnter = async () => {
    // Strict mobile check based on user agent (ignore desktop window resizes)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      try {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) { /* Safari */
          await docEl.webkitRequestFullscreen();
        }
        
        // Attempt to lock orientation natively
        if (window.screen.orientation && window.screen.orientation.lock) {
          await window.screen.orientation.lock('landscape');
        }
      } catch (err) {
        console.warn("Fullscreen or orientation lock failed:", err);
      }
    }
    
    onEnter();
  };

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <h1 className="loading-title">BURGER<span>.</span></h1>
        
        <div className="loading-status">
          <p className="loading-text">{getLoadingText()}</p>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="progress-percentage">{progress}%</p>
        </div>

        {progress >= 100 && (
          <button 
            className="btn btn-primary enter-btn fade-in"
            onClick={handleEnter}
          >
            ENTER
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
