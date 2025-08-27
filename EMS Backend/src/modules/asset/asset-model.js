import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  serialNumber: { type: String, required: true, unique: true },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  assignedDate: { type: Date },
  returnDate: { type: Date },
  status: {
    type: String,
    enum: ["ASSIGNED", "AVAILABLE", "RETURNED"],
    default: "AVAILABLE",
  },
}, { timestamps: true });

export const Asset = mongoose.model("Asset", assetSchema);
