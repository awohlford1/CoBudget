import type { ReactNode } from "react";

import { Spinner } from "./Spinner";

/**
 * Two tones only. "danger" is the error state and interrupts (`role="alert"`);
 * "neutral" informs (`role="status"`). There is no success or warning tone
 * because the foundation carries no financial semantics — "under budget" is a
 * product decision, and its colour belongs to the epic that makes it.
 */
export interface AlertProps {
  tone?: "neutral" | "danger";
  title?: string;
  /** Something is in progress: announces busy and shows the spinner. */
  loading?: boolean;
  children: ReactNode;
}

export function Alert({ tone = "neutral", title, loading = false, children }: AlertProps) {
  const danger = tone === "danger";
  return (
    <div
      role={danger ? "alert" : "status"}
      aria-busy={loading || undefined}
      className={`flex gap-3 rounded-md border border-l-4 bg-surface-raised p-4 text-on-surface ${
        danger ? "border-border border-l-danger" : "border-border border-l-interactive"
      }`}
    >
      {loading && (
        <span className="mt-0.5 text-on-surface-muted">
          <Spinner />
        </span>
      )}
      <div className="flex flex-col gap-1">
        {title && <p className={`font-semibold ${danger ? "text-danger" : ""}`}>{title}</p>}
        <div className="text-on-surface-muted">{children}</div>
      </div>
    </div>
  );
}
