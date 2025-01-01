import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authentication

        if (!token) {
            return res.status(400).json({ success: false, message: 'Token is required' });
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedUser;

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'User Is Unauthenticated' });
    }
}