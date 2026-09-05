"""Nonfunctional fixture catalog; complete synthetic values exist only in memory."""

import json
import io
import shutil
import re
import subprocess
import tempfile
import unittest
from datetime import date, timedelta
from contextlib import redirect_stdout, redirect_stderr
from pathlib import Path
from unittest.mock import patch

import secret_scanner as scanner


def fixtures():
    return [
        ("provider-api-token", "github-pat", b'api_key = "' + b"ghp_" + b"Q7vX2mN9pL4rT8zK5wB3aH6cD1fG0jS2uV9x" + b'"', b'api_key = "local"'),
        ("postgresql-url", "cobudget-postgresql-credential", b"postgresql://fixture:" + b"synthetic-password" + b"@example.invalid/db", b"postgresql://example.invalid/db"),
        ("pem-private-key", "private-key", b"-----BEGIN " + b"RSA PRIVATE KEY-----\n" + b"SYNTHETIC-NONFUNCTIONAL\n" * 4 + b"-----END " + b"RSA PRIVATE KEY-----", b"-----BEGIN PUBLIC KEY-----\nSYNTHETIC-NONFUNCTIONAL"),
        ("entropy-assignment", "cobudget-secret-assignment", b'token = "' + b"CBD114_COMPLETE_VALUE_" + b'MUST_NOT_APPEAR"', b'token = "local"'),
    ]


def path_fixtures():
    password = b"Q7vX" + b"2mN9"
    encoded = b"UTd2WD" + b"JtTjk="
    provider = b"sk_" + b"Q7vX2mN9pL4rT8zK5wB3aH6cD1fG0"
    return [
        ("main.tf", "hashicorp-tf-password", b'administrator_login_password = "' + password + b'"\n',
         b"administrator_login_password = var.password\n", password),
        ("secret.yaml", "kubernetes-secret-yaml", b"apiVersion: v1\nkind: Secret\ndata:\n  password: " + encoded + b"\n",
         b"apiVersion: v1\nkind: ConfigMap\ndata:\n  greeting: welcome\n", encoded),
        ("nuget.config", "nuget-config-password", b'<add key="ClearTextPassword" value="' + password + b'" />\n',
         b'<add key="Username" value="fixture" />\n', password),
        ("config.php", "freemius-secret-key", b"'secret_key' => '" + provider + b"'\n",
         b"'secret_key' => getenv('KEY')\n", provider),
    ]


class SecretScannerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.binary = scanner.scanner_binary()

    def scan(self, body, path="fixture.txt", entries=None):
        return scanner.scan_contents(self.binary, [([path], body)], entries or [])

    def test_fixture_catalog_and_neighboring_controls(self):
        for fixture_id, rule, positive, negative in fixtures():
            with self.subTest(fixture=fixture_id):
                hits = self.scan(positive)
                self.assertIn(rule, [hit[0] for hit in hits])
                self.assertEqual(self.scan(negative), [])

    def test_environment_template_matches_no_fixture_rule(self):
        self.assertEqual(self.scan((scanner.ROOT / ".env.example").read_bytes(), ".env.example"), [])

    def test_upstream_suppressions_never_override_exact_exceptions(self):
        rules = (scanner.ROOT / "config/gitleaks.toml").read_text()
        self.assertNotIn("[extend]", rules)
        self.assertNotRegex(rules, r"(?m)^\[.*allowlist")
        self.assertEqual(rules.count("[[rules]]"), 224)
        for fragment in (b"false", b"true", b"null", b"example", b"placeholder"):
            with self.subTest(fragment=fragment.decode()):
                value = fragment + b"-Q7vX2mN9pL4rT8zK"
                body = b"postgresql://fixture:" + value + b"@example.invalid/db"
                self.assertIn("cobudget-postgresql-credential", [hit[0] for hit in self.scan(body)])
                body = b"postgresql://fixture:Q7vX2mN9-" + value + b"@example.invalid/db"
                self.assertIn("cobudget-postgresql-credential", [hit[0] for hit in self.scan(body)])

    def test_unicode_encodings_keep_detection_lines_and_fingerprints(self):
        for fixture_id, rule, positive, negative in fixtures():
            # Include CRLF and a non-ASCII character before the finding.
            text = "ordinary \u00e9\r\n" + positive.decode()
            baseline = self.scan(text.encode("utf-8"))
            self.assertIn(rule, [hit[0] for hit in baseline])
            for encoding in ("utf-8-sig", "utf-16", "utf-16-le", "utf-16-be", "utf-32", "utf-32-le", "utf-32-be"):
                with self.subTest(fixture=fixture_id, encoding=encoding):
                    hits = self.scan(text.encode(encoding))
                    self.assertTrue(set(baseline).issubset(set(hits)))
                    self.assertEqual(self.scan(negative.decode().encode(encoding)), [])

    def test_malformed_bom_text_fails_closed_without_value_disclosure(self):
        for body in (b"\xff\xfeX", b"\xfe\xffX", b"\xff\xfe\0\0X", b"\0\0\xfe\xffX", b"\xef\xbb\xbf\xff"):
            with self.subTest(length=len(body)), self.assertRaisesRegex(scanner.ScanError, "malformed BOM-marked text"):
                self.scan(body)

    def test_paths_redact_values_across_findings_and_preserve_exact_allowlists(self):
        marker = (b"CBD114_COMPLETE_VALUE_" + b"MUST_NOT_APPEAR").decode()
        path = "nested/" + marker + ".txt"
        value = fixtures()[3][2]
        hits = self.scan(value, path=path)
        self.assertTrue(hits)
        self.assertNotIn(marker, json.dumps(hits))
        self.assertIn("[REDACTED]", json.dumps(hits))
        # A value found in file A must also be removed from file B's metadata.
        hits = scanner.scan_contents(self.binary, [(["ordinary.txt"], value), ([path], fixtures()[1][2])], [])
        self.assertNotIn(marker, json.dumps(hits))
        entries = [dict(rule=rule, path=path, fingerprint=fp, rationale="Synthetic only", owner="Test owner",
                        created=date.today().isoformat(), expires=(date.today() + timedelta(days=1)).isoformat())
                   for rule, _, _, fp in self.scan(value, path=path)]
        self.assertEqual(self.scan(value, path=path, entries=entries), [])
        self.assertTrue(self.scan(value, path="moved/" + path, entries=entries))

    def test_allowlist_is_exact_and_expiring(self):
        positive = fixtures()[1][2]
        hits = self.scan(positive)
        entries = [dict(rule=rule, path=path, fingerprint=fp,
                        rationale="Synthetic fixture only", owner="Test owner",
                        created=date.today().isoformat(),
                        expires=(date.today() + timedelta(days=1)).isoformat())
                   for rule, path, _, fp in hits]
        self.assertEqual(self.scan(positive, entries=entries), [])
        self.assertTrue(self.scan(positive))
        self.assertTrue(self.scan(positive, path="other.txt", entries=entries))
        mutated = [dict(entry, fingerprint="0" * 64) for entry in entries]
        self.assertTrue(self.scan(positive, entries=mutated))
        for updates in ({"path": "**"}, {"path": "../fixture.txt"}, {"rule": "*"},
                        {"expires": date.today().isoformat()}, {"owner": ""}, {"fingerprint": "*"}):
            with self.subTest(updates=updates), self.assertRaises(scanner.ScanError):
                scanner.validate_allowlist([dict(entries[0], **updates)])
        with self.assertRaises(scanner.ScanError):
            scanner.validate_allowlist([entries[0], entries[0]])
        with self.assertRaises(scanner.ScanError):
            scanner.validate_allowlist([{key: value for key, value in entries[0].items() if key != "owner"}])

    def test_output_contains_only_location_and_fingerprint(self):
        positive = fixtures()[3][2]
        result = self.scan(positive)
        rendered = json.dumps(result)
        self.assertNotIn((b"CBD114_COMPLETE_VALUE_" + b"MUST_NOT_APPEAR").decode(), rendered)
        self.assertIn("cobudget-secret-assignment", rendered)
        self.assertIn("fixture.txt", rendered)
        self.assertEqual(result[0][2], 1)

    def test_multiline_and_duplicate_path_locations(self):
        positive = fixtures()[2][2]
        hits = scanner.scan_contents(self.binary, [(["one.txt", "two.txt"], positive)], [])
        self.assertEqual({hit[1] for hit in hits}, {"one.txt", "two.txt"})
        old = {hit[3] for hit in hits}
        changed = self.scan(positive.replace(b"SYNTHETIC", b"ALTERED"))
        self.assertTrue(old.isdisjoint({hit[3] for hit in changed}))

    def test_no_binary_or_default_path_skip(self):
        body = b"PK\x03\x04\0binary prefix\n" + fixtures()[1][2]
        hits = self.scan(body, "package-lock.json")
        self.assertIn("cobudget-postgresql-credential", [hit[0] for hit in hits])

    def test_inline_suppression_cannot_bypass(self):
        hits = self.scan(fixtures()[1][2] + b" # gitleaks:allow")
        self.assertTrue(hits)

    def test_crlf_fingerprints_equal_git_lf_fingerprints(self):
        value = fixtures()[2][2]
        self.assertEqual(self.scan(value), self.scan(value.replace(b"\n", b"\r\n")))

    def test_chunk_boundary_line_mapping(self):
        body = (b"ordinary text\n" * 16000) + fixtures()[1][2]
        hits = self.scan(body)
        self.assertTrue(hits)
        self.assertTrue(all(hit[2] == 16001 for hit in hits))

    def test_scanner_errors_never_echo_child_output(self):
        sentinel = b"SENSITIVE-CHILD-DIAGNOSTIC"
        for status, out in ((2, sentinel), (0, sentinel), (0, b"{}"), (1, b"[]")):
            with self.subTest(status=status, output_type=type(out).__name__):
                with patch.object(scanner, "run", return_value=subprocess.CompletedProcess([], status, out, sentinel)):
                    with self.assertRaises(scanner.ScanError) as caught:
                        scanner.scan_input(self.binary, b"ordinary")
                    self.assertNotIn(sentinel.decode(), str(caught.exception))

    def test_missing_binary_fails_closed(self):
        with self.assertRaises(scanner.ScanError):
            scanner.scan_input(Path("/does-not-exist/gitleaks"), b"ordinary")

    def test_unreviewed_pin_and_corrupt_cached_archive_fail_closed(self):
        with tempfile.TemporaryDirectory(prefix="cbd114-integrity-") as directory:
            root = Path(directory)
            (root / "config").mkdir()
            pin_path = root / "config/secret-scanner.json"
            source = (scanner.ROOT / "config/secret-scanner.json").read_text()
            pin_path.write_text(source.replace("8.30.1", "latest"))
            with self.assertRaises(scanner.ScanError):
                scanner.scanner_binary(root)
            pin_path.write_text(source)
            pin = json.loads(source)
            asset = pin["assets"][f"{scanner.platform.system()}-{scanner.platform.machine()}"]
            cache = root / ".cache/secret-scanner"
            cache.mkdir(parents=True)
            (cache / asset["name"]).write_bytes(b"corrupt archive")
            with self.assertRaises(scanner.ScanError):
                scanner.scanner_binary(root)

    def test_timeout_and_malformed_config_fail_closed(self):
        with patch.object(scanner.subprocess, "run", side_effect=subprocess.TimeoutExpired("suppressed", 1)):
            with self.assertRaises(scanner.ScanError):
                scanner.run(["ignored"], scanner.ROOT)
        with tempfile.TemporaryDirectory(prefix="cbd114-config-") as directory:
            root = Path(directory)
            (root / "config").mkdir()
            (root / "config/gitleaks.toml").write_text("invalid configuration")
            with self.assertRaises(scanner.ScanError):
                scanner.scan_input(self.binary, b"ordinary", root)

    def test_real_git_history_including_deleted_secret_and_renamed_blob(self):
        with tempfile.TemporaryDirectory(prefix="cbd114-history-") as directory:
            repo = Path(directory)
            scanner.git(repo, "init", "--initial-branch=main")

            def commit(message):
                scanner.git(repo, "add", "--all")
                scanner.git(repo, "-c", "user.name=Synthetic fixture", "-c", "user.email=fixture@example.invalid",
                            "-c", "commit.gpgsign=false", "commit", "--no-verify", "-m", message)
                return scanner.git(repo, "rev-parse", "HEAD").decode().strip()

            (repo / "clean.txt").write_text("ordinary\n")
            base = commit("synthetic clean base")
            (repo / "fixture.txt").write_bytes(fixtures()[3][2])
            added = commit("synthetic fixture added")
            (repo / "fixture.txt").rename(repo / "renamed.txt")
            commit("synthetic fixture renamed")
            (repo / "renamed.txt").unlink()
            head = commit("synthetic fixture removed")
            for mode, contents in (("range", scanner.history_content(repo, head, base)),
                                   ("history", scanner.history_content(repo, head))):
                with self.subTest(mode=mode):
                    hits = scanner.scan_contents(self.binary, contents, [])
                    self.assertTrue(hits)
                    self.assertEqual({hit[1] for hit in hits}, {"fixture.txt", "renamed.txt"})
            self.assertEqual(scanner.scan_contents(self.binary, scanner.history_content(repo, base), []), [])
            self.assertEqual(scanner.scan_contents(self.binary, scanner.history_content(repo, head, head), []), [])
            with self.assertRaises(scanner.ScanError):
                scanner.history_content(repo, head, "a" * 40)
            with self.assertRaises(scanner.ScanError):
                scanner.history_content(repo, head, "--all")
            # Local mode checks staged bytes even when the working file is clean.
            (repo / "fixture.txt").write_bytes(fixtures()[1][2])
            scanner.git(repo, "add", "fixture.txt")
            (repo / "fixture.txt").write_text("ordinary\n")
            self.assertTrue(scanner.scan_contents(self.binary, scanner.local_content(repo), []))
            (repo / "config").mkdir()
            for name in ("gitleaks.toml", "secret-allowlist.json"):
                shutil.copyfile(scanner.ROOT / "config" / name, repo / "config" / name)
            for args in (["local"], ["ci", "pull_request", base, head, head],
                         ["ci", "push", "", "", head]):
                output = io.StringIO()
                with patch.object(scanner, "ROOT", repo), patch.object(scanner, "scanner_binary", return_value=self.binary), \
                        patch.object(scanner.sys, "argv", ["secret_scanner.py", *args]), \
                        redirect_stdout(output), redirect_stderr(output):
                    status = scanner.main()
                self.assertEqual(status, 1)
                self.assertNotIn((b"CBD114_COMPLETE_VALUE_" + b"MUST_NOT_APPEAR").decode(), output.getvalue())
                self.assertIn('"line": 1', output.getvalue())
                self.assertIn('"path": "fixture.txt"', output.getvalue())
            (repo / ".git/shallow").write_text(added + "\n")
            with self.assertRaises(scanner.ScanError):
                scanner.history_content(repo, head, base)

    def test_review_regressions_through_local_and_ci_entry_points(self):
        with tempfile.TemporaryDirectory(prefix="cbd114-review-") as directory:
            repo = Path(directory)
            scanner.git(repo, "init", "--initial-branch=main")

            def commit(message):
                scanner.git(repo, "add", "--all")
                scanner.git(repo, "-c", "user.name=Synthetic fixture", "-c", "user.email=fixture@example.invalid",
                            "-c", "commit.gpgsign=false", "commit", "--no-verify", "-m", message)
                return scanner.git(repo, "rev-parse", "HEAD").decode().strip()

            (repo / "clean.txt").write_text("ordinary\n")
            base = commit("clean base")
            marker = (b"CBD114_COMPLETE_VALUE_" + b"MUST_NOT_APPEAR").decode()
            names = ["false.txt", "true.txt", "utf16-le.txt", "utf16-be.txt", "utf32.txt", marker + ".txt"]
            for name, body in zip(names, [
                b"postgresql://fixture:" + b"Synthetic-false-Q7vX2mN9pL4rT8zK" + b"@example.invalid/db",
                b"postgresql://fixture:" + b"true-Q7vX2mN9pL4rT8zK" + b"@example.invalid/db",
                fixtures()[3][2].decode().encode("utf-16"),
                fixtures()[3][2].decode().encode("utf-16-be"),
                fixtures()[3][2].decode().encode("utf-32"),
                fixtures()[3][2],
            ]):
                (repo / name).write_bytes(body)
            added = commit("synthetic review regression fixtures")
            (repo / "config").mkdir()
            (repo / "config/secret-allowlist.json").write_text("[]")

            def invoke(args):
                output = io.StringIO()
                with patch.object(scanner, "ROOT", repo), patch.object(scanner, "scanner_binary", return_value=self.binary), \
                        patch.object(scanner.sys, "argv", ["secret_scanner.py", *args]), \
                        redirect_stdout(output), redirect_stderr(output):
                    status = scanner.main()
                self.assertEqual(status, 1)
                self.assertNotIn(marker, output.getvalue())
                rows = [json.loads(line) for line in output.getvalue().splitlines() if line.startswith("{")]
                self.assertEqual({row["path"] for row in rows}, set(names[:-1] + ["[REDACTED].txt"]))
                self.assertTrue(all(row["line"] == 1 for row in rows))

            invoke(["local"])
            for name in names:
                (repo / name).unlink()
            head = commit("remove fixtures before branch tip")
            invoke(["ci", "pull_request", base, head, head])
            invoke(["ci", "push", "", "", head])
            self.assertNotEqual(added, head)

    def test_filename_rule_catalog_and_path_restrictions(self):
        rules = (scanner.ROOT / "config/gitleaks.toml").read_text()
        relocated = {}
        for block in rules.split("[[rules]]")[1:]:
            rule = re.search(r'^id = "([a-z0-9-]+)"$', block, re.MULTILINE)[1]
            marker = re.search(r'^# Wrapper path: (.+)$', block, re.MULTILINE)
            if marker:
                relocated[rule] = marker[1]
                self.assertNotRegex(block, r"(?m)^path =")
            elif re.search(r"(?m)^path =", block):
                # A future upstream content+path rule must be routed explicitly,
                # never silently left inactive in the filename-less stream.
                self.assertNotRegex(block, r"(?m)^regex =")
        self.assertEqual(relocated, scanner.PATH_RULES)
        self.assertEqual(set(scanner.PATH_RULES), {fixture[1] for fixture in path_fixtures()})
        for path, rule, positive, negative, _ in path_fixtures():
            with self.subTest(rule=rule):
                hits = self.scan(positive, path)
                self.assertIn(rule, [hit[0] for hit in hits])
                self.assertNotIn(rule, [hit[0] for hit in self.scan(positive, "example.txt")])
                self.assertEqual(self.scan(negative, path), [])
                aliases = [path, "nested/" + path.upper(), "example.txt"]
                hits = scanner.scan_contents(self.binary, [(aliases, positive)], [])
                self.assertEqual({hit[1] for hit in hits if hit[0] == rule}, set(aliases[:2]))
        terraform = path_fixtures()[0]
        self.assertIn(terraform[1], [hit[0] for hit in self.scan(terraform[2], "main.hcl")])
        yaml = path_fixtures()[1]
        self.assertIn(yaml[1], [hit[0] for hit in self.scan(yaml[2], "secret.yml")])

    def test_filename_rules_preserve_unicode_lines_and_exact_exceptions(self):
        for path, rule, positive, _, _ in path_fixtures():
            body = b"# ordinary\r\n" + positive
            baseline = self.scan(body, path)
            for encoding in ("utf-16", "utf-32-be"):
                with self.subTest(rule=rule, encoding=encoding):
                    hits = self.scan(body.decode().encode(encoding), path)
                    self.assertEqual(set(baseline), set(hits))
        path, rule, positive, _, _ = path_fixtures()[0]
        hits = self.scan(positive, path)
        entries = [dict(rule=hit[0], path=hit[1], fingerprint=hit[3], rationale="Synthetic only", owner="Test owner",
                        created=date.today().isoformat(), expires=(date.today() + timedelta(days=1)).isoformat())
                   for hit in hits]
        self.assertEqual(self.scan(positive, path, entries), [])
        self.assertIn(rule, [hit[0] for hit in self.scan(positive, "moved/" + path, entries)])
        self.assertIn(rule, [hit[0] for hit in self.scan(positive.replace(b"Q7vX", b"R8wY"), path, entries)])

    def test_filename_rules_never_combine_files_or_historical_versions(self):
        header = b"apiVersion: v1\nkind: Secret\n"
        data = b"data:\n  password: " + path_fixtures()[1][4] + b"\n"
        for paths in (("one.yaml", "two.yaml"), ("same.yaml", "same.yaml")):
            with self.subTest(paths=paths):
                self.assertEqual(scanner.scan_contents(self.binary,
                                 [([paths[0]], header), ([paths[1]], data)], []), [])

    def test_filename_rules_redact_scalar_values_from_all_diagnostic_paths(self):
        for path, rule, positive, _, secret in path_fixtures():
            with self.subTest(rule=rule):
                # Keep the required basename/extension while exposing the scalar
                # in a directory component; neither own nor cross-file paths leak.
                named = secret.decode() + "/" + path
                contents = [([named], positive), ([secret.decode() + "/other.txt"], fixtures()[3][2])]
                hits = scanner.scan_contents(self.binary, contents, [])
                self.assertIn(rule, [hit[0] for hit in hits])
                self.assertNotIn(secret.decode(), json.dumps(hits))
                self.assertIn("[REDACTED]", json.dumps(hits))
        scalar = path_fixtures()[1][4].decode()
        for rendered in (scalar, '"' + scalar + '"', "'" + scalar + "'",
                         "|\n    " + scalar, ">-\n    " + scalar):
            values = scanner.diagnostic_secrets(iter([{"RuleID": "kubernetes-secret-yaml",
                                                       "Secret": "password: " + rendered}]))
            self.assertNotIn(scalar, scanner.diagnostic_path(scalar + "/secret.yaml", values))
        empty = scanner.diagnostic_secrets([{"RuleID": "kubernetes-secret-yaml", "Secret": 'password: ""'}])
        self.assertNotIn("", empty)

    def test_filename_rules_block_local_and_ci_including_renamed_deleted_history(self):
        with tempfile.TemporaryDirectory(prefix="cbd114-filename-") as directory:
            repo = Path(directory)
            scanner.git(repo, "init", "--initial-branch=main")

            def commit(message):
                scanner.git(repo, "add", "--all")
                scanner.git(repo, "-c", "user.name=Synthetic fixture", "-c", "user.email=fixture@example.invalid",
                            "-c", "commit.gpgsign=false", "commit", "--no-verify", "-m", message)
                return scanner.git(repo, "rev-parse", "HEAD").decode().strip()

            (repo / "config").mkdir()
            (repo / "config/secret-allowlist.json").write_text("[]")
            base = commit("clean base")
            catalog = path_fixtures()
            for path, _, positive, _, _ in catalog:
                (repo / path).write_bytes(positive)
            scanner.git(repo, "add", "--all")
            # A clean working copy must not hide the staged credential.
            for path, _, _, negative, _ in catalog:
                (repo / path).write_bytes(negative)

            def invoke(args, expected_paths):
                output = io.StringIO()
                with patch.object(scanner, "ROOT", repo), patch.object(scanner, "scanner_binary", return_value=self.binary), \
                        patch.object(scanner.sys, "argv", ["secret_scanner.py", *args]), \
                        redirect_stdout(output), redirect_stderr(output):
                    status = scanner.main()
                self.assertEqual(status, 1)
                rows = [json.loads(line) for line in output.getvalue().splitlines() if line.startswith("{")]
                for path, rule, _, _, secret in catalog:
                    self.assertEqual({row["path"] for row in rows if row["rule"] == rule}, expected_paths[path])
                    self.assertNotIn(secret.decode(), output.getvalue())

            expected = {path: {path} for path, *_ in catalog}
            invoke(["local"], expected)
            for path, _, positive, _, _ in catalog:
                (repo / path).write_bytes(positive)
            head = commit("synthetic filename rule fixtures")
            invoke(["ci", "pull_request", base, head, head], expected)
            invoke(["ci", "push", "", "", head], expected)
            (repo / "renamed").mkdir()
            for path, *_ in catalog:
                (repo / path).rename(repo / "renamed" / path)
            commit("rename fixtures without changing blobs")
            for path, *_ in catalog:
                (repo / "renamed" / path).unlink()
            head = commit("delete fixtures before branch tip")
            expected = {path: {path, "renamed/" + path} for path, *_ in catalog}
            invoke(["ci", "pull_request", base, head, head], expected)
            invoke(["ci", "push", "", "", head], expected)


if __name__ == "__main__":
    unittest.main()
