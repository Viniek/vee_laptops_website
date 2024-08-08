import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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

  // Data for User Role Distribution Graph
  const roleData = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const roleChartData = {
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

  // Data for Users by Week Joined Graph
  const weekData = users.reduce((acc, user) => {
    const date = new Date(user.createdAt);
    const year = date.getFullYear();
    const week = Math.ceil((date.getDate() - date.getDay() + 1) / 7);
    const weekLabel = `${year}-W${week}`;
    acc[weekLabel] = (acc[weekLabel] || 0) + 1;
    return acc;
  }, {});

  const sortedWeeks = Object.keys(weekData).sort();
  const weekChartData = {
    labels: sortedWeeks,
    datasets: [
      {
        label: 'Number of Users by Week Joined',
        data: sortedWeeks.map(week => weekData[week]),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="analyticsContainer">
      <h2>User Analytics</h2>
      <div className="chartContainer">
        <h3>User Role Distribution</h3>
        <Bar data={roleChartData} />
      </div>
      <div className="chartContainer">
        <h3>Users by Week Joined</h3>
        <Line data={weekChartData} />
      </div>
    </div>
  );
}

export default Analytics;
