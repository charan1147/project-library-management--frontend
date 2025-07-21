// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "./axios/axios"
import Navigation from "./components/Navigation";
import Homepage from "./pages/Homepage";
import AddBook from "./components/BookManagement/AddBook";
import UpdateBook from "./components/BookManagement/UpdateBook";
import DeleteBookPage from "./components/BookManagement/DeleteBook";
import SearchBooks from "./components/BookManagement/SearchBooks";
import Register from "./components/UserMangement/Register";
import Login from "./components/UserMangement/Login";
import ChangePassword from "./components/UserMangement/ChangePassword";
import ReserveBook from "./components/ReservationMangement/ReserveBook";
import CancelReservation from "./components/ReservationMangement/CancelReservation";
import BorrowBook from "./components/BorrowingMangement/BorrowBook";
import ReturnBook from "./components/BorrowingMangement/ReturnBook";
import OverdueBooks from "./components/BorrowingMangement/OverdueBooks";
import AdminReservations from "./components/ReservationMangement/ViewReservation";
import UserReservations from "./components/ReservationMangement/UserResrvation";
import{ProtectedAdminDashboard,ProtectedUserDashboard} from "./components/UserMangement/ProtectedRoutes"
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("/users/me");
      setIsLoggedIn(true);
      setUserRole(res.data.role || localStorage.getItem("userRole"));
    } catch (err) {
      console.error("Fetch user failed:", err);
      setIsLoggedIn(false);
      setUserRole("");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
    }
  };

  const handleLogin = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole("");
  };

  return (
    <div className="app-container">
      <Navigation
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              userRole === "admin" ? (
                <Navigate to="/admin-dashboard" />
              ) : (
                <Navigate to="/user-dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/admin-dashboard" element={<ProtectedAdminDashboard />} />
        <Route path="/user-dashboard" element={<ProtectedUserDashboard />} />
        <Route
          path="/add-book"
          element={
            isLoggedIn && userRole === "admin" ? (
              <AddBook />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/update-book"
          element={
            isLoggedIn && userRole === "admin" ? (
              <UpdateBook />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/delete-book"
          element={
            isLoggedIn && userRole === "admin" ? (
              <DeleteBookPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/books/search" element={<SearchBooks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/change-password"
          element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />}
        />
        <Route
          path="/reserve-book"
          element={
            isLoggedIn && userRole === "user" ? (
              <ReserveBook />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user-reservations"
          element={
            isLoggedIn && userRole === "user" ? (
              <UserReservations />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/view-reservations"
          element={
            isLoggedIn && userRole === "admin" ? (
              <AdminReservations />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/cancel-reservation"
          element={
            isLoggedIn ? <CancelReservation /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/borrow-book"
          element={
            isLoggedIn && userRole === "user" ? (
              <BorrowBook />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/return-book"
          element={
            isLoggedIn && userRole === "user" ? (
              <ReturnBook />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/overdue-books"
          element={
            isLoggedIn && userRole === "user" ? (
              <OverdueBooks />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
