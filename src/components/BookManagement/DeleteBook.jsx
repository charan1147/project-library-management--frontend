// src/components/BookManagement/DeleteBookPage.js
import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import "../../App.css";

function DeleteBookPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/books/view");
        setBooks(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.delete(`/books/delete/${id}`);
      setBooks(books.filter((book) => book._id !== id));
      setSuccess("Book deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Delete Book</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      {books.length === 0 && !loading ? (
        <div>No books available.</div>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              {book.title}
              <button className="btn" onClick={() => handleDelete(book._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeleteBookPage;
