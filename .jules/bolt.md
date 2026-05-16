
## 2024-05-15 - [Next.js App Router Component Lazy Loading]
**Learning:** In Next.js App router, splitting the initial javascript bundle payload with `next/dynamic` is highly effective on long scrolling marketing pages to significantly improve the initial load performance (reducing First Contentful Paint and Time to Interactive metrics). Below the fold sections do not need to be loaded synchronously.
**Action:** Always identify below-the-fold components in long pages (`app/page.tsx`, etc) and apply `next/dynamic` to load them lazily. Ensure components remain visible to crawlers by confirming the page generates properly in static builds.
