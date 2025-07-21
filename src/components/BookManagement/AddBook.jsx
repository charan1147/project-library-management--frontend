// src/components/BookManagement/AddBook.js
import React, { useState } from "react";
import axios from "../../axios/axios";
import "../../App.css";

function AddBook() {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    ISBN: "",
    genre: "",
    publicationYear: "",
    availabilityStatus: "available",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.post("/books/add", bookData);
      setSuccess("Book added successfully!");
      setBookData({
        title: "",
        author: "",
        ISBN: "",
        genre: "",
        publicationYear: "",
        availabilityStatus: "available",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add book.");
    }
  };

  return (
    <div className="container">
      <h2>Add New Book</h2>
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            required
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            placeholder="Enter Author"
            required
          />
        </div>
        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            name="ISBN"
            value={bookData.ISBN}
            onChange={handleChange}
            placeholder="Enter ISBN"
            required
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            placeholder="Enter Genre"
            required
          />
        </div>
        <div className="form-group">
          <label>Publication Year</label>
          <input
            type="number"
            name="publicationYear"
            value={bookData.publicationYear}
            onChange={handleChange}
            placeholder="Enter Year"
            required
          />
        </div>
        <div className="form-group">
          <label>Availability Status</label>
          <select
            name="availabilityStatus"
            value={bookData.availabilityStatus}
            onChange={handleChange}
            required
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <button className="btn" type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
