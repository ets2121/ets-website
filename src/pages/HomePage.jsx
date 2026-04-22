import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import About from '../components/About';

const HomePage = () => {
  return (
    <div className="page-transition">
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <About />
    </div>
  );
};

export default HomePage;
