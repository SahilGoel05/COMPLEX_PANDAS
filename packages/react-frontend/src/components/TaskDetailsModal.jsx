// src/components/TaskDetailsModal.jsx
import React, { useState } from 'react';
import '../styles/TaskDetailsModal.css';

function TaskDetailsModal({ task, onClose, updateTask }) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingDueDate, setIsEditingDueDate] = useState(false);
    const [isEditingPriority, setIsEditingPriority] = useState(false);
    const [isEditingStatus, setIsEditingStatus] = useState(false);

    const [editedTask, setEditedTask] = useState({
        name: task.name,
        description: task.description,
        duedate: task.duedate,
        priority: task.priority,
        completed: task.completed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleSave = () => {
        const updatedFields = {
            ...editedTask,
            duedate: new Date(editedTask.duedate).toISOString(), // Ensure duedate is in the correct format
            priority: parseInt(editedTask.priority, 10),
            completed: editedTask.completed === "true" // Convert string to boolean
        };
        updateTask(task._id, updatedFields);
        setIsEditingName(false);
        setIsEditingDescription(false);
        setIsEditingDueDate(false);
        setIsEditingPriority(false);
        setIsEditingStatus(false);
        onClose();
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString();
    };

    return (
        <div className="task-details-modal-overlay">
            <div className="task-details-modal">
                <h2>Task Details</h2>
                <div className="editable-field">
                    <label><strong>Name:</strong></label>
                    {isEditingName ? (
                        <input
                            type="text"
                            name="name"
                            value={editedTask.name}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{task.name}</span>
                    )}
                    <button onClick={() => setIsEditingName(!isEditingName)} className="edit-icon">✎</button>
                </div>
                <div className="editable-field">
                    <label><strong>Description:</strong></label>
                    {isEditingDescription ? (
                        <textarea
                            name="description"
                            value={editedTask.description}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{task.description}</span>
                    )}
                    <button onClick={() => setIsEditingDescription(!isEditingDescription)} className="edit-icon">✎</button>
                </div>
                <div className="editable-field">
                    <label><strong>Due Date:</strong></label>
                    {isEditingDueDate ? (
                        <input
                            type="date"
                            name="duedate"
                            value={editedTask.duedate.split('T')[0]}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{formatDate(task.duedate)}</span>
                    )}
                    <button onClick={() => setIsEditingDueDate(!isEditingDueDate)} className="edit-icon">✎</button>
                </div>
                <div className="editable-field">
                    <label><strong>Priority:</strong></label>
                    {isEditingPriority ? (
                        <select
                            name="priority"
                            value={editedTask.priority}
                            onChange={handleChange}
                        >
                            <option value="0">Low</option>
                            <option value="1">Medium</option>
                            <option value="2">High</option>
                        </select>
                    ) : (
                        <span>{task.priority}</span>
                    )}
                    <button onClick={() => setIsEditingPriority(!isEditingPriority)} className="edit-icon">✎</button>
                </div>
                <div className="editable-field">
                    <label><strong>Status:</strong></label>
                    {isEditingStatus ? (
                        <select
                            name="completed"
                            value={editedTask.completed}
                            onChange={handleChange}
                        >
                            <option value="false">Pending</option>
                            <option value="true">Completed</option>
                        </select>
                    ) : (
                        <span>{task.completed ? "Completed" : "Pending"}</span>
                    )}
                    <button onClick={() => setIsEditingStatus(!isEditingStatus)} className="edit-icon">✎</button>
                </div>
                {(isEditingName || isEditingDescription || isEditingDueDate || isEditingPriority || isEditingStatus) && <button onClick={handleSave} className="save-button">Save</button>}
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
}

export default TaskDetailsModal;
