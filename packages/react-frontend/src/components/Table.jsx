// src/components/Table.jsx
import React from "react";

function Table({ tasks, toggleTask, deleteTask }) {
    function handleToggleTask(id, completed) {
        toggleTask(id, !completed);
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Toggle</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((task) => (
                <tr key={task._id}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.duedate}</td>
                    <td>{task.priority}</td>
                    <td>{task.completed ? "Completed" : "Pending"}</td>
                    <td>
                        <button onClick={() => handleToggleTask(task._id, task.completed)}>
                            Toggle Status
                        </button>
                    </td>
                    <td>
                        <button onClick={() => deleteTask(task._id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;
