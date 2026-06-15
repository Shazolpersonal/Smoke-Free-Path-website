## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.

## 2024-06-15 - Consistent Form Accessibility for Error Messages
**Learning:** Found that while some forms in the application properly used `aria-invalid` and `aria-describedby` for validation errors (like in the checkout flow), others (like the gift flow) lacked these crucial ARIA attributes, leaving screen reader users without immediate feedback when an input is invalid. This demonstrates a pattern where custom UI components don't always inherit basic HTML5 accessibility features.
**Action:** Always enforce that form validation visual error messages are explicitly linked to their corresponding inputs using `aria-describedby` (matching the `id` of the error `<p>` tag) and programmatic state via `aria-invalid={!!errors[fieldName]}`. This must be checked whenever standardizing or redesigning form flows.
