import { python } from "./python-runtime.mjs";

const tests = python(["-m", "unittest", "discover", "-s", "scripts", "-p", "test_secret_scanner.py"]);
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
