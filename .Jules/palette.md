## 2026-05-15 - Form Label Accessibility Improvements
**Learning:** Some inputs in checkout and gift forms were missing proper `htmlFor` and `id` linkages. The radio group for purpose selection lacked semantic `fieldset` and `legend` wrappers. Screen readers and users rely on these for easier navigation.
**Action:** Implemented semantic form structure and ensured all `label`s are strictly linked to their `input`s via `htmlFor` and `id`. Next time, verify semantic elements like `fieldset` are used for grouped choices.

## 2026-05-18 - Header Navigation Keyboard Accessibility
**Learning:** The primary navigation header lacked explicit `focus-visible` styles, relying on browser default focus rings which can be inconsistent or have poor contrast against the custom background. Clear focus indicators are critical for keyboard users to navigate the primary site structure.
**Action:** Added consistent, branded (`gold-royal`) `focus-visible` rings with appropriate offsets to all interactive header elements (logo, nav links, mobile menu toggle) to ensure high visibility during keyboard navigation.

## 2026-05-23 - Icon-Only Button Tooltips & Keyboard Shortcut Discoverability
**Learning:** Icon-only buttons in the audio players (ExpandedPlayer, MiniPlayer, SkipPill) had `aria-label` for screen readers but lacked native `title` tooltips for sighted users. Crucially, the ExpandedPlayer supports keyboard shortcuts (Space for play/pause, M for mute, Esc to close, Arrows to seek), but these were completely undiscoverable without visual tooltips. Sighted keyboard/mouse users rely on tooltips just as much as screen reader users rely on aria-labels.
**Action:** Combined `aria-label` with native `title` attributes on all icon-only buttons. For buttons with keyboard shortcuts, appended the shortcut key to the `title` (e.g., `title="বিরতি (Space)"`) to surface the hidden functionality and improve power-user UX. Always ensure keyboard shortcuts are discoverable.

## 2026-06-12 - Toggle Button Accessibility with aria-pressed
**Learning:** Audio player play/pause and mute buttons were dynamically swapping their `aria-label` (e.g., "শুনুন" to "বিরতি"). This causes confusing and redundant announcements for screen reader users as they navigate or activate the buttons. For toggle buttons, the accessible name (`aria-label` or visible text) must remain static, while the state is communicated via `aria-pressed`.
**Action:** Updated toggle buttons in `ExpandedPlayer` and `MiniPlayer` to use static `aria-label`s (like "শুনুন / বিরতি") and applied `aria-pressed` tied to their respective states (`state.isPlaying` and `state.isMuted`). Always use `aria-pressed` with static labels for custom toggle controls.
