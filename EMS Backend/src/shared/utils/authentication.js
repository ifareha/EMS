import jwt from "jsonwebtoken";
import { logger } from "../logger.js";

export const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token 
     if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
    } catch (error) {
         logger.error("Auth error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
    }

}