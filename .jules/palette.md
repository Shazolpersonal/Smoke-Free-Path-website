## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2024-07-04 - Dynamic Text Button Accessibility
**Learning:** Found that buttons with dynamic visible text (like a "Copy" button that changes to "Copied!") were using a static `aria-label`. This overrides the visible text for screen readers, causing a WCAG 2.5.3 (Label in Name) violation and preventing users from hearing the state change.
**Action:** Removed the static `aria-label` to let the dynamic visible text serve as the accessible name, and added `aria-live="polite"` so screen readers announce the text change when it happens.
