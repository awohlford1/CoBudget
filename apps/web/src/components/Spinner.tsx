/**
 * The loading indicator every component shares. Decorative: the component
 * that shows it carries `aria-busy`, which is what assistive technology reads.
 * `animate-spin` is suppressed by the reduced-motion rule in globals.css, which
 * leaves a static ring — still a visible "busy" mark.
 */
export function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}
