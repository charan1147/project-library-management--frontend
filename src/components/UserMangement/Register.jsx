// src/components/Register.js
import React, { useState } from "react";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.post("/users/register", { username, email, password });
      setSuccess("User registered successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to register.");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
