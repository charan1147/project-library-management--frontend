// src/components/Login.js
import React, { useState } from "react";
import axios from "../../axios/axios"
import { useNavigate } from "react-router-dom";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("/users/login", { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role);
      handleLogin(token, user.role);
      navigate(user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
