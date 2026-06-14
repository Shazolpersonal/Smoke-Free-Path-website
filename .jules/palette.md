## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.

## 2026-06-14 - Use static aria-label with aria-pressed
**Learning:** When using `aria-pressed` to indicate the state of a custom toggle button (like play/pause or mute/unmute), the `aria-label` must remain static to prevent redundant and confusing announcements for screen reader users.
**Action:** When adding `aria-pressed` to a toggle button, ensure its `aria-label` is a single constant string (e.g., 'Play') instead of dynamically swapping it based on state.
