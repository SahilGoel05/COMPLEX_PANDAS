// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";
import "./styles/main.css";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(<App />);
