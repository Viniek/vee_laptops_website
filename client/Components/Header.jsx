import React from 'react';
import './Components.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className='navlink'>
      <NavLink to="/Home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
      <NavLink to="/Wishlist" className={({ isActive }) => (isActive ? 'active' : '')}>Wishlist</NavLink>
      <NavLink to="/Contactus" className={({ isActive }) => (isActive ? 'active' : '')}>Contact us</NavLink>
    </div>
  );
}

export default Header;