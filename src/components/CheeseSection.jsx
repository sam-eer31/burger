import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetLoader } from '../utils/assetLoader';
import { useSettings } from '../context/SettingsContext';
import './CheeseSection.css';

gsap.registerPlugin(ScrollTrigger);

const CheeseSection = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollLockEnabled, lockScroll, unlockScroll } = useSettings();
  const scrollLockRef = useRef(scrollLockEnabled);
  
  useEffect(() => {
    scrollLockRef.current = scrollLockEnabled;
  }, [scrollLockEnabled]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const frameCount = 192;
    const currentFrame = index => (
      `/frames/cheese_frames/frame-${(index + 1).toString().padStart(4, '0')}.webp`
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

    let isLocked = false;
    const tl = gsap.timeline({ 
      paused: true,
      onComplete: () => {
        if (isLocked) {
          unlockScroll();
          isLocked = false;
        }
      },
      onReverseComplete: () => {
        if (isLocked) {
          unlockScroll();
          isLocked = false;
        }
      }
    });

    tl.to('.cheese-text-right', { opacity: 0, y: -20, duration: 0.1 }, 0);
    
    tl.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "power2.inOut",
      duration: 1.2,
      onUpdate: () => {
        const frameIndex = Math.round(airpods.frame);
        if (images[frameIndex]) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
        }
      }
    }, 0);

    // Apply the GSAP class manually via toggleClass or just animate properties
    // We animate opacity and transform to match the CSS target state
    tl.to('.cheese-text-left', { 
      opacity: 1, 
      y: 0, 
      rotation: -2, // keep the wrapper rotation
      duration: 0.2 
    }, 1);

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
        if (document.body.style.overflow === 'hidden' && !isLocked || document.querySelector('.loading-screen')) return;
        
        if (self.progress > 0.05 && animState === 0) {
          animState = 1;
          if (scrollLockRef.current && !isLocked) {
            lockScroll();
            isLocked = true;
          }
          tl.play();
        } else if (self.progress <= 0.05 && animState === 1) {
          animState = 0;
          if (scrollLockRef.current && !isLocked) {
            lockScroll();
            isLocked = true;
          }
          tl.reverse();
        }
      }
    });

    return () => {
      if (tl) tl.kill();
      if (st) st.kill();
      if (isLocked) unlockScroll();
    };
  }, []);

  return (
    <section ref={sectionRef} className="cheese-section" id="cheese-section">
      <div className="cheese-overlay"></div>
      
      <div className="cheese-text-container">
        <div className="cheese-text cheese-text-left">
          <h2>Melted Perfection</h2>
          <p>Aged cheddar that blankets the patty, bringing a rich, creamy texture and sharp tang that binds every flavor together.</p>
        </div>
        
        <div className="cheese-text cheese-text-right">
          <h2>The Golden Layer</h2>
          <p>Every great burger needs that flawless pull of melted cheese. We use 100% real dairy for that authentic melt.</p>
        </div>
      </div>

      <div className="cheese-canvas-container">
        <canvas ref={canvasRef} className="cheese-canvas"></canvas>
      </div>
    </section>
  );
};

export default CheeseSection;
