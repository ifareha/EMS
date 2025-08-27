import express from "express";
import { authenticate } from "../../shared/utils/authentication.js";
import { authorize } from "../../shared/utils/authorize.js";
import * as departmentController from "./department-controller.js";


const router = express.Router();

router.post("/create", authenticate, authorize("ADMIN"),departmentController.createDepartment ) //✅
router.get("/", authenticate, authorize("ADMIN"), departmentController.getDepartments ) //✅
router.get("/:id", authenticate, authorize("ADMIN"), departmentController.getDepartmentById ) //✅
router.put("/:id", authenticate, authorize("ADMIN"), departmentController.updateDepartment ) //✅
router.delete("/:id", authenticate, authorize("ADMIN"), departmentController.deleteDepartment ) //✅




export default router;
