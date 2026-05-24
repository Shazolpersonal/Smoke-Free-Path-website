## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.

## 2024-05-24 - Improve form validation accessibility
**Learning:** When using visual error messages with inputs, screen readers don't automatically announce the error. Adding `aria-invalid` and linking the error text with `aria-describedby` ensures users relying on screen readers receive immediate, clear feedback on validation failures.
**Action:** Always link form inputs to their corresponding inline error messages using `aria-describedby` and indicate invalid states dynamically with `aria-invalid`.
