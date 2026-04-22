import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';

const Portfolio = () => {
  return (
    <section id="portfolio" className="section-padding liquid-glass-section">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ marginBottom: '0.5rem' }}>{portfolioData.title}</h2>
          <p style={{ margin: '0 auto', fontSize: '0.95rem' }}>{portfolioData.subtitle}</p>
        </motion.div>
 
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {portfolioData.items.map((proj, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="portfolio-card"
              style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
              <div style={{ overflow: 'hidden', height: '140px' }}>
                <motion.img 
                  src={proj.image} 
                  alt={proj.title} 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3>{proj.title}</h3>
                
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="tag" style={{ color: '#F87171' }}>Problem</span>
                  <p>{proj.problem}</p>
                </div>
                
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="tag" style={{ color: '#60A5FA' }}>Solution</span>
                  <p>{proj.solution}</p>
                </div>
                
                <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="tag" style={{ color: '#34D399' }}>Result</span>
                  <p style={{ fontWeight: 600, color: '#FFF' }}>{proj.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
