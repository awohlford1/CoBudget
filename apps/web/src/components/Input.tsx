import type { InputHTMLAttributes } from "react";

import { CONTROL, Field, describedBy } from "./Field";
import { Spinner } from "./Spinner";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  hint?: string;
  /** Error state: marks the control invalid and announces this message. */
  error?: string;
  /** Loading state: announces busy, shows the spinner, and holds the value. */
  loading?: boolean;
}

export function Input({
  id,
  label,
  hint,
  error,
  loading = false,
  disabled = false,
  readOnly = false,
  className = "",
  ...rest
}: InputProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} disabled={disabled}>
      <div className="relative">
        <input
          id={id}
          disabled={disabled}
          readOnly={loading || readOnly}
          aria-busy={loading || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={`${CONTROL} ${loading ? "pr-10" : ""} ${className}`}
          {...rest}
        />
        {loading && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-on-surface-muted">
            <Spinner />
          </span>
        )}
      </div>
    </Field>
  );
}
