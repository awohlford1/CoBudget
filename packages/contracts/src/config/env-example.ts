import type { ConfigSchema } from "./schema.ts";

/**
 * Names every variable in `schema` that `envExampleText` does not declare.
 *
 * `.env.example` must document every variable an application reads. This is
 * the check that makes that a constraint: each application's test reads the
 * repository's `.env.example` and asserts this returns nothing for its schema,
 * so a variable added to a schema without a placeholder fails that application's
 * build rather than surfacing as an undocumented setting later.
 *
 * Pure — takes the file's text rather than reading it — so it is testable
 * without a filesystem and reusable by every application.
 *
 * A variable is declared by a line beginning `NAME=`. A commented-out
 * `# NAME=` does not count: a placeholder the operator has to un-comment is a
 * placeholder they can miss.
 */
export function undocumentedVariables(
  schema: ConfigSchema,
  envExampleText: string,
): readonly string[] {
  const declared = new Set<string>();
  for (const line of envExampleText.split(/\r?\n/)) {
    const match = /^([A-Za-z_][A-Za-z0-9_]*)=/.exec(line);
    if (match?.[1] !== undefined) {
      declared.add(match[1]);
    }
  }
  return Object.keys(schema).filter((name) => !declared.has(name));
}
