import type { InputHTMLAttributes } from "react";

import { Spinner } from "./Spinner";

/**
 * Checkbox and Radio share everything but `type`. Native inputs: keyboard
 * operation, focus, and screen-reader semantics come from the platform, and
 * `accent-color` takes the interactive role in both themes.
 */
export interface ChoiceProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  label: string;
  /** Error state: marks the control invalid and announces this message. */
  error?: string;
  /** Loading state: the choice is being saved; announces busy and blocks changes. */
  loading?: boolean;
}

const BOX =
  "size-5 shrink-0 accent-interactive hover:outline hover:outline-2 hover:outline-on-surface-muted active:outline-on-surface disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:outline aria-invalid:outline-2 aria-invalid:outline-danger";

function Choice({
  type,
  id,
  label,
  error,
  loading = false,
  disabled = false,
  className = "",
  ...rest
}: ChoiceProps & { type: "checkbox" | "radio" }) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className={`inline-flex min-h-11 items-center gap-3 ${disabled ? "text-on-surface-disabled" : "text-on-surface"}`}
      >
        <input
          type={type}
          id={id}
          disabled={disabled || loading}
          aria-busy={loading || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`${BOX} ${type === "radio" ? "rounded-full" : "rounded-sm"} ${className}`}
          {...rest}
        />
        {label}
        {loading && (
          <span className="text-on-surface-muted">
            <Spinner />
          </span>
        )}
      </label>
      {error && (
        <p id={errorId} role="alert" className="text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function Checkbox(props: ChoiceProps) {
  return <Choice type="checkbox" {...props} />;
}

export function Radio(props: ChoiceProps) {
  return <Choice type="radio" {...props} />;
}
