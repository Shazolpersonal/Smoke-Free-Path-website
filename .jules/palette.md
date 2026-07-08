## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2024-07-08 - Fix WCAG 2.5.3 (Label in Name) on dynamic buttons
**Learning:** Adding a static `aria-label` to a button whose visual text changes dynamically (like "Copy Link" to "Copied!") causes a WCAG 2.5.3 violation because the accessible name doesn't match the visible text, and screen readers won't announce the state change properly.
**Action:** When button text changes dynamically, remove the static `aria-label` and rely on the visible text. Add `aria-live="polite"` so screen readers announce the state change when the text updates.
