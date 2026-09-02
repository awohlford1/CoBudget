import type { WorkerRuntime } from "./runtime.js";

export type ShutdownSignal = "SIGINT" | "SIGTERM";

export interface SignalSource {
  readonly off: (signal: ShutdownSignal, listener: () => void) => unknown;
  readonly once: (signal: ShutdownSignal, listener: () => void) => unknown;
}

export interface ShutdownCoordinator {
  readonly dispose: () => void;
  readonly waitForShutdown: (
    worker: WorkerRuntime,
    timeoutMilliseconds?: number,
  ) => Promise<void>;
}

export const SHUTDOWN_TIMEOUT_MILLISECONDS = 10_000;

export class ShutdownTimeoutError extends Error {
  constructor() {
    super("Worker shutdown exceeded its safe deadline.");
    this.name = "ShutdownTimeoutError";
  }
}

function assertValidTimeout(timeoutMilliseconds: number): void {
  if (!Number.isSafeInteger(timeoutMilliseconds) || timeoutMilliseconds < 1) {
    throw new RangeError("shutdown timeout must be a positive whole number of milliseconds");
  }
}

async function stopWithin(worker: WorkerRuntime, timeoutMilliseconds: number): Promise<void> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_resolve, reject) => {
    timeout = setTimeout(() => reject(new ShutdownTimeoutError()), timeoutMilliseconds);
  });

  try {
    await Promise.race([worker.stop(), deadline]);
  } finally {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
  }
}

/** Registers both handlers immediately and latches a signal that arrives during startup. */
export function createShutdownCoordinator(
  source: SignalSource,
): ShutdownCoordinator {
  let resolveSignal: () => void = () => undefined;
  const signalReceived = new Promise<void>((resolve) => {
    resolveSignal = resolve;
  });
  const onSignal = () => resolveSignal();
  let disposed = false;
  let waitStarted = false;

  const dispose = () => {
    if (disposed) {
      return;
    }
    disposed = true;
    source.off("SIGINT", onSignal);
    source.off("SIGTERM", onSignal);
  };

  try {
    source.once("SIGINT", onSignal);
    source.once("SIGTERM", onSignal);
  } catch (error: unknown) {
    dispose();
    throw error;
  }

  return {
    dispose,
    waitForShutdown: async (
      worker,
      timeoutMilliseconds = SHUTDOWN_TIMEOUT_MILLISECONDS,
    ) => {
      if (waitStarted) {
        throw new Error("Shutdown coordinator can only be awaited once.");
      }
      waitStarted = true;

      try {
        assertValidTimeout(timeoutMilliseconds);
        if (disposed) {
          throw new Error("Shutdown coordinator was disposed before it was awaited.");
        }
        await signalReceived;
        await stopWithin(worker, timeoutMilliseconds);
      } finally {
        dispose();
      }
    },
  };
}

/** Waits for either supported signal, performs bounded shutdown, and removes both listeners. */
export async function waitForShutdownSignal(
  worker: WorkerRuntime,
  source: SignalSource,
  timeoutMilliseconds = SHUTDOWN_TIMEOUT_MILLISECONDS,
): Promise<void> {
  const coordinator = createShutdownCoordinator(source);
  await coordinator.waitForShutdown(worker, timeoutMilliseconds);
}
