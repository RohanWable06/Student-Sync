import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import axios from "axios";

const Lognavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {

      // Clear session data
      localStorage.removeItem('authToken'); // Remove token from localStorage

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      setError("An error occurred during logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3 py-2">
      <div className="container">
        <a
          className="navbar-brand d-flex align-items-center cursor-pointer"
          onClick={() =>
            navigate("/")}
        >
          <RxDashboard className="me-2" />
          {location.state && location.state.type} Dashboard
        </a>
        <button
          className="btn btn-outline-light d-flex align-items-center"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
          <FiLogOut className="ms-2" />
        </button>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </div>
    </nav>
  );
};

export default Lognavbar;
