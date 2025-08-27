import { asyncHandler } from "../../shared/utils/asyncHandler.js";

export const createAsset = asyncHandler( async (req, res) => {
      const asset = await assetService.createAsset(req.body);
    res.status(201).json({ success: true, data: asset });
})
export const assignAsset = asyncHandler( async (req, res) => {
    const asset = await assetService.assignAsset(req.params.id, req.body.employeeId);
    res.status(200).json({ success: true, data: asset });
})
export const returnAsset = asyncHandler( async (req, res) => {
  const asset = await assetService.returnAsset(req.params.id);
    res.status(200).json({ success: true, data: asset });
})
export const getAllAssets = asyncHandler( async (req, res) => {
    const assets = await assetService.getAllAssets();
    res.status(200).json({ success: true, data: assets });
})