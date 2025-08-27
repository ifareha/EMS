import * as employeeService from "./employee-service.js";
import { logger } from "../../shared/logger.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Received:", email, password);
    console.log("Env:", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

    const { employee, token } = await employeeService.loginService(
      email,
      password
    );

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
  } catch (error) {
    logger.error("Login error:", error.message);
    res.status(401).json({ success: false, message: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployeesService();
    res.status(200).json({ success: true, employees });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching employees" });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeByIdService(
      req.params.id
    );
    res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const uploadDocs = async (req, res) => {
  try {
    const { employeeId, docType, panNumber, aadharNumber } = req.body;
    if (!employeeId || !docType) {
      return res
        .status(400)
        .json({ message: "employeeId and docType required" });
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
  } catch (error) {
    logger.error("Error uploading document:", error.message);
    res.status(500).json({ message: "Error uploading document" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    logger.error("Logout error:", error.message);
    res.status(500).json({ message: "Something went wrong during logout" });
  }
};
