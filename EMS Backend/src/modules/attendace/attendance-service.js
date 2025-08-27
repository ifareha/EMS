import { logger } from "../../shared/logger.js"
import { Attendance } from "./attendance-model.js";

export const markCheckIn = async (employeeId) =>{
    try {
        const today = new Date().setHours(0, 0, 0, 0);
            logger.info("Employee ID:", employeeId);
        let record = await Attendance.findOne({employee: employeeId, date: today})
        if (record && record.checkIn) {
            return res.status(400).json({ message: "Already checked in today" });
        }
        if (!record) {
            record = new Attendance({ employee: req.user._id, date: today });
        }
        record.checkIn = new Date()
        await record.save();
        return record;
    } catch (error) {
        logger.error("Error in markCheckIn:", error);
        res.status(500).json({ message: "Internal Server Error" , error: error.message});
    }
}
export const markCheckOut = async (employeeId) =>{
    try {
         const today = new Date().setHours(0, 0, 0, 0);
          const record = await Attendance.findOne({ employee: employeeId, date: today });
          if (!record || !record.checkIn) {
              return res.status(400).json({ message: "Check-in required before check-out" });
          }
            if (record.checkOut) {
                return res.status(400).json({ message: "Already checked out today" });
            }
            record.checkOut = new Date()
            await record.save();
            return record;

        } catch (error) {
        logger.error("Error in markCheckOut:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const getAttendanceByEmployee = async (req, res) =>{
    try {
        const {employeeId} = req.params;
        const records = await Attendance.find({ employee: employeeId }).populate('employee', 'firstName email').sort({ date: -1 });
return records
    } catch (error) {
        logger.error("Error in getAttendanceByEmployee:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const getAllAttendance = async (req, res) =>{
    try {
        const records = await Attendance.find().populate('employee', 'firstName email').sort({ date: -1 });
         return records
    } catch (error) {
        logger.error("Error in getAllAttendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}   