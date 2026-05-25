## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-06-25 - [Form Accessibility] Missing aria-describedby and aria-invalid on input fields
**Learning:** Found a systematic issue where form inputs with visual error messages (e.g., in checkout and gift pages) were missing programmatic association via `aria-describedby` and invalid state indication via `aria-invalid`. This is critical because screen readers will not announce the error message when the input receives focus if these attributes are missing.
**Action:** When adding or modifying form inputs with visual error messages, always link the inline error messages to their respective inputs using the `aria-describedby` attribute and indicate invalid states with `aria-invalid={!!errors[fieldName]}`.
