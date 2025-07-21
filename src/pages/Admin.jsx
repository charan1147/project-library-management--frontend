// src/components/Admin.js
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function AdminDashboard() {
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/add-book">Add Book</Link>
        </li>
        <li>
          <Link to="/update-book">Update Book</Link>
        </li>
        <li>
          <Link to="/delete-book">Delete Book</Link>
        </li>
        <li>
          <Link to="/view-reservations">View Reservations</Link>
        </li>
        <li>
          <Link to="/overdue-reservations">Overdue Reservations</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
