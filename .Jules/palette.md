## 2026-05-15 - Form Label Accessibility Improvements
**Learning:** Some inputs in checkout and gift forms were missing proper `htmlFor` and `id` linkages. The radio group for purpose selection lacked semantic `fieldset` and `legend` wrappers. Screen readers and users rely on these for easier navigation.
**Action:** Implemented semantic form structure and ensured all `label`s are strictly linked to their `input`s via `htmlFor` and `id`. Next time, verify semantic elements like `fieldset` are used for grouped choices.

## 2026-05-18 - Header Navigation Keyboard Accessibility
**Learning:** The primary navigation header lacked explicit `focus-visible` styles, relying on browser default focus rings which can be inconsistent or have poor contrast against the custom background. Clear focus indicators are critical for keyboard users to navigate the primary site structure.
**Action:** Added consistent, branded (`gold-royal`) `focus-visible` rings with appropriate offsets to all interactive header elements (logo, nav links, mobile menu toggle) to ensure high visibility during keyboard navigation.

## 2026-05-23 - Icon-Only Button Tooltips & Keyboard Shortcut Discoverability
**Learning:** Icon-only buttons in the audio players (ExpandedPlayer, MiniPlayer, SkipPill) had `aria-label` for screen readers but lacked native `title` tooltips for sighted users. Crucially, the ExpandedPlayer supports keyboard shortcuts (Space for play/pause, M for mute, Esc to close, Arrows to seek), but these were completely undiscoverable without visual tooltips. Sighted keyboard/mouse users rely on tooltips just as much as screen reader users rely on aria-labels.
**Action:** Combined `aria-label` with native `title` attributes on all icon-only buttons. For buttons with keyboard shortcuts, appended the shortcut key to the `title` (e.g., `title="বিরতি (Space)"`) to surface the hidden functionality and improve power-user UX. Always ensure keyboard shortcuts are discoverable.

## 2026-05-24 - Form Input Error Linking
**Learning:** Some forms, like the gift form, missed linking their validation error messages to the corresponding input fields, despite other forms (like checkout) having them. Screen reader users rely on `aria-invalid` and `aria-describedby` to understand validation context when a field receives focus. Additionally, mandatory form fields without a native `required` attribute (like those managed by Zod) must use `aria-required="true"` to explicitly announce their required state.
**Action:** Always ensure any form validation error message is programmatically linked to its input using `aria-describedby`, toggle `aria-invalid` based on error state, and explicitly mark mandatory fields with `aria-required="true"`.
