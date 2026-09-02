import type { SelectHTMLAttributes } from "react";

import { CONTROL, Field, describedBy } from "./Field";
import { Spinner } from "./Spinner";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  /** Loading state: the options are not ready, so the control is held. */
  loading?: boolean;
}

export function Select({
  id,
  label,
  hint,
  error,
  loading = false,
  disabled = false,
  className = "",
  children,
  ...rest
}: SelectProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} disabled={disabled}>
      <div className="relative">
        <select
          id={id}
          disabled={disabled || loading}
          aria-busy={loading || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={`${CONTROL} ${loading ? "pr-10" : ""} ${className}`}
          {...rest}
        >
          {children}
        </select>
        {loading && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-on-surface-muted">
            <Spinner />
          </span>
        )}
      </div>
    </Field>
  );
}
