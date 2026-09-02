import { THEME_COLORS } from "../styles/theme-colors";

/**
 * Theme choice, persisted client-side (CBD-16 keeps it off the user record
 * until CBD-22, because the public pages are unauthenticated).
 *
 * "system" means no override: `color-scheme: light dark` on `:root` follows
 * `prefers-color-scheme`. "light" and "dark" pin `data-theme` on `<html>`,
 * which `globals.css` maps to a single `color-scheme`, and every
 * `light-dark()` token resolves accordingly. Nothing else reads the attribute.
 *
 * `theme-script.ts` applies the stored choice before first paint; this module
 * is the same contract for the hydrated page.
 */
export type ThemeChoice = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "cobudget-theme";

const listeners = new Set<() => void>();

export function readTheme(): ThemeChoice {
  const pinned = document.documentElement.dataset.theme;
  return pinned === "light" || pinned === "dark" ? pinned : "system";
}

export function applyTheme(choice: ThemeChoice): void {
  const root = document.documentElement;
  if (choice === "system") {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = choice;
  }

  // The chrome colour metas carry `media` queries so the browser follows the
  // system preference; an explicit choice replaces them with a single colour.
  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    if (choice === "system") {
      meta.media = meta.dataset.media ?? "";
    } else {
      meta.dataset.media ??= meta.media;
      meta.media = "";
      meta.content = THEME_COLORS[choice];
    }
  }

  try {
    if (choice === "system") {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, choice);
    }
  } catch {
    // Storage can be unavailable (private mode, blocked site data). The
    // choice still applies for this page; it just does not survive reload.
  }

  for (const listener of listeners) listener();
}

export function subscribeToTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
