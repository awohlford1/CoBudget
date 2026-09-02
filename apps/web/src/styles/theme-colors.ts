/**
 * The browser-chrome colours: `<meta name="theme-color">` and the PWA manifest
 * need literals, because neither can read a CSS variable. These are the one
 * duplication of a token value the token check permits, and it verifies they
 * equal `--color-surface` in `tokens.css` so the two cannot drift.
 */
export const THEME_COLORS = {
  light: "#f4f1e9",
  dark: "#101a18",
} as const;
