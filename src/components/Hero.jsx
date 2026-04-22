import React from 'react';
import { motion } from 'framer-motion';
import heroData from '../data/hero.json';

const Hero = () => {
  return (
    <section id="hero" className="section-padding" style={{ 
      minHeight: '100dvh', 
      display: 'flex', 
      alignItems: 'center', 
      paddingTop: '80px',
      position: 'relative',
      backgroundImage: `linear-gradient(to right, rgba(11,28,56,0.95) 0%, rgba(11,28,56,0.5) 100%), url(${heroData.backgroundImage})`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        alignItems: 'center', 
        gap: '1.5rem', 
        position: 'relative', 
        zIndex: 1,
        width: '100%'
      }}>
        
        {/* Text Content */}
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ maxWidth: '600px' }}
        >
          <h1 style={{ marginBottom: '0.75rem', textShadow: '0 4px 10px rgba(0,0,0,0.5)', lineHeight: 1.05 }}>
            {heroData.headline}
          </h1>
          <p style={{ marginBottom: '1.5rem', color: '#B0C4DE', textShadow: '0 2px 5px rgba(0,0,0,0.5)', fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', lineHeight: 1.4 }}>
            {heroData.subheadline}
          </p>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <a href={heroData.primaryCTA.link} className="btn btn-primary pulse">{heroData.primaryCTA.text}</a>
            <a href={heroData.secondaryCTA.link} className="btn btn-outline" style={{ backdropFilter: 'blur(4px)', background: 'rgba(0, 242, 255, 0.05)' }}>{heroData.secondaryCTA.text}</a>
          </div>
        </motion.div>
 
        {/* Image Content */}
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <style>{`
            .hero-img-responsive {
              width: 100%;
              max-width: 480px;
              border-radius: 12px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 242, 255, 0.15);
              object-fit: cover;
              transition: transform 0.3s ease;
            }
            @media (max-width: 768px) {
              .hero-img-responsive {
                max-width: 320px;
                margin-top: 1rem;
              }
            }
          `}</style>
          <motion.img 
            whileHover={{ scale: 1.02 }}
            src={heroData.mockupImage.url} 
            alt={heroData.mockupImage.alt} 
            className="hero-img-responsive"
          />
        </motion.div>
 
      </div>
    </section>
  );
};

export default Hero;
