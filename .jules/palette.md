## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2026-06-08 - Add ARIA attributes for form validation in gift page
**Learning:** Found that the gift page form inputs were missing `aria-invalid` and `aria-describedby` attributes, which was previously fixed in the checkout page. Both pages needed this to provide context for validation failures for screen reader users.
**Action:** Consistently apply `aria-invalid` and `aria-describedby` alongside inline error messages across all forms in the application.
