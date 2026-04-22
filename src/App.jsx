import React, { useState } from 'react';
import Nav from './components/Nav';
import Contact from './components/Contact';
import HomePage from './pages/HomePage';
import BrandIdentity from './pages/BrandIdentity';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <Nav setCurrentPage={setCurrentPage} />
      {currentPage === 'home' ? <HomePage /> : <BrandIdentity />}
      <Contact setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
