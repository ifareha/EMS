import { Payroll } from "./payroll-model.js";

export const runPayroll = async (employeeId, salaryData) => {
  const { month, basicSalary, hra, allowances, deductions } = salaryData;
  const netSalary =
    basicSalary + (hra || 0) + (allowances || 0) - (deductions || 0);

  const payrollRecord = new Payroll({
    employee: employeeId,
    month,
    basicSalary,
    hra,
    allowances,
    deductions,
    netSalary,
    status: "PROCESSED",
  });
  await payrollRecord.save();
  return payrollRecord;
};

export const getPayrollByEmployee = async (employeeId) => {
  return Payroll.find({ employee: employeeId }).sort({ createdAt: -1 });
};
export const getAllPayrolls = async () => {
  return Payroll.find().populate("employee", "firstName lastName email role");
};