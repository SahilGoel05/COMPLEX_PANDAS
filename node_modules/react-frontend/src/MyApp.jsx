// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import Form from "./Form";
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function MyApp() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();  // Hook to navigate programmatically

    useEffect(() => {
        // Check if there's a token in localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');  // No token found, redirect to sign-in page
        } else {
            fetchTasks();
        }
    }, [navigate]);

    async function fetchTasks() {
        try {
            const response = await axios.get("http://localhost:8000/tasks", {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    async function addTask(task) {
        try {
            const response = await axios.post("http://localhost:8000/tasks", task, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json" }
            });
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    async function toggleTask(id, completed) {
        try {
            const response = await axios.patch(`http://localhost:8000/tasks/${id}`, { completed }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json" }
            });
            const newTasks = tasks.map(task => task._id === id ? response.data : task);
            setTasks(newTasks);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    function signOut() {
        localStorage.removeItem('token');  // Clear the token from localStorage
        navigate('/signin');  // Navigate to the sign-in page
    }

    return (
        <div className="tasks-container">
            <div className="tasks-header">
                <h1>Tasks</h1>
                <button onClick={signOut} className="button sign-out">Sign Out</button>
            </div>
            <Form handleSubmit={addTask} />
            <Table tasks={tasks} toggleTask={toggleTask} />
        </div>
    );
}

export default MyApp;
