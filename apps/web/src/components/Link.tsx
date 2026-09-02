import NextLink from "next/link";
import type { ComponentProps } from "react";

const LOOK =
  "rounded-sm font-semibold text-interactive underline decoration-1 underline-offset-4 hover:decoration-2 active:text-on-surface";

export interface LinkProps extends ComponentProps<typeof NextLink> {
  /**
   * A disabled link is rendered as text that still announces itself as a link,
   * with no destination and no place in the tab order. Loading and error do
   * not exist for a link: navigation either happens or it does not.
   */
  disabled?: boolean;
}

export function Link({ disabled = false, className = "", children, ...rest }: LinkProps) {
  if (disabled) {
    return (
      <span
        role="link"
        aria-disabled="true"
        className={`cursor-not-allowed font-semibold text-on-surface-disabled ${className}`}
      >
        {children}
      </span>
    );
  }
  return (
    <NextLink className={`${LOOK} ${className}`} {...rest}>
      {children}
    </NextLink>
  );
}
