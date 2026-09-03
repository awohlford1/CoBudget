// CBD-75: the prohibited-language engine, shared by every place copy is checked.
//
// The register lives in docs/cbd-75-prohibited-language-register.json so that
// the rules are data a reviewer can read, not regexes buried in a script. This
// module compiles it and applies it; it holds no rules of its own.
//
// Two things here are load-bearing and easy to get wrong:
//
//  1. Scope. A rule applies to "all" surfaces, to "product-copy", or to
//     "public-page". PL-75-14 bans role names on marketing pages and would be
//     absurd applied to in-product copy, which exists to explain those roles.
//
//  2. Negation. The product is required to say it cannot approve spending and
//     cannot block a payment (CBD-12-AC09). A word list alone forbids the
//     honest denial along with the false claim. So a rule marked negatable is
//     satisfied when a negator precedes the match in the same sentence. Rules
//     marked negatable:false are prohibited even when denied, because naming
//     shame or surveillance supplies the frame that the denial then fails to
//     remove.

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const registerPath = join(repositoryRoot, "docs", "cbd-75-prohibited-language-register.json");

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function loadRegister() {
  const register = JSON.parse(await readFile(registerPath, "utf8"));
  const negator = new RegExp(`\\b(?:${register.negators.map(escapeRegExp).join("|")})\\b`, "i");
  const rules = register.rules.map((rule) => ({
    ...rule,
    negator,
    window: register.negationWindow,
    compiled: rule.patterns.map(
      (pattern) => new RegExp(pattern, rule.caseSensitive ? "g" : "gi"),
    ),
  }));
  return { ...register, rules };
}

// A negator counts only inside the same sentence. Without the sentence stop,
// "We never share your data. We approve your spending." reads as negated.
function isNegated(text, index, rule) {
  const before = text.slice(Math.max(0, index - rule.window), index);
  const sentence = before.slice(
    Math.max(...[".", ";", "!", "?", "\n"].map((mark) => before.lastIndexOf(mark))) + 1,
  );
  return rule.negator.test(sentence);
}

/**
 * Apply every rule in scope to one piece of copy.
 * Returns a finding per prohibited phrase, in the order they appear.
 */
export function scan(text, scope, rules) {
  const findings = [];
  for (const rule of rules) {
    if (rule.scope !== "all" && rule.scope !== scope) continue;
    for (const pattern of rule.compiled) {
      pattern.lastIndex = 0;
      for (const match of text.matchAll(pattern)) {
        if (rule.negatable && isNegated(text, match.index, rule)) continue;
        findings.push({
          rule: rule.id,
          title: rule.title,
          phrase: match[0],
          index: match.index,
          instead: rule.instead,
        });
      }
    }
  }
  return findings.sort((a, b) => a.index - b.index);
}

export const describe = (where, finding) =>
  `${where}: ${finding.rule} ${finding.title} — "${finding.phrase}". Instead: ${finding.instead}`;
