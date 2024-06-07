import React from "react";
import "../styles/PopupForm.css";

function PopupForm({ newTask, handleNewTaskChange, addTask, setShowPopup }) {
  return (
    <div className="popup-form-overlay">
      <div
        style={{ backgroundColor: "rgba(255, 239, 239, 0.9)" }}
        className="popup-form"
      >
        <h2
          style={{
            color: "black",
            marginLeft: "-350px",
            size: "30px",
            fontWeight: "400",
          }}
        >
          Task Details
        </h2>
        <input
          style={{ marginLeft: "-50px" }}
          type="text"
          name="name"
          value={newTask.name}
          onChange={handleNewTaskChange}
          placeholder="Task Name"
          className="underline-input"
        />
        <input
          style={{ marginLeft: "-50px" }}
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleNewTaskChange}
          placeholder="Task Description"
          className="underline-input"
        />
        <input
          style={{ marginLeft: "-50px", color: "grey" }}
          type="date"
          name="duedate"
          value={newTask.duedate}
          onChange={handleNewTaskChange}
          placeholder="Due Date"
          className="underline-input"
        />
        <select
          style={{ marginLeft: "7px", marginRight: "55px", color: "grey" }}
          name="priority"
          value={newTask.priority === 0 ? "" : newTask.priority}
          onChange={handleNewTaskChange}
          placeholder="Priority"
          className="underline-input"
        >
          <option value="" selected disabled>
            Priority
          </option>
          <option value="0">Low</option>
          <option value="1">Medium</option>
          <option value="2">High</option>
        </select>
        <button style={{ color: "black" }} onClick={addTask}>
          Confirm
        </button>
        <button style={{ color: "black" }} onClick={() => setShowPopup(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PopupForm;
