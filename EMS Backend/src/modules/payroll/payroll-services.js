import { Payroll } from "./payroll-model.js";
import { generatePdfBuffer, uploadMedia } from "../../config/cloudnary.js";
import { sendPayrollGeneratedEmail, sendPayslipEmail } from "../emailService/email-service.js";


export const createPayroll = async (employeeId, salaryData) => {
  const { month, basic, year,  hra, allowances, deductions } = salaryData;

   const existing = await Payroll.findOne({ employee: employeeId, month, year });
  if (existing) {
    throw new Error(`Payroll already generated for ${month} ${year}`);
  }
  const netSalary =
    basic + (hra || 0) + (allowances || 0) - (deductions || 0);

  let payrollRecord = new Payroll({
    employee: employeeId,
    month,
    year,
    basic,
    hra,
    allowances,
    deductions,
    netSalary,
    status: "processed"
  });
  await payrollRecord.save();
  payrollRecord = await payrollRecord.populate("employee", "firstName email");
await sendPayrollGeneratedEmail(payrollRecord.employee.firstName, payrollRecord.employee.email, month, year, netSalary);
  return payrollRecord;
};

export const generatePayslip = async (payrollId) => {
  const payroll = await Payroll.findById(payrollId).populate("employee");

  if (!payroll) throw new Error("Payroll not found");
  
 if (payroll.payslipUrl) {
    throw new Error(`Payslip already generated for ${payroll.month} ${payroll.year}`);
  }
  const pdfData = await generatePdfBuffer(payroll);

  const upload = await uploadMedia(pdfData, "ems/payslips");

  payroll.payslipUrl = upload.secure_url;
  await payroll.save();

  await sendPayslipEmail(
    payroll.employee.firstName,
      payroll.employee.email,
    payroll.month,
    payroll.year,
    payroll.payslipUrl
  );

  return payroll;
};
export const getPayrollByEmployee = async (employeeId) => {
  return Payroll.find({ employee: employeeId }).sort({ createdAt: -1 });
};
export const getAllPayrolls = async () => {
  return Payroll.find().populate("employee", "firstName lastName email role");
};