## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2024-05-19 - Use static aria-labels with aria-pressed for custom toggle buttons
**Learning:** For custom toggle buttons (like play/pause or mute/unmute), dynamic `aria-label`s (swapping "Play" and "Pause") cause redundant and confusing screen reader announcements when combined with `aria-pressed`.
**Action:** Keep `aria-label` static (e.g., just "Play" or "Mute") and use `aria-pressed` (true/false) to correctly communicate the active state of the toggle button to screen readers.
