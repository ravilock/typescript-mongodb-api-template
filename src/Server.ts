import * as http from 'http';
import App from "./App";
import { publicRoutes } from './Routes/PublicRoutes';

const GRACEFUL_SHUTDOWN_TIME = 100 * 1000; // 100 seconds

export class Server {
  protected port: number;
  protected server: http.Server;

  constructor(private readonly application: App) {
    this.port = Server.normalizePort(Number(process.env.PORT || 3000));
    Server.validateEnvironment();
    this.registerRouter();
    this.server = http.createServer(this.application.app);
    this.server.keepAliveTimeout = 60 * 1000;
    this.server.headersTimeout = 62 * 1000;
    this.server.maxHeadersCount = 0;
  }

  public startServer(): void {
    this.server.listen(this.port);
    this.server.on('listening', () => console.info(`Server listening port ${this.port}`));
    this.processSignal();
  }

  private static normalizePort(value: number): number {
    if (isNaN(value)) return value;
    if (value >= 0) return value;
    throw new Error(`PORT is undefined (${value})`);
  }

  private static validateEnvironment(): void {
    if (!process.env.NODE_ENV) {
      console.error(new Error('NODE_ENV is undefined'));
      process.exit(1);
    }
    if (process.env.NODE_ENV !== 'production') {
      Server.processError();
    }
  }

  private static processError(): void {
    process.on('uncaughtException', error => {
      console.error(error);
      process.exit(1);
    });
    process.on('unhandledRejection', error => {
      console.error(error);
      process.exit(1);
    });
  }

  private registerRouter(): void {
    this.application.app.use('/', publicRoutes);
  }

  private processSignal(): void {
    if (process.env.NODE_ENV === 'production') {
      this.server.on('SIGTERM', () => this.gracefulShutdown('SIGTERM'));
    }
  }

  private gracefulShutdown(signal: string): void {
    console.info(`Graceful shutdown application: ${signal} signal received.`);
    this.server.close(() => {
      setTimeout(async () => {
        // TODO: Adicionar desconexão do banco
        process.exit();
      }, GRACEFUL_SHUTDOWN_TIME);
    });
  }
}
