import * as payrollService from "./payroll-services.js";    
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

export const generatePayroll = asyncHandler(async (req, res) => {
    const payroll = await payrollService.runPayroll(req.params.employeeId, req.body);
    res.status(201).json({ success: true, data: payroll });
});

export const myPayrolls = asyncHandler(async (req, res) => {
    const payrolls = await payrollService.getPayrollByEmployee(req.user._id);
    res.status(200).json({ success: true, data: payrolls });
});

export const allPayrolls = asyncHandler(async (req, res) => {
    const payrolls = await payrollService.getAllPayrolls();
    res.status(200).json({ success: true, data: payrolls });
});
