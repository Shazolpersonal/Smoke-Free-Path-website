## 2026-05-15 - Form Label Accessibility Improvements
**Learning:** Some inputs in checkout and gift forms were missing proper `htmlFor` and `id` linkages. The radio group for purpose selection lacked semantic `fieldset` and `legend` wrappers. Screen readers and users rely on these for easier navigation.
**Action:** Implemented semantic form structure and ensured all `label`s are strictly linked to their `input`s via `htmlFor` and `id`. Next time, verify semantic elements like `fieldset` are used for grouped choices.
