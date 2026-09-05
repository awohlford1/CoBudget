import { python } from "./python-runtime.mjs";

// The integration suite starts many isolated scanner/Git processes, especially
// on Windows. This test-only budget does not change the 60-second CI scan limit.
const tests = python(["-m", "unittest", "discover", "-s", "scripts", "-p", "test_secret_scanner.py"], { timeout: 300000 });
// Test assertions contain fixture IDs and safe metadata, never matched values.
process.stdout.write(tests.stdout ?? "");
process.stderr.write(tests.stderr ?? "");
if (tests.status !== 0) {
  process.exitCode = 1;
} else {
  const scan = python(["scripts/secret_scanner.py", "local"]);
  process.stdout.write(scan.stdout ?? "");
  process.stderr.write(scan.stderr ?? "");
  process.exitCode = scan.status === 0 ? 0 : 1;
}
