import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import * as attendenceService from "./attendance-service.js";
 
export const checkIn = asyncHandler(async (req, res) => {
    const record = await attendenceService.markCheckIn(req.user._id);
    res.status(200).json({ message: "Check-in successful", attendance: record });
});

export const checkOut = asyncHandler(async (req, res) => {
    const record = await attendenceService.markCheckOut(req.user.id);
    res.status(200).json({ message: "Check-out successful", attendance: record });
});

export const getAttendanceByEmployee = asyncHandler(async (req, res) => {
    const records = await attendenceService.getAttendanceByEmployee(req.params.employeeId);
    res.status(200).json({ attendance: records });
});

export const getAllAttendance = asyncHandler(async (req, res) => {
    const records = await attendenceService.getAllAttendance();
    res.status(200).json({ attendance: records });
});
