// src/components/ReservationManagement/CancelReservation.js
import React, { useState } from "react";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function CancelReservation() {
  const [reservationId, setReservationId] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCancel = async () => {
    setError(null);
    setSuccess(null);

    if (!reservationId) {
      setError("Reservation ID is required");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`/reservations/${reservationId}`);
      setSuccess("Reservation canceled successfully.");
      setTimeout(() => navigate("/user-reservations"), 2000);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to cancel reservation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Cancel Reservation</h2>
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      <div className="form-group">
        <label>Reservation ID</label>
        <input
          type="text"
          value={reservationId}
          onChange={(e) => setReservationId(e.target.value)}
          placeholder="Enter Reservation ID"
        />
      </div>
      <button className="btn" onClick={handleCancel} disabled={loading}>
        {loading ? "Cancelling..." : "Cancel Reservation"}
      </button>
    </div>
  );
}

export default CancelReservation;
