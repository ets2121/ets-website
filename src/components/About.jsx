import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import aboutData from '../data/about.json';

const About = () => {

  return (
    <section id="about" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Fancy Background Shapes */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,242,255,0.05) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }}
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(49,130,206,0.05) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <style>
          {`
            .about-wrapper {
              display: flex;
              align-items: center;
              gap: 4rem;
            }
            @media (max-width: 900px) {
              .about-wrapper {
                flex-direction: column;
                text-align: center;
              }
              .about-text-content {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .about-stack {
                justify-content: center;
              }
            }
          `}
        </style>
        <div className="about-wrapper">
          
          {/* Image Side with Fancy Frame */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            style={{ flex: '1', display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            <div style={{ position: 'relative', width: '280px', height: '280px' }}>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ 
                  position: 'absolute', width: '100%', height: '100%', 
                  border: '2px dashed rgba(0, 242, 255, 0.4)', borderRadius: '40% 60% 60% 40% / 40% 50% 50% 60%', 
                  top: '-15px', left: '-15px', right: '-15px', bottom: '-15px',
                  boxSizing: 'content-box', padding: '15px'
                }}
              />
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={aboutData.image} 
                alt={aboutData.altText} 
                style={{ width: '100%', height: '100%', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', objectFit: 'cover', position: 'relative', zIndex: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            style={{ flex: '1.5' }}
            className="about-text-content"
          >
            <span style={{ color: '#00F2FF', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>{aboutData.badgeText}</span>
            <h2 style={{ marginBottom: '1.5rem', marginTop: 0 }}>{aboutData.headline}</h2>
            
            {aboutData.paragraphs.map((p, pIdx) => (
              <p key={pIdx} style={{ marginBottom: pIdx === aboutData.paragraphs.length - 1 ? '2.5rem' : '1.5rem', color: '#B0C4DE', lineHeight: 1.8 }}>
                {p}
              </p>
            ))}

            <div className="about-stack" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {aboutData.stack.map((item, idx) => (
                <motion.div 
                  whileHover={{ y: -5, color: '#00F2FF' }}
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.8rem',
                    color: '#64748B',
                    cursor: 'default',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img src={item.path} alt={item.name} style={{ width: '32px', height: '32px', filter: 'grayscale(1) brightness(1.5)', transition: 'filter 0.3s' }} onMouseOver={e=>e.currentTarget.style.filter='grayscale(0)'} onMouseOut={e=>e.currentTarget.style.filter='grayscale(1) brightness(1.5)'} />
                  <span style={{ fontWeight: 500, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{item.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
