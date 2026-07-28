import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <img src="/logo.png" alt="BurgerFactory Logo" className="footer-logo" />
          <p>The ultimate taste experience, crafted with passion and the finest ingredients.</p>
        </div>
        <div className="footer-links">
          <div className="link-column">
            <h3>Explore</h3>
            <a href="#menu">Menu</a>
            <a href="#locations">Locations</a>
            <a href="#about">About Us</a>
          </div>
          <div className="link-column">
            <h3>Legal</h3>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
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
