import { reliabilityEvent } from "@cobudget/contracts/telemetry";
import type { ReliabilityEvent } from "@cobudget/contracts/telemetry";

export type ReliabilitySink = (event: ReliabilityEvent) => void;

/**
 * The API's only structured-log writer. The shared runtime filter drops any
 * field outside AN-92-003's allowlist before bytes reach stdout.
 */
export const stdoutReliabilitySink: ReliabilitySink = (fields) => {
  process.stdout.write(`${JSON.stringify(reliabilityEvent(fields))}\n`);
};

/**
 * Configuration errors must name the invalid variable, but never its value.
 * This operator diagnostic is deliberately plain text rather than a
 * reliability event: configuration variable names are not telemetry fields.
 */
export function writeStartupDiagnostic(message: string): void {
  process.stderr.write(`${message}\n`);
}
