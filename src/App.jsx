import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './components/Nav';
import Contact from './components/Contact';
import HomePage from './pages/HomePage';
import BrandIdentity from './pages/BrandIdentity';
import MotionIntro from './components/MotionIntro';
import GlobalBackground from './components/GlobalBackground';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <MotionIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-primary-bg overflow-x-hidden body-glow relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <GlobalBackground />
        <Nav setCurrentPage={setCurrentPage} />
        
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            {currentPage === 'home' ? (
              <motion.div 
                key="home" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HomePage />
              </motion.div>
            ) : (
              <motion.div 
                key="brand" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <BrandIdentity />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Contact setCurrentPage={setCurrentPage} />
      </motion.div>
    </>
  );
}

export default App;
