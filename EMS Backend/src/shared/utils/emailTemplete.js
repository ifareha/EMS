export const attendanceClockInTemplate = (name, time, ip, lat, lng) =>
  `<p>Hi ${name},</p>
   <p>Your clock-in at <strong>${new Date(time).toLocaleString()}</strong> was recorded.</p>
   <p>IP: ${ip}<br/>Location: ${lat}, ${lng}</p>`;

export const attendanceClockOutTemplate = (name, time, ip, lat, lng) =>
  `<p>Hi ${name},</p>
   <p>Your clock-out at <strong>${new Date(time).toLocaleString()}</strong> was recorded.</p>
   <p>IP: ${ip}<br/>Location: ${lat}, ${lng}</p>`;
export const leaveApplicationTemplate = (name, fromDate, toDate, reason) =>
  `<p>Hi ${name},</p>
   <p>Your leave application from <strong>${new Date(fromDate).toLocaleDateString()}</strong> to <strong>${new Date(toDate).toLocaleDateString()}</strong> has been received.</p>
   <p>Reason: ${reason}</p>`;
export const leaveStatusUpdateTemplate = (name, status) =>
  `<p>Hi ${name},</p>
   <p>Your leave application has been <strong>${status}</strong>.</p>`;
export const payrollGeneratedTemplate = (name, month, year, netSalary) =>
  `<p>Hi ${name},</p>
   <p>Your payroll for <strong>${month} ${year}</strong> has been generated.</p>
   <p>Net Salary: ₹${netSalary}</p>`;
export const payslipGeneratedTemplate = (name, month, year, payslipUrl) =>
  `<p>Hi ${name},</p>
    <p>Your payslip for <strong>${month} ${year}</strong> is ready.</p>
    <p><a href="${payslipUrl}">Download Payslip</a></p>`;