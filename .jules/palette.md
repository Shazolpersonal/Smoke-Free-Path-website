## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2024-05-19 - Explicitly marking schema-validated inputs as required
**Learning:** Found that mandatory form inputs validated via external libraries (like React Hook Form + Zod) do not inherently communicate their required state to screen readers if the native HTML `required` attribute is omitted.
**Action:** Always add `aria-required="true"` explicitly to mandatory form fields when relying on external schema validation without native HTML `required` attributes to ensure screen readers announce the requirement.
