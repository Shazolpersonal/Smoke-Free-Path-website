## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.

## 2024-05-30 - Toggle Button Screen Reader Announcements
**Learning:** Dynamically changing `aria-label` on toggle buttons (e.g., swapping between "Play" and "Pause") causes confusing and redundant announcements for screen reader users. It forces the screen reader to re-announce the entire label upon interaction, losing the semantic context of a "toggle".
**Action:** Always use `aria-pressed` (or `aria-expanded` for accordions) on toggle buttons to correctly communicate state to screen readers while keeping the `aria-label` strictly static (e.g., "Play").
