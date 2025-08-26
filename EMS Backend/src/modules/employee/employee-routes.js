import express from 'express';
// import jwt from 'jsonwebtoken';
// import { signup } from './user-controller.js';
import { upload } from '../../config/multer.js';
import { getEmployeeById, login, logout, uploadDocs } from './employee-controller.js';
import { authenticate } from '../../shared/utils/authentication.js';

const router = express.Router();

router.route('/login').post(login) // ✅
router.route('/upload-doc').post( upload.fields([
    { name: 'panCardImage', maxCount: 1 },
    { name: 'aadharCardImage', maxCount: 1 }
]),
authenticate,
    uploadDocs
)


router.route('/:id').get(authenticate, getEmployeeById); // ✅
router.route('/logout').post(authenticate,logout); // ✅

export default router;