import type { ReactNode } from "react";

/**
 * The label, hint, and error wrapping shared by Input and Select. The error
 * message is the error state's announcement: the control points at it with
 * `aria-describedby` and carries `aria-invalid`.
 */
export interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  children: ReactNode;
}

export function describedBy(id: string, hint?: string, error?: string): string | undefined {
  const ids = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

export function Field({ id, label, hint, error, disabled = false, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={`text-sm font-semibold ${disabled ? "text-on-surface-disabled" : "text-on-surface"}`}
      >
        {label}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-on-surface-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export const CONTROL =
  "w-full min-h-11 rounded-md border border-border-strong bg-surface-raised px-3 py-2 text-on-surface placeholder:text-on-surface-placeholder hover:border-on-surface-muted active:border-on-surface disabled:cursor-not-allowed disabled:border-border disabled:bg-surface disabled:text-on-surface-disabled aria-invalid:border-danger aria-invalid:border-2";
