// src/components/PopupForm.jsx
import React from "react";
import "../styles/PopupForm.css";

function PopupForm({ newTask, handleNewTaskChange, addTask, setShowPopup }) {
    return (
        <div className="popup-form-overlay">
            <div style={{backgroundColor:"rgba(255, 239, 239, 0.9)"}} className="popup-form">
                <h2 style={{color:"black"}}>Add Task</h2>
                <input
                    type="text"
                    name="name"
                    value={newTask.name}
                    onChange={handleNewTaskChange}
                    placeholder="Task Name"
                    className="underline-input"
                />
                <input
                    type="text"
                    name="description"
                    value={newTask.description}
                    onChange={handleNewTaskChange}
                    placeholder="Add a new task..."
                    className="underline-input"
                />
                <input
                    type="date"
                    name="duedate"
                    value={newTask.duedate}
                    onChange={handleNewTaskChange}
                    placeholder="Due Date"
                    className="underline-input"
                />
                <input
                    type="number"
                    name="priority"
                    value={newTask.priority}
                    onChange={handleNewTaskChange}
                    placeholder="Priority"
                    className="underline-input"
                />
                <button onClick={addTask}>Confirm</button>
                <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
        </div>
    );
}

export default PopupForm;
