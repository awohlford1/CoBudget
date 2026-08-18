#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const docsRoot = join(repositoryRoot, "docs");
const cli = join(
  repositoryRoot,
  "node_modules",
  "@mermaid-js",
  "mermaid-cli",
  "src",
  "cli.js",
);

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await markdownFiles(path)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(path);
    }
  }

  return files;
}

const candidates = await markdownFiles(docsRoot);
const sources = [];
for (const candidate of candidates) {
  const markdown = await readFile(candidate, "utf8");
  if (/^```mermaid\s*$/m.test(markdown)) {
    sources.push(candidate);
  }
}

if (sources.length === 0) {
  console.log("Mermaid check: no diagrams found under docs/");
  process.exit(0);
}

const workingDirectory = await mkdtemp(join(tmpdir(), "cobudget-mermaid-"));

// Hosted CI images restrict unprivileged user namespaces, so Chromium cannot
// start its own sandbox and mermaid-cli exits before rendering anything. The
// renderer only ever loads diagram sources from this repository, so dropping
// the sandbox costs nothing here and is what keeps the check runnable on CI.
const puppeteerConfig = join(workingDirectory, "puppeteer-config.json");
await writeFile(
  puppeteerConfig,
  JSON.stringify({ args: ["--no-sandbox", "--disable-setuid-sandbox"] }),
  "utf8",
);

let failed = false;

try {
  for (const [index, source] of sources.entries()) {
    const output = join(workingDirectory, `rendered-${index}.md`);
    const artefacts = join(workingDirectory, `artefacts-${index}`);
    await mkdir(artefacts);

    const result = spawnSync(
      process.execPath,
      [
        cli,
        "--input",
        source,
        "--output",
        output,
        "--artefacts",
        artefacts,
        "--jobs",
        "1",
        "--puppeteerConfigFile",
        puppeteerConfig,
      ],
      {
        cwd: repositoryRoot,
        encoding: "utf8",
        timeout: 90_000,
      },
    );

    const label = relative(repositoryRoot, source).replaceAll("\\", "/");
    if (result.error || result.status !== 0) {
      failed = true;
      console.error(`Mermaid check failed: ${label}`);
      if (result.error) console.error(result.error.message);
      if (result.stderr) console.error(result.stderr.trim());
    } else {
      console.log(`Mermaid check passed: ${label}`);
    }
  }
} finally {
  await rm(workingDirectory, { recursive: true, force: true });
}

if (failed) process.exit(1);
console.log(`Mermaid check: ${sources.length} Markdown file(s) rendered successfully`);
