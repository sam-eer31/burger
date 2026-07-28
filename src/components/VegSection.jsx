import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetLoader } from '../utils/assetLoader';
import './VegSection.css';

gsap.registerPlugin(ScrollTrigger);

const VegSection = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  
  const [activeText, setActiveText] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const frameCount = 192;
    const currentFrame = index => (
      `/frames/vegetables-plate_frames/frame-${(index + 1).toString().padStart(4, '0')}.jpg`
    );

    const images = [];
    const airpods = { frame: 0 };

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

    const drawFrame = () => {
      if (images[airpods.frame]) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.height);
      }
    };

    const targetFrames = [0, 50, 92, 132, 191];
    let currentState = 0;
    let animTween = null;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: () => {
        const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
        return `top top+=${headerHeight}`;
      },
      end: "+=1000px", // Absorbs exactly 4 scrolls (250px each)
      pin: true,
      onUpdate: (self) => {
        if (document.body.style.overflow === 'hidden' || document.querySelector('.loading-screen')) return;

        let targetState = 0;
        if (self.progress > 0.1 && self.progress <= 0.35) targetState = 1;
        else if (self.progress > 0.35 && self.progress <= 0.60) targetState = 2;
        else if (self.progress > 0.60 && self.progress <= 0.85) targetState = 3;
        else if (self.progress > 0.85) targetState = 4;

        if (targetState !== currentState) {
          currentState = targetState;
          setActiveText(targetState);
          
          if (animTween) animTween.kill(); // Kill any ongoing animation
          
          animTween = gsap.to(airpods, {
            frame: targetFrames[targetState],
            snap: "frame",
            ease: "power2.inOut",
            duration: 0.8,
            onUpdate: drawFrame
          });
        }
      }
    });

    return () => {
      if (animTween) animTween.kill();
      if (st) st.kill();
    };
  }, []);

  const texts = [
    { title: "Farm Fresh", desc: "Hand-picked vegetables delivered daily to ensure the highest quality crunch." },
    { title: "Crisp Lettuce", desc: "Iceberg lettuce so fresh and crisp, it perfectly complements the savory beef." },
    { title: "Juicy Tomatoes", desc: "Sun-ripened tomatoes sliced thick to provide a refreshing, tangy balance." },
    { title: "Zesty Onions", desc: "Perfectly pungent red onions that add the ultimate flavor kick." },
    { title: "Crunchy Pickles", desc: "Dill pickles barrel-cured for that classic, unmistakable burger tang." }
  ];

  return (
    <section ref={sectionRef} className="veg-section" id="veg-section">
      <div className="veg-content">
        <div className="veg-text-wrapper">
          {texts.map((text, index) => (
            <div 
              key={index} 
              className={`veg-text ${activeText === index ? 'veg-text-visible' : 'veg-text-hidden'}`}
            >
              <h2>{text.title}</h2>
              <p>{text.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="veg-canvas-container">
        <canvas ref={canvasRef} className="veg-canvas"></canvas>
      </div>
    </section>
  );
};

export default VegSection;
