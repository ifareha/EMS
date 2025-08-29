import { Employee } from "./employee-model.js";
import { uploadMedia } from "../../config/cloudnary.js";
import jwt from "jsonwebtoken";

export const loginService = async (email, passwordHash) => {
  const employee = await Employee.findOne({ email });
  if (!employee) throw new Error("Invalid credentials");

  const valid = await employee.verifyPassword(passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: employee._id, role: employee.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_TTL }
  );

  return { employee, token };
};
export const getAllEmployeesService = async () => {
  return Employee.find({ role: { $in: ["EMPLOYEE", "MANAGER", "ACCOUNTANT"] } })
    .populate("department");
};


export const getEmployeeByIdService = async (id) => {
  const employee = await Employee.findById(id).populate("department");
  if (!employee) throw new Error("Employee not found");
  return employee;
};
export const uploadDocsService = async (employeeId, docType, files, panNumber, aadharNumber) => {
  const updateData = {};

  if (docType === "panCard" && files["panCardImage"]) {
    const panfile = files["panCardImage"][0];
    const uploadResult = await uploadMedia(panfile.buffer, "ems/docs");
    updateData["panDetails.panNumber"] = panNumber;
    updateData["panDetails.panCardImage"] = uploadResult.secure_url;
  }

  if (docType === "aadharCard" && files["aadharCardImage"]) {
    const aadharFile = files["aadharCardImage"][0];
    const uploadResult = await uploadMedia(aadharFile.buffer, "ems/docs");
    updateData["aadharDetails.aadharNumber"] = aadharNumber;
    updateData["aadharDetails.aadharCardImage"] = uploadResult.secure_url;
  }

  const employee = await Employee.findByIdAndUpdate(employeeId, { $set: updateData }, { new: true });
  if (!employee) throw new Error("Employee not found");
  return employee;
};
