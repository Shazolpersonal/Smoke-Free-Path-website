
## 2024-05-15 - [Next.js App Router Component Lazy Loading]
**Learning:** In Next.js App router, splitting the initial javascript bundle payload with `next/dynamic` is highly effective on long scrolling marketing pages to significantly improve the initial load performance (reducing First Contentful Paint and Time to Interactive metrics). Below the fold sections do not need to be loaded synchronously.
**Action:** Always identify below-the-fold components in long pages (`app/page.tsx`, etc) and apply `next/dynamic` to load them lazily. Ensure components remain visible to crawlers by confirming the page generates properly in static builds.

## 2024-06-25 - [High Frequency Context Consumers in Lists]
**Learning:** The project's audio context (`useAudioPlayer`) updates the `currentLineIndex` very frequently (e.g., ~4 times a second) during playback. If list items inside a map (like `TranscriptLineRow` in `KaraokeTranscript`) do not use `React.memo` and stable callbacks, they will completely re-render on every tick. This creates unnecessary react render overhead and UI stuttering.
**Action:** When a context provides frequently updating values to a long list, ensure that list child components use `React.memo` and that they receive stable props (e.g. passing a parent `seek` function and the child's `time` instead of inline closures `() => seek(line.t)`).

## 2024-07-28 - [Throttling Scroll Event Listeners]
**Learning:** Frequent window events like "scroll" fire rapidly. If a React component attaches a scroll listener that directly updates component state (e.g., `setIsScrolled`), it will trigger unnecessary and excessive re-renders (dozens of times per second). While React 18 batches some state updates, rapid firing of events still hurts performance, and browsers' natural refresh rate is better respected. Furthermore, scroll event listeners should be marked as `{ passive: true }` so the browser doesn't wait for `preventDefault()`, improving scrolling smoothness.
**Action:** Always throttle continuous events like `scroll` or `resize`. A simple `requestAnimationFrame` flag check effectively limits state updates to the browser's 60 FPS refresh rate. Also, pass `{ passive: true }` to `window.addEventListener` for scroll and touch events to avoid scrolling jank.

## 2024-08-10 - [High Frequency Array Traversal Avoidance]
**Learning:** The project's audio context (`useAudioPlayer`) updates the `currentTime` roughly 4 times per second. Calculating the active list element (e.g., `currentLineIndex`) via an O(N) linear array search repeatedly inside the `useMemo` block creates unnecessary CPU overhead on every audio tick.
**Action:** When deriving state inside high-frequency update cycles like audio time updates, replace O(N) operations (e.g. array linear searches) with O(log N) algorithms (e.g. binary search on a sorted array of timestamps). This prevents blocking the main thread as data scales.

## 2025-02-17 - [High Frequency Array Traversal Avoidance for Multiple Derived States]
**Learning:** Similar to finding the active list element (`currentLineIndex`), calculating other derived states like `currentChapter` via O(N) array search inside a `useMemo` block creates unnecessary CPU overhead on every audio tick.
**Action:** Replace all O(N) operations (e.g. `Array.prototype.find`) with O(log N) algorithms (e.g. binary search on a sorted array of timestamps) for any state derived during high-frequency update cycles like audio `timeupdate` to prevent main-thread blocking.
