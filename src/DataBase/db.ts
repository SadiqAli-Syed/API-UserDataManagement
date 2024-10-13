import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {logger} from '../WinstonLogger/logger'; // Import logger

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected successfully');
    logger.info('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
