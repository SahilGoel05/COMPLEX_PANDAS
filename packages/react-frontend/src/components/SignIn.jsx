// src/components/SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/main.css"; // Assuming this file includes styles for sign-in

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // State to hold error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signin",
        formData,
      );
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : "An error occurred while signing in.";
      setError(errorMessage);
    }
  };

  return (
    <div className="signin-container1">
      <div>
        <h1
          style={{
            marginTop: "120px",
            marginLeft: "130px",
            fontSize: "40px",
            color: "white",
          }}
        >
          {" "}
          Panda Todo
        </h1>
      </div>
      <div className="signin-container">
        <form style={{}} className="signin-form" onSubmit={handleSubmit}>
          <h2
            style={{ fontSize: "31.05px", fontWeight: "bold", color: "black" }}
          >
            Sign In
          </h2>
          {error && <div className="error-message">{error}</div>}
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginTop: "12px" }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            style={{
              marginTop: "22px",
              width: "400px",
              backgroundColor: "#F79B9B",
            }}
            type="submit"
          >
            Sign In
          </button>
          <p style={{ marginTop: "42px", color: "grey" }}>
            Don't have an account?{" "}
            <Link to="/signup">
              <span style={{ color: "#F79B9B", textDecoration: "none" }}>
                Sign Up
              </span>
            </Link>
          </p>
        </form>
        <div>
          <img
            style={{ height: "750px", width: "700px", marginRight: "50px" }}
            src="../../pictures /picture1.jpeg"
            alt="background image"
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
