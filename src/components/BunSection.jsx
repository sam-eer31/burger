import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetLoader } from '../utils/assetLoader';
import { useSettings } from '../context/SettingsContext';
import './BunSection.css';

gsap.registerPlugin(ScrollTrigger);

const BunSection = () => {
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
    
    const frameCount = 470;
    const currentFrame = index => (
      `/frames/bun_frames/frame-${(index + 1).toString().padStart(4, '0')}.jpg`
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

    // Video animation
    tl.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "power2.inOut",
      duration: 1.5, // slightly longer duration because of 470 frames
      onUpdate: () => {
        if (images[airpods.frame]) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.height);
        }
      }
    }, 0);

    // Fade in middle text at the end of the video
    tl.to('.bun-text', { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      duration: 0.3 
    }, 1.2);

    let animState = 0;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: () => {
        const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
        return `top top+=${headerHeight}`;
      },
      end: "+=250px", // Eat one spin
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
    <section ref={sectionRef} className="bun-section" id="bun-section">
      <div className="bun-overlay"></div>
      
      <div className="bun-text-container">
        <div className="bun-text">
          <h2>The Artisan Bun</h2>
          <p>Baked fresh every morning. A perfectly toasted, golden-brown crown that holds everything together without getting soggy.</p>
        </div>
      </div>

      <div className="bun-canvas-container">
        <canvas ref={canvasRef} className="bun-canvas"></canvas>
      </div>
    </section>
  );
};

export default BunSection;
