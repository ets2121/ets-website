import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import testimonialsData from '../data/testimonials.json';

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding" style={{ background: '#0B1C38', color: '#FFF', overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <span style={{ color: '#00F2FF', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>{testimonialsData.subtitle}</span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>{testimonialsData.title}</h2>
        </motion.div>
      </div>

      {/* Auto-scroll Container */}
      <div style={{ position: 'relative', display: 'flex', overflow: 'hidden', paddingBottom: '2rem' }}>
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-350px * 4 - 2rem * 4)); } 
            }
            .testimonial-track {
              display: flex;
              gap: 2rem;
              width: max-content;
              animation: marquee 30s linear infinite;
            }
            .testimonial-track:hover {
              animation-play-state: paused;
            }
            .testimonial-card {
              width: 350px;
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
              padding: 2rem;
              border-radius: 12px;
              display: flex;
              flex-direction: column;
              backdrop-filter: blur(10px);
            }
            @media (max-width: 600px) {
              .testimonial-card {
                width: 280px;
                padding: 1.5rem;
              }
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-280px * 4 - 2rem * 4)); } 
              }
            }
          `}
        </style>
        
        <div className="testimonial-track">
          {testimonialsData.items.map((test, idx) => (
            <div className="testimonial-card" key={idx}>
              <div style={{ color: '#F6E05E', display: 'flex', marginBottom: '1rem', gap: '4px' }}>
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p style={{ color: '#B0C4DE', fontSize: '1.05rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "{test.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: '#00F2FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0B1C38', fontWeight: 'bold' }}>
                  {test.initial}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{test.name}</h4>
                  <span style={{ color: '#00F2FF', fontSize: '0.85rem' }}>{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
