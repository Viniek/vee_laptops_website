import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Wishlist from "./pages/Wishlist/Wishlist";
import Contactus from "./pages/Contactus/Contactus";
import Header from "../Components/Header/Header";
import CreateAccount from "./pages/login/CreateAccount";
import SignIn from "./pages/login/SignIn";
import Admin from "../Components/AdminNav/Admin";
import Footer from "../Components/Footer/Footer";
import AdminHome from "./pages/Admin/AdminHome";
import AdminUsers from "./pages/Admin/AdminUsers/AdminUsers";
import AddAdmin from "./pages/Admin/AddAdmin/AddAdmin";
import Products from "./pages/Products/Products";
import EditProduct from "./pages/Admin/EditProduct/EditProduct";
import AddProduct from "./pages/Admin/AddProduct/AddProduct";
import ViewOrders from "./pages/Admin/ViewOrders/ViewOrders";
import ViewMessages from "./pages/Admin/ViewMessages/ViewMessages";
import Profile from "./pages/Admin/ViewProfile/Profile";
import Analytics from "./pages/Admin/Analytics/Analytics";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ConditionalAdminNav />
      <Routes>
        <Route path="/Products" element={<Products />} />
        <Route path="/home" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Cart" element={<Cart />} />
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
      <Footer />
    </BrowserRouter>
  );
}

function ConditionalAdminNav() {
  const location = useLocation();
  const isAdminPath =
    location.pathname.startsWith("/Admin") ||
    location.pathname.startsWith("/AdminHome") ||
    location.pathname.startsWith("/AdminUsers") ||
    location.pathname.startsWith("/AddAdmin") ||
    location.pathname.startsWith("/EditProduct") ||
    location.pathname.startsWith("/AddProduct") ||
    location.pathname.startsWith("/ViewOrders") ||
    location.pathname.startsWith("/ViewMessages") ||
    location.pathname.startsWith("/Profile") ||
    location.pathname.startsWith("/Analytics");

  return isAdminPath ? <Admin /> : null;
}

export default App;
