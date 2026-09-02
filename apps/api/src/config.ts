import {
  baseConfigSchema,
  loadConfig,
  loadConfigFromEnvironment,
} from "@cobudget/contracts/config";
import type { ConfigOf, ConfigSchema } from "@cobudget/contracts/config";

export const apiConfigSchema = {
  ...baseConfigSchema,
  API_LISTEN_ADDRESS: {
    kind: "string",
    required: false,
    description: "Interface to bind the API to. Omit for defaults: 127.0.0.1 in development/test, 0.0.0.0 in production.",
  },
  API_PORT: {
    kind: "integer",
    required: true,
    description: "TCP port on which the API listens. Must be between 1 and 65535.",
    min: 1,
    max: 65_535,
  },
} as const satisfies ConfigSchema;

export type ApiConfig = ConfigOf<typeof apiConfigSchema>;

export function loadApiConfig(): ApiConfig {
  return loadConfigFromEnvironment(apiConfigSchema);
}

/** Pure test and embedding seam; production startup reads through loadApiConfig. */
export function loadApiConfigFrom(env: Readonly<Record<string, string | undefined>>): ApiConfig {
  return loadConfig(apiConfigSchema, env);
}
