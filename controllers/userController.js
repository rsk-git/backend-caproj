import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Controller function to handle user login
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", username, password); // Debugging line

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        
        // Ensure JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET not defined");
            return res.status(500).json({ message: "Server configuration error" });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30min' });

        
        res.json({
            token,
            username: user.username,
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
