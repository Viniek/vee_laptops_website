import React, { useState, useEffect } from "react";
import './Admin.css'
import { NavLink } from 'react-router-dom';



function Admin() {
  return (
   <>
      <div className='AdminNav'>
       
      <NavLink to="/AdminHome" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
      <NavLink to="/AdminUsers" className={({ isActive }) => (isActive ? 'active' : '')}>AdminUsers</NavLink>     
        <NavLink to="/AddAdmin" className={({ isActive }) => (isActive ? 'active' : '')}>AddAdmin</NavLink>
        <NavLink to="/AddProduct" className={({ isActive }) => (isActive ? 'active' : '')}>PostProduct</NavLink>
      </div>

      <p>b</p>
      <p>b</p>
      <p>b</p>
      <p>b</p>
      <p>b</p>
      <p>b</p>
          </>
      
  
  )
}

export default Admin

