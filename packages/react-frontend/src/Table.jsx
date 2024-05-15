// src/Table.jsx
function Table({ tasks, toggleTask }) {
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
            </tbody>
        </table>
    );
}

export default Table;
