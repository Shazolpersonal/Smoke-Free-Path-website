## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.

## 2025-06-26 - Add ARIA attributes for required form fields
**Learning:** Required form inputs that lack standard HTML `required` attributes or clear programmatic associations can leave screen reader users without proper context, forcing them to guess which fields must be filled based purely on visual asterisks or post-submission validation errors.
**Action:** Always add `aria-required="true"` to required form fields (like Name, Email, Phone, and Transaction ID) when a native `required` attribute isn't used or sufficient, to explicitly communicate this state to assistive technologies.
