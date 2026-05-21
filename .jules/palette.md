## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Form Accessibility with ARIA
**Learning:** Form inputs with visual error messages need to explicitly link the error text to the input for screen readers to announce them correctly when the input receives focus.
**Action:** Always use `aria-describedby` linking to the error message ID and `aria-invalid="true"` when adding or modifying form inputs with validation errors.
