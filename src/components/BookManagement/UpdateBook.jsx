// src/components/BookManagement/UpdateBook.js
import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import "../../App.css";

function UpdateBook() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [book, setBook] = useState({
    title: "",
    author: "",
    ISBN: "",
    genre: "",
    publicationYear: "",
    availabilityStatus: "available",
  });
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

  const fetchBookDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/books/view/${id}`);
      setBook(response.data);
      setSelectedBookId(id);
      setError(null);
    } catch (err) {
      setError("Failed to fetch book details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.put(`/books/update/${selectedBookId}`, book);
      setSuccess("Book updated successfully!");
      setBook({
        title: "",
        author: "",
        ISBN: "",
        genre: "",
        publicationYear: "",
        availabilityStatus: "available",
      });
      setSelectedBookId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Book List</h2>
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      {books.length === 0 ? (
        <div>No books available.</div>
      ) : (
        <ul>
          {books.map((b) => (
            <li key={b._id}>
              {b.title}
              <button className="btn" onClick={() => fetchBookDetails(b._id)}>
                Update
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedBookId && (
        <div>
          <h2>Update Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Author"
                required
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                name="ISBN"
                value={book.ISBN}
                onChange={handleChange}
                placeholder="ISBN"
                required
              />
            </div>
            <div className="form-group">
              <label>Genre</label>
              <input
                type="text"
                name="genre"
                value={book.genre}
                onChange={handleChange}
                placeholder="Genre"
                required
              />
            </div>
            <div className="form-group">
              <label>Publication Year</label>
              <input
                type="number"
                name="publicationYear"
                value={book.publicationYear}
                onChange={handleChange}
                placeholder="Year"
                required
              />
            </div>
            <div className="form-group">
              <label>Availability</label>
              <select
                name="availabilityStatus"
                value={book.availabilityStatus}
                onChange={handleChange}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Book"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateBook;
