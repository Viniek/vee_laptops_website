import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Wishlist from './pages/Wishlist/Wishlist';
import Contactus from './pages/Contactus/Contactus';
import Header from '../Components/Header/Header';
import CreateAccount from './pages/login/CreateAccount';
import Admin from '../Components/AdminNav/Admin';
import SignIn from './pages/login/SignIn';
import AdminHome from './pages/Admin/AdminHome';
import AdminUsers from '../src/pages/Admin/AdminUsers'
import AddAdmin from './pages/Admin/AddAdmin';
import PostProduct from './pages/Admin/PostProduct';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />  
        <Route path="/AdminHome" element={<AdminHome />} />  
        <Route path="/AdminUsers" element={<AdminUsers />} />  
        <Route path="/AddAdmin" element={<AddAdmin />} />  
        <Route path="/PostProduct" element={<PostProduct />} />  
        <Route path="/CreateAccount" element={<CreateAccount />} />              
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/" element={<Home />} /> 
      </Routes>
    </Router>
  );
}

export default App;
