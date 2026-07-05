## 2026-05-15 - Form Label Accessibility Improvements
**Learning:** Some inputs in checkout and gift forms were missing proper `htmlFor` and `id` linkages. The radio group for purpose selection lacked semantic `fieldset` and `legend` wrappers. Screen readers and users rely on these for easier navigation.
**Action:** Implemented semantic form structure and ensured all `label`s are strictly linked to their `input`s via `htmlFor` and `id`. Next time, verify semantic elements like `fieldset` are used for grouped choices.

## 2026-05-18 - Header Navigation Keyboard Accessibility
**Learning:** The primary navigation header lacked explicit `focus-visible` styles, relying on browser default focus rings which can be inconsistent or have poor contrast against the custom background. Clear focus indicators are critical for keyboard users to navigate the primary site structure.
**Action:** Added consistent, branded (`gold-royal`) `focus-visible` rings with appropriate offsets to all interactive header elements (logo, nav links, mobile menu toggle) to ensure high visibility during keyboard navigation.

## 2026-05-23 - Icon-Only Button Tooltips & Keyboard Shortcut Discoverability
**Learning:** Icon-only buttons in the audio players (ExpandedPlayer, MiniPlayer, SkipPill) had `aria-label` for screen readers but lacked native `title` tooltips for sighted users. Crucially, the ExpandedPlayer supports keyboard shortcuts (Space for play/pause, M for mute, Esc to close, Arrows to seek), but these were completely undiscoverable without visual tooltips. Sighted keyboard/mouse users rely on tooltips just as much as screen reader users rely on aria-labels.
**Action:** Combined `aria-label` with native `title` attributes on all icon-only buttons. For buttons with keyboard shortcuts, appended the shortcut key to the `title` (e.g., `title="বিরতি (Space)"`) to surface the hidden functionality and improve power-user UX. Always ensure keyboard shortcuts are discoverable.

## 2026-05-24 - Dynamic Button Labels & Accessibility
**Learning:** The ShareBar component's "Copy Link" button used a static `aria-label="লিংক কপি করুন"`. However, its visible text dynamically changed to "কপি হয়েছে!" upon success. A static `aria-label` overrides visible text for screen readers, leading to a WCAG 2.5.3 (Label in Name) violation because the spoken name no longer matches the visible text. Additionally, screen readers were unaware when the text changed.
**Action:** Removed the static `aria-label` so screen readers read the visible text naturally. Added `aria-live="polite"` directly to the button so that the dynamic state change ("Copied!") is announced asynchronously.
