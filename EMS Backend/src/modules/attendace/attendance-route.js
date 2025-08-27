import express from "express";
import { Router } from "express"; 
import * as attendanceController from "./attendence-controller.js";
import { authenticate } from "../../shared/utils/authentication.js";
import { authorize } from "../../shared/utils/authorize.js";

const router = Router();

router.post('/check-in',authenticate, attendanceController.checkIn); 
router.post('/check-out',authenticate, attendanceController.checkOut);
router.get('/:employeeId',authenticate, attendanceController.getAttendanceByEmployee);
router.get('/', authenticate,authorize("ADMIN"), attendanceController.getAllAttendance);

export default router;