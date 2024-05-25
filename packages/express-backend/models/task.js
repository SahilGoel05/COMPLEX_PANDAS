// models/task.js
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    duedate: {
        type: String,
        required: true,
    },
    priority: {
        type: Number,
        required: true,
        default: 0,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserAuth'
    }
}, { timestamps: true });

const Task = mongoose.model("Task", TaskSchema);

export default Task;
