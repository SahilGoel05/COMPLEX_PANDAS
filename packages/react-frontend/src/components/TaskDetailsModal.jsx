import React, { useState } from "react";
import "../styles/TaskDetailsModal.css";

function TaskDetailsModal({ task, onClose, updateTask }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [editedDueDate, setEditedDueDate] = useState(
    new Date(task.duedate).toISOString().substr(0, 10),
  );
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const handleSave = () => {
    const updatedFields = {
      name: editedName,
      description: editedDescription,
      duedate: editedDueDate,
      priority: editedPriority,
    };
    updateTask(task._id, updatedFields);
    setIsEditingName(false);
    setIsEditingDescription(false);
    setIsEditingDueDate(false);
    setIsEditingPriority(false);
  };

  const getPriorityString = (priorityValue) => {
    switch (parseInt(priorityValue)) {
      case 0:
        return "Low";
      case 1:
        return "Medium";
      case 2:
        return "High";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="task-details-modal-overlay">
      <div className="task-details-modal">
        <h2>Task Details</h2>
        <div className="task-detail">
          <strong>Name:</strong>
          {isEditingName ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <span onClick={() => setIsEditingName(true)}>
              {editedName} <button className="edit-button">✎</button>
            </span>
          )}
        </div>
        <div className="task-detail">
          <strong>Description:</strong>
          {isEditingDescription ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            <span onClick={() => setIsEditingDescription(true)}>
              {editedDescription} <button className="edit-button">✎</button>
            </span>
          )}
        </div>
        <div className="task-detail">
          <strong>Due Date:</strong>
          {isEditingDueDate ? (
            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              onBlur={handleSave}
              data-testid="due-date-input"
              autoFocus
            />
          ) : (
            <span onClick={() => setIsEditingDueDate(true)}>
              {new Date(editedDueDate).toLocaleDateString()}{" "}
              <button className="edit-button">✎</button>
            </span>
          )}
        </div>
        <div className="task-detail">
          <strong>Priority:</strong>
          {isEditingPriority ? (
            <select
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
              onBlur={handleSave}
              data-testid="priority-input"
              autoFocus
            >
              <option value="0">Low</option>
              <option value="1">Medium</option>
              <option value="2">High</option>
            </select>
          ) : (
            <span onClick={() => setIsEditingPriority(true)}>
              {getPriorityString(editedPriority)}{" "}
              <button className="edit-button">✎</button>
            </span>
          )}
        </div>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
