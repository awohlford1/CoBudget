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
| Not exercised here | Space to toggle a checkbox, Enter to activate a button, Escape to cancel a dialog. All three are the browser's native behaviour for native elements — nothing in this codebase handles them — and the browser tool used for this pass did not deliver those particular keys to the page. They take ten seconds by hand on `/foundation` and belong in the next hand pass. |

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

## Reduced motion

`globals.css` carries a `prefers-reduced-motion: reduce` rule that sets `animation-duration`, `transition-duration`, and `animation-iteration-count` to effectively zero on every element. Verified present in the served stylesheet on 2 September 2026; without the preference the spinner runs `spin 1s`, and the only motion in the set is the spinner and the card skeleton's pulse.

Verifying it *with the setting enabled* needs an operating-system toggle the browser tool cannot flip: Windows Settings → Accessibility → Visual effects → Animation effects off, then reload `/foundation` and confirm the Loading spinners and the Loading card are still. That is a hand check, and it is the one item on this ticket not yet performed.
