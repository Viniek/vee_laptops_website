import React, { useState, useEffect } from "react";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import cart from "../../src/assets/cart.png";

function Header() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUserInformation);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const handleLogout = () => {
    clearUser();
    navigate("/home");
  };

  const handleLoginSignup = () => {
    navigate("/CreateAccount");
  };
  function handleNavigateToLogin(){
    navigate("/SignIn")
  }

  const navigateToProfile = () => {
    if (user && user.id) {
      navigate(`/Profile/${user.id}`);
    }
  };

  return (
    <div className="navlink">
      <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
      <NavLink to="/Wishlist" className={({ isActive }) => (isActive ? "active" : "")}>
        Wishlist
      </NavLink>
      <NavLink to="/Contactus" className={({ isActive }) => (isActive ? "active" : "")}>
        Contact us
      </NavLink>
      <NavLink to="/Cart" className={({ isActive }) => (isActive ? "active" : "")}>
        <img src={cart} alt="Cart" />
      </NavLink>

      <div className="auth">
        {isLoggedIn ? (
          <div className="headeractionbtn">
            <button className="profilebtn" onClick={navigateToProfile}>
              Profile
            </button>
            <button onClick={handleLogout} className="logoutbtn">
              Logout
            </button>
          </div>
        ) : (
          <div className="loginSignupbtns">
          <button onClick={handleNavigateToLogin} className="Loginbtn">Login</button>
          <button onClick={handleLoginSignup} className="Signupbtn"> Signup</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
