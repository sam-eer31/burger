import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetLoader } from '../utils/assetLoader';
import './PattySection.css';

gsap.registerPlugin(ScrollTrigger);

const PattySection = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const frameCount = 192;
    const currentFrame = index => (
      `/frames/patty_frames/frame-${(index + 1).toString().padStart(4, '0')}.jpg`
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

    const tl = gsap.timeline({ paused: true });

    tl.to('.patty-text-right', { opacity: 0, y: -20, duration: 0.1 }, 0);
    
    tl.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "power2.inOut",
      duration: 1.2,
      onUpdate: () => {
        if (images[airpods.frame]) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.height);
        }
      }
    }, 0);

    tl.to('.patty-text-left', { opacity: 1, y: 0, duration: 0.2 }, 1);

    let animState = 0;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: () => {
        const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
        return `top top+=${headerHeight}`;
      },
      end: "+=250px", // Pins just long enough to absorb one typical scroll spin
      pin: true,
      onUpdate: (self) => {
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
    <section ref={sectionRef} className="patty-section" id="patty-section">
      <div className="patty-overlay"></div>
      
      <div className="patty-text-container">
        <div className="patty-text patty-text-left">
          <h2>Sizzling Perfection</h2>
          <p>Seared to lock in the juices, delivering an unforgettable umami explosion in every single bite.</p>
        </div>
        
        <div className="patty-text patty-text-right">
          <h2>100% Premium Beef</h2>
          <p>Hand-crafted daily from the finest cuts. No fillers, no preservatives, just pure flavor.</p>
        </div>
      </div>

      <div className="patty-canvas-container">
        <canvas ref={canvasRef} className="patty-canvas"></canvas>
      </div>
    </section>
  );
};

export default PattySection;
