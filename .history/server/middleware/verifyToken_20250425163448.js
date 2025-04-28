import jwt from 'jsonwebtoken';
import { Admin } from '../models/adminmodels.js';
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, "welcome");

        req.admin = await Admin.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        res.status(403).json({ message: 'unathorized' });
    }
};

