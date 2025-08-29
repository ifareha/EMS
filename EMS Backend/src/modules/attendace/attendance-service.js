import mongoose from "mongoose";
import { env } from "../../config/env.js";
import { distanceMeters } from "../../shared/utils/geo.js";
import { Employee } from "../employee/employee-model.js";
import { Attendance } from "./attendance-model.js";
// import transporter from "../../config/mailer.js";
// import { attendanceClockInTemplate } from "../../shared/utils/emailTemplete.js";
import { sendClockInEmail, sendClockOutEmail } from "../emailService/email-service.js";

const normalizeDate = (d) =>{
 const date = new Date(d);
 return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export const checkIn = async ({ employeeId, lat, lng, ipAddress, metadata }) => {
  const today = normalizeDate(new Date());
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new Error("Employee not found");
  }
  let monthly = await Attendance.findOne({ employee: employeeId, year, month });
  if (!monthly) {
    monthly = new Attendance({ employee:  new mongoose.Types.ObjectId(employee._id), year, month, attendances: [] });
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
  const month = today.getMonth() + 1;

const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new Error("Employee not found");
  }
  const record = await Attendance.findOne({ employee: employeeId, year, month });
  if (!record) {
    throw new Error("No attendance record found for this month");
  }

  const dayRecord = record.attendances.find(a =>normalizeDate(a.date).getTime() === today.getTime());
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

  const workedMs = dayRecord.checkOut - dayRecord.checkIn;
  const workedHours = workedMs / (1000 * 60 * 60);
  dayRecord.workedHours = workedHours;
  if (workedHours < 4) dayRecord.status = "half-day";

  await record.save();
  await sendClockOutEmail(employee.firstName, employee.email, new Date(), ipAddress, lat, lng);
  return record;
};
export const getAttendanceByEmployee = async ({ employeeId, year, month }) => {
  const filter = { employee: new mongoose.Types.ObjectId(employeeId) };
  if (year !== undefined) filter.year = year;
  if (month !== undefined) filter.month = month;

  return Attendance.find(filter).sort({ year: -1, month: -1 });
};











