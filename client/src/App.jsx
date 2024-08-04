import { useState } from 'react'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import './App.css'
import Admin from './pages/Admin/Admin'
import Home from './pages/Home/Home'
import Wishlist from './pages/Wishlist/Wishlist'
import Contactus from './pages/Contactus/Contactus'
import Header from '../Components/Header';
import Footer from '../Components/Footer';

 

function App() {
 
  return (
    <>
     <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/Admin" element={<Admin />} />    
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
