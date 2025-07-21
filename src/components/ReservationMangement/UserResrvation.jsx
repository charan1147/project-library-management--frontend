// src/components/ReservationManagement/UserReservations.js
import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import "../../App.css";

function UserReservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("/reservations/user");
        setReservations(response.data.reservations);
        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch reservations."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    setError(null);
    setSuccess(null);
    try {
      await axios.delete(`/reservations/${id}`);
      setReservations(reservations.filter((r) => r._id !== id));
      setSuccess("Reservation canceled successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel reservation.");
    }
  };

  return (
    <div className="container">
      <h2>My Reservations</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      {!loading && reservations.length === 0 && (
        <div className="alert">No active reservations.</div>
      )}
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation._id}>
            <div>
              <strong>Book Title:</strong>{" "}
              {reservation.book?.title || "Unknown"}
            </div>
            <div>
              <strong>Reserved Until:</strong>{" "}
              {new Date(reservation.dueDate).toLocaleDateString()}
            </div>
            <button
              className="btn"
              onClick={() => handleCancel(reservation._id)}
            >
              Cancel Reservation
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserReservations;
