import React from 'react';
import { showDemoToast } from '../utils/demoToast';
import './LocationSection.css';

const LocationSection = () => {
  return (
    <section id="locations" className="location-section">
      <div className="container">
        <div className="location-header">
          <h2>Find Us</h2>
          <p>Where the best burgers in the world are hidden.</p>
        </div>
        
        <div className="location-content">
          <div className="location-details">
            <div className="detail-item">
              <h3>Address</h3>
              <p>123 Mystery Lane<br />Bermuda Triangle, BT 00000</p>
            </div>
            <div className="detail-item">
              <h3>Hours</h3>
              <p>Mon - Sun: 11:00 AM - 11:00 PM<br />(Time works differently here)</p>
            </div>
            <div className="detail-item">
              <h3>Contact</h3>
              <p>Lost at Sea?<br />Call: 555-BUR-GERS</p>
            </div>
            <button className="btn btn-primary direction-btn" onClick={showDemoToast}>Get Directions</button>
          </div>
          
          <div className="map-container">
            <iframe 
              src="https://maps.google.com/maps?q=Bermuda%20Triangle&t=k&z=5&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Bermuda Triangle Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
