import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: String,
  // manager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
}, { timestamps: true });
export const Department = mongoose.model("Department", departmentSchema);