import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

import PattySection from './components/PattySection';
import VegSection from './components/VegSection';
import CheeseSection from './components/CheeseSection';
import BunSection from './components/BunSection';

function App() {
  return (
    <div className="App">
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
