// src/components/CategorySidenav.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal";
import "../styles/sidenav.css";

function CategorySidenav({
                           categories,
                           setSelectedCategory,
                           selectedCategory,
                         }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updatedCategories, setUpdatedCategories] = useState(categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/categories", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUpdatedCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAddCategory = () => {
    setShowAddCategoryPopup(true);
    setErrorMessage("");
  };

  const confirmAddCategory = async () => {
    if (newCategoryName) {
      try {
        await axios.post(
            "http://localhost:8000/categories",
            { name: newCategoryName },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
        );
        fetchCategories();
        setNewCategoryName("");
        setShowAddCategoryPopup(false);
      } catch (error) {
        if (
            error.response &&
            error.response.data.error === "Category name already exists."
        ) {
          setErrorMessage("Category name already exists.");
        } else {
          console.error("Error adding category:", error);
        }
      }
    } else {
      setErrorMessage("Category name is required.");
    }
  };

  const handleDeleteCategory = (categoryId) => {
    setCategoryToDelete(categoryId);
    setShowConfirmation(true);
  };

  const confirmDeleteCategory = async () => {
    try {
      await axios.delete(
          `http://localhost:8000/categories/${categoryToDelete}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          },
      );
      fetchCategories();
      setSelectedCategory("all");
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setShowConfirmation(false);
      setCategoryToDelete(null);
    }
  };

  return (
      <div>
        <div className="sidenav" data-testid="sidenav">
          <h3 style={{ color: "#ff69b4" }}>Categories</h3>
          <button
              style={{
                backgroundColor: selectedCategory === "all" ? "white" : "#F8C0C093",
                color: selectedCategory === "all" ? "#F8C0C0" : "white",
              }}
              className={`category-button ${selectedCategory === "all" ? "selected" : ""}`}
              onClick={() => handleCategoryClick("all")}
              data-testid="all-tasks-button"
          >
            All Tasks
          </button>
          {updatedCategories.length === 0 ? (
              <p className="no-categories-message" data-testid="no-categories-message">
                No categories yet! Click the + button below to add a new category.
              </p>
          ) : (
              updatedCategories.map((category) => (
                  <div key={category._id} className="category-item">
                    <button
                        className={`category-button ${selectedCategory === category._id ? "selected" : ""}`}
                        onClick={() => handleCategoryClick(category._id)}
                        data-testid={`category-button-${category._id}`}
                    >
                      {category.name}
                    </button>
                    <button
                        className="delete-category-button"
                        onClick={() => handleDeleteCategory(category._id)}
                        data-testid={`delete-category-${category._id}`}
                    >
                <span
                    style={{
                      color: "white",
                      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
                    }}
                >
                  x
                </span>
                    </button>
                  </div>
              ))
          )}
        </div>
        <div className="add-category-container">
          <button
              style={{
                color: "white",
                fontSize: "30px",
                marginBottom: "100px",
                fontWeight: "600",
              }}
              className="add-category-button"
              onClick={handleAddCategory}
              data-testid="add-category-button"
          >
            +
          </button>
        </div>
        {showConfirmation && (
            <ConfirmationModal
                message="Are you sure you want to delete this category and all its tasks?"
                onConfirm={confirmDeleteCategory}
                onCancel={() => setShowConfirmation(false)}
            />
        )}
        {showAddCategoryPopup && (
            <ConfirmationModal
                message={
                  <div style={{ height: "70px", width: "440px" }}>
                    {errorMessage && <p className="error-message" data-testid="error-message">{errorMessage}</p>}
                    <input
                        style={{ marginBottom: "30px", marginTop: "-20px" }}
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Enter new category name"
                        data-testid="new-category-input"
                    />
                  </div>
                }
                onConfirm={confirmAddCategory}
                onCancel={() => setShowAddCategoryPopup(false)}
            />
        )}
      </div>
  );
}

export default CategorySidenav;
