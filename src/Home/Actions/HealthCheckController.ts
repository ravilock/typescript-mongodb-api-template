import { NextFunction, Request, Response } from 'express';
import HealthCheckService from '../Services/HealthCheckService';

export default class IsAliveController {
  constructor(private service: HealthCheckService) { }

  public async handle(_: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const dto = await this.service.handle();
      return res.status(200).send(dto);
    } catch (error) {
      next(error);
    }
  }
}
