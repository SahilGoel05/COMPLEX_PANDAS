// src/components/MyApp.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import PopupForm from "./PopupForm";
import CategorySidenav from "./CategorySidenav";
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

function MyApp() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [newTask, setNewTask] = useState({ name: "", description: "", duedate: "", priority: 0, completed: false });
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
        } else {
            fetchCategories();
            fetchTasks("all");  // Fetch all tasks by default
        }
    }, [navigate]);

    useEffect(() => {
        if (selectedCategory) {
            fetchTasks(selectedCategory === "all" ? null : selectedCategory);
        }
    }, [selectedCategory]);

    async function fetchCategories() {
        try {
            const response = await axios.get("http://localhost:8000/categories", {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    async function fetchTasks(categoryId) {
        try {
            const url = categoryId ? `http://localhost:8000/tasks?category=${categoryId}` : `http://localhost:8000/tasks`;
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    async function addTask() {
        try {
            const response = await axios.post("http://localhost:8000/tasks",
                { ...newTask, category: selectedCategory === "all" ? null : selectedCategory }, {
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
            await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    async function toggleTask(id, completed) {
        try {
            const response = await axios.patch(`http://localhost:8000/api/tasks/${id}`, { completed }, {
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
        <div>
            <CategorySidenav categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
            <div className="tasks-container" style={{ marginLeft: '270px' }}>
                <div className="tasks-header">
                    <h1>Tasks</h1>
                    <button onClick={signOut} className="button sign-out">Sign Out</button>
                </div>
                <div className="category-header-container">
                    <h2 className="category-header">{selectedCategory === "all" ? "All Tasks" : categories.find(cat => cat._id === selectedCategory)?.name || "Category"}</h2>
                    <button onClick={() => setShowPopup(true)} className="button add-task">+</button>
                </div>
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
        </div>
    );
}

export default MyApp;
