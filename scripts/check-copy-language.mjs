#!/usr/bin/env node

// CBD-75: the approved customer copy, checked against the standard that
// approves it.
//
// Every string in docs/cbd-75-approved-copy.json is run through the
// prohibited-language register. That circularity is deliberate. A register
// written in the abstract forbids honest copy as readily as dishonest copy —
// "cannot move money" is the sentence CBD-12-AC09 requires and a naive word
// list rejects it. Checking the standard against its own approved strings
// makes that failure land on the day the rule is written.
//
// Two further rules are checked here rather than in the register, because they
// are properties of a definition rather than of a phrase (CS-75-07):
//
//  * A role description names the role it defines.
//  * A long description states a limit, not only a capability.
//
// The public marketing pages are checked by scripts/check-public-pages.mjs,
// which applies the same register at public-page scope against built HTML.

import { readFile } from "node:fs/promises";
import { join, relative } from "node:path";

import { brandPath, brandStrings, readApprovedBrand } from "./brand-foundation.mjs";
import { describe, loadRegister, repositoryRoot, scan } from "./copy-language.mjs";

const copyPath = join(repositoryRoot, "docs", "cbd-75-approved-copy.json");
const label = relative(repositoryRoot, copyPath).replaceAll("\\", "/");

const register = await loadRegister();
const approved = JSON.parse(await readFile(copyPath, "utf8"));
const failures = [];

// Every rule catches its own documented example, and every negatable rule
// clears its negated form. A regex that matches nothing is the way a guard
// dies quietly: the build stays green and the rule stops existing. This makes
// a broken pattern fail here instead.
for (const rule of register.rules) {
  const scope = rule.scope === "all" ? approved.scope : rule.scope;
  const caught = scan(rule.example, scope, register.rules).some((f) => f.rule === rule.id);
  if (!caught) {
    failures.push(`register: ${rule.id} does not catch its own example — "${rule.example}"`);
  }
  if (!rule.negatable) continue;
  const denied = scan(rule.negatedExample, scope, register.rules).some((f) => f.rule === rule.id);
  if (denied) {
    failures.push(
      `register: ${rule.id} rejects an honest denial — "${rule.negatedExample}" must be sayable`,
    );
  }
}

const strings = [];
for (const role of approved.roles) {
  for (const field of ["name", "plural", "enum", "short", "long"]) {
    if (!role[field]) failures.push(`${label}: ${role.id} is missing ${field}`);
  }
  if (role.enum !== role.name.toLowerCase().replaceAll("-", "_").replaceAll(" ", "_")) {
    failures.push(
      `${label}: ${role.id} enum "${role.enum}" is not the snake_case form of "${role.name}"`,
    );
  }
  // Only the long form must name its role. The short form is rendered beside
  // the role label, where repeating the name is noise rather than clarity.
  if (!role.long?.includes(role.name)) {
    failures.push(`${label}: ${role.id} long description does not name the role it defines`);
  }
  for (const field of ["short", "long"]) strings.push([`${role.id} ${field}`, role[field] ?? ""]);
  // CS-75-07: a role is never introduced by what it can see without what it
  // cannot do. The short form may run out of room; the long form may not.
  if (!/\b(?:cannot|can't|never|without|nothing|none|no one)\b/i.test(role.long ?? "")) {
    failures.push(`${label}: ${role.id} long description states no limit (CS-75-07)`);
  }
}
for (const item of approved.labels) strings.push([`${item.id} text`, item.text]);

for (const [where, text] of strings) {
  for (const finding of scan(text, approved.scope, register.rules)) {
    failures.push(describe(`${label} ${where}`, finding));
  }
}

// The approved brand strings are held to the same standard. They have to be:
// they are the copy customers actually read today, and check-public-pages.mjs
// removes them from the page before scanning it, so nothing else looks at them.
//
// Where an approved string does breach a rule, it is recorded in the register's
// knownExceptions with a reason and the open issue that will settle it — never
// waved through silently. An exception that stops matching anything is itself a
// failure, so the ledger cannot outlive the copy it excuses.
const brand = await readApprovedBrand();
const brandLabel = relative(repositoryRoot, brandPath).replaceAll("\\", "/");
const used = new Set();

for (const [where, text] of brandStrings(brand)) {
  if (!text) {
    failures.push(`${brandLabel}: could not read ${where}`);
    continue;
  }
  for (const finding of scan(text, "public-page", register.rules)) {
    const exception = register.knownExceptions.find(
      (candidate) =>
        candidate.where === where &&
        candidate.rule === finding.rule &&
        candidate.phrase.toLowerCase() === finding.phrase.toLowerCase(),
    );
    if (exception) used.add(register.knownExceptions.indexOf(exception));
    else failures.push(describe(`${brandLabel} ${where}`, finding));
  }
}

register.knownExceptions.forEach((exception, index) => {
  if (used.has(index)) return;
  failures.push(
    `${brandLabel}: the recorded exception for ${exception.rule} "${exception.phrase}" in ${exception.where} no longer matches — the copy changed, so remove the exception`,
  );
});

if (failures.length > 0) {
  for (const failure of failures) console.error(`Copy language check failed: ${failure}`);
  process.exit(1);
}
const defects = register.knownExceptions.filter((item) => item.kind === "copy-defect").length;
console.log(
  `Copy language check passed: ${strings.length} CBD-75 strings across ${approved.roles.length} roles and ${brandStrings(brand).length} brand strings cleared ${register.rules.length} rules, each of which caught its own example`,
);
console.log(
  `  ${register.knownExceptions.length} recorded exceptions still match, ${defects} of them approved copy that breaches this standard and awaits a Product Owner decision under OI-75-003`,
);
