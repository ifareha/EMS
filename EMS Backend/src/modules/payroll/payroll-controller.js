import * as payrollService from "./payroll-services.js";    
import logger from "../../shared/logger.js";

export const generatePayroll = async (req, res) => {
    try {
        const payroll = await payrollService.runPayroll(req.params.employeeId, req.body);
     res.status(201).json({ success: true, data: payroll });
    } catch (error) {
        logger.error("Error generating payroll:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const myPayrolls = async (req, res) => {
  try {
    const payrolls = await payrollService.getPayrollByEmployee(req.user._id);
    res.status(200).json({ success: true, data: payrolls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const allPayrolls = async (req, res) => {
  try {
    const payrolls = await payrollService.getAllPayrolls();
    res.status(200).json({ success: true, data: payrolls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

