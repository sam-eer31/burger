import React from 'react';
import './OurStory.css';
import chefImage from '../assets/our_story_chef_1785256480383.png';

const OurStory = () => {
  return (
    <section id="about" className="our-story-section">
      <div className="container story-container">
        <div className="story-content">
          <h2>Our Story</h2>
          <p className="subtitle">Born from a passion for perfection.</p>
          <p>
            It all started with a simple belief: a burger shouldn't just be fast food; it should be a culinary experience. 
            We spent years traveling, tasting, and perfecting the ultimate blend of 100% grass-fed beef, artisanal buns, and secret sauces.
          </p>
          <p>
            Today, we refuse to compromise on quality. Every ingredient is locally sourced, every patty is hand-smashed to order, 
            and every bite is designed to blow your mind. Welcome to the new standard of burgers.
          </p>
        </div>
        <div className="story-image-wrapper">
          <img src={chefImage} alt="Our Chef" className="story-image" loading="lazy" />
          <div className="story-image-overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
