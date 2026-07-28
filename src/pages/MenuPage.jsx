import React, { useEffect } from 'react';
import { menuData } from '../utils/menuData';
import MenuItemCard from '../components/MenuItemCard';
import './MenuPage.css';

const MenuPage = () => {
  useEffect(() => {
    // Ensure we start at top of page on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Premium ingredients, crafted to perfection.</p>
      </div>

      <div className="menu-container container">
        {menuData.map((category) => (
          <section key={category.id} className="menu-category" id={category.id}>
            <h2 className="category-title">{category.category}</h2>
            <div className="menu-grid">
              {category.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
