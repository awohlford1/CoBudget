/**
 * The shape a configuration schema is declared in.
 *
 * Every variable an application reads is declared once, with its kind, whether
 * it is required, and a description that `.env.example` carries verbatim. The
 * loader in `load.ts` validates the environment against the declaration; the
 * `ConfigOf` type derives the loaded object's type from the same declaration,
 * so the declaration is the single source of truth for both.
 *
 * Declare a schema with `as const satisfies ConfigSchema` so that `kind`,
 * `required`, and enum `values` keep their literal types. Without `as const`
 * every enum collapses to `string` and every `required` to `boolean`, and
 * `ConfigOf` can no longer tell an optional variable from a required one.
 */

export interface StringSpec {
  readonly kind: "string";
  readonly required: boolean;
  readonly description: string;
}

export interface IntegerSpec {
  readonly kind: "integer";
  readonly required: boolean;
  readonly description: string;
  readonly min?: number;
  readonly max?: number;
}

export interface EnumSpec {
  readonly kind: "enum";
  readonly required: boolean;
  readonly description: string;
  readonly values: readonly string[];
}

export type VariableSpec = StringSpec | IntegerSpec | EnumSpec;

export type ConfigSchema = Readonly<Record<string, VariableSpec>>;

type ValueOf<S extends VariableSpec> = S extends { readonly kind: "enum"; readonly values: readonly (infer V)[] }
  ? V
  : S extends { readonly kind: "integer" }
    ? number
    : string;

/**
 * The loaded configuration for a schema. Required variables are present with
 * their value type; optional ones may be `undefined`. An absent optional
 * variable is `undefined`, never a default: the loader does not invent values.
 */
export type ConfigOf<S extends ConfigSchema> = {
  readonly [K in keyof S]: S[K] extends { readonly required: true } ? ValueOf<S[K]> : ValueOf<S[K]> | undefined;
};
