import mongoose from "mongoose";
import argon2 from "argon2";

const panDetailsSchema = new mongoose.Schema({
  panNumber: { type: String, maxlength: 10 },
  panCardImage: { type: String },
});

const aadharDetailsSchema = new mongoose.Schema({
  aadharNumber: { type: String, maxlength: 12 },
  aadharCardImage: { type: String },
});

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    trim: true,
    maxlength: 255,
    unique: true,
    // required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "MANAGER", "EMPLOYEE", "ACCOUNTANT"],
    default: "EMPLOYEE",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  
  phoneNumber: {
    type: String,
    minlength: 10,
    maxlength: 10,
    // required: true,
  },
  panDetails: panDetailsSchema,
  aadharDetails: aadharDetailsSchema,
  joiningDate: { type: Date },
  leavingDate: { type: Date },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    // required: true,
  },
  isActive: { type: Boolean, default: false },
}, { timestamps: true });

employeeSchema.methods.setPassword = async function (password) {
  this.passwordHash = await argon2.hash(password);
};

employeeSchema.methods.verifyPassword = async function (password) {
  return argon2.verify(this.passwordHash, password);
};

export const Employee = mongoose.model("Employee", employeeSchema);
