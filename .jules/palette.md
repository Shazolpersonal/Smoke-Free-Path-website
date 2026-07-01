## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2026-07-01 - Add ARIA attributes for gift form validation
**Learning:** Gift form inputs were missing `aria-invalid`, `aria-describedby`, and `aria-required` attributes, hindering accessibility when external validation (like zod) is used.
**Action:** Always ensure required form inputs explicitly have `aria-required="true"` and are correctly linked to their visual error messages using `aria-describedby` and `aria-invalid` states.
