import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Wishlist from "./pages/Wishlist/Wishlist";
import Contactus from "./pages/Contactus/Contactus";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import CreateAccount from "./pages/login/CreateAccount";
import SignIn from "./pages/login/SignIn";
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
import Admin from "../Components/AdminNav/Admin"; // Assuming you have AdminHeader
import useUserStore from "../store/useUserStore";

function App() {
  const user = useUserStore((state) => state.user);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === "admin");
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <BrowserRouter>
      {!isAdmin && <Header />}
      {isAdmin && <Admin />}
      <Routes>
        {isAdmin ? (
          <>
            <Route path="/AdminHome" element={<AdminHome />} />
            <Route path="/AdminUsers" element={<AdminUsers />} />
            <Route path="/AddAdmin" element={<AddAdmin />} />
            <Route path="/EditProduct/:id" element={<EditProduct />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/ViewOrders" element={<ViewOrders />} />
            <Route path="/ViewMessages" element={<ViewMessages />} />
            <Route path="/Profile/:userId" element={<Profile />} />
            <Route path="/Analytics" element={<Analytics />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/Contactus" element={<Contactus />} />
            <Route path="/" element={<Home />} />
            <Route path="/Profile/:userId" element={<Profile />} />
          </>
        )}
      </Routes>
      {!isAdmin && <Footer />}
    </BrowserRouter>
  );
}

export default App;
