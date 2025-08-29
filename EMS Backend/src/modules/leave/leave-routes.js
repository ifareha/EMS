import express from 'express';
import { authenticate } from '../../shared/utils/authentication.js';
import * as leaveController from './leave-controller.js';
import { authorize } from '../../shared/utils/authorize.js';

const router = express.Router()

router.post("/apply", authenticate, leaveController.applyLeave);//✅
router.get("/my", authenticate, leaveController.myLeaves);  //✅

router.patch("/:id/approve", authenticate, authorize("ADMIN", "MANAGER"), leaveController.approveLeave);//✅
router.patch("/:id/reject", authenticate, authorize("ADMIN", "MANAGER"), leaveController.rejectLeave);//✅
router.get("/", authenticate, authorize("ADMIN", "MANAGER"), leaveController.allLeaves); //✅

export default router;