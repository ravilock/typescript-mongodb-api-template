import express from 'express';

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.applyMiddleware();
  }

  private applyMiddleware(): void {
    this.app.use(express.json({ limit: '200mb' }));
    this.app.use(express.urlencoded({ limit: '200mb', extended: true }));
  }
}
