import type { OnApplicationShutdown } from "@nestjs/common";
import { Inject, Injectable } from "@nestjs/common";

import type { ApiConfig } from "./config.js";
import type { ReliabilitySink } from "./telemetry.js";
import { API_CONFIG, RELIABILITY_SINK } from "./tokens.js";

@Injectable()
export class ShutdownReporter implements OnApplicationShutdown {
  readonly #config: ApiConfig;
  readonly #sink: ReliabilitySink;

  constructor(
    @Inject(API_CONFIG) config: ApiConfig,
    @Inject(RELIABILITY_SINK) sink: ReliabilitySink,
  ) {
    this.#config = config;
    this.#sink = sink;
  }

  onApplicationShutdown(): void {
    this.#sink({
      service: "api",
      version: this.#config.SERVICE_VERSION,
      operation: "shutdown",
      outcome: "ok",
    });
  }
}
