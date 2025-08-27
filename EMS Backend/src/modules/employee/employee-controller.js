import * as employeeService from "./employee-service.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";


export const login = asyncHandler(async (req, res) => {
  const { email, passwordHash } = req.body;
  const { employee, token } = await employeeService.loginService(email, passwordHash);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    employee: {
      id: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      role: employee.role,
      department: employee.department,
      phoneNumber: employee.phoneNumber,
      panDetails: employee.panDetails,
      aadharDetails: employee.aadharDetails,
      joiningDate: employee.joiningDate,
      leavingDate: employee.leavingDate,
    },
    token,
  });
});

export const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await employeeService.getAllEmployeesService();
  res.status(200).json({ success: true, employees });
});

export const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeByIdService(req.params.id);
  res.status(200).json({ success: true, employee });
});

export const uploadDocs = asyncHandler(async (req, res) => {
  const { employeeId, docType, panNumber, aadharNumber } = req.body;
  if (!employeeId || !docType) {
    return res.status(400).json({ message: "employeeId and docType required" });
  }

  const employee = await employeeService.uploadDocsService(
    employeeId,
    docType,
    req.files,
    panNumber,
    aadharNumber
  );

  res.status(200).json({
    success: true,
    message: `${docType} uploaded successfully`,
    employee,
  });
});


export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
