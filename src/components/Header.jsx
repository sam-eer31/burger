import React, { useEffect, useRef } from 'react';
import './Header.css';

const Header = () => {
  const headerRef = useRef(null);

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
          <button className="btn btn-primary">Order Now</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
