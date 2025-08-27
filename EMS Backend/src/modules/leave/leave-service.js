import { Leave } from "./leave-model.js";

export const applyLeave = async (employeeId, leaveData) => {
  const newLeave = new Leave({
    employee: employeeId,
    ...leaveData,
  });
  await newLeave.save();
  return newLeave;
};

export const approveLeave = async (leaveId, approverId) => {
    const leave = await Leave.findById(leaveId);
    if (!leave) throw new Error("Leave request not found");
    if (leave.status !== "PENDING") throw new Error("Leave request already processed");
    leave.status = "APPROVED"
    leave.approvedBy = approverId;
    await leave.save();
    return leave;
}
export const rejectLeave = async (leaveId, approverId) => {
    const leave = await Leave.findById(leaveId);
    if (!leave) throw new Error("Leave request not found");
    if (leave.status !== "PENDING") throw new Error("Leave request already processed");
    leave.status = "REJECTED"
    leave.approvedBy = approverId;
    await leave.save();
    return leave;

}
export const getAllLeaves = async () => {
    return await Leave.find().populate("employee", "firstName lastName email role").populate('approvedBy', 'firstName lastName role');
}

export const getLeavesByEmployee = async (employeeId) => {
     return Leave.find({ employee: employeeId }).sort({ createdAt: -1 });
}