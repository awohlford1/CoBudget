import type { ButtonHTMLAttributes } from "react";

import { Spinner } from "./Spinner";

export type ButtonVariant = "primary" | "secondary" | "danger";

const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold";

// The look is chosen from state in JS rather than stacked as `disabled:`
// variants, so a loading button keeps its variant colour and a disabled one
// has no hover style by construction rather than by override order.
const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent/85 active:bg-accent/70",
  secondary:
    "border border-border-strong bg-surface-raised text-on-surface hover:bg-border/40 active:bg-border/70",
  danger: "bg-danger text-on-danger hover:bg-danger/85 active:bg-danger/70",
};

const DISABLED = "cursor-not-allowed border border-border bg-border/40 text-on-surface-disabled";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Shows the spinner, announces busy, and blocks activation. */
  loading?: boolean;
}

export function Button({
  variant = "primary",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const look = disabled && !loading ? DISABLED : VARIANT[variant];
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${BASE} ${look} ${className}`}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
