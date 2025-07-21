import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import "../../App.css";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("/reservations", { timeout: 10000 });
        console.log(
          "Reservations Response:",
          JSON.stringify(response.data, null, 2)
        );
        setReservations(response.data);
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

  return (
    <div className="container">
      <h2>All Reservations</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="alert error">{error}</div>}
      {!loading && reservations.length === 0 && (
        <div className="alert">No reservations found.</div>
      )}
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation._id}>
            <div>
              <strong>Book Title:</strong>{" "}
              {reservation.book?.title || "Unknown"}
            </div>
            <div>
              <strong>User Name:</strong>{" "}
              {reservation.user?.username ||
                `(User ID: ${reservation.user?._id || "Unknown"})`}
            </div>
            <div>
              <strong>Reservation Date:</strong>{" "}
              {new Date(reservation.dueDate).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminReservations;
