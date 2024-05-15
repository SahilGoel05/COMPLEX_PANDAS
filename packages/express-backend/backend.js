import express from "express";
import cors from "cors";
import AuthUser from "./user-auth.js";
import bcrypt from "bcrypt";
import Task from "./task-schema.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    // Check if username or email already exists in the database
    const existingUser = await AuthUser.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new AuthUser({
        username,
        email,
        password: hashedPassword
    });

    // Save the user to the database
    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        if(error.message.includes('is not a valid email'))
            return res.status(400).json({ error: 'Invalid Email' });
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await AuthUser.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token: token });
    } catch (error) {
        console.error('Error during sign in:', error);
        res.status(500).json({ error: 'Error signing in' });
    }
});

app.get('/dev/users', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await AuthUser.find();
        res.json(users);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

const authenticateToken = (req, res, next) => {
    console.log('in here')
    const token = req.headers.authorization?.split(' ')[1];
    console.log('token: ' + token)
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log("Decoded JWT:", decoded); // Add this line
        if (err) return res.sendStatus(403);
        req.user = decoded;
        next();
    });
};

app.get('/tasks', authenticateToken, async (req, res) => {
    console.log('made it?')
    try {
        const userId = req.user.userId; // Extract user ID from token
        const tasks = await Task.find({ creator: userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Error fetching tasks');
    }
});

app.post('/tasks', authenticateToken, async (req, res) => {
    const { description } = req.body;
    const userId = req.user.userId; // Extract user ID from token
    const task = new Task({
        description,
        creator: userId
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.patch('/tasks/:id', authenticateToken, async (req, res) => {
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

app.delete('/tasks/:id', authenticateToken, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, creator: req.user.userId });

        if (!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});