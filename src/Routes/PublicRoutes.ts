import express, { NextFunction, Request, Response } from 'express';
import { healthCheckController } from '../Home/Index';

const publicRoutes = express.Router();

publicRoutes.get('/', (request: Request, response: Response, nextFunction: NextFunction) => {
  return healthCheckController.handle(request, response, nextFunction);
});

export { publicRoutes };
