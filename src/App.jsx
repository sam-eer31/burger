import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import PattySection from './components/PattySection';
import VegSection from './components/VegSection';
import CheeseSection from './components/CheeseSection';
import BunSection from './components/BunSection';
import LoadingScreen from './components/LoadingScreen';
import LandscapeOverlay from './components/LandscapeOverlay';
import FullscreenOverlay from './components/FullscreenOverlay';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Refresh ScrollTrigger after unlocking scroll to ensure correct pinning
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [entered]);

  return (
    <div className="App">
      {entered && <LandscapeOverlay />}
      <FullscreenOverlay isEntered={entered} />
      {!entered && <LoadingScreen onEnter={() => setEntered(true)} />}
      <Header />
      <main>
        <HeroSection />
        <PattySection />
        <VegSection />
        <CheeseSection />
        <BunSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
