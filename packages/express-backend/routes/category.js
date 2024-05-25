// routes/category.js
import express from 'express';
import Category from '../models/category.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Fetch all categories (development endpoint)
router.get('/dev', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).send('Error fetching categories');
    }
});

// Fetch categories for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const categories = await Category.find({ creator: userId });
        res.json(categories);
    } catch (error) {
        res.status(500).send('Error fetching categories');
    }
});

// Create a new category
router.post('/', authenticateToken, async (req, res) => {
    const { name } = req.body;
    const userId = req.user.userId;

    if (!name) {
        return res.status(400).send({ error: 'Name is required.' });
    }

    const category = new Category({
        name,
        creator: userId
    });

    try {
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a category
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id, creator: req.user.userId });

        if (!category) {
            return res.status(404).send();
        }

        res.send(category);
    } catch (error) {
        res.status(500).send();
    }
});

export default router;
