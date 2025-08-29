import mongoose from "mongoose";
import { env } from "../../config/env.js";
// import { logger } from "../../shared/logger.js"
import { distanceMeters } from "../../shared/utils/geo.js";
import { Employee } from "../employee/employee-model.js";
import { Attendance } from "./attendance-model.js";
// import transporter from "../../config/mailer.js";
// import { attendanceClockInTemplate } from "../../shared/utils/emailTemplete.js";
import { sendClockInEmail, sendClockOutEmail } from "../emailService/email-service.js";

const normalizeDate = (d) =>{
 const date = new Date(d);
 date.setHours(0, 0, 0, 0);
    return date;
}

export const checkIn = async ({ employeeId, lat, lng, ipAddress, metadata }) => {
  const today = normalizeDate(new Date());
  const year = today.getFullYear();
  const month = today.getMonth();

  const employee = await Employee.findById(employeeId);
  let monthly = await Attendance.findOne({ employee: employeeId, year, month });
  if (!monthly) {
    monthly = new Attendance({ employee: employeeId, year, month, attendances: [] });
  }

  const dayRecord = monthly.attendances.find(a => normalizeDate(a.date).getTime() === today.getTime());
  if (dayRecord && dayRecord.checkIn) {
    throw new Error("Already checked in today");
  }

  const distance = distanceMeters(env.OFFICE_LAT, env.OFFICE_LNG, lat, lng);
  if (distance > env.OFFICE_RADIUS_METERS) {
    throw new Error("Outside allowed geo radius");
  }

  if (dayRecord) {
    dayRecord.checkIn = new Date();
    dayRecord.ipAddress = ipAddress;
    dayRecord.geoLocation = { lat, lng };
    dayRecord.metadata = metadata;
    dayRecord.status = "present";
  } else {
    monthly.attendances.push({
      date: today,
      checkIn: new Date(),
      ipAddress,
      geoLocation: { lat, lng },
      metadata,
      status: "present"
    });
  }

  await monthly.save();
  await sendClockInEmail(employee.firstName, employee.email, new Date(), ipAddress, lat, lng);
  return monthly;
};

export const checkOut = async ({ employeeId, lat, lng, ipAddress, metadata }) => {
  const today = normalizeDate(new Date());
  const year = today.getFullYear();
  const month = today.getMonth();
const employee = await Employee.findById(employeeId);
  const monthly = await Attendance.findOne({ employee: employeeId, year, month });
  if (!monthly) throw new Error("Check-in required before check-out");

  const dayRecord = monthly.attendances.find(a => normalizeDate(a.date).getTime() === today.getTime());
  if (!dayRecord || !dayRecord.checkIn) {
    throw new Error("Check-in required before check-out");
  }
  if (dayRecord.checkOut) {
    throw new Error("Already checked out today");
  }

  if (lat && lng) {
    const distance = distanceMeters(env.OFFICE_LAT, env.OFFICE_LNG, lat, lng);
    if (distance > env.OFFICE_RADIUS_METERS) {
      throw new Error("Outside allowed geo radius");
    }
    dayRecord.geoLocation = { lat, lng };
  }

  dayRecord.checkOut = new Date();
  dayRecord.ipAddress = ipAddress || dayRecord.ipAddress;
  dayRecord.metadata = { ...dayRecord.metadata, ...metadata };

  // calculate worked hours
  const workedMs = dayRecord.checkOut - dayRecord.checkIn;
  const workedHours = workedMs / (1000 * 60 * 60);
  dayRecord.workedHours = workedHours;
  if (workedHours < 4) dayRecord.status = "half-day";

  await monthly.save();
  await sendClockOutEmail(employee.firstName, employee.email, new Date(), ipAddress, lat, lng);
  return monthly;
};
export const getAttendanceByEmployee = async ({ employeeId, year, month }) => {
  const filter = { employee: new mongoose.Types.ObjectId(employeeId) };
  if (year !== undefined) filter.year = year;
  if (month !== undefined) filter.month = month;

  return Attendance.find(filter).sort({ year: -1, month: -1 });
};













// export const markCheckIn = async (employeeId) =>{
//     try {
//         const today = new Date().setHours(0, 0, 0, 0);
//             logger.info("Employee ID:", employeeId);
//         let record = await Attendance.findOne({employee: employeeId, date: today})
//         if (record && record.checkIn) {
//             return res.status(400).json({ message: "Already checked in today" });
//         }
//         if (!record) {
//             record = new Attendance({ employee: req.user._id, date: today });
//         }
//         record.checkIn = new Date()
//         await record.save();
//         return record;
//     } catch (error) {
//         logger.error("Error in markCheckIn:", error);
//         res.status(500).json({ message: "Internal Server Error" , error: error.message});
//     }
// }
// export const markCheckOut = async (employeeId) =>{
//     try {
//          const today = new Date().setHours(0, 0, 0, 0);
//           const record = await Attendance.findOne({ employee: employeeId, date: today });
//           if (!record || !record.checkIn) {
//               return res.status(400).json({ message: "Check-in required before check-out" });
//           }
//             if (record.checkOut) {
//                 return res.status(400).json({ message: "Already checked out today" });
//             }
//             record.checkOut = new Date()
//             await record.save();
//             return record;

//         } catch (error) {
//         logger.error("Error in markCheckOut:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }
// export const getAttendanceByEmployee = async (req, res) =>{
//     try {
//         const {employeeId} = req.params;
//         const records = await Attendance.find({ employee: employeeId }).populate('employee', 'firstName email').sort({ date: -1 });
// return records
//     } catch (error) {
//         logger.error("Error in getAttendanceByEmployee:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }
// export const getAllAttendance = async (req, res) =>{
//     try {
//         const records = await Attendance.find().populate('employee', 'firstName email').sort({ date: -1 });
//          return records
//     } catch (error) {
//         logger.error("Error in getAllAttendance:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }   