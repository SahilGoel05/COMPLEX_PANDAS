import React from "react";

function Table({ tasks, toggleTask, deleteTask, onRowClick }) {
    function handleToggleTask(id, completed) {
        toggleTask(id, !completed);
    }

    function formatDate(date) {
        const d = new Date(date);
        const month = `${d.getMonth() + 1}`.padStart(2, '0');
        const day = `${d.getDate()}`.padStart(2, '0');
        const year = d.getFullYear();
        return `${month}/${day}/${year}`;
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
                <tr key={task._id} onClick={() => onRowClick(task)}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{formatDate(task.duedate)}</td>
                    <td>{task.priority}</td>
                    <td>{task.completed ? "Completed" : "Pending"}</td>
                    <td>
                        <button onClick={(e) => { e.stopPropagation(); handleToggleTask(task._id, task.completed); }}>
                            Toggle Status
                        </button>
                    </td>
                    <td>
                        <button onClick={(e) => { e.stopPropagation(); deleteTask(task._id); }}>
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
