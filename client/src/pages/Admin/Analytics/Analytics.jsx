import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import './Analytics.css';

function Analytics() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:4000/users/AllUsers", {
          withCredentials: true,
        });
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching users.");
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const roleData = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(roleData),
    datasets: [
      {
        label: 'Number of Users by Role',
        data: Object.values(roleData),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="analyticsContainer">
      <h2>User Role Distribution</h2>
      <Bar data={data} />
    </div>
  );
}

export default Analytics;
