import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import "../../App.css";

function OverdueBooks() {
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverdueBooks = async () => {
      try {
        const response = await axios.get("/borrowing/overdue", {
          timeout: 10000,
        });
        console.log("Overdue Books Response:", response.data.overdueBooks);
        setOverdueBooks(response.data.overdueBooks || []);
        setError(null);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch overdue books."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOverdueBooks();
  }, []);

  return (
    <div className="container">
      <h2>Overdue Books</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="alert error">{error}</div>}
      {overdueBooks.length > 0 ? (
        <ul>
          {overdueBooks.map((book) => (
            <li key={book._id}>
              <h4>{book.bookId?.title || "Unknown Book"}</h4>
              <p>Borrowed by: {book.userId?.username || "Unknown User"}</p>
              <p>Due Date: {new Date(book.dueDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert">No overdue books found.</div>
      )}
    </div>
  );
}

export default OverdueBooks;
