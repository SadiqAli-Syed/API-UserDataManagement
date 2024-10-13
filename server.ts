import express from 'express';
import connectDB from './src/DataBase/db';
import Route from './src/auth/Routing';
import {requestLogger} from './src/WinstonLogger/logger';
import dotenv from 'dotenv';

dotenv.config();
connectDB();



const app = express();
app.use(express.json());
app.use(requestLogger); // Use request logger middleware
app.use('/', Route); // Use the routing middleware


const PORT = process.env.PORT || 3000;
app.listen(PORT);
