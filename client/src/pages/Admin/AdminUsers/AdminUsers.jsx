import React, { useState, useEffect } from "react";
import useUserStore from "../../../../store/useUserStore";
import axios from "axios";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    async function getAllUsers() {
      if (user && user.role === "admin") {
        try {
          setLoading(true);
          const response = await axios.get(
            "http://localhost:4000/users/AllUsers",
            { withCredentials: true },
          );
          console.log(response);
          setUsers(response.data.data);
        } catch (error) {
          console.error("An error occurred while fetching users:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Unauthorized.");
      }
    }
    getAllUsers();
  }, [user]);

  return (
    <>
      <h1 className="usersContainer">Vee users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="usersTable">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AdminUsers;
