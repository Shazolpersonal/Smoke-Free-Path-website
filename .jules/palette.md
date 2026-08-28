## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.

## 2024-05-30 - Fix WCAG 2.5.3 (Label in Name) on Dynamic Buttons
**Learning:** For buttons with dynamic visible text (e.g., "Copy" changing to "Copied!"), using a static `aria-label` overrides the visible text, causing WCAG 2.5.3 (Label in Name) violations because screen readers don't announce the state change.
**Action:** Remove the static `aria-label` and rely on the visible text. Add `aria-live="polite"` to the button so state changes are properly announced by screen readers.
