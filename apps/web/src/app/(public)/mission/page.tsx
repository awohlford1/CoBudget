import type { Metadata } from "next";

import { brandFoundation } from "../../../content/brand-foundation";

/**
 * The Mission page (CBD-20), in the order docs/brand-foundation.md requires:
 * the mission statement and the idea that money should not be managed alone,
 * the vision as the long-term destination, the seven values each in full,
 * the manifesto as the human story, and the closing line verbatim as the
 * last thing on the page. Every sentence is the document's own; the headings
 * are structure. A Server Component with no client code of its own.
 */
export const metadata: Metadata = {
  title: "Our mission",
  description: brandFoundation.mission,
};

export default function Mission() {
  const { mission, vision, values, manifesto, closingLine } = brandFoundation;
  const story = manifesto.slice(0, -1);

  return (
    <article className="flex flex-col gap-16">
      <header className="flex flex-col gap-6 py-4">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Our mission</h1>
        <p className="max-w-prose text-xl leading-relaxed">{mission}</p>
        <p className="max-w-prose font-display text-2xl font-semibold tracking-tight text-interactive">{manifesto[0]}</p>
      </header>

      <section aria-labelledby="vision" className="flex flex-col gap-4">
        <h2 id="vision" className="font-display text-3xl font-semibold tracking-tight">
          Our vision
        </h2>
        <p className="max-w-prose text-lg leading-relaxed text-on-surface-muted">{vision}</p>
      </section>

      <section aria-labelledby="values" className="flex flex-col gap-6">
        <h2 id="values" className="font-display text-3xl font-semibold tracking-tight">
          What we value
        </h2>
        <ol className="grid gap-4 sm:grid-cols-2">
          {values.map((value, index) => (
            <li key={value.name} className="flex gap-4 rounded-lg border border-border bg-surface-raised p-6 shadow-raised">
              <span aria-hidden="true" className="font-display text-2xl font-semibold text-on-surface-muted">
                {index + 1}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-semibold">{value.name}</h3>
                <p className="leading-relaxed text-on-surface-muted">{value.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="manifesto" className="flex flex-col gap-4">
        <h2 id="manifesto" className="font-display text-3xl font-semibold tracking-tight">
          Our manifesto
        </h2>
        {story.map((paragraph, index) => (
          <p key={index} className="max-w-prose text-lg leading-relaxed text-on-surface-muted">
            {paragraph}
          </p>
        ))}
        <p className="max-w-prose pt-4 font-display text-2xl font-semibold tracking-tight">{closingLine}</p>
      </section>
    </article>
  );
}
