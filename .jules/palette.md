## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2024-05-19 - Add `aria-required="true"` to manually validated form fields
**Learning:** When using external schema validation libraries like React Hook Form without native HTML `required` attributes, screen readers are not informed that a field is mandatory.
**Action:** Always add `aria-required="true"` to mandatory form fields when a native HTML `required` attribute is not used to ensure screen readers announce the requirement correctly.
