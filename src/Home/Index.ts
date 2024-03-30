import HealthCheckService from "./Services/HealthCheckService";
import HealthCheckController from "./Actions/HealthCheckController";

const healthCheckService = new HealthCheckService()

export const healthCheckController = new HealthCheckController(healthCheckService);
