## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2026-05-22 - Form validation accessibility
**Learning:** React Hook Form usage in this app visually indicates errors via red borders and inline messages, but was missing programmatic association (`aria-describedby`) and invalid state announcement (`aria-invalid="true"`) for screen readers.
**Action:** Always link inline error messages to their respective form inputs using `aria-describedby` and indicate invalid state with `aria-invalid` to ensure screen reader users receive immediate error context.
