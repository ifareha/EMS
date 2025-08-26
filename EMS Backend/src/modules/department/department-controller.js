import { logger } from "../../shared/logger.js";
import { Department } from "./department-model.js";

// Create Department
export const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name are required" });
    }

    const dept = await Department.create({ name, description });

    res.status(201).json({
      message: "Department created",
      department: dept
    });
  } catch (error) {
    logger.error("createDepartment error:", error);
    res.status(500).json({ message: "Failed to create department" });
  }
};

// Get All Departments
export const getDepartments = async (req, res) => {
  try {
    const depts = await Department.find();
    res.json({ departments: depts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch departments" });
  }
};

// Get Department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id);
    if (!dept) return res.status(404).json({ message: "Department not found" });
    res.json(dept);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch department" });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const dept = await Department.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!dept) return res.status(404).json({ message: "Department not found" });
    res.json({ message: "Department updated", department: dept });
  } catch (error) {
    res.status(500).json({ message: "Failed to update department" });
  }
};

// Delete Department
export const deleteDepartment = async (req, res) => {
  try {
    const dept = await Department.findByIdAndDelete(req.params.id);
    if (!dept) return res.status(404).json({ message: "Department not found" });
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete department" });
  }
};