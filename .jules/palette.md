## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2024-06-19 - Add explicit focus states for dark mode and large cards
**Learning:** Default browser focus rings often have insufficient contrast against custom dark backgrounds (like the dark emerald/charcoal footer) and look awkwardly tight or misaligned on large clickable cards (like contact options).
**Action:** Always provide explicit `focus-visible:ring-*` styles that contrast with the specific background (e.g., gold on dark backgrounds, brand color on cards) and use `focus-visible:ring-offset-*` to properly space the ring from the element's border.
