## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.

## 2026-05-27 - Dynamic Button Accessible Names
**Learning:** For buttons with dynamic visible text (e.g., 'Copy' changing to 'Copied!'), using a static `aria-label` overrides the visible text for screen readers, causing a WCAG 2.5.3 (Label in Name) violation. This leads to a confusing experience as the screen reader never announces the new state or visible text.
**Action:** Relied on the dynamic visible text instead of a static `aria-label` and added `aria-live="polite"` to the element so that state changes are announced by screen readers when the text changes.
