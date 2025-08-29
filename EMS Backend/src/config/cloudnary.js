import { v2 as cloudinary } from "cloudinary";
import PDFDocument from "pdfkit";
import dotenv from "dotenv";
import { logger } from "../shared/logger.js";
import streamifier from "streamifier";


dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})
export const uploadMedia = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) {
          logger.error("Cloudinary upload error:", error);
          return reject(error);
        }
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const generatePdfBuffer = (payroll) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      // PDF content
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
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    logger.error("Cloudinary upload error:", error);
  }
};