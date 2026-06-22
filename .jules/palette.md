## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2024-06-22 - Add static aria-labels and aria-pressed states to custom toggle buttons
**Learning:** Found that custom toggle buttons like play/pause or mute/unmute buttons need static `aria-label`s to prevent screen reader announcements from constantly changing when the state updates, which can be confusing. The active state should instead be communicated using the `aria-pressed` attribute, while leaving a dynamic `title` for sighted users to reflect the visual icon change.
**Action:** Always check custom toggle buttons to ensure they communicate their active state using `aria-pressed` and keep the `aria-label` static while the visual `title` can remain dynamic.
