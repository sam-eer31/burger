import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import LandscapeOverlay from './components/LandscapeOverlay';
import FullscreenOverlay from './components/FullscreenOverlay';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {
  const [entered, setEntered] = useState(false);
  const [homeKey, setHomeKey] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleReset = () => setHomeKey(prev => prev + 1);
    window.addEventListener('resetHome', handleReset);
    return () => window.removeEventListener('resetHome', handleReset);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/' && !entered) {
      setEntered(true);
    }
  }, [location.pathname, entered]);

  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'auto';
      
      // Refresh ScrollTrigger after unlocking scroll to ensure correct pinning
      setTimeout(() => {
        window.scrollTo(0, 0);
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
        <Routes>
          <Route path="/" element={<Home key={homeKey} />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
