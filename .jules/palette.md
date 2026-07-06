## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2024-07-06 - Dynamic Button Text and ARIA Labels
**Learning:** Adding a static `aria-label` to a button whose visible text changes dynamically (like "Copy" -> "Copied!") causes a WCAG 2.5.3 (Label in Name) violation, as the static ARIA label overrides the new visible text. Screen readers also won't announce the state change automatically.
**Action:** For buttons with dynamic visible text reflecting state changes, rely on the visible text for the accessible name (remove `aria-label`) and add `aria-live="polite"` so screen readers announce the new text when it updates.
