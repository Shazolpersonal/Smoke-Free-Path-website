## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2025-07-03 - Dynamic Button State and WCAG 2.5.3
**Learning:** Found that a static `aria-label` overrides dynamic visible text on buttons (like a "Copy" button changing to "Copied!"). This violates WCAG 2.5.3 (Label in Name) because the new visible text is not part of the static accessible name. It also prevents screen readers from announcing the state change.
**Action:** When a button's visible text provides clear context and changes dynamically, rely on the visible text and remove static `aria-label`s. Use `aria-live="polite"` on the element to ensure the text change is announced.
