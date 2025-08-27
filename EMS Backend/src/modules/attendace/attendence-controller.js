import { logger } from "../../shared/logger.js"
import * as attendenceService from "./attendance-service.js"

// POST /attendance/check-in 
export const checkIn =  async (req, res) => {
    try {
        const record = await attendenceService.markCheckIn(req.user._id)
        res.status(200).json({ message: "Check-in successful", attendance: record });

    } catch (error) {
        logger.error("Error in checkIn:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message});
    }
}
// POST /attendance/check-out 
export const checkOut =  async (req, res) => {
    try {
        const record  = await attendenceService.markCheckOut(req.user.id)
        res.status(200).json({ message: "Check-out successful", attendance: record });
    } catch (error) {
        logger.error("Error in checkOut:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// GET /attendance/:employeeId 
export const getAttendanceByEmployee = async (req, res) => {
    try {
        const records = await attendenceService.getAttendanceByEmployee(req.params.employeeId)
        res.status(200).json({ attendance: records });
    } catch (error) {
        logger.error("Error in getAttendanceByEmployee:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// GET /attendance 
export const getAllAttendance = async (req, res) => {
    try {
      const records = await attendenceService.getAllAttendance()
        res.status(200).json({ attendance: records });  
    } catch (error) {
        logger.error("Error in getAllAttendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
} 