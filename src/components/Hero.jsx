import React from 'react';
import { motion } from 'framer-motion';
import heroData from '../data/hero.json';

const Hero = () => {
  return (
    <section id="hero" className="section-padding" style={{ 
      minHeight: '100dvh', 
      display: 'flex', 
      alignItems: 'center', 
      paddingTop: '100px',
      position: 'relative',
      backgroundImage: `linear-gradient(to right, rgba(11,28,56,0.95) 0%, rgba(11,28,56,0.5) 100%), url(${heroData.backgroundImage})`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem', position: 'relative', zIndex: 1 }}>
        
        {/* Text Content */}
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ flex: '1 1 400px' }}
        >
          <h1 style={{ marginBottom: '1.5rem', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
            {heroData.headline}
          </h1>
          <p style={{ marginBottom: '2.5rem', color: '#B0C4DE', textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
            {heroData.subheadline}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={heroData.primaryCTA.link} className="btn btn-primary pulse">{heroData.primaryCTA.text}</a>
            <a href={heroData.secondaryCTA.link} className="btn btn-outline" style={{ backdropFilter: 'blur(4px)', background: 'rgba(0, 242, 255, 0.05)' }}>{heroData.secondaryCTA.text}</a>
          </div>
        </motion.div>

        {/* Image Content: 40% approx on desktop */}
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}
        >
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={heroData.mockupImage.url} 
            alt={heroData.mockupImage.alt} 
            style={{ width: '100%', maxWidth: '500px', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 242, 255, 0.15)', objectFit: 'cover' }} 
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
