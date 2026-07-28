import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetLoader } from '../utils/assetLoader';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const frameCount = 192;
    const currentFrame = index => (
      `/frames/whole-burger_frames/frame-${(index + 1).toString().padStart(4, '0')}.jpg`
    );

    const images = [];
    const airpods = { frame: 0 };

    // Preload first image
    const img = new Image();
    img.src = currentFrame(0);
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Preload all images
    assetLoader.addTotal(frameCount);
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => assetLoader.increment();
      img.onerror = () => assetLoader.increment();
      images.push(img);
    }

    const tl = gsap.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "power2.inOut",
      duration: 1.2,
      paused: true,
      onUpdate: () => {
        if (images[airpods.frame]) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.height);
        }
      }
    });

    let animState = 0;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 0, // Absolute scroll 0, completely guarantees it starts EXACTLY at the top without race conditions
      end: "+=250px", // Pins just long enough to absorb one typical scroll spin
      pin: true,
      onUpdate: (self) => {
        // Prevent GSAP from falsely triggering animations while the loading screen is active and the browser is restoring scroll asynchronously
        if (document.body.style.overflow === 'hidden' || document.querySelector('.loading-screen')) return;

        if (self.progress > 0.05 && animState === 0) {
          animState = 1;
          tl.play();
        } else if (self.progress <= 0.05 && animState === 1) {
          animState = 0;
          tl.reverse();
        }
      }
    });

    return () => {
      if (tl) tl.kill();
      if (st) st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="glitch" data-text="THE ULTIMATE">THE ULTIMATE</h1>
          <h1 className="highlight">BURGER EXPERIENCE</h1>
          <p>
            Dive into a world of flavor where every bite is a masterpiece. 
            Crafted with 100% grass-fed beef, artisanal buns, and farm-fresh ingredients.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Order Delivery</button>
            <button className="btn btn-outline">View Menu</button>
          </div>
        </div>
      </div>
      <div className="hero-canvas-container">
        <canvas ref={canvasRef} className="hero-canvas"></canvas>
      </div>
    </section>
  );
};

export default HeroSection;
