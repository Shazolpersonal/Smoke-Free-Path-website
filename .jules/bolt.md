
## 2024-05-15 - [Next.js App Router Component Lazy Loading]
**Learning:** In Next.js App router, splitting the initial javascript bundle payload with `next/dynamic` is highly effective on long scrolling marketing pages to significantly improve the initial load performance (reducing First Contentful Paint and Time to Interactive metrics). Below the fold sections do not need to be loaded synchronously.
**Action:** Always identify below-the-fold components in long pages (`app/page.tsx`, etc) and apply `next/dynamic` to load them lazily. Ensure components remain visible to crawlers by confirming the page generates properly in static builds.

## 2024-06-25 - [High Frequency Context Consumers in Lists]
**Learning:** The project's audio context (`useAudioPlayer`) updates the `currentLineIndex` very frequently (e.g., ~4 times a second) during playback. If list items inside a map (like `TranscriptLineRow` in `KaraokeTranscript`) do not use `React.memo` and stable callbacks, they will completely re-render on every tick. This creates unnecessary react render overhead and UI stuttering.
**Action:** When a context provides frequently updating values to a long list, ensure that list child components use `React.memo` and that they receive stable props (e.g. passing a parent `seek` function and the child's `time` instead of inline closures `() => seek(line.t)`).
