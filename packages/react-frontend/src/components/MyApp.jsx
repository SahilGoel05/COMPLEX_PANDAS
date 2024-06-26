import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import PopupForm from "./PopupForm";
import CategorySidenav from "./CategorySidenav";
import TaskDetailsModal from "./TaskDetailsModal";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

function MyApp() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    duedate: "",
    priority: undefined,
    completed: false,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sortOption, setSortOption] = useState("dateAdded");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      fetchCategories();
      fetchTasks("all");
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchTasks(selectedCategory === "all" ? null : selectedCategory);
    }
  }, [selectedCategory]);

  async function fetchCategories() {
    try {
      const response = await axios.get("https://cp-backend-90532c6e461f.herokuapp.com/categories", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchTasks(categoryId) {
    try {
      const url = categoryId
        ? `https://cp-backend-90532c6e461f.herokuapp.com/tasks?category=${categoryId}`
        : `https://cp-backend-90532c6e461f.herokuapp.com/tasks`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  function getFilteredTasks() {
    let filteredTasks = [...tasks];
    if (sortOption === "pending") {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    } else if (sortOption === "complete") {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    } else if (sortOption === "pastDue") {
      const now = new Date();
      filteredTasks = filteredTasks.filter(
        (task) => new Date(task.duedate) < now && !task.completed,
      );
    } else if (sortOption === "priority") {
      filteredTasks.sort((a, b) => b.priority - a.priority);
    } else if (sortOption === "dueDate") {
      filteredTasks.sort((a, b) => new Date(a.duedate) - new Date(b.duedate));
    }
    return filteredTasks;
  }

  async function addTask() {
    try {
      const response = await axios.post(
        "https://cp-backend-90532c6e461f.herokuapp.com/tasks",
        {
          ...newTask,
          category: selectedCategory === "all" ? null : selectedCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      setTasks([...tasks, response.data]);
      setNewTask({
        name: "",
        description: "",
        duedate: "",
        priority: 0,
        completed: false,
      });
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`https://cp-backend-90532c6e461f.herokuapp.com/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function toggleTask(id, completed) {
    try {
      const response = await axios.patch(
        `https://cp-backend-90532c6e461f.herokuapp.com/tasks/${id}`,
        { completed },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      const newTasks = tasks.map((task) =>
        task._id === id ? response.data : task,
      );
      setTasks(newTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function updateTask(id, updatedFields) {
    try {
      const response = await axios.patch(
        `https://cp-backend-90532c6e461f.herokuapp.com/tasks/${id}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      const newTasks = tasks.map((task) =>
        task._id === id ? response.data : task,
      );
      setTasks(newTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  function handleNewTaskChange(event) {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  }

  function handleRowClick(task) {
    setSelectedTask(task);
  }

  function closeTaskDetailsModal() {
    setSelectedTask(null);
  }

  function handleSortChange(event) {
    setSortOption(event.target.value);
  }

  function signOut() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  function handleCategoryDeleted(deletedCategoryId) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.category !== deletedCategoryId),
    );
  }

  function handleCategoryAdded(newCategory) {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
    setSelectedCategory(newCategory._id);
  }

  return (
    <div>
      <div>
        <img
          style={{ height: "200px", width: "200px", marginLeft: "50px" }}
          src="/pictures/picture2.jpeg"
          alt="background image"
        />
      </div>
      <CategorySidenav
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        onCategoryDeleted={handleCategoryDeleted}
        onCategoryAdded={handleCategoryAdded}
      />
      <div
        className="tasks-container"
        style={{
          marginLeft: "300px",
          marginTop: "-170px",
          marginRight: "20px",
        }}
      >
        <div className="tasks-header">
          <h1
            style={{ color: "black", fontSize: "40px", fontWeight: "bolder" }}
          >
            Panda TODO
          </h1>
          <button
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "grey",
            }}
            onClick={signOut}
            className="button sign-out"
          >
            Sign Out
          </button>
        </div>

        <div className="category-header-container">
          <h2 style={{ color: "black" }} className="category-header">
            {selectedCategory === "all"
              ? "All Tasks"
              : categories.find((cat) => cat._id === selectedCategory)?.name ||
                "Category"}
          </h2>
          {selectedCategory !== "all" && (
            <button
              onClick={() => setShowPopup(true)}
              className="button add-task"
              style={{ color: "black" }}
            >
              +
            </button>
          )}
          <select
            style={{
              color: "black",
              backgroundColor: "#F8C0C0",
              fontWeight: "600",
            }}
            className="sort-dropdown"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="dateAdded">Date Added</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
            <option value="pastDue">Past Due</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
        {showPopup && (
          <PopupForm
            newTask={newTask}
            handleNewTaskChange={handleNewTaskChange}
            addTask={addTask}
            setShowPopup={setShowPopup}
          />
        )}
        <TaskList
          tasks={getFilteredTasks()}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          onRowClick={handleRowClick}
          selectedCategory={selectedCategory}
        />
      </div>
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={closeTaskDetailsModal}
          updateTask={updateTask}
        />
      )}
    </div>
  );
}

export default MyApp;
