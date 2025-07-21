// src/components/BookManagement/SearchBooks.js
import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import "../../App.css";

function SearchBooks({ term, filter }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/books/view");
        setBooks(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch books.");
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = term
    ? books.filter((book) =>
        book[filter]?.toLowerCase().includes(term.toLowerCase())
      )
    : books;

  return (
    <div className="container">
      <h2>{term ? "Search Results" : "All Books"}</h2>
      {error && <div className="alert error">{error}</div>}
      <div>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book._id} className="card">
              <h5>{book.title}</h5>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.ISBN}</p>
              <p>Genre: {book.genre}</p>
              <p>ID: {book._id}</p>
            </div>
          ))
        ) : (
          <div className="alert">No books found.</div>
        )}
      </div>
    </div>
  );
}

export default SearchBooks;
