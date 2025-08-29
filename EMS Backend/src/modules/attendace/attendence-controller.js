import { logger } from "../../shared/logger.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import * as attendenceService from "./attendance-service.js";
 
export const checkIn = asyncHandler(async (req, res) => {
      const employeeId = req.user.id;
  const { lat, lng, metadata } = req.body;
    const ipAddress = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
const attendance = await attendenceService.checkIn({ employeeId, lat: Number(lat), lng: Number(lng), ipAddress, metadata });
  res.status(201).json({ success: true, attendance });
});

export const checkOut = asyncHandler(async (req, res) => {
    const employeeId = req.user.id;
  const { lat, lng, metadata } = req.body;
    const ipAddress = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const attendance = await attendenceService.checkOut({ employeeId, lat: lat ? Number(lat) : undefined, lng: lng ? Number(lng) : undefined, ipAddress, metadata });
  if (!attendance) {
            return res.status(400).json({ message: "Check-in required before check-out" });
        }
         const record = attendance;
    res.status(200).json({ success: true, attendance: record });    
});

export const getAttendanceByEmployee = asyncHandler(async (req, res) => {
     const employeeId = req.user.id;

  const { from, to } = req.query;
  const records = await attendenceService.getAttendanceByEmployee({ employeeId, from, to });
//   logger.info("Records:", records);
       logger.info("Employee ID in controller:", employeeId);
    res.status(200).json({ attendance: records });
});


