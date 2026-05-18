## 2026-05-15 - Form Label Accessibility Improvements
**Learning:** Some inputs in checkout and gift forms were missing proper `htmlFor` and `id` linkages. The radio group for purpose selection lacked semantic `fieldset` and `legend` wrappers. Screen readers and users rely on these for easier navigation.
**Action:** Implemented semantic form structure and ensured all `label`s are strictly linked to their `input`s via `htmlFor` and `id`. Next time, verify semantic elements like `fieldset` are used for grouped choices.

## 2026-05-18 - Header Navigation Keyboard Accessibility
**Learning:** The primary navigation header lacked explicit `focus-visible` styles, relying on browser default focus rings which can be inconsistent or have poor contrast against the custom background. Clear focus indicators are critical for keyboard users to navigate the primary site structure.
**Action:** Added consistent, branded (`gold-royal`) `focus-visible` rings with appropriate offsets to all interactive header elements (logo, nav links, mobile menu toggle) to ensure high visibility during keyboard navigation.
