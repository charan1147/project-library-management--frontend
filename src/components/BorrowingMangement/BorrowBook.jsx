import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import "../../App.css";

function BorrowBook() {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/users/me", { timeout: 10000 });
        console.log("Full API Response (/users/me):", res.data);
        if (res.data && typeof res.data === "object") {
          setUserId(res.data._id || res.data.user?.id || "");
          setUserName(res.data.username || res.data.user?.username || "");
          if (!res.data.username && !res.data.user?.username) {
            console.log("Warning: No username found, using userId");
          }
        } else {
          setError("Unexpected response format from /users/me.");
        }
        setError(null);
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
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.post("/borrowing/borrow", { bookId, dueDate, user: userId });
      setSuccess("Book borrowed successfully!");
      setBookId("");
      setDueDate("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to borrow book.");
    }
  };

  return (
    <div className="container">
      <h2>Borrow Book</h2>
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      <form onSubmit={handleSubmit}>
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
            value={loading ? "Loading..." : userName || `(User ID: ${userId})`}
            readOnly
            disabled
          />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button className="btn" type="submit">
          Borrow Book
        </button>
      </form>
    </div>
  );
}

export default BorrowBook;
