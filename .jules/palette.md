## 2024-05-17 - Setup
**Learning:** Initializing palette journal
**Action:** Create file
## 2026-05-17 - Add accessibility state to payment buttons
**Learning:** Found that custom buttons acting like radio inputs (e.g. payment method selection) need `aria-pressed` to communicate their state to screen readers.
**Action:** Always check custom selection UI elements and ensure they communicate their state using ARIA attributes and have clear focus states for keyboard users.
## 2024-05-18 - Add ARIA attributes for form validation
**Learning:** Form inputs with visual error messages were missing `aria-invalid` and `aria-describedby` attributes, leaving screen reader users without proper context for validation failures.
**Action:** Always link inline error messages to their respective inputs using `aria-describedby` and indicate invalid states with `aria-invalid="true"`.
## 2026-06-10 - Add accessibility state to audio toggle buttons
**Learning:** Discovered that custom toggle buttons (play/pause, mute) in the audio player lacked the `aria-pressed` attribute, missing an opportunity to communicate their active/toggled state to screen reader users.
**Action:** Always ensure custom interactive UI elements acting as toggles communicate their active status using `aria-pressed`.
## 2026-06-10 - Fix audio toggle accessibility
**Learning:** Found an accessibility anti-pattern where custom toggle buttons used both `aria-pressed` and dynamic `aria-label`s (e.g. swapping between "Play" and "Pause"). This creates redundant and confusing announcements for screen readers (e.g. "Pause, toggle button, pressed").
**Action:** When using `aria-pressed` to indicate the state of a toggle button, the `aria-label` must remain static (e.g. "Play"). Always ensure screen reader testing is done to catch redundant announcements. (বাংলা: কাস্টম টগল বাটনের স্টেট বোঝাতে `aria-pressed` ব্যবহার করলে `aria-label` সর্বদা স্ট্যাটিক রাখতে হবে, যেন স্ক্রিন রিডারে দ্বিগুণ অ্যানাউন্সমেন্ট না হয়।)
