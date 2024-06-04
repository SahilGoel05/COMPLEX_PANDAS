// src/components/SignIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../styles/main.css"; // Assuming this file includes styles for sign-in
import backgroundImage from '../styles/pandas.jpg';

function SignIn() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState("");  // State to hold error messages
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Clear previous errors
        try {
            const response = await axios.post('http://localhost:8000/auth/signin', formData);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            const errorMessage = error.response ? error.response.data.error : "An error occurred while signing in.";
            setError(errorMessage);
        }
    };

    return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "#F79B9B",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h1 style={{ fontSize: "40px", color: "white" }}>Panda Todo</h1>
          </div>
         
            <form className="signin-form" onSubmit={handleSubmit}>
              <h2 style={{ fontSize: "31.05px", fontWeight: "bold", color: "black", marginBottom: "20px" }}>Sign In</h2>
              {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
              <div style={{ marginBottom: "12px" }}>
                <label htmlFor="username" style={{ display: "block", marginBottom: "5px" }}>Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#F79B9B",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "5px",
                  marginTop: "22px",
                }}
              >
                Sign In
              </button>
              <p style={{ color: "grey", marginTop: "20px", textAlign: "center" }}>
                Don't have an account? <a href="/signup" style={{ color: "#F79B9B", textDecoration: "none" }}>Sign Up</a>
              </p>
            </form>
          </div>
    
    );
}

export default SignIn;
