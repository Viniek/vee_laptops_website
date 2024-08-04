import React from 'react'
import './Components.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
  <>
  <div className='navlink'>
    <Link to="/Home">Home</Link>
    <Link to="/Wishlist">Wishlist</Link>
    <Link to="/Contactus">Contactus</Link>   
    </div>
  </>
  )
}

export default Header