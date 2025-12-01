const jwt = require('jsonwebtoken');

const JWT = process.env.JWT

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    
    jwt.verify(token.split(' ')[1], JWT, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, user_id: user.user_id },
        JWT,
        { expiresIn: '1d' }
    );
};

module.exports = {authenticateToken,generateToken};
