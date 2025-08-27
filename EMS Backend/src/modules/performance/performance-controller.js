import * as performanceService from "./performance-service.js"; 
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

export const addGoals = asyncHandler(async (req, res) => {
 const { cycle, goals } = req.body;
    const performance = await performanceService.addPerformanceGoals(req.params.employeeId, cycle, goals);
    res.status(201).json({ success: true, data: performance });
})

export const updateGoals = asyncHandler(async (req, res) => {
    const { goalIndex, status } = req.body;
    const performance = await performanceService.updateGoalStatus(req.params.id, goalIndex, status);
    res.status(200).json({ success: true, data: performance });
})

export const review = asyncHandler(async (req, res) => {
      const { rating, feedback } = req.body;
    const performance = await performanceService.reviewPerformance(req.params.id, req.user._id, rating, feedback);
    res.status(200).json({ success: true, data: performance });
})

export const getPerformanceByEmployee = asyncHandler(async (req, res) => {
    const records = await performanceService.getPerformanceByEmployee(req.user._id);
    res.status(200).json({ success: true, data: records });
})
export const getAllPerformances = asyncHandler(async (req, res) => {
    const records = await performanceService.getAllPerformances();
    res.status(200).json({ success: true, data: records });
})