import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  month: { type: String, required: true }, 
  year: { type: Number, required: true },
  basic: { type: Number, required: true },
  hra: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: { type: Number, required: true },
  payslipUrl: { type: String }, 
}, { timestamps: true });

export const Payroll = mongoose.model("Payroll", payrollSchema);
