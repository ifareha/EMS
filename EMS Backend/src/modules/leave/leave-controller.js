import { logger } from '../../shared/logger.js';
import * as leaveService from './leave-service.js';

export const applyLeave = async (req, res) => {
    try {
        const leave = await leaveService.applyLeave(req.user._id, req.body);
        res.status(201).json({ message: "Leave applied successfully", leave });
    } catch (error) {
        logger.error("Error in applyLeave:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const approveLeave = async (req, res) => {
  try {
    const leave = await leaveService.approveLeave(req.params.id, req.user._id);
    res.status(200).json({ success: true, data: leave });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const rejectLeave = async (req, res) => {
  try {
    const leave = await leaveService.rejectLeave(req.params.id, req.user._id);
    res.status(200).json({ success: true, data: leave });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const myLeaves = async (req, res) => {
  try {
    const leaves = await leaveService.getMyLeaves(req.user._id);
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const allLeaves = async (req, res) => {
  try {
    const leaves = await leaveService.getAllLeaves();
    res.status(200).json({ success: true, data: leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
