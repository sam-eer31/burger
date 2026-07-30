import React from 'react';
import { showDemoToast } from '../utils/demoToast';
import './MenuItemCard.css';

const MenuItemCard = ({ item }) => {
  return (
    <div className="menu-item-card">
      <div className="card-image-container">
        <img src={item.image} alt={item.name} className="card-image" loading="lazy" />
        <div className="card-overlay">
          <button className="btn btn-primary add-to-cart-btn" onClick={showDemoToast}>Add to Cart</button>
        </div>
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{item.name}</h3>
          <span className="card-price">{item.price}</span>
        </div>
        <p className="card-description">{item.description}</p>
      </div>
    </div>
  );
};

export default MenuItemCard;
