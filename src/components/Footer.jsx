import React from 'react';
import { showDemoToast } from '../utils/demoToast';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <img src="/logo.webp" alt="BurgerFactory Logo" className="footer-logo" />
          <p>The ultimate taste experience, crafted with passion and the finest ingredients.</p>
        </div>
        <div className="footer-links">
          <div className="link-column">
            <h3>Explore</h3>
            <a href="#menu" onClick={showDemoToast}>Menu</a>
            <a href="#locations" onClick={showDemoToast}>Locations</a>
            <a href="#about" onClick={showDemoToast}>About Us</a>
          </div>
          <div className="link-column">
            <h3>Legal</h3>
            <a href="#privacy" onClick={showDemoToast}>Privacy Policy</a>
            <a href="#terms" onClick={showDemoToast}>Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} BurgerFactory. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
