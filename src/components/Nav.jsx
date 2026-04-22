import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import brandData from '../data/brand.json';

const Nav = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(11, 28, 56, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00F2FF', fontWeight: 700, fontSize: '1.4rem', fontFamily: 'Montserrat, sans-serif' }} onClick={(e) => { e.preventDefault(); if(setCurrentPage){ setCurrentPage('home'); window.scrollTo(0, 0); } }}>
          <img src={brandData.logo.default} alt={brandData.logo.altText} style={{ height: '32px', borderRadius: '4px', border: '1px solid rgba(0,242,255,0.3)' }} />
          <span style={{ letterSpacing: '1px' }}>ETS</span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'none' }} className="desktop-nav">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem', alignItems: 'center', margin: 0 }}>
            {brandData.navigation.map((item, idx) => (
              <li key={idx}>
                <a 
                  href={item.link} 
                  style={{ fontWeight: 500, transition: 'color 0.3s' }} 
                  onClick={() => setCurrentPage && setCurrentPage('home')}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li><a href="#contact" className="btn btn-primary pulse" onClick={() => setCurrentPage && setCurrentPage('home')}>Get a Free Quote</a></li>
          </ul>
        </nav>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" style={{ display: 'none', color: '#fff', background: 'transparent' }} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        style={{ overflow: 'hidden', background: 'rgba(11, 28, 56, 0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderBottom: isOpen ? '1px solid rgba(255, 255, 255, 0.05)' : 'none' }}
      >
        <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none', padding: isOpen ? '1rem 0' : 0, margin: 0 }}>
          {brandData.navigation.map((item, idx) => (
            <li key={idx}>
              <a 
                href={item.link} 
                style={{ display: 'block', padding: '1rem 2rem', fontSize: '1.2rem', color: '#FFF', fontWeight: 500 }} 
                onClick={() => { setIsOpen(false); setCurrentPage && setCurrentPage('home'); }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li style={{ padding: '1rem 2rem' }}>
            <a href="#contact" className="btn btn-primary pulse" style={{ display: 'flex', width: '100%', textAlign: 'center', padding: '1.2rem' }} onClick={() => { setIsOpen(false); setCurrentPage && setCurrentPage('home'); }}>Get a Free Quote</a>
          </li>
        </ul>
      </motion.div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .desktop-nav a:hover { color: #00F2FF; }
      `}</style>
    </motion.header>
  );
};

export default Nav;
