"use client";

import { useId, useRef } from "react";
import type { ReactNode } from "react";

import { Button } from "./Button";

/**
 * The one Client Component in the set, by necessity: opening a native
 * `<dialog>` modally is a browser API call. Everything else is the platform's —
 * Escape closes, focus is trapped, the backdrop is a pseudo-element — so the
 * component adds a trigger, a close button, and the token styling.
 *
 * Passing `open` renders it non-modal and inline, which is how the review
 * surface shows its look without a click.
 */
export interface DialogProps {
  title: string;
  /** Label of the button that opens the dialog. */
  trigger: string;
  dismissLabel?: string;
  open?: boolean;
  children: ReactNode;
}

export function Dialog({ title, trigger, dismissLabel = "Close", open, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  return (
    <>
      {!open && (
        <Button variant="secondary" onClick={() => ref.current?.showModal()}>
          {trigger}
        </Button>
      )}
      <dialog
        ref={ref}
        open={open}
        aria-labelledby={titleId}
        className={`${open ? "relative" : "m-auto"} w-[min(100%,28rem)] rounded-lg border border-border bg-surface-raised p-6 text-on-surface shadow-overlay backdrop:bg-on-surface/60`}
      >
        <h2 id={titleId} className="mb-3 font-display text-xl font-semibold">
          {title}
        </h2>
        <div className="mb-6 text-on-surface-muted">{children}</div>
        <div className="flex justify-end">
          <Button variant="secondary" onClick={() => ref.current?.close()}>
            {dismissLabel}
          </Button>
        </div>
      </dialog>
    </>
  );
}
