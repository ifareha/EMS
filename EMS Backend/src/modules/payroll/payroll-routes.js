import express from 'express';
import * as payrollController from './payroll-controller.js';
import { authenticate } from "../../shared/utils/authentication.js";
import { authorize } from "../../shared/utils/authorize.js";

const router = express.Router();
router.post("/:employeeId", authenticate, authorize("ADMIN", "ACCOUNTANT"), payrollController.generatePayroll);
router.get("/", authenticate, authorize("ADMIN", "ACCOUNTANT"), payrollController.allPayrolls);
router.post("/:id/generate-payslip", authenticate, authorize("ADMIN", "ACCOUNTANT"), payrollController.payslip);
router.get("/my", authenticate, payrollController.myPayrolls);

export default router;