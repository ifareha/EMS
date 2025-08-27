import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: { type: Date, default: Date.now },
  checkIn: { type: Date },
  checkOut: { type: Date },
  status: {
    type: String,
    enum: ["PRESENT", "ABSENT", "LEAVE", "HALF_DAY"],
    default: "PRESENT",
  }
}, { timestamps: true });

export const Attendance = mongoose.model("Attendance", attendanceSchema);
