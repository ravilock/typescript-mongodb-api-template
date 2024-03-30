import 'dotenv/config';
import App from './App';
import { Server } from './Server';
import { client } from './Database/Mongo'

async function start() {
  await testDatabase();
  const app = new App();
  const server = new Server(app);
  server.startServer();
}

async function testDatabase() {
  try {
    await client.db("admin").command({ ping: 1 });
  } catch (error) {
    throw new Error(`Database connection not set up properly: ${error}`);
  }
}

start().then();
