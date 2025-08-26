import { uploadMedia } from "../../config/cloudnary.js";
import { logger } from "../../shared/logger.js";
import { Employee } from "./employee-model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, passwordHash } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await employee.verifyPassword(passwordHash);
    if (!valid) return res.status(401).json({ error: "invalid credentials" });

    const token = jwt.sign(
      { id: employee._id, role: employee.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TTL }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // production me true
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 dine
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
        leavingDate: employee.leavingDate
      },
      token
    });
  } catch (error) {
     logger.error("Login error:", error.message);
    res.status(500).json({ message: "Something went wrong during login" });
  }
};
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ role: "EMPLOYEE"}).populate("department");
    res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching employees" });
  }
};
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("department");
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching employee" });
  }
};

// update employee kyc docs


// request kyc
export const uploadDocs = async (req, res) =>{
  try {
     const { employeeId, docType, panNumber, aadharNumber } = req.body;

    if (!employeeId || !docType) {
      return res.status(400).json({ message: "employeeId and docType required" });
    }

    const updateData = {};
    // pan card 
    if (docType === "panCard" && req.files["panCardImage"]){
      const panfile = req.files["panCardImage"][0];
      const uploadResult = await uploadMedia(panfile.buffer, "ems/docs")
      updateData["panDetails.panNumber"] = panNumber;
      updateData["panDetails.panCardImage"] = uploadResult.secure_url;
    }

        // Aadhaar Card Upload
    if (docType === "aadharCard" && req.files["aadharCardImage"]) {
      const aadharFile = req.files["aadharCardImage"][0];
      const uploadResult = await uploadToCloudinary(aadharFile.buffer, "ems/docs");
      updateData["aadharDetails.aadharNumber"] = aadharNumber;
      updateData["aadharDetails.aadharCardImage"] = uploadResult.secure_url;
    }
    const employe = await Employee.findByIdAndUpdate(employeeId, {$set:updateData}, {new:true});
    if (!employe) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: `${docType} uploaded successfully`,
      employe,
    });
  } catch (error) {
     logger.error("Error uploading document:", error);
    res.status(500).json({ message: "Error uploading document" });
  }
}

// logout
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
    logger.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong during logout" });
  }
};



