import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Admin.css";
import useUserStore from "../../store/useUserStore";

function Admin() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/SignIn");
  };

  return (
    <>
      <div className="AdminNav">
        <NavLink
          to="/AdminHome"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink> 
        <NavLink
          to="/AdminUsers"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          All Users
        </NavLink>
        <NavLink
          to="/AddAdmin"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Add an Admin
        </NavLink>
        <NavLink
          to="/AddProduct"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Post a Product
        </NavLink>
        <NavLink
          to="/ViewOrders"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          View Orders
        </NavLink>
        <NavLink
          to="/ViewMessages"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          View Messages
        </NavLink>
        <NavLink
          to={`/Profile/${user.id}`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Profile
        </NavLink>
        <NavLink
          to="/Analytics"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Analytics
        </NavLink>
        {/* <NavLink to="/LogOut" className={({ isActive }) => (isActive ? 'active' : '')}>Log Out</NavLink> */}
        <button className="AdminLogoutbtn" onClick={handleNavigate}>
          Log Out
        </button>
      </div>

      <p>b</p>
      <br />
      <br />
      <br />
      <p>b</p>
    </>
  );
}

export default Admin;
