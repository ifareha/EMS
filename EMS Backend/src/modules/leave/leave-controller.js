import { asyncHandler } from '../../shared/utils/asyncHandler.js';
import * as leaveService from './leave-service.js';


export const applyLeave = asyncHandler(async (req, res) => {
  const leave = await leaveService.applyLeave(req.user._id, req.body);
  res.status(201).json({ message: "Leave applied successfully", leave });
});

export const approveLeave = asyncHandler(async (req, res) => {
  const leave = await leaveService.approveLeave(req.params.id, req.user._id);
  res.status(200).json({ success: true, data: leave });
});

export const rejectLeave = asyncHandler(async (req, res) => {
  const leave = await leaveService.rejectLeave(req.params.id, req.user._id);
  res.status(200).json({ success: true, data: leave });
});

export const myLeaves = asyncHandler(async (req, res) => {
  const leaves = await leaveService.getMyLeaves(req.user._id);
  res.status(200).json({ success: true, data: leaves });
});

export const allLeaves = asyncHandler(async (req, res) => {
  const leaves = await leaveService.getAllLeaves();
  res.status(200).json({ success: true, data: leaves });
});
