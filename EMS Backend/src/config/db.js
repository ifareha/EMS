import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "../shared/logger.js";

dotenv.config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Error connecting to database", error);
    process.exit(1);
  }
};
