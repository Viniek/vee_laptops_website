// import React, { useState } from "react";
// import './Components.css';
// import { NavLink } from 'react-router-dom';
// import useUserStore from "../store/useUserStore";
// import { useNavigate } from "react-router-dom";


// function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const user = useUserStore((state) => state.user);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//   };
//   const handleLoginSignup = () => {
//     setIsLoggedIn(true);
//     navigate("/CreateAccount");
//   };
//   return (
//     <>
//     <div className='navlink'>
//       <NavLink to="/Home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
//       <NavLink to="/Wishlist" className={({ isActive }) => (isActive ? 'active' : '')}>Wishlist</NavLink>
//       <NavLink to="/Contactus" className={({ isActive }) => (isActive ? 'active' : '')}>Contact us</NavLink>
//     </div>

// <div className="auth">
// {isLoggedIn ? (
//   <>
//     <span>Welcome, {user.fullname}</span>
//     <button onClick={handleLogout}>Logout</button>
//   </>
// ) : (
//   <button onClick={handleLoginSignup}>Login / Signup</button>
// )}
// </div>
// </>
//   );
// }

// export default Header;
import React, { useState, useEffect } from "react";
import './Header.css'
import { NavLink } from 'react-router-dom';
import useUserStore from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <div className='navlink'>
      <NavLink to="/Wishlist" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/Home" className={({ isActive }) => (isActive ? 'active' : '')}>Wishlist</NavLink>      
        <NavLink to="/Contactus" className={({ isActive }) => (isActive ? 'active' : '')}>Contact us</NavLink>
   

      <div className="auth">
        {isLoggedIn ? (
          <>
            <span>Welcome, {user.fullname}</span>
            <button onClick={handleLogout}>Logout</button>
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
