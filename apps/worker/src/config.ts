import {
  baseConfigSchema,
  loadConfig,
  loadConfigFromEnvironment,
} from "@cobudget/contracts/config";
import type { BaseConfig } from "@cobudget/contracts/config";

export const workerConfigSchema = baseConfigSchema;

export type WorkerConfig = BaseConfig;

export function loadWorkerConfig(): WorkerConfig {
  return loadConfigFromEnvironment(workerConfigSchema);
}

/** Pure test and embedding seam; production startup reads through loadWorkerConfig. */
export function loadWorkerConfigFrom(
  environment: Readonly<Record<string, string | undefined>>,
): WorkerConfig {
  return loadConfig(workerConfigSchema, environment);
}
