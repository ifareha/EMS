import Performance from './performance-model.js';

export const addPerformanceGoals = async (employeeId, cycle, goals) => {
  const performance = new Performance({
    employee: employeeId,
    cycle,
    goals,
  });
  await performance.save();
  return performance;
};

export const updateGoalStatus = async (performanceId, goalIndex, status) => {
  const performance = await Performance.findById(performanceId);
  if (!performance) throw new Error("Performance record not found");

  if (performance.goals[goalIndex]) {
    performance.goals[goalIndex].status = status;
  }
  await performance.save();
  return performance;
};

export const reviewPerformance = async (performanceId, reviewerId, rating, feedback) => {
  const performance = await Performance.findById(performanceId);
  if (!performance) throw new Error("Performance record not found");

  performance.rating = rating;
  performance.feedback = feedback;
  performance.reviewedBy = reviewerId;
  await performance.save();
  return performance;
};

export const getPerformanceByEmployee = async (employeeId) => {
  return Performance.find({ employee: employeeId }).populate("reviewedBy", "firstName lastName role");
};

export const getAllPerformances = async () => {
  return Performance.find()
    .populate("employee", "firstName lastName email role")
    .populate("reviewedBy", "firstName lastName role");
};