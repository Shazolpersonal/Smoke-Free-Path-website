
## 2024-05-15 - [Next.js App Router Component Lazy Loading]
**Learning:** In Next.js App router, splitting the initial javascript bundle payload with `next/dynamic` is highly effective on long scrolling marketing pages to significantly improve the initial load performance (reducing First Contentful Paint and Time to Interactive metrics). Below the fold sections do not need to be loaded synchronously.
**Action:** Always identify below-the-fold components in long pages (`app/page.tsx`, etc) and apply `next/dynamic` to load them lazily. Ensure components remain visible to crawlers by confirming the page generates properly in static builds.

## 2024-05-16 - [Context Frequency & List Item Re-renders]
**Learning:** In React, when a context value updates frequently (e.g., audio `currentTime` updating ~4x/sec), any component consuming that context will re-render frequently. If this component iterates over a list of items and renders them, *all* list items will re-render on every tick unless they are memoized. Passing inline functions (like `onClick={() => seek(line.t)}`) to list items breaks memoization.
**Action:** Always wrap large list item components in `React.memo` and ensure props passed to them (like callbacks) are stable. Pass identifiers to the child item so it can execute `onClick={() => parentCallback(id)}` internally, rather than creating new closures on every render in the parent.
