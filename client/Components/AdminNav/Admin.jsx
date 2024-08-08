import React, { useState, useEffect } from "react";
import './Admin.css'
import { NavLink ,Link} from 'react-router-dom';
import useUserStore from "../../store/useUserStore";


function Admin() {
  const user = useUserStore((state)=>state.user)
  console.log(user);
  return (
   <>
      <div className='AdminNav'>
       
      <NavLink to="/AdminHome" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
      <NavLink to="/AdminUsers" className={({ isActive }) => (isActive ? 'active' : '')}>All Users</NavLink>     
        <NavLink to="/AddAdmin" className={({ isActive }) => (isActive ? 'active' : '')}>Add an Admin</NavLink>
        <NavLink to="/AddProduct" className={({ isActive }) => (isActive ? 'active' : '')}>Post a Product</NavLink>
        <NavLink to="/ViewOrders" className={({ isActive }) => (isActive ? 'active' : '')}>View Orders</NavLink>
        <NavLink to="/ViewMessages" className={({ isActive }) => (isActive ? 'active' : '')}>View Messages</NavLink>
        <NavLink to={`/Profile/${user.id}`}className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>
        <NavLink to="/Analytics" className={({ isActive }) => (isActive ? 'active' : '')}>Analytics</NavLink>
        <NavLink to="/AddProduct" className={({ isActive }) => (isActive ? 'active' : '')}>Log Out</NavLink>
      </div>

      <p>b</p><br/><br/><br/>     
      <p>b</p>
          </>
      
  
  )
}

export default Admin

