import "reflect-metadata";

import { ConfigError } from "@cobudget/contracts/config";

import { createApiApplication } from "./application.js";
import { loadApiConfig, resolveApiListenAddress } from "./config.js";
import { stdoutReliabilitySink, writeStartupDiagnostic } from "./telemetry.js";

const SAFE_STARTUP_ERROR_CODES = new Set(["EACCES", "EADDRINUSE", "EADDRNOTAVAIL"]);

function messageForStartupFailure(error: unknown): string {
  const code =
    error instanceof Error && "code" in error && typeof error.code === "string"
      ? error.code
      : undefined;
  return code !== undefined && SAFE_STARTUP_ERROR_CODES.has(code)
    ? `API startup failed (${code}).`
    : "API startup failed with an internal error.";
}

process.on("uncaughtException", () => {
  writeStartupDiagnostic("API stopped after an uncaught exception.");
  process.exit(1);
});

process.on("unhandledRejection", () => {
  writeStartupDiagnostic("API stopped after an unhandled rejection.");
  process.exit(1);
});

export async function bootstrap(): Promise<void> {
  const config = loadApiConfig();
  const app = await createApiApplication(config, stdoutReliabilitySink);

  app.enableShutdownHooks(["SIGINT", "SIGTERM"], { useProcessExit: true });
  const listenAddress = resolveApiListenAddress(config);
  await app.listen(config.API_PORT, listenAddress);
  stdoutReliabilitySink({
    service: "api",
    version: config.SERVICE_VERSION,
    operation: "startup",
    outcome: "ok",
  });
}

try {
  await bootstrap();
} catch (error: unknown) {
  if (error instanceof ConfigError) {
    writeStartupDiagnostic(error.message);
  } else {
    writeStartupDiagnostic(messageForStartupFailure(error));
  }
  process.exitCode = 1;
}
