import 'dotenv/config';
import App from './App';
import { Server } from './Server';

async function start() {
  const app = new App();
  const server = new Server(app);
  server.startServer();
}

start().then();
