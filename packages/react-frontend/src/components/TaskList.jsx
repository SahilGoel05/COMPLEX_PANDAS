// src/components/TaskList.jsx
import React, { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import "../styles/TaskList.css";

function TaskList({
  tasks,
  toggleTask,
  deleteTask,
  onRowClick,
  selectedCategory,
}) {
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
  };

  const handleConfirmDelete = () => {
    deleteTask(taskToDelete._id);
    setTaskToDelete(null);
  };

  const handleToggleTask = (task) => {
    toggleTask(task._id, !task.completed);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 2:
        return "high-priority";
      case 1:
        return "medium-priority";
      case 0:
        return "low-priority";
      default:
        return "no-priority";
    }
  };

  return (
    <div style={{ margin: "5px", borderRadius: "10px" }} className="task-list">
      {tasks.length === 0 && selectedCategory !== "all" ? (
        <p className="no-tasks-message">
          No tasks yet! Click the + button above to get started with adding
          tasks.
        </p>
      ) : (
        tasks.map((task) => (
          <div
            style={{ borderRadius: "10px" }}
            key={task._id}
            className={`task-bubble-container ${task.completed ? "completed-task" : ""}`}
          >
            <div
              className={`task-dot ${task.completed ? "completed" : ""}`}
              onClick={() => handleToggleTask(task)}
            ></div>
            <div
              className={`task-bubble ${getPriorityClass(task.priority)}`}
              onClick={() => onRowClick(task)}
            >
              <div className="task-bubble-content">
                <span className="task-bubble-name">{task.name}</span>
                <span className="task-bubble-duedate">
                  {new Date(task.duedate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              className="task-bubble-delete"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(task);
              }}
            >
              🗑️
            </button>
          </div>
        ))
      )}
      {taskToDelete && (
        <DeleteConfirmationModal
          task={taskToDelete}
          onClose={() => setTaskToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default TaskList;
