## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.

## 2026-06-20 - Toggle Button Accessibility
**Learning:** Dynamic `aria-label`s on toggle buttons (e.g., swapping between "Play" and "Pause") confuse screen readers. The active state should be communicated via `aria-pressed`.
**Action:** Always use `aria-pressed` for toggle buttons while keeping `aria-label` static (e.g., `aria-label="Play"`). Keep the `title` attribute dynamic to reflect the changing visual icon for sighted users.
