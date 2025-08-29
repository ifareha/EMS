import PDFDocument from "pdfkit";
import { Payroll } from "./payroll-model.js";
import { uploadMedia } from "../../config/cloudnary.js";


export const createPayroll = async (employeeId, salaryData) => {
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

export const generatePayslip = async (payrollId) => {
  const payroll = await Payroll.findById(payrollId).populate("employee");
  if (!payroll) throw new Error("Payroll not found");

  const doc = new PDFDocument();
  const buffers = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", async () => {
    const pdfData = Buffer.concat(buffers);
  
    const upload = await uploadMedia(pdfData, "ems/payslips");
    payroll.payslipUrl = upload.secure_url;
    await payroll.save();
  });

  doc.fontSize(18).text("Company XYZ Pvt Ltd", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Payslip for ${payroll.month} ${payroll.year}`, { align: "center" });
  doc.moveDown();

  doc.text(`Employee: ${payroll.employee.firstName} ${payroll.employee.lastName}`);
  doc.text(`Employee ID: ${payroll.employee.employeeId}`);
  doc.text(`Department: ${payroll.employee.department?.name || "-"}`);
  doc.moveDown();

  doc.text(`Basic: ₹${payroll.basic}`);
  doc.text(`HRA: ₹${payroll.hra}`);
  doc.text(`Allowances: ₹${payroll.allowances}`);
  doc.text(`Deductions: ₹${payroll.deductions}`);
  doc.moveDown();
  doc.text(`Net Salary: ₹${payroll.netSalary}`, { underline: true });

  doc.end();

  return payroll;
};
export const getPayrollByEmployee = async (employeeId) => {
  return Payroll.find({ employee: employeeId }).sort({ createdAt: -1 });
};
export const getAllPayrolls = async () => {
  return Payroll.find().populate("employee", "firstName lastName email role");
};