import { readinessReport } from "@cobudget/contracts/health";
import type { ReadinessReport } from "@cobudget/contracts/health";
import { Controller, Get, Inject } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import type { ApiConfig } from "./config.js";
import { API_CONFIG } from "./tokens.js";

@ApiTags("health")
@Controller()
export class HealthController {
  readonly #config: ApiConfig;

  constructor(@Inject(API_CONFIG) config: ApiConfig) {
    this.#config = config;
  }

  @Get("health")
  @ApiOperation({ summary: "Report whether the API process is ready" })
  @ApiOkResponse({
    description: "The API process is ready. No external dependency is implied.",
    schema: {
      type: "object",
      required: ["service", "version", "status"],
      additionalProperties: false,
      properties: {
        service: { type: "string", example: "api" },
        version: { type: "string", example: "local" },
        status: { type: "string", enum: ["ready"] },
      },
    },
  })
  getReadiness(): ReadinessReport {
    return readinessReport("api", this.#config.SERVICE_VERSION);
  }
}
