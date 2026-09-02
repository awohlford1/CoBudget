import type { ConfigOf, ConfigSchema } from "./schema.ts";

/**
 * Configuration every application reads, whatever else it adds.
 *
 * This is deliberately small. It carries only what both the API and the worker
 * need before they have any behaviour: which environment they are in, how much
 * they should log, and which deployed version they are — the last being the
 * `AN-92-003` "deployed version" field that every reliability event carries.
 *
 * An application extends this by spreading it into its own schema:
 *
 *     const apiSchema = { ...baseConfigSchema, PORT: { ... } } as const satisfies ConfigSchema;
 *
 * Every variable declared here must also appear in the repository's
 * `.env.example`; `base.test.ts` fails if one does not.
 */
export const baseConfigSchema = {
  NODE_ENV: {
    kind: "enum",
    required: true,
    description: "Runtime environment. Controls nothing on its own; applications branch on it explicitly.",
    values: ["development", "test", "production"],
  },
  LOG_LEVEL: {
    kind: "enum",
    required: true,
    description: "Minimum severity that is emitted. Content is fixed by the AN-92-003 allowlist regardless of level.",
    values: ["debug", "info", "warn", "error"],
  },
  SERVICE_VERSION: {
    kind: "string",
    required: true,
    description: "Deployed version identifier carried on every reliability event (AN-92-003). A commit SHA or release tag.",
  },
} as const satisfies ConfigSchema;

export type BaseConfig = ConfigOf<typeof baseConfigSchema>;

export type NodeEnvironment = BaseConfig["NODE_ENV"];
export type LogLevel = BaseConfig["LOG_LEVEL"];
