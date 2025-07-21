// src/components/User.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios/axios";
import "../App.css";

function UserDashboard() {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/users/me");
        setUserId(response.data._id);
      } catch (err) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert error">{error}</div>;

  return (
    <div className="container">
      <h2>User Dashboard</h2>
      <p>
        <strong>User ID:</strong> {userId}
      </p>
      <ul>
        <li>
          <Link to="/reserve-book">Reserve Book</Link>
        </li>
        <li>
          <Link to="/borrow-book">Borrow Book</Link>
        </li>
        <li>
          <Link to="/return-book">Return Book</Link>
        </li>
        <li>
          <Link to="/overdue-books">Overdue Books</Link>
        </li>
        <li>
          <Link to="/user-reservations">View Reservations</Link>
        </li>
      </ul>
    </div>
  );
}

export default UserDashboard;
