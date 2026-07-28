import React from 'react';
import HeroSection from '../components/HeroSection';
import PattySection from '../components/PattySection';
import VegSection from '../components/VegSection';
import CheeseSection from '../components/CheeseSection';
import BunSection from '../components/BunSection';
import OurStory from '../components/OurStory';
import LocationSection from '../components/LocationSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <PattySection />
      <VegSection />
      <CheeseSection />
      <BunSection />
      <OurStory />
      <LocationSection />
    </>
  );
};

export default Home;
