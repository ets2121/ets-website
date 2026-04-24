import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './components/Nav';
import Contact from './components/Contact';
import HomePage from './pages/HomePage';
import BrandIdentity from './pages/BrandIdentity';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-primary-bg overflow-x-hidden body-glow">
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
    </div>
  );
}

export default App;
