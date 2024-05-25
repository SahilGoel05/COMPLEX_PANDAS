// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import PopupForm from "./PopupForm";
import { useNavigate } from 'react-router-dom';

function MyApp() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: "", description: "", duedate: "", priority: 0, completed: false });
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
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

    async function addTask() {
        try {
            const response = await axios.post("http://localhost:8000/tasks", newTask, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json" }
            });
            setTasks([...tasks, response.data]);
            setNewTask({ name: "", description: "", duedate: "", priority: 0, completed: false });
            setShowPopup(false);  // Hide the popup after adding the task
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    async function deleteTask(id) {
        try {
            await axios.delete(`http://localhost:8000/tasks/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
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

    function handleNewTaskChange(event) {
        const { name, value } = event.target;
        setNewTask({ ...newTask, [name]: value });
    }

    function signOut() {
        localStorage.removeItem('token');
        navigate('/signin');
    }

    return (
        <div className="tasks-container">
            <div className="tasks-header">
                <h1>Tasks</h1>
                <button onClick={signOut} className="button sign-out">Sign Out</button>
            </div>
            <button onClick={() => setShowPopup(true)} className="button add-task">+</button>
            {showPopup && (
                <PopupForm
                    newTask={newTask}
                    handleNewTaskChange={handleNewTaskChange}
                    addTask={addTask}
                    setShowPopup={setShowPopup}
                />
            )}
            <Table tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
        </div>
    );
}

export default MyApp;
