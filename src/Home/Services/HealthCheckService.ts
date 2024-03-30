import { client } from "../../Database/Mongo";

export default class HealthCheckService {
  public async handle(): Promise<string> {
    await client.db("admin").command({ ping: 1 });
    return 'OK 🏅';
  }
}
