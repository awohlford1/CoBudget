import { ConfigError } from "@cobudget/contracts/config";

import { loadWorkerConfig } from "./config.js";
import { startWorker } from "./runtime.js";
import { createShutdownCoordinator, ShutdownTimeoutError } from "./signals.js";
import { stdoutWorkerEventSink, writeStartupDiagnostic } from "./telemetry.js";

process.on("uncaughtException", () => {
  writeStartupDiagnostic("Worker stopped after an uncaught exception.");
  process.exit(1);
});

process.on("unhandledRejection", () => {
  writeStartupDiagnostic("Worker stopped after an unhandled rejection.");
  process.exit(1);
});

export async function bootstrap(): Promise<void> {
  const shutdown = createShutdownCoordinator(process);
  try {
    const config = loadWorkerConfig();
    const worker = startWorker(config, stdoutWorkerEventSink);
    await shutdown.waitForShutdown(worker);
  } finally {
    shutdown.dispose();
  }
}

try {
  await bootstrap();
} catch (error: unknown) {
  if (error instanceof ConfigError) {
    writeStartupDiagnostic(error.message);
  } else if (error instanceof ShutdownTimeoutError) {
    writeStartupDiagnostic(error.message);
    process.exit(1);
  } else {
    writeStartupDiagnostic("Worker stopped after an internal lifecycle error.");
    process.exit(1);
  }
  process.exitCode = 1;
}
