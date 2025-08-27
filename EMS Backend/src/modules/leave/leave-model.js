import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["SICK", "CASUAL", "EARNED"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // manager/admin
  }
}, { timestamps: true });

export const Leave = mongoose.model("Leave", leaveSchema);
