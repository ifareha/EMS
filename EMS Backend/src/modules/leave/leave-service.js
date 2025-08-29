import { logger } from "../../shared/logger.js";
import { sendLeaveApplicationEmail, sendLeaveStatusUpdateEmail } from "../emailService/email-service.js";
import { Employee } from "../employee/employee-model.js";
import { Leave } from "./leave-model.js";

export const applyLeave = async (employeeId, startDate, endDate, reason) => {
  const employee = await Employee.findById(employeeId);
  const newLeave = new Leave({
    employee: employeeId,
    startDate,
    endDate,
    reason,
    status: "pending",
  });
  await newLeave.save();
  await sendLeaveApplicationEmail(employee.firstName, employee.email, startDate, endDate, reason);
  return newLeave;
};

export const approveLeave = async (leaveId, approverId) => {
    const leave = await Leave.findById(leaveId);
    const employee = await Employee.findById(leave.employee);
    if (!leave) throw new Error("Leave request not found");
    if (leave.status !== "pending") throw new Error("Leave request already processed");
    leave.status = "approved"
    leave.approvedBy = approverId;
    await leave.save();
     await sendLeaveStatusUpdateEmail(employee.firstName, employee.email, "approved");
    return leave;
}
export const rejectLeave = async (leaveId, approverId) => {
    const leave = await Leave.findById(leaveId);
    const employee = await Employee.findById(leave.employee);
    if (!leave) throw new Error("Leave request not found");
    if (leave.status !== "pending") throw new Error("Leave request already processed");
    leave.status = "rejected"
    leave.approvedBy = approverId;
    await leave.save();
      await sendLeaveStatusUpdateEmail(employee.firstName, employee.email, "rejected");
    return leave;

}
export const getAllLeaves = async () => {
    return await Leave.find().populate("employee", "firstName lastName email role").populate('approvedBy', 'firstName lastName role');
}

export const getLeavesByEmployee = async (employeeId) => {
     return Leave.find({ employee: employeeId }).sort({ createdAt: -1 });
}