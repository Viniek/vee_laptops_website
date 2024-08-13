import React, { useState, useEffect } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import cart from "../../src/assets/cart.png";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming user information is available in the user store
    setIsLoggedIn(!!user); // Set logged in status based on user existence
  }, [user]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Perform actual logout logic, like clearing user data or tokens
    navigate("/Home");
  };

  const handleLoginSignup = () => {
    navigate("/CreateAccount");
  };

  function navigateToProfile(){
    navigate("/Profile")
  }

  return (
    <>
      <div className="navlink">
        <NavLink
          to="/Wishlist"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/Home"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Wishlist
        </NavLink>
        <NavLink
          to="/Contactus"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact us
        </NavLink>
        <NavLink
          to="/Cart"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <img src={cart} />
        </NavLink>

        <div className="auth">
          {isLoggedIn ? (
            <>
              <div className="headeractionbtn">
                
                <button className="profilebtn" onClick={navigateToProfile}>Profile</button>
                <button onClick={handleLogout} className="logoutbtn">Logout</button>
              </div>
            </>
          ) : (
            <button onClick={handleLoginSignup}>Login / Signup</button>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
