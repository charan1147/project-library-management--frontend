// src/components/Homepage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBooks from "../components/BookManagement/SearchBooks";
import "../App.css";

function Homepage() {
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("title");

  const role = localStorage.getItem("userRole");
  const dashboardPath =
    role === "admin" ? "/admin-dashboard" : "/user-dashboard";

  return (
    <div className="container">
      <h1>Welcome to the Library</h1>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search term"
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="ISBN">ISBN</option>
            <option value="genre">Genre</option>
          </select>
        </form>
      </div>
      <SearchBooks term={term} filter={filter} />
      <div>
        <Link to={dashboardPath} className="btn">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
