import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// import { connect } from 'mongoose';
import { connectDb } from './src/config/db.js';
import { logger } from './src/shared/logger.js';
import { env } from './src/config/env.js';
import employeRoute from './src/modules/employee/employee-routes.js';
import adminRoute from './src/modules/admin/admin-routes.js';
import departmentRoute from './src/modules/department/department-route.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));


app.get('/healthz', (req, res)=> res.json({
    staus: "ok"
}))

app.use('/api/v1/employee',employeRoute)
app.use('/api/v1/admin',adminRoute)
app.use('/api/v1/department',departmentRoute)
// app.use('/api/v1/attandence')

app.listen(3000,()=>{
    connectDb();
    console.log("server is running");
    
})

