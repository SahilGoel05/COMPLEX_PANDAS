// src/Table.jsx
import React from "react";

function Table({ tasks, toggleTask, newTask, handleNewTaskChange, addTask }) {
    function handleToggleTask(id, completed) {
        toggleTask(id, !completed);
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Description</th>
                <th>Status</th>
                <th>Toggle</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((task) => (
                <tr key={task._id}>
                    <td>{task.description}</td>
                    <td>{task.completed ? "Completed" : "Pending"}</td>
                    <td>
                        <button onClick={() => handleToggleTask(task._id, task.completed)}>
                            Toggle Status
                        </button>
                    </td>
                </tr>
            ))}
            <tr>
                <td>
                    <input
                        type="text"
                        value={newTask.description}
                        onChange={handleNewTaskChange}
                        placeholder="Add a new task..."
                        className="underline-input"
                    />
                </td>
                <td>
                    <button onClick={addTask}>Confirm</button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default Table;
