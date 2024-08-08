import React from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Wishlist from './pages/Wishlist/Wishlist';
import Contactus from './pages/Contactus/Contactus';
import Header from '../Components/Header/Header';
import CreateAccount from './pages/login/CreateAccount';
import Admin from '../Components/AdminNav/Admin';
import SignIn from './pages/login/SignIn';
import AdminHome from './pages/Admin/AdminHome';
import AdminUsers from './pages/Admin/AdminUsers/AdminUsers'
import AddAdmin from './pages/Admin/AddAdmin/AddAdmin';
import Products from './pages/Products/Products';
import EditProduct from './pages/Admin/EditProduct';
import AddProduct from './pages/Admin/AddProduct/AddProduct';
import ViewOrders from './pages/Admin/ViewOrders/ViewOrders';
import ViewMessages from './pages/Admin/ViewMessages/ViewMessages';
import Profile from './pages/Admin/ViewProfile/Profile';
import Analytics from './pages/Admin/Analytics/Analytics';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Admin/>
      <Routes>
      <Route path="/Products" element={<Products />} />
        <Route path="/home" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />  
        <Route path="/AdminHome" element={<AdminHome />} />  
        <Route path="/AdminUsers" element={<AdminUsers />} />  
        <Route path="/AddAdmin" element={<AddAdmin />} />    
        <Route path="/CreateAccount" element={<CreateAccount />} />              
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/EditProduct/:id" element={<EditProduct />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/ViewOrders" element={<ViewOrders />} />
        <Route path="/ViewMessages" element={<ViewMessages />} />
        <Route path="/Profile/:userId" element={<Profile />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/" element={<Home />} /> 
      </Routes>
    </BrowserRouter>
  );
}



// function ConditionalAdminNav() {
//   const location = useLocation();
//   const isAdminPath = location.pathname.startsWith('/Admin') || location.pathname.startsWith('/AdminHome') || location.pathname.startsWith('/AdminUsers') || location.pathname.startsWith('/AddAdmin') || location.pathname.startsWith('/PostProduct');
//   return isAdminPath ? <Admin /> : null;
// }

export default App;
