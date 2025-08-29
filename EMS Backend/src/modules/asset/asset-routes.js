import express from 'express';
import { authenticate } from '../../shared/utils/authentication.js';
import { authorize } from '../../shared/utils/authorize.js';
import * as assetController from './asset-controller.js';

const router = express.Router();

router.post("/create", authenticate, authorize("ADMIN"), assetController.createAsset); //✅
router.patch("/:id/assign", authenticate, authorize("ADMIN"), assetController.assignAsset);//✅
router.patch("/:id/return", authenticate, authorize("ADMIN"), assetController.returnAsset); //✅

router.get("/", authenticate, authorize("ADMIN", "MANAGER"), assetController.getAllAssets);//✅


export default router;