import transporter from "../../config/mailer";
import { logger } from "../../shared/logger.js";
import { attendanceClockInTemplate, attendanceClockOutTemplate, leaveApplicationTemplate, leaveStatusUpdateTemplate } from "../../shared/utils/emailTemplete.js";


export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"EMS System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    logger.info("Email sent: %s", info.messageId);
  } catch (error) {
    logger.error("Error sending email: %o", error);
  }
};

export const sendClockInEmail = async (name, email, time, ip, lat, lng) => {
  const html = attendanceClockInTemplate(name, time, ip, lat, lng);
  await sendEmail(email, "Clock-In Recorded", html);
};

export const sendClockOutEmail = async (name, email, time, ip, lat, lng) => {
  const html = attendanceClockOutTemplate(name, time, ip, lat, lng);
  await sendEmail(email, "Clock-Out Recorded", html);
};

export const sendLeaveApplicationEmail = async (name, email, fromDate, toDate, reason) => {
  const html = leaveApplicationTemplate(name, fromDate, toDate, reason);
  await sendEmail(email, "Leave Application Received", html);
};

export const sendLeaveStatusUpdateEmail = async (name, email, status) => {
  const html = leaveStatusUpdateTemplate(name, status);
  await sendEmail(email, "Leave Status Update", html);
};
