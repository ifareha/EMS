import express from "express";
import { authenticate } from "../../shared/utils/authentication.js";
import { authorize } from "../../shared/utils/authorize.js";
import { createDepartment, deleteDepartment, getDepartmentById, getDepartments, updateDepartment } from "./department-controller.js";


const router = express.Router();

router.route("/create").post(authenticate, authorize("ADMIN"), createDepartment); // ✅
router.route("/").get(authenticate, authorize("ADMIN"), getDepartments); // ✅
router.route("/:id").get(authenticate, authorize("ADMIN"), getDepartmentById);// ✅
router.route("/:id").put(authenticate, authorize("ADMIN"), updateDepartment); // ✅
router.route("/:id").delete(authenticate, authorize("ADMIN"), deleteDepartment); // ✅



export default router;
