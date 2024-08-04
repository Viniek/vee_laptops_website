import React from 'react'
import './Components.css'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <>
      <div className='navlink'>
        <NavLink exact to="/Home" activeClassName="active">Home</NavLink>
        <NavLink to="/Wishlist" activeClassName="active">Wishlist</NavLink>
        <NavLink to="/Contactus" activeClassName="active">Contact us</NavLink>
      </div>
    </>
  )
}

export default Header
