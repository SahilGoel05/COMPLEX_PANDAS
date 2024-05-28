// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserAuth from '../models/user.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log('hello')
    const { username, email, password } = req.body;

    const existingUser = await UserAuth.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserAuth({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.message.includes('is not a valid email'))
            return res.status(400).json({ error: 'Invalid Email' });
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserAuth.findOne({ username });

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

export default router;
