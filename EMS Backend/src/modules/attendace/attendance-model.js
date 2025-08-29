import mongoose from "mongoose";

const geoSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
}, { _id: false });

const dailyAttendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true }, 
  status: {
    type: String,
    enum: ["present", "absent", "half-day", "weekend", "holiday", "leave"],
    default: "present",
  },
  checkIn: { type: Date },
  checkOut: { type: Date },
  workedHours: { type: Number, default: 0 },
  ipAddress: { type: String },
  geoLocation: { type: geoSchema },
  metadata: { type: Object }
}, { _id: false });


const attendanceSchema = new mongoose.Schema({
   employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  month: { type: Number, min: 1, max: 12, required: true }, 
  year: { type: Number, required: true },
  totalWorkingDays: { type: Number, default: 0 },
  attendances: [dailyAttendanceSchema]
}, { timestamps: true });

attendanceSchema.index({ employee: 1, year: 1, month: 1 }, { unique: true });

export const Attendance = mongoose.model("Attendance", attendanceSchema);
