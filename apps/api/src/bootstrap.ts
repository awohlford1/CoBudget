import type { ReliabilitySink } from "./telemetry.js";
import type { ApiConfig } from "./config.js";
import { resolveApiListenAddress } from "./config.js";

interface StartupApplication {
  enableShutdownHooks(signals: string[], options: { useProcessExit: boolean }): unknown;
  listen(port: number, address: string): Promise<unknown>;
}

export interface StartupDependencies {
  loadConfig(): ApiConfig;
  createApplication(config: ApiConfig, sink: ReliabilitySink): Promise<StartupApplication>;
  sink: ReliabilitySink;
}

/** Validation must finish before invoking any application or listener effect. */
export async function runApiBootstrap(dependencies: StartupDependencies): Promise<void> {
  const config = dependencies.loadConfig();
  const app = await dependencies.createApplication(config, dependencies.sink);
  app.enableShutdownHooks(["SIGINT", "SIGTERM"], { useProcessExit: true });
  await app.listen(config.API_PORT, resolveApiListenAddress(config));
  dependencies.sink({ service: "api", version: config.SERVICE_VERSION, operation: "startup", outcome: "ok" });
}
