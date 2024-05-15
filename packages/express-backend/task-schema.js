import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserAuth' // Assuming you have a User model
    }
}, { timestamps: true });

const Task = mongoose.model("Task", TaskSchema);

export default Task;
