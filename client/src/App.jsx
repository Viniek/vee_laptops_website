import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Wishlist from './pages/Wishlist/Wishlist';
import Contactus from './pages/Contactus/Contactus';
import Header from '../Components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/" element={<Home />} /> 
      </Routes>
    </Router>
  );
}

export default App;
