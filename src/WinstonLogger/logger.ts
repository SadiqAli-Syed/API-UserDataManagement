import winston from 'winston';
import express from 'express';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

export const requestLogger = (req: express.Request, res: express.Response, next: express.NextFunction):void => {
  logger.info(`Incoming request: ${req.method}: ${req.url}`);
  next();
};

