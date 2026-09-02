# Accessibility record

The verification behind CBD-126's claims, so that each is something someone did rather than something someone believed. Update this file when the component set changes; the contrast half updates itself.

## Contrast

Measured, not judged, on every build. `src/styles/contrast-pairings.json` declares every pairing the tokens permit; `scripts/check-tokens.mjs` measures each from the `light-dark()` values in both themes and fails the build naming the pairing, the theme, the ratio, and the minimum. The current numbers are in [`src/styles/contrast-record.md`](src/styles/contrast-record.md), which the gate regenerates with `--write-record` and refuses to let go stale.

As of 2 September 2026: seventeen enforced pairings pass in both themes; the lowest are `border-strong` on `surface` at 3.73:1 (light, minimum 3:1) and `on-surface-placeholder` on `surface` at 4.80:1 (light, minimum 4.5:1). Seven pairings are exempt and recorded with their clauses. The gate was proven to fire three ways before it was trusted: a lightened muted text failed both its pairings by name (2.19:1 and 2.43:1), a tampered record failed as stale, and a token removed from every pairing failed as unpaired.

## Keyboard

Performed 2 September 2026 against the production build (`next start`) in Chrome 148, on `/foundation`, by sending real key events after a real click gave the document focus.

| Check | Result |
|---|---|
| Tab order | Follows DOM order, which is visual order: Default → hover → active → focus-visible within a variant, then the next variant. 90 focusable elements, all `tabIndex` 0. |
| Disabled controls | Skipped by Tab. No `:disabled` element is in the tab order; the disabled link renders as text with no tab stop. |
| Focus indicator | The 3px ring appears on the focused element in both columns — deep green on the light surface, mint on the dark — and measures against both surfaces in the contrast record. |
| Select | With the control focused, ArrowDown opens the option list; ArrowDown moves the active option; Enter chooses it ("Weekly") and closes the list. |
| Radio | With one radio focused, ArrowDown moves focus and selection to the next radio in the group. |
| Dialog | Opens modally from its trigger; focus lands on the Close button; `Escape` is the browser's cancel; Close returns focus to the trigger. |
| Checkbox, button, dialog keys | Space toggles a checkbox, Enter activates a button, Escape cancels the dialog. All three are the browser's native behaviour for native elements — nothing in this codebase handles them. The automated pass could not deliver those keys; checked by hand by the Product Owner on 2 September 2026 on the production build at `/foundation`, and confirmed working as intended. |

## Screen reader

The accessibility tree the browser exposes is what a screen reader reads. Read on 2 September 2026 from `/foundation` in Chrome 148, in full, and cross-checked against the DOM semantics that carry state.

| Component | Role and name | State |
|---|---|---|
| Button | `button` named by its text | `disabled` on Disabled; `aria-busy="true"` and `disabled` on Loading. |
| Input | `textbox` named by its `<label>`; placeholder exposed | Error: `aria-invalid="true"`, `aria-describedby` → the message, which is `role="alert"` and reads "Enter a positive amount." Hint: `aria-describedby` → the hint. Loading: `aria-busy`, `readonly`. Disabled: `disabled`. |
| Select | `combobox` named by its label; options listed with `(selected)` | Error and loading as Input; loading also `disabled` because the options are not ready. |
| Checkbox, Radio | `checkbox` / `radio` named by its label | `checked`; `disabled`; `aria-invalid` with `aria-describedby` → an `alert` message ("Accept to continue.", "Pick one."). Radios group by `name`. |
| Link | `link` with `href` | Disabled: `role="link"`, `aria-disabled="true"`, no `href`, no tab stop. |
| Card | `region` with a heading; an interactive card is a `link` containing its heading | Loading: `aria-busy="true"`, skeleton bars `aria-hidden`. |
| Dialog | `dialog`, `aria-labelledby` → its title | Modal when opened from the trigger; inline preview carries `open`. |
| Alert | `status` (neutral) or `alert` (danger) | Loading: `aria-busy="true"`. |
| Table | `table` with a `<caption>`; headers `scope="col"` | Loading: `aria-busy`. Error: the message cell is `role="alert"`. Empty: a plain message row. |

## Public pages (CBD-20)

Performed 2 September 2026 against the production build (`next build` + `next start`) in Chrome 148, on `/` and `/mission`.

| Check | Result |
|---|---|
| Copy against the source | `scripts/check-public-pages.mjs` runs after every build: an independent reading of `docs/brand-foundation.md` must find the mission, vision, all seven values, and every manifesto paragraph in the built Mission page in the required order with the closing line as the last text in `<main>`, and the tagline, descriptor, and mission in the built landing page. Proven to fail on a drifted mission sentence in the source, an injected "monitor … real-time" paragraph, a removed closing line, and an injected Google Tag Manager script — each by name — then restored and passing. |
| Titles and descriptions | Landing: "MoneyPact", description the descriptor and tagline. Mission: "Our mission \| MoneyPact", description the mission statement. |
| Landmarks and outline | Both pages: one `header` (banner) with the wordmark and a `nav` labelled "Site", one `main`, one `footer` (contentinfo) with the theme choice. Landing outline: H1 tagline, H2 "Money shouldn't be managed alone.", H2 "What we value". Mission outline: H1 "Our mission", H2 "Our vision", H2 "What we value" with an H3 per value in a seven-item list, H2 "Our manifesto". One `h1` per page. The accessibility tree reads in that order with every heading, list, and region exposed. |
| 320-pixel viewport | Both pages: document and body width exactly 320; the widest element is the shell itself. No horizontal scroll. Usable at 1280. |
| Keyboard | From a click in the content, Tab moves through "Read our mission", "All seven values, and why they matter", the theme radios, and wraps to the wordmark and "Our mission" — DOM order, which is visual order — with the 3px deep-green ring in the light theme. The Mission page's only interactive elements are the shell's. |
| Both themes | Rendered in dark and in light (emulated `prefers-color-scheme: light`): the light body is the cream surface with deep-green text, the dark the dark surface with off-white text, from the same markup. |
| No trackers | The network log on a fresh load of each page holds only this origin: the document, one stylesheet, the script chunks, and prefetches. No third-party request of any kind. The check also refuses any `script`, `img`, `iframe`, `link`, `source`, `video`, or `audio` on another origin in the built HTML, so a tracker cannot be added without failing the build (`AN-92-001`, `AN-92-002`). |
| Account existence | Both pages are static and identical for every visitor; nothing reads a session or a store. |
| Role terminology | Neither page names the role CBD-12 has not settled; "Guardian" and "Accountability Partner" are forbidden words in the check. |
| Contrast | Every colour on both pages is a token pairing in the contrast record above; no page adds a colour. |

## Reduced motion

`globals.css` carries a `prefers-reduced-motion: reduce` rule that sets `animation-duration`, `transition-duration`, and `animation-iteration-count` to effectively zero on every element. Verified present in the served stylesheet on 2 September 2026; without the preference the spinner runs `spin 1s`, and the only motion in the set is the spinner and the card skeleton's pulse.

Verifying it *with the setting enabled* needs an operating-system toggle the browser tool cannot flip. Done by hand by the Product Owner on 2 September 2026: Windows Settings → Accessibility → Visual effects → Animation effects off, reload `/foundation`, and the Loading spinners and the Loading card's placeholder bars are still. Confirmed working as intended.
