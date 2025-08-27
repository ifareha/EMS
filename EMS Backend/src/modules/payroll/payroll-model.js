import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  month: { type: String, required: true }, 
  basicSalary: { type: Number, required: true },
  hra: { type: Number },
  allowances: { type: Number },
  deductions: { type: Number, default: 0 }, 
  netSalary: { type: Number, required: true },
  status: {
    type: String,
    enum: ["PENDING", "PROCESSED"],
    default: "PENDING",
  },
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Payroll = mongoose.model("Payroll", payrollSchema);
