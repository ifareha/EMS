import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// import { connect } from 'mongoose';
import { connectDb } from "./src/config/db.js";
import { logger } from "./src/shared/logger.js";
import { env } from "./src/config/env.js";
import employeRoute from "./src/modules/employee/employee-routes.js";
import adminRoute from "./src/modules/auth/auth-routes.js";
import attendanceRoute from "./src/modules/attendace/attendance-route.js";
import departmentRoute from "./src/modules/department/department-route.js";
import leaveRoute from "./src/modules/leave/leave-routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/healthz", (req, res) =>
  res.json({
    staus: "ok",
  })
);

app.use("/api/v1/employee", employeRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/department", departmentRoute);
app.use("/api/v1/attendance", attendanceRoute);
app.use("/api/v1/leave", leaveRoute);

const start = async () => {
  try {
    await connectDb();
    app.listen(env.PORT, () => {
      logger.info(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    logger.error("server failed to start", err);
    process.exit(1);
  }
};
start();
