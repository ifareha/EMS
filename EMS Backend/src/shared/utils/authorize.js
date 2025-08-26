import { logger } from "../logger.js"

export const authorize = (allowedRole) =>{
 try {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        if (req.user.role !== allowedRole) {
      return res.status(403).json({ message: "Forbidden: Only " + allowedRole + " can access this" });
    }
    next();
    }
 } catch (error) {
    logger.error("Authorization error", error);

 }
}