import { THEME_COLORS } from "../styles/theme-colors";
import { THEME_STORAGE_KEY } from "./theme";

/**
 * Inline script for the root layout's `<head>`. The browser runs it
 * synchronously while parsing, before the first paint, so a stored choice is
 * on `<html>` before any token resolves — no flash of the wrong theme on a
 * server-rendered page. It mirrors `applyTheme` in `theme.ts` and must stay a
 * self-contained expression: no module scope exists when it runs.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t!=="light"&&t!=="dark")return;document.documentElement.dataset.theme=t;var c=${JSON.stringify(THEME_COLORS)}[t];var m=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<m.length;i++){m[i].dataset.media=m[i].media;m[i].media="";m[i].content=c}}catch(e){}})()`;
