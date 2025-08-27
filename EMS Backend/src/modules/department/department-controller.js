import * as departmentService from "./department-service.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";


export const createDepartment = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const dept = await departmentService.createDepartmentService(name, description);
  res.status(201).json({ message: "Department created", department: dept });
});

export const getDepartments = asyncHandler(async (req, res) => {
  const depts = await departmentService.getDepartmentsService();
  res.json({ departments: depts });
});

export const getDepartmentById = asyncHandler(async (req, res) => {
  const dept = await departmentService.getDepartmentByIdService(req.params.id);
  res.json(dept);
});

export const updateDepartment = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const dept = await departmentService.updateDepartmentService(
    req.params.id,
    name,
    description
  );
  res.json({ message: "Department updated", department: dept });
});

export const deleteDepartment = asyncHandler(async (req, res) => {
  await departmentService.deleteDepartmentService(req.params.id);
  res.json({ message: "Department deleted" });
});
