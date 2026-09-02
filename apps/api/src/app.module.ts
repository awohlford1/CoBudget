import type { DynamicModule } from "@nestjs/common";
import { Module } from "@nestjs/common";

import type { ApiConfig } from "./config.js";
import { HealthController } from "./health.controller.js";
import { ShutdownReporter } from "./shutdown-reporter.js";
import type { ReliabilitySink } from "./telemetry.js";
import { API_CONFIG, RELIABILITY_SINK } from "./tokens.js";

@Module({})
export class AppModule {
  static register(config: ApiConfig, sink: ReliabilitySink): DynamicModule {
    return {
      module: AppModule,
      controllers: [HealthController],
      providers: [
        { provide: API_CONFIG, useValue: config },
        { provide: RELIABILITY_SINK, useValue: sink },
        ShutdownReporter,
      ],
    };
  }
}
