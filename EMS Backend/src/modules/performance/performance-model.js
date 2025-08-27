import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  cycle: { type: String, required: true }, // e.g. "Q1-2025", "2025-H1"
  goals: [
    {
      title: { type: String, required: true },
      description: { type: String },
      status: {
        type: String,
        enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"],
        default: "NOT_STARTED",
      },
    },
  ],
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  feedback: { type: String },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Manager/Admin
  },
}, { timestamps: true });

export const Performance = mongoose.model("Performance", performanceSchema);
