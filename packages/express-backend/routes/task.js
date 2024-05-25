// routes/task.js
import express from 'express';
import Task from '../models/task.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { category } = req.query;
        const query = { creator: userId };
        if (category && category !== "all") {
            query.category = category;
        }
        const tasks = await Task.find(query).populate('category');
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Error fetching tasks');
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const { name, description, duedate, priority, category } = req.body;
    const userId = req.user.userId;

    if (!name || !description || !duedate || priority === undefined) {
        return res.status(400).send({ error: 'All fields are required.' });
    }

    const task = new Task({
        name,
        description,
        duedate,
        priority,
        completed: false,
        category: category || undefined,
        creator: userId
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).send(error);
    }
});

router.patch('/:id', authenticateToken, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, creator: req.user.userId });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, creator: req.user.userId });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

export default router;
