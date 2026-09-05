export type { ConfigOf, ConfigSchema, EnumSpec, IntegerSpec, IpSpec, StringSpec, VariableSpec } from "./schema.ts";
export type { ConfigFailure } from "./load.ts";
export { ConfigError, loadConfig, loadConfigFromEnvironment } from "./load.ts";
export type { BaseConfig, LogLevel, NodeEnvironment } from "./base.ts";
export { baseConfigSchema } from "./base.ts";
export { undocumentedVariables } from "./env-example.ts";
