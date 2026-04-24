import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import brandData from '../data/brand.json';

const Nav = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, link, isInternal = false) => {
    if (isInternal) {
      e.preventDefault();
      setCurrentPage('home');
      setIsOpen(false);
      setTimeout(() => {
        const element = document.querySelector(link);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 0);
    } else if (link === '#') {
      e.preventDefault();
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled 
          ? 'py-3 backdrop-blur-2xl bg-primary-bg/90 shadow-2xl border-b border-accent/10' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] z-[1001]"
        style={{ scaleX, transformOrigin: "0%", background: 'var(--accent)', width: '100%' }}
      />

      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <motion.div 
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img 
            src={brandData.logo.default} 
            alt={brandData.logo.altText} 
            className={`w-auto rounded-lg transition-all duration-500 ${
              scrolled ? 'h-9 border border-accent/20' : 'h-11 border border-white/10'
            }`}
          />
          <span className="text-xl font-bold text-white font-space uppercase tracking-tight ">
            ETS
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {brandData.navigation.map((item, idx) => (
            <a 
              key={idx} 
              href={item.link} 
              className="relative font-space font-medium text-sm text-on-surface-variant hover:text-accent transition-all duration-300 group"
              onClick={(e) => handleLinkClick(e, item.link, item.link.startsWith('#'))}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:width-full"></span>
            </a>
          ))}
          <motion.a 
            href="#contact" 
            className="btn btn-primary px-6 py-2.5 rounded-xl text-sm"
            onClick={(e) => handleLinkClick(e, '#contact', true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Project
          </motion.a>
        </div>

        {/* Mobile Toggle Button */}
        <motion.button 
          className="md:hidden text-accent p-2"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, cubicBezier: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-4 right-4 p-10 z-[999] bg-primary-bg/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_50px_100px_rgba(0,0,0,0.7)] flex flex-col items-center gap-8"
          >
            {brandData.navigation.map((item, idx) => (
              <motion.a 
                key={idx} 
                href={item.link} 
                className="text-2xl font-semibold text-on-surface hover:text-accent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={(e) => handleLinkClick(e, item.link, item.link.startsWith('#'))}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a 
              href="#contact" 
              className="btn btn-primary w-full py-5 rounded-2xl text-lg mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={(e) => handleLinkClick(e, '#contact', true)}
            >
              Start Project
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;



