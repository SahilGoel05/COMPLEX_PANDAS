// src/components/CategorySidenav.jsx
import React from 'react';
import axios from 'axios';
import '../styles/sidenav.css';

function CategorySidenav({ categories, setSelectedCategory, selectedCategory, fetchCategories }) {
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleAddCategory = async () => {
        const newCategory = prompt('Enter new category name:');
        if (newCategory) {
            try {
                await axios.post('http://localhost:8000/categories', { name: newCategory }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                fetchCategories();
            } catch (error) {
                console.error('Error adding category:', error);
            }
        }
    };

    return (
        <div>
            <div className="sidenav">
                <button
                    className={`category-button ${selectedCategory === 'all' ? 'selected' : ''}`}
                    onClick={() => handleCategoryClick('all')}
                >
                    All Tasks
                </button>
                {categories.map(category => (
                    <button
                        key={category._id}
                        className={`category-button ${selectedCategory === category._id ? 'selected' : ''}`}
                        onClick={() => handleCategoryClick(category._id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="add-category-container">
                <button className="add-category-button" onClick={handleAddCategory}>+</button>
            </div>
        </div>
    );
}

export default CategorySidenav;
