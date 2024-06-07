import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../styles/main.css";

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState("");
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

        navigate("/signin?signup=success");

      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error
          : "An error occurred while signing up.";
        setError(errorMessage);
      }
    };

    return (
        <div className="signup-page" src={'/pictures/pandas.jpg'}>
            <h1 style={{ fontSize: "40px", color: "white", marginBottom: "20px" }}>Panda TODO</h1>
            <form className="signin-form" onSubmit={handleSubmit}>
                <h2 style={{ fontSize: "31.05px", fontWeight: "bold", color: "black", marginBottom: "20px" }}>Sign Up</h2>
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
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
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
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
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
                        style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                    />
                </div>
                <button style={{ marginTop: "22px", width: "100%", backgroundColor: "#F79B9B", padding: "10px", borderRadius: "5px", border: "none", color: "white" }} data-testid="signup-button" type="submit">Sign Up</button>
                <p style={{ marginTop: "42px", color: "grey" }}>
                    Already have an account? <Link to="/signin"><span style={{ color: "#F79B9B", textDecoration: "none" }}>Sign In</span></Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
