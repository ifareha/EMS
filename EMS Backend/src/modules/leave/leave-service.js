import { sendLeaveApplicationEmail, sendLeaveStatusUpdateEmail } from "../emailService/email-service.js";
import { Employee } from "../employee/employee-model.js";
import { Leave } from "./leave-model.js";

export const applyLeave = async (employeeId, fromDate, toDate, reason) => {
  const employee = await Employee.findById(employeeId);
  const newLeave = new Leave({
    employee: employeeId,
    fromDate,
    toDate,
    reason,
    status: "pending",
  });
  await newLeave.save();
  await sendLeaveApplicationEmail(employee.firstName, employee.email, fromDate, toDate, reason);
  return newLeave;
};

export const approveLeave = async (leaveId, approverId) => {
  const employee = await Employee.findById(approverId);
    const leave = await Leave.findById(leaveId);
    if (!leave) throw new Error("Leave request not found");
    if (leave.status !== "PENDING") throw new Error("Leave request already processed");
    leave.status = "APPROVED"
    leave.approvedBy = approverId;
    await leave.save();
     await sendLeaveStatusUpdateEmail(employee.firstName, employee.email, "APPROVED");
    return leave;
}
export const rejectLeave = async (leaveId, approverId) => {
  const employee = await Employee.findById(approverId);
    const leave = await Leave.findById(leaveId);
    if (!leave) throw new Error("Leave request not found");
    if (leave.status !== "PENDING") throw new Error("Leave request already processed");
    leave.status = "REJECTED"
    leave.approvedBy = approverId;
    await leave.save();
      await sendLeaveStatusUpdateEmail(employee.firstName, employee.email, "REJECTED");
    return leave;

}
export const getAllLeaves = async () => {
    return await Leave.find().populate("employee", "firstName lastName email role").populate('approvedBy', 'firstName lastName role');
}

export const getLeavesByEmployee = async (employeeId) => {
     return Leave.find({ employee: employeeId }).sort({ createdAt: -1 });
}