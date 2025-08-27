import * as departmentService from "./department-service.js";
import { logger } from "../../shared/logger.js";


export const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const dept = await departmentService.createDepartmentService(name, description);
    res.status(201).json({ message: "Department created", department: dept });
  } catch (error) {
    logger.error("createDepartment error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const depts = await departmentService.getDepartmentsService();
    res.json({ departments: depts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch departments" });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const dept = await departmentService.getDepartmentByIdService(req.params.id);
    res.json(dept);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const updateDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const dept = await departmentService.updateDepartmentService(req.params.id, name, description);
    res.json({ message: "Department updated", department: dept });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const deleteDepartment = async (req, res) => {
  try {
    await departmentService.deleteDepartmentService(req.params.id);
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
