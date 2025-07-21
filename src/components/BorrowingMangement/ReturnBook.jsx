// src/components/BorrowManagement/ReturnBook.js
import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import "../../App.css";

function ReturnBook() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const res = await axios.get("/borrowing/borrowed");
        setBorrowedBooks(res.data);
      } catch (err) {
        setError("Failed to fetch borrowed books.");
      }
    };
    fetchBorrowedBooks();
  }, []);

  const handleReturn = async (id) => {
    setError(null);
    setSuccess(null);
    try {
      await axios.put(`/borrowing/return/${id}`);
      setSuccess("Book returned successfully!");
      setBorrowedBooks(borrowedBooks.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Return failed.");
    }
  };

  return (
    <div className="container">
      <h2>Return Book</h2>
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      {borrowedBooks.length === 0 ? (
        <p>No borrowed books found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Borrowed Date</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((item) => (
              <tr key={item._id}>
                <td>{item.bookId?.title || "Unknown"}</td>
                <td>{new Date(item.borrowingDate).toLocaleDateString()}</td>
                <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleReturn(item._id)}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReturnBook;
