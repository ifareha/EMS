import express from 'express';
import * as performanceController from "./performance-controller.js";
import { authenticate } from "../../shared/utils/authentication.js";
import { authorize } from "../../shared/utils/authorize.js";

const router = express.Router();

router.post("/:employeeId/goals", authenticate, authorize("ADMIN", "MANAGER"), performanceController.addGoals);//✅
router.patch("/:id/goals", authenticate, performanceController.updateGoals);//✅
router.patch("/:id/review", authenticate, authorize("ADMIN", "MANAGER"), performanceController.review);//✅
router.get("/my", authenticate, performanceController.getPerformanceByEmployee);  
router.get("/", authenticate, authorize("ADMIN", "MANAGER"), performanceController.getAllPerformances); //✅



export default router