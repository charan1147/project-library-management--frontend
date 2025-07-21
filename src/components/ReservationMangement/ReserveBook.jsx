import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import "../../App.css";

function ReserveBook() {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please log in.");
          return;
        }

        const res = await axios.get("/users/me", { timeout: 10000 });
        console.log("Full API Response (/users/me):", res.data);
        if (res.data && typeof res.data === "object") {
          setUserId(res.data._id || res.data.user?.id || "");
          setUserName(
            res.data.username ||
              res.data.user?.username ||
              `(User ID: ${res.data._id || "Unknown"})`
          );
        } else {
          setError("Unexpected response format from /users/me.");
        }
      } catch (err) {
        console.error("Fetch user info error:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });
        setError(
          err.response?.data?.message ||
            `Failed to fetch user info: ${err.message} (Status: ${
              err.response?.status || "N/A"
            })`
        );
      }
    };
    fetchUserInfo();
  }, []);

  const handleReserveBook = async () => {
    setError(null);
    setSuccess(null);

    if (!bookId || !userId) {
      setError("Book ID and User ID are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "/reservations",
        { book: bookId, user: userId },
        { timeout: 10000 }
      );
      console.log("Reservation Response:", res.data);
      setSuccess("Book reserved successfully!");
      setBookId("");
    } catch (error) {
      console.error("Reserve book error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      setError(
        error.response?.data?.message ||
          `Failed to reserve book: ${error.message} (Status: ${
            error.response?.status || "N/A"
          })`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Reserve Book</h2>
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      <div className="form-group">
        <label>Book ID</label>
        <input
          type="text"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          placeholder="Enter Book ID"
          required
        />
      </div>
      <div className="form-group">
        <label>User</label>
        <input
          type="text"
          value={userName}
          placeholder={error ? "Error loading user" : "Loading user..."}
          readOnly
        />
      </div>
      <button className="btn" onClick={handleReserveBook} disabled={loading}>
        {loading ? "Reserving..." : "Reserve Book"}
      </button>
    </div>
  );
}

export default ReserveBook;
