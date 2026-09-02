import NextLink from "next/link";

import { brandFoundation } from "../../content/brand-foundation";

/**
 * The landing page (CBD-20). Every customer-readable sentence is an approved
 * string from docs/brand-foundation.md: the tagline leads, as the brand
 * foundation directs, the descriptor and the mission statement follow, and
 * the human story is the manifesto's own words. Three of the seven values
 * appear here in full; all seven are on the Mission page.
 *
 * There is no sign-up or sign-in here yet: those flows are CBD-4 and CBD-21.
 * A Server Component with no client code of its own.
 */
const FEATURED = ["Collaboration", "Accountability", "Trust"] as const;

export default function Landing() {
  const { tagline, descriptor, mission, manifesto, values } = brandFoundation;
  const featured = FEATURED.map((name) => values.find((value) => value.name === name)).filter(
    (value) => value !== undefined,
  );

  return (
    <div className="flex flex-col gap-20">
      <section aria-labelledby="tagline" className="flex flex-col gap-6 py-8">
        <p className="eyebrow">{descriptor}</p>
        <h1 id="tagline" className="max-w-[14ch] font-display text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
          {tagline}
        </h1>
        <p className="max-w-prose text-lg leading-relaxed text-on-surface-muted sm:text-xl">{mission}</p>
        <p>
          <NextLink
            href="/mission"
            className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-2 font-semibold text-on-accent hover:bg-accent/85 active:bg-accent/70"
          >
            Read our mission
          </NextLink>
        </p>
      </section>

      <section aria-labelledby="alone" className="flex flex-col gap-6">
        <h2 id="alone" className="max-w-[20ch] font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {manifesto[0]}
        </h2>
        <p className="max-w-prose text-lg leading-relaxed text-on-surface-muted">{manifesto[1]}</p>
      </section>

      <section aria-labelledby="values" className="flex flex-col gap-8">
        <h2 id="values" className="font-display text-3xl font-semibold tracking-tight">
          What we value
        </h2>
        <dl className="grid gap-6 sm:grid-cols-3">
          {featured.map((value) => (
            <div key={value.name} className="flex flex-col gap-2 rounded-lg border border-border bg-surface-raised p-6 shadow-raised">
              <dt className="font-display text-xl font-semibold">{value.name}</dt>
              <dd className="leading-relaxed text-on-surface-muted">{value.text}</dd>
            </div>
          ))}
        </dl>
        <p>
          <NextLink
            href="/mission"
            className="rounded-sm font-semibold text-interactive underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            All seven values, and why they matter
          </NextLink>
        </p>
      </section>
    </div>
  );
}
