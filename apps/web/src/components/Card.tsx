import NextLink from "next/link";
import type { HTMLAttributes, ReactNode } from "react";

const SURFACE = "block rounded-lg border border-border bg-surface-raised p-6 text-on-surface shadow-raised";

const INTERACTIVE =
  "hover:border-border-strong hover:shadow-overlay active:bg-border/40 active:shadow-raised";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  /** Makes the whole card a link. Hover, focus-visible, and active apply only then. */
  href?: string;
  /** Loading state: announces busy and shows placeholder bars instead of content. */
  loading?: boolean;
  /**
   * An interactive card that cannot currently be followed. It renders as plain
   * content in the disabled colour, with no link semantics to announce: there
   * is nothing to follow, so there is nothing to call disabled.
   */
  disabled?: boolean;
  children?: ReactNode;
}

export function Card({
  title,
  href,
  loading = false,
  disabled = false,
  className = "",
  children,
  ...rest
}: CardProps) {
  const body = loading ? (
    <div className="flex flex-col gap-3" aria-hidden="true">
      <span className="h-4 w-2/3 animate-pulse rounded-sm bg-border" />
      <span className="h-4 w-full animate-pulse rounded-sm bg-border" />
      <span className="h-4 w-1/2 animate-pulse rounded-sm bg-border" />
    </div>
  ) : (
    children
  );

  const heading = title && <h3 className="mb-2 font-display text-lg font-semibold">{title}</h3>;

  if (href && !disabled && !loading) {
    return (
      <NextLink href={href} className={`${SURFACE} ${INTERACTIVE} ${className}`} {...rest}>
        {heading}
        {body}
      </NextLink>
    );
  }

  return (
    <section
      aria-busy={loading || undefined}
      className={`${SURFACE} ${href && disabled ? "cursor-not-allowed text-on-surface-disabled" : ""} ${className}`}
      {...rest}
    >
      {heading}
      {body}
    </section>
  );
}
