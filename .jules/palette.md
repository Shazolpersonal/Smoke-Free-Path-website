## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2024-05-28 - Focus Visible State on CTA Links
**Learning:** Found that custom links acting as primary call-to-action buttons (like the one in the Story page) lacked clear focus states, making keyboard navigation difficult for accessibility users. A focus ring with appropriate offsets improves the visibility of the currently focused element against custom backgrounds.
**Action:** Consistently apply `focus-visible` styles with a high contrast focus ring (e.g. `focus-visible:ring-2 focus-visible:ring-offset-2`) to all interactive elements, especially primary CTAs, to ensure WCAG 2.4.7 compliance.
