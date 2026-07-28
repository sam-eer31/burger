import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header glass-panel">
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
