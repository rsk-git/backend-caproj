import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided. Access denied.' });
    }

    // Check if JWT_SECRET is loaded correctly
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined. Check your .env configuration.");
        return res.status(500).json({ message: 'Server configuration error.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // This should contain { id: <user_id> }
        next();
    } catch (err) {
        console.error("Invalid token:", err);
        res.status(401).json({ message: 'Invalid token. Access denied.' });
    }
};

export default authMiddleware;
