## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2026-07-02 - Add aria-required attribute to React Hook Form inputs
**Learning:** When native HTML 'required' attributes are omitted (e.g. when validation relies entirely on external schemas like Zod + React Hook Form), screen readers may fail to announce fields as mandatory to visually impaired users.
**Action:** Always add `aria-required="true"` explicitly to visually mandatory form fields unless using the native `required` attribute.
