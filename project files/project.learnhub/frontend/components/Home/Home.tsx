import React from 'react';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Features from './Features';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Features />
      <Contact />
    </div>
  );
};

export default Home;