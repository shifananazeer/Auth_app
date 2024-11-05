import jwt from 'jsonwebtoken'

export const verifyAdminToken = (req, res, next) => {
    const token = req.cookies.admin_token; // Get token from cookies
    if (!token) return res.status(403).json({ message: 'No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token.' });
        req.user = decoded; // Save the decoded token payload for later use
        next();
    });
};

