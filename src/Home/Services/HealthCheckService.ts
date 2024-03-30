export default class HealthCheckService {
  public async handle(): Promise<string> {
    return 'OK 🏅';
  }
}
