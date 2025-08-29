import * as payrollService from "./payroll-services.js";    
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

export const generatePayroll = asyncHandler(async (req, res) => {
    const payroll = await (await payrollService.createPayroll(req.params.employeeId, req.body))
    res.status(201).json({ success: true, data: payroll });
});

export const payslip = asyncHandler(async (req, res) => {
  try {
    const payroll = await payrollService.generatePayslip(req.params.id);
    res.status(200).json({ success: true, payroll });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
}
});
export const myPayrolls = asyncHandler(async (req, res) => {
    const payrolls = await payrollService.getPayrollByEmployee(req.user.id);
    res.status(200).json({ success: true, data: payrolls });
});

export const allPayrolls = asyncHandler(async (req, res) => {
    const payrolls = await payrollService.getAllPayrolls();
    res.status(200).json({ success: true, data: payrolls });
});
