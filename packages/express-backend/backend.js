// backend.js
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
import categoryRoutes from './routes/category.js';

dotenv.config();

const app = express();
const port = 8000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/categories', categoryRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
