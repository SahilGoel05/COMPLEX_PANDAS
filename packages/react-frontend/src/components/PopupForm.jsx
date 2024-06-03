// src/components/PopupForm.jsx
import React from "react";
import "../styles/PopupForm.css";

function PopupForm({ newTask, handleNewTaskChange, addTask, setShowPopup }) {
    return (
        <div className="popup-form-overlay">
            <div style={{backgroundColor:"rgba(255, 239, 239, 0.9)"}} className="popup-form">
                <h2 style={{color:"black", marginLeft:"-350px",size:"30px",fontWeight:"400" }}>Task Details</h2>
                <input style={{marginLeft:"-50px"}}
                    type="text"
                    name="name"
                    value={newTask.name}
                    onChange={handleNewTaskChange}
                    placeholder="Task Name"
                    className="underline-input"
                />
                <input style={{marginLeft:"-50px"}}
                    type="text"
                    name="description"
                    value={newTask.description}
                    onChange={handleNewTaskChange}
                    placeholder="Add a new task ..."
                    className="underline-input"
                />
                <input style={{marginLeft:"-50px", color:"grey"}}
                    type="date"
                    name="duedate"
                    value={newTask.duedate}
                    onChange={handleNewTaskChange}
                    placeholder="Due Date"
                    className="underline-input"
                />
                <input style={{marginLeft:"-20px", marginRight:"30px", color:"grey"}}
                    type="number"
                    name="priority"
                    value={newTask.priority}
                    onChange={handleNewTaskChange}
                    placeholder="Priority"
                    className="underline-input"
                />
                <button style={{color:"black"}}onClick={addTask}>Confirm</button>
                <button style={{color:"black"}}onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
        </div>
    );
}

export default PopupForm;
