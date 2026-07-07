## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2024-07-07 - Dynamic Share Bar Aria Label
**Learning:** Hardcoded `aria-label`s on buttons that change state visually (e.g., "Copy" -> "Copied!") cause screen readers to announce incorrect information and violate WCAG 2.5.3 (Label in Name).
**Action:** When a button's visual text changes dynamically, remove the static `aria-label` and rely on the text content, while adding `aria-live="polite"` so screen readers dynamically announce the state change without requiring re-focus.
