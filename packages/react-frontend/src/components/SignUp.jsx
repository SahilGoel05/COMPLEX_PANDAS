// src/components/SignUp.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/main.css"; // Assuming this file includes styles for sign-up

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signup",
        formData,
      );
      //setTimeout(() => {
        navigate("/signin?signup=success"); // Redirect to sign-in after the tooltip is displayed
      //}, 3000);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : "An error occurred while signing up.";
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
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2
            style={{ fontSize: "31.05px", fontWeight: "bold", color: "black" }}
          >
            Sign Up
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
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
            data-testid='signup-button'
            type="submit"
          >
            Sign Up
          </button>
          <p style={{ marginTop: "42px", color: "grey" }}>
            Already have an account?{" "}
            <Link to="/signin">
              {" "}
              <span style={{ color: "#F79B9B", textDecoration: "none" }}>
                Sign In
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

export default SignUp;
