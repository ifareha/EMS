import express from 'express';
import { getAllEmployees } from '../employee/employee-controller.js';
import { assignDepartmentAndRole, createEmployee, deleteEmployee, toggleActive } from './auth-controller.js';
import { authenticate } from '../../shared/utils/authentication.js';
import { authorize } from '../../shared/utils/authorize.js';

const router = express.Router();
router.route('/create-employee').post(authenticate, authorize("ADMIN"), createEmployee); 
router.route('/assign-department-role/:employeeId').patch(authenticate, authorize("ADMIN"), assignDepartmentAndRole); 
router.route('/:employeeId/active-status').patch(authenticate, authorize("ADMIN"), toggleActive);
router.route('/:employeeId').delete(authenticate, authorize("ADMIN"), deleteEmployee);
router.route('/').get(authenticate, authorize("ADMIN"), getAllEmployees);  

export default router;