## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2026-08-27 - Handle dynamic button text accessibly
**Learning:** Buttons with dynamic visible text (e.g. 'Copy' changing to 'Copied!') should not use static `aria-label`s as they override the visible text, causing WCAG 2.5.3 (Label in Name) violations and preventing state changes from being announced.
**Action:** For buttons with dynamic text, rely on the visible text and add `aria-live="polite"` to the element so that state changes are correctly announced by screen readers.
## 2024-05-24 - Form Label Accessibility Improvements\n**Learning:** Add `aria-invalid` and `aria-describedby` to all form inputs in order to communicate validation status and messages to screen readers.\n**Action:** Add `aria-invalid` and `aria-describedby` to the form input.
