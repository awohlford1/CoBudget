import { spawnSync } from "node:child_process";

// Prefer the platform interpreter; never install a runtime or inspect user secrets.
export function python(args, options = {}) {
  for (const [command, prefix] of [["python3", []], ["python", []], ["py", ["-3"]]]) {
    const probe = spawnSync(command, [...prefix, "--version"], { encoding: "utf8", timeout: 10000 });
    if (probe.status !== 0 || !/^Python 3\./.test(probe.stdout)) continue;
    return spawnSync(command, [...prefix, "-X", "utf8", ...args], { encoding: "utf8", timeout: 120000, maxBuffer: 16 * 1024 * 1024, ...options });
  }
  throw new Error("Python 3 is required for check:env; install it on PATH (python3, python, or py -3).");
}
