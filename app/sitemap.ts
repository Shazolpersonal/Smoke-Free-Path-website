import { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * XML sitemap for search engines.
 *
 * Keep route list in sync with:
 *   - app/(...).page.tsx (public pages)
 *   - content/policies/(slug).md (policy slugs)
 *
 * Priority guide:
 *   1.0  → homepage (primary entry point)
 *   0.9  → key conversion assets (story, faq)
 *   0.8  → commerce entry points (checkout, gift)
 *   0.7  → helpful guides (install-guide)
 *   0.6  → secondary info (contact)
 *   0.3  → legal pages (privacy, terms, refund)
 *
 * We intentionally OMIT:
 *   - /thank-you (post-purchase, needs context)
 *   - /download/[token] (gated, not crawlable)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://smoke-free-path.pages.dev"
  ).replace(/\/$/, "");

  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/story`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gift`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/install-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/policy/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/policy/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/policy/refund`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
