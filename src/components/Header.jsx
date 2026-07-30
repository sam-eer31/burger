import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { showDemoToast } from '../utils/demoToast';
import './Header.css';

const Header = () => {
  const headerRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollLockEnabled, setScrollLockEnabled } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (location.pathname === '/') {
      window.dispatchEvent(new Event('resetHome'));
      window.scrollTo(0, 0);
    } else {
      navigate('/');
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const updateHeights = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        const sectionHeight = windowHeight - headerHeight;
        
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        document.documentElement.style.setProperty('--section-height', `${sectionHeight}px`);
        
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }
      }
    };

    updateHeights();
    
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
        <a href="/" onClick={handleHomeClick} className="logo">
          <img src="/logo.webp" alt="BurgerFactory Logo" className="site-logo" />
        </a>
        
        <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="/" onClick={handleHomeClick}>Home</a>
          <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
          <a href="#about" onClick={(e) => { setIsMobileMenuOpen(false); showDemoToast(e); }}>Our Story</a>
          <a href="#locations" onClick={(e) => { setIsMobileMenuOpen(false); showDemoToast(e); }}>Locations</a>
          
          <div className="mobile-settings">
            <span>Scroll Lock Mode</span>
            <label className="setting-item">
              <input 
                type="checkbox" 
                checked={scrollLockEnabled}
                onChange={(e) => setScrollLockEnabled(e.target.checked)}
              />
            </label>
          </div>
        </nav>
        
        <div className="header-action">
          <button className="btn btn-primary order-btn" onClick={showDemoToast}>Order Now</button>
          
          <div className="settings-container desktop-settings">
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

          <button 
            className="hamburger-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
