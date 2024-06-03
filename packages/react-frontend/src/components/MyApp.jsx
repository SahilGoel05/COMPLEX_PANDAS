import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import PopupForm from "./PopupForm";
import CategorySidenav from "./CategorySidenav";
import TaskDetailsModal from "./TaskDetailsModal";
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

function MyApp() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [newTask, setNewTask] = useState({ name: "", description: "", duedate: "", priority: undefined, completed: false });
    const [showPopup, setShowPopup] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [sortOption, setSortOption] = useState("dateAdded");
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

    function getFilteredTasks() {
        let filteredTasks = [...tasks];
        if (sortOption === "pending") {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        } else if (sortOption === "complete") {
            filteredTasks = filteredTasks.filter(task => task.completed);
        } else if (sortOption === "pastDue") {
            const now = new Date();
            filteredTasks = filteredTasks.filter(task => new Date(task.duedate) < now && !task.completed);
        }
        return filteredTasks;
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

    async function updateTask(id, updatedFields) {
        try {
            const response = await axios.patch(`http://localhost:8000/tasks/${id}`, updatedFields, {
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

    function handleRowClick(task) {
        setSelectedTask(task);
    }

    function closeTaskDetailsModal() {
        setSelectedTask(null);
    }

    function handleSortChange(event) {
        setSortOption(event.target.value);
    }

    function signOut() {
        localStorage.removeItem('token');
        navigate('/signin');
    }

    return (
        <div>
            <div><img style={{height: "200px", width: "200px",marginLeft:"50px"}} src="../../pictures /picture2.jpeg" alt="background image" /></div>
            <CategorySidenav
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
            />
            <div className="tasks-container" style={{ marginLeft: '270px', marginTop:"-170px"}}>
                <div className="tasks-header">
                    <h1 style={{color:"black", fontSize:"40px", fontWeight:"bolder"}}>Panda Todo</h1>
                    <button style= {{color:"white", fontWeight:"bold", backgroundColor:"grey"}}onClick={signOut} className="button sign-out">Sign Out</button>
                </div>

                <div className="category-header-container">
                    <h2 style={{color:"black"}}className="category-header">{selectedCategory === "all" ? "All Tasks" : categories.find(cat => cat._id === selectedCategory)?.name || "Category"}</h2>
                    {selectedCategory !== "all" && (
                        <button onClick={() => setShowPopup(true)} className="button add-task" style={{color:"black"}}>+</button>
                    )}
                    <select  style={{color:"black", backgroundColor:"#F8C0C0",fontWeight:"600" }}className="sort-dropdown" value={sortOption} onChange={handleSortChange}>
                        <option value="dateAdded">Date Added</option>
                        <option value="pending">Pending</option>
                        <option value="complete">Complete</option>
                        <option value="pastDue">Past Due</option>
                    </select>

                </div>
                {showPopup && (
                    <PopupForm
                        newTask={newTask}
                        handleNewTaskChange={handleNewTaskChange}
                        addTask={addTask}
                        setShowPopup={setShowPopup}
                    />
                )}
                <TaskList tasks={getFilteredTasks()} toggleTask={toggleTask} deleteTask={deleteTask} onRowClick={handleRowClick} />
            </div>
            {selectedTask && (
                <TaskDetailsModal task={selectedTask} onClose={closeTaskDetailsModal} updateTask={updateTask} />
            )}
        </div>
    );
}

export default MyApp;
