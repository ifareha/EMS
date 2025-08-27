import { Department } from "./department-model.js";

export const createDepartmentService = async (name, description) => {
  if (!name) throw new Error("Name is required");
  return Department.create({ name, description });
};

export const getDepartmentsService = async () => {
  return Department.find();
};

export const getDepartmentByIdService = async (id) => {
  const dept = await Department.findById(id);
  if (!dept) throw new Error("Department not found");
  return dept;
};

export const updateDepartmentService = async (id, name, description) => {
  const dept = await Department.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  );
  if (!dept) throw new Error("Department not found");
  return dept;
};

export const deleteDepartmentService = async (id) => {
  const dept = await Department.findByIdAndDelete(id);
  if (!dept) throw new Error("Department not found");
  return dept;
};
