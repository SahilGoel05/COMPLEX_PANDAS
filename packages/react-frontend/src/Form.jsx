// src/Form.jsx
import React, { useState } from "react";

function Form({ handleSubmit }) {
    const [task, setTask] = useState("");

    function submitForm() {
        handleSubmit({ description: task, completed: false });
        setTask("");
    }

    function handleChange(event) {
        setTask(event.target.value);
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
            <input
                type="text"
                value={task}
                onChange={handleChange}
                placeholder="Add a new task..."
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default Form;
