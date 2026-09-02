import type { ServerOptions as NodeHttpServerOptions } from "node:http";

import helmet from "@fastify/helmet";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import type { FastifyServerOptions } from "fastify";

import type { ApiConfig } from "./config.js";

export const HTTP_LIMITS = {
  bodyBytes: 1_048_576,
  connectionTimeoutMilliseconds: 10_000,
  handlerTimeoutMilliseconds: 30_000,
  headerBytes: 16_384,
  headersTimeoutMilliseconds: 15_000,
  keepAliveTimeoutMilliseconds: 72_000,
  maxParameterCharacters: 100,
  maxRequestsPerSocket: 1_000,
  requestTimeoutMilliseconds: 30_000,
} as const;

/**
 * Deliberately explicit Fastify and Node HTTP defaults. Keeping these limits in
 * one object makes a framework upgrade unable to silently widen the API's
 * resource bounds or trust caller-controlled forwarding/request-id headers.
 */
export const FASTIFY_SERVER_OPTIONS = {
  bodyLimit: HTTP_LIMITS.bodyBytes,
  connectionTimeout: HTTP_LIMITS.connectionTimeoutMilliseconds,
  forceCloseConnections: "idle",
  handlerTimeout: HTTP_LIMITS.handlerTimeoutMilliseconds,
  http: {
    headersTimeout: HTTP_LIMITS.headersTimeoutMilliseconds,
    maxHeaderSize: HTTP_LIMITS.headerBytes,
  },
  keepAliveTimeout: HTTP_LIMITS.keepAliveTimeoutMilliseconds,
  maxRequestsPerSocket: HTTP_LIMITS.maxRequestsPerSocket,
  onConstructorPoisoning: "error",
  onProtoPoisoning: "error",
  requestIdHeader: false,
  requestTimeout: HTTP_LIMITS.requestTimeoutMilliseconds,
  return503OnClosing: true,
  routerOptions: {
    allowUnsafeRegex: false,
    maxParamLength: HTTP_LIMITS.maxParameterCharacters,
  },
  trustProxy: false,
} as const satisfies FastifyServerOptions & { readonly http: NodeHttpServerOptions };

const ONE_YEAR_IN_SECONDS = 31_536_000;

/**
 * Installs application-layer HTTP defenses. TLS termination and per-surface
 * rate limits remain edge responsibilities under TD-103-013; this function is
 * defense in depth and does not claim to replace either control.
 */
export async function configureHttpSecurity(
  app: NestFastifyApplication,
  config: ApiConfig,
): Promise<void> {
  await app.register(helmet, {
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'none'"],
        baseUri: ["'none'"],
        formAction: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
    global: true,
    referrerPolicy: { policy: "no-referrer" },
    strictTransportSecurity:
      config.NODE_ENV === "production"
        ? { maxAge: ONE_YEAR_IN_SECONDS, includeSubDomains: false, preload: false }
        : false,
    xFrameOptions: { action: "deny" },
  });

  app.getHttpAdapter()
    .getInstance()
    .addHook("onSend", async (_request, reply, payload) => {
      // Financial and identity responses are non-cacheable unless a future
      // endpoint makes a reviewed, explicit exception.
      reply.header("Cache-Control", "no-store");
      reply.header("Pragma", "no-cache");
      reply.header(
        "Permissions-Policy",
        "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
      );
      reply.header("Surrogate-Control", "no-store");
      return payload;
    });
}
