## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2024-05-19 - Use static aria-labels for toggle buttons with aria-pressed
**Learning:** Found that custom toggle buttons like "Play/Pause" were dynamically changing their `aria-label` while also using `aria-pressed`. This causes screen readers to read conflicting information (e.g., "Pause button pressed").
**Action:** Always use a static `aria-label` (e.g., "Play") and let `aria-pressed` communicate the toggle state. The `title` attribute should still be dynamic to provide the correct tooltip for sighted users.
