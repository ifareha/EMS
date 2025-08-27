import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { connectDb } from './src/config/db.js';
import { logger } from './src/shared/logger.js';
import { env } from './src/config/env.js';

import employeRoute from './src/modules/employee/employee-routes.js';
import adminRoute from './src/modules/auth/auth-routes.js';
import attendanceRoute from './src/modules/attendace/attendance-route.js';
import departmentRoute from './src/modules/department/department-route.js';
import leaveRoute from './src/modules/leave/leave-routes.js'



const app = express();

app.use(helmet());
app.use(cors({
    origin: env.CLIENT_URL || '*',  
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (env.NODE_ENV === "production") {
  app.use(morgan("combined")); 
} else {
  app.use(morgan("dev")); 
}


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true, 
    legacyHeaders: false,    
})
app.use("/api", limiter)

app.get('/healthz', (req, res)=> res.json({
    status: 'ok', 
    uptime: process.uptime()
}))


app.use('/api/v1/employee',employeRoute)
app.use('/api/v1/admin',adminRoute)
app.use('/api/v1/department',departmentRoute)
app.use('/api/v1/attendance',attendanceRoute )
app.use('/api/v1/leave',leaveRoute)

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const start = async() =>{
    try {
        await connectDb()
        app.listen(env.PORT, () =>{
            logger.info(`Server running on http://localhost:${env.PORT}`)
        })
    } catch (err) {
        logger.error("server failed to start", err)
        process.exit(1)
        
    }
}

// graceful shutdown
process.on('SIGINT', ()=>{
    logger.info("SIGINT received, shutting down gracefully...");
  process.exit(0);
})
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully...");
  process.exit(0);
});

start()