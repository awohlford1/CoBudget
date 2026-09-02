"use client";

import { useSyncExternalStore } from "react";

import { applyTheme, readTheme, subscribeToTheme } from "./theme";
import type { ThemeChoice } from "./theme";

const CHOICES: readonly { value: ThemeChoice; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

/**
 * The explicit theme override. A Client Component by necessity: it reads and
 * writes browser state. Native radios so keyboard operation, focus, and
 * screen-reader semantics come from the platform; the styled component set is
 * CBD-125's.
 *
 * The server renders "system" — it cannot know the stored choice — and
 * `useSyncExternalStore` swaps in the real value at hydration, which the inline
 * script has already applied to `<html>`, so the page never shows the wrong
 * theme and the control never shows the wrong choice for longer than
 * hydration takes.
 */
export function ThemeToggle() {
  const choice = useSyncExternalStore(subscribeToTheme, readTheme, () => "system" as const);

  return (
    <fieldset className="theme-choice">
      <legend>Theme</legend>
      {CHOICES.map(({ value, label }) => (
        <label key={value}>
          <input
            type="radio"
            name="theme"
            value={value}
            checked={choice === value}
            onChange={() => applyTheme(value)}
          />
          {label}
        </label>
      ))}
    </fieldset>
  );
}
