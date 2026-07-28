import React, { useEffect, useRef, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import './Header.css';

const Header = () => {
  const headerRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  const { scrollLockEnabled, setScrollLockEnabled } = useSettings();

  useEffect(() => {
    const updateHeights = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        const sectionHeight = windowHeight - headerHeight;
        
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        document.documentElement.style.setProperty('--section-height', `${sectionHeight}px`);
        
        // Refresh ScrollTrigger to recalculate pins after heights change
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }
      }
    };

    updateHeights(); // Initial set
    
    const resizeObserver = new ResizeObserver(() => {
      updateHeights();
    });
    
    window.addEventListener('resize', updateHeights);
    
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeights);
    };
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="container header-content">
        <div className="logo">
          <h1>BURGER<span>.</span></h1>
        </div>
        <nav className="nav-links">
          <a href="#menu">Menu</a>
          <a href="#about">Our Story</a>
          <a href="#locations">Locations</a>
        </nav>
        <div className="header-action">
          <div className="settings-container">
            <button 
              className="settings-btn" 
              onClick={() => setShowSettings(!showSettings)}
              aria-label="Settings"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
            {showSettings && (
              <div className="settings-dropdown glass-panel">
                <label className="setting-item">
                  <span>Scroll Lock Mode</span>
                  <input 
                    type="checkbox" 
                    checked={scrollLockEnabled}
                    onChange={(e) => setScrollLockEnabled(e.target.checked)}
                  />
                </label>
                <div className="setting-description">
                  Wait for animation to finish before scrolling
                </div>
              </div>
            )}
          </div>
          <button className="btn btn-primary">Order Now</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
