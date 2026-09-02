import { THEME_COLORS } from "../styles/theme-colors";
import { THEME_STORAGE_KEY } from "./theme";

/**
 * Inline script for the root layout's `<head>`. The browser runs it
 * synchronously while parsing, before the first paint, so a stored choice is
 * on `<html>` before any token resolves — no flash of the wrong theme on a
 * server-rendered page.
 *
 * It also owns the `theme-color` metas outright. React 19 treats `<meta>` in
 * the rendered tree as hoistables it reconciles at hydration, so a meta the
 * server rendered and this script edited gets re-inserted by React alongside
 * the edited one. Creating them here, and never in the layout, gives them one
 * owner: one fixed colour under an override, the two media-gated colours
 * otherwise. `applyTheme` in `theme.ts` mirrors this after hydration; the
 * script must stay a self-contained expression, since no module scope exists
 * when it runs.
 */
export const themeScript = `(function(){var d=document,C=${JSON.stringify(THEME_COLORS)};function meta(c,m){var e=d.createElement("meta");e.name="theme-color";e.content=c;if(m)e.media=m;d.head.appendChild(e)}var t=null;try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}if(t==="light"||t==="dark"){d.documentElement.dataset.theme=t;meta(C[t])}else{meta(C.light,"(prefers-color-scheme: light)");meta(C.dark,"(prefers-color-scheme: dark)")}})()`;
