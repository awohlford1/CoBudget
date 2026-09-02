/**
 * What an application reports about its own readiness.
 *
 * CBD-110's health endpoint and CBD-111's readiness log both emit this. It
 * reports the application's own state only: CBD-110 requires that health
 * "must not claim readiness on behalf of dependencies it does not have yet",
 * so there is no field for a dependency, and none should be added here — a
 * dependency check belongs to the story that introduces the dependency.
 */
export interface ReadinessReport {
  readonly service: string;
  readonly version: string;
  readonly status: "ready";
}

export function readinessReport(service: string, version: string): ReadinessReport {
  return { service, version, status: "ready" };
}
