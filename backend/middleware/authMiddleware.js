const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    console.log('--- Auth Middleware Triggered ---'); // Checkpoint 1
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from the header (e.g., "Bearer eyJhbGci...")
            token = req.headers.authorization.split(' ')[1];
            console.log('CHECKPOINT 2: Token Found:', token);

            // Verify the token
            const decoded = jwt.verify(token, 'your_jwt_secret');
            console.log('CHECKPOINT 3: Token Decoded Successfully:', decoded);

            // Find the user from the token's ID and attach to request
            req.user = await User.findById(decoded.id).select('-password');
            console.log('CHECKPOINT 4: User Found in DB:', req.user.name);
            
            // If all checkpoints pass, proceed to the dashboard route
            next();
        } catch (error) {
            console.error('--- ERROR in Auth Middleware ---');
            console.error('The token failed verification. Error:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.log('--- No Token Found in Header ---');
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };