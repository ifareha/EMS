import { logger } from "../../shared/logger.js";
import { Department } from "../department/department-model.js";
import { Employee } from "../employee/employee-model.js";
import crypto from "crypto";


// create employee (signup) only admin
export const createEmployee = async (req, res) => {
    try {
            const {
      firstName, lastName, email, phoneNumber,
      department, role = "EMPLOYEE",
      joiningDate, gender,
    } = req.body;

    if (!firstName || !email || !phoneNumber || !joiningDate || !gender){
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
     let deptRef = null;
    if (department) {
      const dept = await Department.findById(department);
      if (!dept) return res.status(404).json({ message: "Department not found" });
      deptRef = dept._id;
      logger.info("Department found", dept._id);
    }
    const employeeId = `EMP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
     const tempPassword = crypto.randomBytes(4).toString("hex"); // 8 chars
    const emp = new Employee({
      employeeId,
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      department: deptRef,
      joiningDate,
      gender
    });
    await emp.setPassword(tempPassword);
    await emp.save();

    return res.status(201).json({
      message: "Employee created",
      employee: {
        id: emp._id,
        employeeId: emp.employeeId,
        email: emp.email,
        role: emp.role,
        department: emp.department
      },
      tempPassword 
    });

    } catch (error) {
        logger.error("Error creating employee", error);
        res.status(500).json({ success: false, message: "Error creating employee" });
    }
}
// assign or update department and role
export const assignDepartmentAndRole = async (req, res) => {
    try {
        const { employeeId } = req.params; // Mongo _id
    const { departmentId, role } = req.body;
    const update = {}
    if (departmentId) {
      const dept = await Department.findById(departmentId);
      if (!dept) return res.status(404).json({ message: "Department not found" });
      update.department = dept._id;
    }
    if (role) {
      const validRoles = ["MANAGER", "EMPLOYEE", "ACCOUNTANT"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      update.role = role;
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId,{ $set: update }, { new: true }).populate("department");
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ success: true, employee: updatedEmployee });
    } catch (error) {
        logger.error("Error assigning department and role", error);
        res.status(500).json({ success: false, message: "Error assigning department and role" });
    }
}


// toggle active/inactive
export const toggleActive = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { isActive } = req.body; // boolean
    const emp = await Employee.findByIdAndUpdate(
      employeeId, { $set: { isActive: !!isActive } }, { new: true }
    );
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Status updated", employee: emp });
  } catch (e) {
    res.status(500).json({ message: "Failed to update status" });
  }
};
// delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    await Employee.findByIdAndDelete(employeeId);
   res.status(200).json({ success: true, message: "Employee deleted" });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete employee" });
  }
};



// approve kyc

// reject kyc 